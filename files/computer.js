/**
 * Created by damo on 12/3/15.
 */


var location=require("./location");
var server=require("./server");
var utils=require("./utils");
var config=require("../config");
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

                data.vehicles[x].direction= _.last(data.locations).name+" on "+data.vehicles[x].name;
            }

            ret.push(data);
        }

        return ret;
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
            locations:[realStart,chain[0].locations[0]],
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
            realCost:0,
            locations:[_.last( _.last(chain).locations),realEnd]
        }

        chain.unshift(initial);
        chain.push(final);

        return chain;
    }
    var addColorsToChain=function(chain){
        for(var i=0;i<chain.length;i++){
            chain[i].color=config.routeColors[i];
        }

        return chain;
    }

    var createFinalRouteData=function(chain){
        var data= {
            steps:chain,
            info:utils.generateChainTitle(chain),
            zoom:[{},{}]
        }

        var aLat=10000,aLng=100000,bLat=1,bLng=1;//a minimum, b maximum

        for(var i=0;i<chain.length;i++){
            for(var x=0;x<chain[i].locations.length;x++){
                var location=chain[i].locations[x];

                if(aLat>location.latitude)aLat=location.latitude;
                if(bLat<location.latitude)bLat=location.latitude;

                if(aLng>location.longitude)aLng=location.longitude;
                if(bLng<location.longitude)bLng=location.longitude;
            }
        }

        data.zoom=[
            {latitude:aLat,longitude:aLng},
            {latitude:bLat,longitude:bLng}
        ]

        data.steps.forEach(function(step){
            var aLat=10000,aLng=100000,bLat=1,bLng=1;//a minimum, b maximum

            for(var x=0;x<step.locations.length;x++){
                var location=step.locations[x];

                if(aLat>location.latitude)aLat=location.latitude;
                if(bLat<location.latitude)bLat=location.latitude;

                if(aLng>location.longitude)aLng=location.longitude;
                if(bLng<location.longitude)bLng=location.longitude;
            }

            step.zoom=[
                {latitude:aLat,longitude:aLng},
                {latitude:bLat,longitude:bLng}
            ]

        })

        data.availability={
            from:5*60,
            to:(8+12)*60
        }
        data.type=data.steps.length-2;
        data.availability.info="From 5 AM to 8 PM";
        return data;

    }
    var parseResult=function(result,realFrom,realTo){
        var output=[];
        for(var i=0;i<result.length;i++){

            var item_raw=result[i];

            if(item_raw.type=="single"){
                var items=getParsingChainItem(item_raw.routes);

                for(var x=0;x<items.length;x++){

                    output.push(
                        createFinalRouteData(
                            addColorsToChain(
                                addWalkingStepsToChain([items[x]]))));
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
                            output.push(createFinalRouteData(addColorsToChain(addWalkingStepsToChain([first,second]))));

                        }else{
                            thirds.forEach(function(third){
                                output.push(
                                    createFinalRouteData(
                                        addColorsToChain(
                                            addWalkingStepsToChain([first,second,third]))));
                            })
                        }
                    })
                })

            }
        }

        return utils.sortRoutesByDistance(
            utils.removeUnnecessaryInfo(output));

    }

    var calibrate=function(from,to){
        console.log("calibrating");

        realStart=from;
        realEnd=to;

        start=location.getNearestLocationFrom(from).ID;
        end=location.getNearestLocationFrom(to).ID;
        delete from,to;

        if(! (start && end)) return [];

        var results=[];
        if(start==end) return [];
        //single route checking
        var singles=utils.getRoutesThatPassThroughPoints(start,end)

        if(singles.length>0){
            results.push({type:"single",routes:singles});
        }else {



            //double route checking

            var doubles = [];

            var aLocations = utils.getPointsThatGoFrom(start);
            var bLocations = utils.getPointsThatGoFrom(end);

            var intersects = _.intersection(aLocations, bLocations);

            if (intersects.length > 0) {

                var uniqueIntersects = utils.getUniqueIntersects(start, end, intersects);

                for (var i = 0; i < uniqueIntersects.length; i++) {
                    var aRoutes = uniqueIntersects[i].initial;
                    var bRoutes = uniqueIntersects[i].final;

                    var route = ({
                        type: "double",
                        first: aRoutes,
                        firstInterval: uniqueIntersects[i].intersects[0],
                        second: bRoutes
                    });

                    doubles.push(route);
                    results.push(route);
                }
            }

            if (singles.length > 0 || doubles.length > 0) {
//                    results.push(doubles);
            } else {
                //triple route checking
                for (var i = 0; i < aLocations.length; i++) {
                    var aTransition = aLocations[i];

                    if (aTransition == start)continue;

                    var atLocations = utils.getPointsThatGoFrom(aTransition);
                    var intersects = _.intersection(atLocations, bLocations);

                    if (intersects.length > 0) {

                        //third routes calculator.Kept in a separate namespace to alter scope.
                        (function () {
                            var uniqueIntersects = utils.getUniqueIntersects(aTransition, end, intersects);

                            for (var i = 0; i < uniqueIntersects.length; i++) {
                                var atRoutes = uniqueIntersects[i].initial;
                                var bRoutes = uniqueIntersects[i].final;

                                var atARoutes = uniqueIntersects[i].initial;
                                var bRoutes = uniqueIntersects[i].final;

                                if (start == aTransition)continue;


                                var route = ({
                                    type: "triple",
                                    first: utils.getRoutesThatPassThroughPoints(start, aTransition),
                                    firstInterval: aTransition,
                                    second: atRoutes,
                                    secondInterval: uniqueIntersects[i].intersects[0],
                                    third: bRoutes
                                });
                                results.push(route);
                            }
                        })();

//                        var aRoutes=utils.getRoutesThatPassThroughPoints(start,aTransition);
//                        var atRoutes=utils.getRoutesThatPassThroughPoints(aTransition,intersects[0]);
//                        var bRoutes=utils.getRoutesThatPassThroughPoints(end,intersects[0]);
//
//                        var route=({
//                            type:"triple",
//                            first:aRoutes,
//                            firstInterval:aTransition,
//                            second:atRoutes,
//                            secondInterval:intersects[0],
//                            third:bRoutes
//                        });

//                            doubles.push(route);
//                        results.push(route);
                    }
                }
            }
        }

        results=utils.removeDuplicateRotues(results,start,end);

        console.log(results);
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