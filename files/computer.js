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

var realStart=null;
var realEnd=null;
module.exports=(function(){

    var createRoutesFromPlain=function(ps){
        for(var i=0;i<ps.length;i++){
            _routes.push(new Route_class(ps[i]));
        }
    }

    var getParsingChainItem=function(routes,from,to){

        if(! from) from=start;
        if(! to)to=end;
        var bundle=[];

        //createBundle
        for(var i=0;i<routes.length;i++){
            var route=routes[i];

            var unique=true;
            for(var a=0;a<bundle.length;a++){
                var bRoute=bundle[a][0];

                if(utils.containSameRoute(route,bRoute,from,to)){
                    unique=false;
                    bundle[a].push(route);

                    break;
                }
            }

            if(unique){
                bundle.push([route]);
            }
        };

        //parseBundle
        var ret=[];
        for(var i=0;i<bundle.length;i++){
            var item=bundle[i];

            var data={};

            var places=item[0].getPlacesInBetween(from,to);

            data.locations=utils.formatLocationsFromIDs(places)
            data.type="vehicle";
            data.distance=utils.calculateDistanceFriendly(data.locations)
            data.realDistance=utils.calculateDistance(data.locations)
            data.direction=data.locations[0].name+" -> "+ _.last(data.locations).name;

            data.start=location.getById(from);
            data.end=location.getById(to);

            data.vehicles=[];
            for(var x=0;x<item.length;x++){
                var route=item[x];
                data.vehicles=data.vehicles.concat(route.vehicles);
            }

            for(var x=0;x<data.vehicles.length;x++){
                data.vehicles[x].cost=utils.calculateFareFriendly(data.locations,data.vehicles[x].vType);
                data.vehicles[x].realCost=utils.calculateFare(utils.calculateDistance(data.locations),data.vehicles[x].vType);

                data.vehicles[x].eta=utils.friendlyVehicleETA(
                    utils.calculateDistance(data.locations),
                    data.vehicles[x].vType);

                data.vehicles[x].realEta=utils.vehicleETA(
                    utils.calculateDistance(data.locations),
                    data.vehicles[x].vType);

            }

            ret.push(data);
        }

        return ret;

        var item={"locations":[],"vehicles":[]};

        var places=routes[0].getPlacesInBetween(from,to);

        item.locations=utils.formatLocationsFromIDs(places);
        item.type="vehicle";

        item.distance=utils.calculateDistanceFriendly(item.locations)
        item.realDistance=utils.calculateDistance(item.locations)

        item.start=location.getById(from);
        item.end=location.getById(to);


        for(var i=0;i<routes.length;i++){
            var route=routes[i];
            item.vehicles=item.vehicles.concat(route.vehicles);
        }

        for(var i=0;i<item.vehicles.length;i++){
            item.vehicles[i].cost=utils.calculateFareFriendly(item.locations,item.vehicles[i].vType);
            item.vehicles[i].realCost=utils.calculateFare(utils.calculateDistance(item.locations),item.vehicles[i].vType);

            item.vehicles[i].eta=utils.friendlyVehicleETA(
                utils.calculateDistance(item.locations),
                item.vehicles[i].vType);
            item.vehicles[i].realEta=utils.vehicleETA(
                utils.calculateDistance(item.locations),
                item.vehicles[i].vType);
            item.vehicles[i].direction=item.vehicles[i].name + "to "+ _.last(item.locations).name;

        }

        return item;
    }

    var addWalkingStepsToChain=function(chain){
        if(chain.length<1)return;
        if(chain[0].locations.length<1)return;
        if(_.last(chain).locations.length<1)return;

        var initial={
            "type":"walking",
            direction:"Walk upto "+chain[0].locations[0].name,
            "distance":utils.calculateDistanceFriendly(realStart,chain[0].locations[0]),
            "realDistance":utils.distanceBetween(realStart,chain[0].locations[0]),
            "eta":utils.friendlyWalkingETA(utils.distanceBetween(realStart,chain[0].locations[0])),
            "realEta":utils.walkingETA(utils.distanceBetween(realStart,chain[0].locations[0])),
            cost:"0",
            realCost:0
        }

        var final={
            "type":"walking",
            direction:"Walk from "+_.last( _.last(chain).locations).name,
            "distance":utils.calculateDistanceFriendly(realEnd, _.last( _.last(chain).locations)),
            "realDistance":utils.distanceBetween(realEnd,_.last( _.last(chain).locations)),
            "eta":utils.friendlyWalkingETA(utils.distanceBetween(realEnd,_.last( _.last(chain).locations))),
            "realEta":utils.walkingETA(utils.distanceBetween(realEnd,_.last( _.last(chain).locations))),
            cost:"0",
            realCost:0
        }

        chain.unshift(initial);
        chain.push(final);

        return chain;
    }

    var parseResult=function(result,realFrom,realTo){
        var output=[];
        for(var i=0;i<result.length;i++){

            var item_raw=result[i];

            if(item_raw.type=="single"){
                var items=getParsingChainItem(item_raw.routes);


                for(var x=0;x<items.length;x++){

                    output.push({
                        steps:addWalkingStepsToChain([items[x]]),
                        info:utils.generateChainTitle([items[x]])
                    });
                }

            }else{
                var firsts,seconds,thirds;

                firsts=getParsingChainItem(
                    item_raw.first,
                    start,
                    item_raw.firstInterval);
                if(item_raw.type=="double"){
                    seconds=getParsingChainItem(
                        item_raw.second,
                        item_raw.firstInterval,
                        end);
                }else{
                    seconds=getParsingChainItem(
                        item_raw.second,
                        item_raw.firstInterval,
                        item_raw.secondInterval);

                    thirds=getParsingChainItem(
                        item_raw.third,
                        item_raw.secondInterval,
                        end);
                }

                firsts.forEach(function(first){
                    seconds.forEach(function(second){
                        if(item_raw.type=="double"){
                            output.push({
                                steps:addWalkingStepsToChain([first,second]),
                                info:utils.generateChainTitle([first,second])
                            });
                        }else{
                            thirds.forEach(function(third){
                                output.push({
                                    steps:addWalkingStepsToChain([first,second,third]),
                                    info:utils.generateChainTitle([first,second,third])
                                });
                            })
                        }
                    })
                })

            }
        }


        return output;

    }

    var calibrate=function(from,to){
        console.log("calibrating");

        realStart=from;
        realEnd=to;

        start=location.getNearestLocationFrom(from).ID;
        end=location.getNearestLocationFrom(to).ID;
        delete from,to;

        if(! (start && end)) return {};

        var results=[];
        if(start!=end){

            //single route checking
            var singles=utils.getRoutesThatPassThroughPoints(start,end)

            if(singles.length>0){
                results.push({type:"single",routes:singles});
            }else{
                //double route checking

                var doubles=[];

                var aLocations=utils.getPointsThatGoFrom(start);
                var bLocations=utils.getPointsThatGoFrom(end);

                var intersects=_.intersection(aLocations,bLocations);

                if(intersects.length>0){

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



                    for(var i=0;i<uniqueIntersects.length;i++){
                        var aRoutes=uniqueIntersects[i].initial;
                        var bRoutes=uniqueIntersects[i].final;

                        var route=({
                            type:"double",
                            first:aRoutes,
                            firstInterval:uniqueIntersects[i].intersects[0],
                            second:bRoutes
                        });

                        doubles.push(route);
                        results.push(route);
                    }
                }

                if(doubles.length>0){
//                    results.push(doubles);
                }else{
                    //triple route checking
                    for(var i=0;i<aLocations.length;i++){
                        var aTransition=aLocations[i];

                        if(aTransition==start)continue;

                        var atLocations=utils.getPointsThatGoFrom(aTransition);
                        var intersects=_.intersection(atLocations,bLocations);

                        if(intersects.length>0){
                            var aRoutes=utils.getRoutesThatPassThroughPoints(start,aTransition);
                            var atRoutes=utils.getRoutesThatPassThroughPoints(aTransition,intersects[0]);
                            var bRoutes=utils.getRoutesThatPassThroughPoints(end,intersects[0]);


                            var route=({
                                type:"triple",
                                first:aRoutes,
                                firstInterval:aTransition,
                                second:atRoutes,
                                secondInterval:intersects[0],
                                third:bRoutes
                            });

//                            doubles.push(route);
                            results.push(route);
                            break;
                        }


                    }
                }

            }
        }else{
            //start and end places are the same. The user has to walk. Sorry user, the destination is nearby!
            return {};
        }

        var parse= parseResult(results);
        console.log("calibration complete");
        return parse;
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