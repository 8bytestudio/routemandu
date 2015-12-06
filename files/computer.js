/**
 * Created by damo on 12/3/15.
 */

var location=require("./location");
var server=require("./server");
module.exports=(function(){
    var Route_class=require("./route_class");

    var _routes=[];

    var createRoutesFromPlain=function(ps){
        console.log("creating routes");

        for(var i=0;i<ps.length;i++){
            _routes.push(new Route_class(ps[i]));
        }

    }

    var calibrate=function(from,to){
        console.log("calibrating");

        return {"HI":"HELLO"};
    }
    return {
        init:function(plainRoutes){
            createRoutesFromPlain(plainRoutes);
            server.init();
            console.log("init done");
        },
        getResultJson:function(from,to){
            return calibrate(from,to);
        }
    }
})();