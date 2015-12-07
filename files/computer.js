/**
 * Created by damo on 12/3/15.
 */


var location=require("./location");
var server=require("./server");
var utils=require("./utils");
var Route_class=require("./route_class");
var _=require("underscore");

var _routes=[];

var start=0;
var end=0;

module.exports=(function(){

    var createRoutesFromPlain=function(ps){
        for(var i=0;i<ps.length;i++){
            _routes.push(new Route_class(ps[i]));
        }
    }

    var getParsingChainItem=function(routes,from,to){
        if(! from) from=start;
        if(! to)to=end;

        var item={"locations":[],"vehicles":[]};

        var places=routes[0].getPlacesInBetween(from,to);
        item.locations=utils.formatLocationsFromIDs(places);
        item.type="vehicle";

        item.distance=utils.calculateDistanceFriendly(item.locations)

        item.start=location.getById(from);
        item.end=location.getById(to);


        for(var i=0;i<routes.length;i++){
            var route=routes[i];
            item.vehicles=item.vehicles.concat(route.vehicles);
        }

        for(var i=0;i<item.vehicles.length;i++){
            item.vehicles[i].cost=utils.calculateFareFriendly(item.locations,item.vehicles[i].vType);

            item.vehicles[i].eta=utils.friendlyVehicleETA(
                utils.calculateDistance(item.locations),
                item.vehicles[i].vType);
            item.vehicles[i].realEta=utils.vehicleETA(
                utils.calculateDistance(item.locations),
                item.vehicles[i].vType);

        }

        return item;
    }

    var parseResult=function(result){
        var output=[];

        for(var i=0;i<result.length;i++){

            var item_raw=result[i];

            var chain=[];

            if(item_raw.type=="single"){
                console.log("single found");

                chain.push(getParsingChainItem(item_raw.routes))

                output.push({
                    steps:chain,
                    info:"From Hattiban to Satdobato"
                });
            }else if(item_raw.type=="double"){
                chain.push(getParsingChainItem(
                    item_raw.first,
                    start,
                    item_raw.firstInterval));

                chain.push(getParsingChainItem(
                    item_raw.second,
                    item_raw.firstInterval,
                    end));

                output.push({
                    steps:chain,
                    info:"From Hattiban to Satdobato to Gwarko"
                });

            }
        }

        return output;

    }

    var calibrate=function(from,to){
        console.log("calibrating");

        start=location.getNearestLocationFrom(from).ID;
        end=location.getNearestLocationFrom(to).ID;
        delete from,to;

        if(! (start && end)) return {};

        var results=[];
        if(start!=end){

            //single route checking
            var singles=[];
            for (var i=0;i<_routes.length;i++){
                if(_routes[i].goesThroughLocations(start,end)){
                    console.log("route found");
                    singles.push(_routes[i]);
                }
            }

            if(singles.length>0){
                results.push({type:"single",routes:singles});
            }else{
                //double route checking

                var doubles=[];
                var triples=[];

                var aLocations=utils.getPointsThatGoFrom(start);
                var bLocations=utils.getPointsThatGoFrom(end);

                var intersects=_.intersection(aLocations,bLocations);

                if(intersects.length>0){

                    var aRoutes=utils.getRoutesThatPassThroughPoints(start,intersects[0]);
                    var bRoutes=utils.getRoutesThatPassThroughPoints(end,intersects[0]);


                    var route=({
                        type:"double",
                        first:aRoutes,
                        firstInterval:intersects[0],
                        second:bRoutes
                    });

                    doubles.push(route);
                    results.push(route);

                }

                if(doubles.length>0){
                    results.push(doubles);
                }else{
                    //triple route checking

                }


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
        },
        routes:_routes
    }
})();