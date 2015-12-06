/**
 * Created by damo on 12/6/15.
 */

var location=require("./location");

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