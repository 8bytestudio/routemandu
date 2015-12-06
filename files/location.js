/**
 * Created by damo on 12/3/15.
 */
module.exports=(function(){
    var locations=[];
    return {
        init:function(all){
            locations=all;
        },
        getById:function(id){

        },
        getNearestFrom:function(lat,lng){
            var shortestDistance=10000000;
            var shortestLocation=null;

            for(var i=0;i<locations.length;i++){
                var xDiff=Math.abs(locations[i].latitude-lat);
                var yDiff=Math.abs(locations[i].longitude-lng);

                var distance=xDiff*xDiff + yDiff*yDiff;

                if(distance<shortestDistance){
                    shortestDistance=distance;
                    shortestLocation=locations[i];
                }
            }

            return shortestLocation;
        }
    }
})();