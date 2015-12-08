var Q=require("q");

var config=require("../config");
var location=require("./location");
var mysqlHandler=require("./mysqlHandler");

module.exports=(function(){

    return {
        fetch:function(){
            return Q.Promise(function(resolve){
                mysqlHandler.fetchRoutes().then(function(raw){

                    location.init(raw.locations);


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

                })

            })

        }
    }
})();