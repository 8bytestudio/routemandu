/**
 * Created by damo on 12/3/15.
 */
module.exports=(function(){
    var locations=[];
    return {
        init:function(all){
            locations=all;

            locations.forEach(function(location){

                location.url="http://maps.google.com/maps?q=loc:"+location.latitude+","+location.longitude+"&z=17";
            })
        },
        getById:function(id){
            for(var i=0;i<locations.length;i++){
                if(locations[i].ID==id){
                    return locations[i];
                }
            }
        },
        getNearestLocationFrom:function(lat,lng){
            if(lat instanceof Object){
                lng=lat.longitude;
                lat=lat.latitude;
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