var Q=require("q");
var mysql=require("mysql");
var config=require("../config");
var location=require("./location");

var connection=mysql.createConnection({
    host:config.mysql.host,
    user:config.mysql.username,
    password:config.mysql.password,
    database:config.mysql.db
});

module.exports=(function(){
    var fetchRoutes=function() {
        return Q.Promise(function (resolve) {
            var locations = [];
            var vehicles = [];
            var roadways = [];
            var routes = [];
            var route_locations = [];

            connection.connect();

            connection.query("SELECT * from location", function (err, rows, fields) {
                if (err) {
                    reject(err);
                    return;
                }

                locations = locations.concat(rows);

                connection.query("SELECT vehicle.ID as ID,vehicle.name as name,vehicle.routeID as routeID,vehicletype.name as vType from vehicle inner join vehicletype on vehicle.typeID=vehicletype.ID", function (err, rows, fields) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    vehicles = vehicles.concat(rows);


                    connection.query("SELECT * from route", function (err, rows, fields) {
                        if (err) {
                            reject(err);
                            return;
                        }

                        routes = rows;

                        connection.query("SELECT * from route_location", function (err, rows, fields) {
                            if (err) {
                                reject(err);
                                return;
                            }

                            route_locations = rows;

                            connection.end();

                            resolve({
                                locations: locations,
                                routes: routes,
                                vehicles: vehicles,
                                route_locations: route_locations
                            });
                        });
                    });

                });
            })
        })
    }

    return {
        fetch:function(){
            return Q.Promise(function(resolve){
                fetchRoutes().then(function(raw){

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