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
        getNearestLocationFrom:function(lat,lng){
            if(lat instanceof Object){
                lng=lat.lng;
                lat=lat.lat;
            }

            var shortestDistance=10000000;
            var shortestLocation=0;

            for(var i=0;i<locations.length;i++){
                var xDiff=Math.abs(locations[i].latitude-lat);
                var yDiff=Math.abs(locations[i].longitude-lng);
//                console.log(locations[i].latitude,lat);
//                console.log(locations[i].longitude,lng);
                var distance=xDiff*xDiff + yDiff*yDiff;
//                console.log(locations[i].name,xDiff,yDiff);
                if(distance <= shortestDistance){
                    shortestDistance=distance;
                    shortestLocation=locations[i];
                }
            }

            return shortestLocation;
        }
    }
})();