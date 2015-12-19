/**
 * Created by damo on 12/6/15.
 */

var location=require("./location");
var _=require("underscore");
var config=require("../config");

var utils=module.exports;

module.exports.distanceBetween=function(a,b){
    if(! (a instanceof Object)) a=location.getById(a);
    if(! (b instanceof Object)) b=location.getById(b);

    var xDiff=Math.abs(a.latitude- b.latitude);
    var yDiff=Math.abs(a.longitude- b.longitude);

    var diff=Math.pow(xDiff*xDiff+yDiff*yDiff,0.5);
    return diff;
}

module.exports.calculateDistance=function(array){
    var distance=0;

    for(var i=0;i<array.length-1;i++){
        var routeDistance = module.exports.distanceBetween(array[i],array[i+1]);
        distance += routeDistance;
    }

    return distance*config.coordToKmFactor;
}
module.exports.calculateDistanceFriendly=function(){

    if(arguments.length ==1){//if the item itself is an array,
        return Math.round(module.exports.calculateDistance(arguments[0])*1000)/1000+" km";
    }else{//else the parameters are passed as functions
        return Math.round(module.exports.calculateDistance(arguments)*1000)/1000+" km";
    }

}

module.exports.formatLocationsFromIDs=function(array){
    var result=[];

    for(var i=0;i<array.length;i++){
        if(! (array[i] instanceof Object))array[i]=location.getById(array[i]);

        result.push(array[i]);
    }
    return result;
}

module.exports.getPointsThatGoFrom=function(location){
    var computer=require("./computer");

    if(location instanceof Object)location=location.id;

    var result=[];

    for(var i=0;i<computer.routes.length;i++){

        if(computer.routes[i].goesThroughLocations(location)){
            result= _.union(result,computer.routes[i].locations);
        }

    }

    return result;
}

module.exports.getRoutesThatPassThroughPoints=function(){
    var computer=require("./computer");

    var result=[];
    for(var i=0;i<computer.routes.length;i++){

        if(computer.routes[i].goesThroughLocations.apply(computer.routes[i],arguments)){
            result.push(computer.routes[i]);
        }
    }

    return result;
}

module.exports.calculateFare=function(distance,vType){
    var fare=distance*config.fareConstant;

    if(fare<config.minFare)fare=config.minFare;

    return Math.ceil(fare);
}
module.exports.calculateFareFriendly=function(locations,vType){
    return "Rs. "+module.exports.calculateFare(

        module.exports.calculateDistance(locations),
        vType);
}

module.exports.vehicleETA=function(distance,vType){
    var eta=60*distance/config.vehicleAvgSpeed;

    return Math.ceil(eta);
}
module.exports.friendlyVehicleETA=function(distance,vType){
    var eta=module.exports.vehicleETA(distance,vType);

    eta=Math.round(eta*100)/100;

    return eta+" minutes";
}

module.exports.walkingETA=function(distance){
    var eta=60*config.walkingAvgSpeed*distance/config.walkingAvgSpeed;

    return Math.ceil(eta);
}
module.exports.friendlyWalkingETA=function(distance){
    var speed=module.exports.walkingETA(distance);
    console.log(speed);
    speed=Math.round(speed*100)/10;

    return speed+" minutes";
}

module.exports.generateChainTitle=function(chain){
    var output="";
    for(var i=0;i<chain.length;i++){
        if(chain[i].type != "vehicle")continue;

        output += chain[i].locations[0].name;

        output += " -> ";

        if(i==chain.length-2){
            output += _.last(chain[i].locations).name;
        }
    }


    return output;
}

//contain same location in routes?
module.exports.containSameRoute=function(a,b,from,to){
    aLocs=a.getPlacesInBetween(from,to)
    bLocs= b.getPlacesInBetween(from,to);

    return aLocs.toString()==bLocs.toString();
}

//takes two arrays containing routes.
//returns true if the two arrays contain the same routes, independent of their order
module.exports.sameRouteArrays=function(a,b){
    if(a.length != b.length)return false;

    var result=_.intersection(a, b);

    same=result.length== a.length;
    return same;
}

module.exports.getUniqueIntersects=function(start,end,intersects){
    //create bundle of unique intersection points
    var uniqueIntersects=[];
    for(var i=0;i<intersects.length;i++){
        var intersect=intersects[i];

        var process={
            initial:utils.getRoutesThatPassThroughPoints(start,intersect),
            final:utils.getRoutesThatPassThroughPoints(end,intersect),
            intersects:[intersect]
        }

        var unique=true;

        for(var x=0;x<uniqueIntersects.length;x++){
            var uniqueIntersect=uniqueIntersects[x];

            if(utils.sameRouteArrays(uniqueIntersect.initial,process.initial) &&
                utils.sameRouteArrays(uniqueIntersect.final,process.final)){
                uniqueIntersect.intersects.push(intersect);
                unique=false;
                break;
            }else{

            }
        }

        if(unique){
            uniqueIntersects.push(process);
        }
    }

    return uniqueIntersects;
}

utils.removeDuplicateRotues=function(results,start,end){
    var ret=[];

    results.forEach(function(route){
        if(route.type=="single") {
            ret.push(route);
        }else if(route.type=="double"){
            ret.push(route)

        }else{
            if(route.firstInterval==route.secondInterval)return;

            if(route.firstInterval==start)return;
            if(route.secondInterval==end)return;
            if(route.firstInterval==end)return;
            if(route.secondInterval==start)return;

            for(var i=0;i<route.first.length;i++){

                if(route.first[i].goesThroughLocations(end) || route.first[i].goesThroughLocations(route.secondInterval)){
//                    console.log("YES");
                    return;
                }
            }

            for(var i=0;i<route.third.length;i++){
                if(route.third[i].goesThroughLocations(start) || route.third[i].goesThroughLocations(route.firstInterval)){
//                    console.log("YES1");
                    return;
                }
            }


            ret.push(route);
        }
    })
    return ret;
}

utils.sortRoutesByDistance=function(routes){
    //Add distance factor to each route
    routes.forEach(function(route){
        route.distance=route.distance || 0;

        route.steps.forEach(function(step){
            route.distance += step.realDistance;
        })

    });

    //sort them
    routes=_.sortBy(routes,function(route){return route.distance;});

    return routes;
}

utils.removeUnnecessaryInfo=function(result){
    result.forEach(function(route){
        route.steps.forEach(function(step){
            step.locations.forEach(function(location){
                delete location.district;
            })
        })
    })
    return result;

}