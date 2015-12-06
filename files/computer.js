/**
 * Created by damo on 12/3/15.
 */

var location=require("./location");

module.exports=(function(){
    var Route_class=require("./route_class");

    var _routes=[];

    var createRoutesFromPlain=function(ps){
        console.log("creating routes");

        for(var i=0;i<ps.length;i++){
            _routes.push(new Route_class(ps[i]));
        }

        console.log("routes created");
    }
    return {
        init:function(plainRoutes){
            createRoutesFromPlain(plainRoutes);
        },
        work:function(){
            console.log("working");

        }
    }
})();