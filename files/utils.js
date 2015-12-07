/**
 * Created by damo on 12/6/15.
 */

var location=require("./location");
var _=require("underscore");

module.exports.distanceBetween=function(a,b){
    if(! (a instanceof Object)) a=location.getById(a);
    if(! (a instanceof Object)) b=location.getById(b);

    var xDiff=Math.abs(a.latitude- b.latitude);
    var yDiff=Math.abs(a.longitude- b.longitude);

    return Math.pow(xDiff*xDiff-yDiff*yDiff,0.5);
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