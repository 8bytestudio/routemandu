/**
 * Created by damo on 12/3/15.
 */


var location=require("./location");
var server=require("./server");
var utils=require("./utils");
var Route_class=require("./route_class");
var _routes=[];

var start=0;
var end=0;

module.exports=(function(){

    var createRoutesFromPlain=function(ps){
        for(var i=0;i<ps.length;i++){
            _routes.push(new Route_class(ps[i]));
        }
    }

    var parseResult=function(result){
        var output=[];

        for(var i=0;i<result.length;i++){

            var item_raw=result[i];
            var item={"locations":[],"vehicles":[]};

            if(item_raw.type=="single"){
                console.log("single found");
                var places=item_raw.routes[0].getPlacesInBetween(start,end);
                item.locations=utils.formatLocationsFromIDs(places);

                item.start=start;
                item.end=end;

                console.log("end");

                for(var i=0;i<item_raw.routes.length;i++){
                    var route=item_raw.routes[i];
                    item.vehicles=item.vehicles.concat(route.vehicles);
                }

                output.push(item);
            }
        }

        return output;

    }

    var calibrate=function(from,to){
        console.log("calibrating");

        start=location.getNearestLocationFrom(from).ID;
        console.log(to);
        end=location.getNearestLocationFrom(to).ID;
        delete from,to;

        if(! (start && end)) return {};

        var results=[];
        if(start!=end){

            //single route checking
            var singles=[];
            for (var i=0;i<_routes.length;i++){
                if(_routes[i].goesThroughLocations(start,end)){
                    singles.push(_routes[i]);

                }else{
                }
            }
            if(singles){
                results.push({type:"single",routes:singles});
            }else{
                //double route checking
            }
        }else{
            //start and end places are the same. The user has to walk. Sorry user, the destination is nearby!
            return {};
        }
        console.log("escape");

        return parseResult(results);
    }

    return {
        init:function(plainRoutes){
            createRoutesFromPlain(plainRoutes);
            server.init();
        },
        getResultJson:function(from,to){
            return calibrate(from,to);
        }
    }
})();