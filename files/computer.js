/**
 * Created by damo on 12/3/15.
 */


var location=require("./location");
var server=require("./server");
var Route_class=require("./route_class");
var _routes=[];

module.exports=(function(){

    var createRoutesFromPlain=function(ps){
        console.log("creating routes");

        for(var i=0;i<ps.length;i++){
            _routes.push(new Route_class(ps[i]));
        }
    }

    var parseResult=function(result){
        var response=[];
        for(var i=0;i<result.length;i++){

        }

        for(var i=0;i<result.length;i++){

        }

        for(var i=0;i<result.length;i++){

        }
    }

    var calibrate=function(from,to){
        console.log("calibrating");

        var start=location.getNearestLocationFrom(from).ID;
        var end=location.getNearestLocationFrom(to).ID;
        delete from,to;

        if(! (start && end)) return {};

        var results={
            "s":[],
            "d":[],
            "t":[]
        };
        if(start!=end){
            for (var i=0;i<_routes.length;i++){
                console.log(_routes[i]);
                console.log("working");
                if(_routes[i].goesThroughLocations(start,end)){

                    results.s.push(_routes[i]);
                }else{
//                    console.log("not found");
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
//            console.log("init done");
        },
        getResultJson:function(from,to){
            return calibrate(from,to);
        }
    }
})();