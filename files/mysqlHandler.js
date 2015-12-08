/**
 * Created by damo on 12/8/15.
 */
var mysql=require("mysql");
var config=require("../config");
var Q=require("q");

var connection=mysql.createConnection({
    host:config.mysql.host,
    user:config.mysql.username,
    password:config.mysql.password,
    database:config.mysql.db
});

module.exports=(function(){


    return {
        fetchRoutes:function() {
            return Q.Promise(function (resolve,reject) {
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

                    connection.query("SELECT " +
                        "vehicle.ID as ID," +
                        "vehicle.name as name," +
                        "vehicle.routeID as routeID," +
                        "vehicletype.name as vType, " +
                        "vehicletype.ID as vTypeID " +
                        "from vehicle inner join vehicletype on vehicle.typeID=vehicletype.ID", function (err, rows, fields) {
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
        },
        saveFeedback:function(msg){
            return Q.Promise(function(resolve,reject){
                console.log("saving");
                var data={
                    data:JSON.stringify(msg)
                }


                var query=connection.query('INSERT INTO feedback SET ?', data, function(err, result) {
                    console.log("saved",data);
                    console.log(err);
                    if (err) {

                        reject(err);
                        return;
                    }
                    console.log(result);

                    resolve({
                        code:0,
                        msg:"Success!",
                        detail:"Thank you for your feedback!"
                    });
                });

                console.log(query.sql,"query");
            })
        }
    }
})();