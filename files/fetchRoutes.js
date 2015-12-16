var Q=require("q");

var config=require("../config");
var location=require("./location");
var mysqlHandler=require("./mysqlHandler");
var utils=require("./utils");
var _=require("underscore");

module.exports=(function(){

    return {
        fetch:function(){
            return Q.Promise(function(resolve){
                mysqlHandler.fetchRoutes().then(function(raw){

                    location.init(raw.locations);

                    for(var i=0;i<raw.vehicles.length;i++){
                        var v=raw.vehicles[i];

                        try{
                            v.desc= _.unescape(v.desc)
                            v.data= JSON.parse(v.desc)
                            v.desc= v.data.desc || "";
                        }catch(err){
                            v.data={};
                        }
                    };

                    var routes=[];

                    for(var i=0;i<raw.routes.length;i++){
//                        if(i!=2)continue;
                        var route=raw.routes[i];
                        route.locations=new Array(config.routemaxlength);
                        route.vehicles=[];

                        for(var j=0;j<raw.route_locations.length;j++){
                            if(raw.route_locations[j].routeID==route.ID){
                                route.locations[raw.route_locations[j].orderID-1]=raw.route_locations[j].locationID;
                            }
                        }

                        route.locations=route.locations.filter(function(n){return n;});

                        route.locations.splice(-1,1);

                        for(var j=0;j<raw.vehicles.length;j++){

                            if(raw.vehicles[j].routeID == route.ID){
                                route.vehicles.push(raw.vehicles[j]);
                            }
                        }



                        routes.push(route);
                    }


                    resolve(routes);

                },function(e){
                    console.log("error getting data from mysql db");
                    console.log(e);
                })

            })

        }
    }
})();