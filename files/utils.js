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
module.exports.calculateDistanceFriendly=function(locations){
    return Math.round(module.exports.calculateDistance(locations)*1000)/1000+" km";
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
    var fare=distance/config.vehicleAvgSpeed;

    if(fare<config.minFare)fare=config.minFare;

    return fare;
}

module.exports.friendlyVehicleETA=function(distance,vType){
    var speed=module.exports.vehicleETA(distance,vType);

    return speed+" minutes";
}