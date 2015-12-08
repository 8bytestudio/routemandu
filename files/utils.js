/**
 * Created by damo on 12/6/15.
 */

var location=require("./location");
var _=require("underscore");
var config=require("../config");

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
    if(arguments.length ==1){
        return Math.round(module.exports.calculateDistance(arguments[0])*1000)/1000+" km";
    }else{
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

    return fare;
}
module.exports.calculateFareFriendly=function(locations,vType){
    return "Rs. "+module.exports.calculateFare(

        module.exports.calculateDistance(locations),
        vType);
}

module.exports.vehicleETA=function(distance,vType){
    var eta=60*distance/config.vehicleAvgSpeed;

    return eta;
}

module.exports.friendlyVehicleETA=function(distance,vType){
    var eta=module.exports.vehicleETA(distance,vType);

    eta=Math.round(eta*100)/100;

    return eta+" minutes";
}

module.exports.walkingETA=function(distance){
    var eta=distance/config.walkingAvgSpeed;

    return eta;
}

module.exports.friendlyWalkingETA=function(distance){
    var speed=module.exports.walkingETA(distance);

    speed=Math.round(speed*100,2)/100;

    return speed+" minutes";
}

module.exports.generateChainTitle=function(chain){
    var output="";
    console.log(chain);
    for(var i=0;i<chain.length;i++){
        if(chain[i].type != "vehicle")continue;

        output += chain[i].locations[0].name;

        output += " -> ";

        if(i==chain.length-1){
            output += _.last(chain[i].locations).name;
        }
    }


    return output;
}