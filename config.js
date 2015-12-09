/**
 * Created by damo on 12/6/15.
 */
module.exports={
    //the file to save the queries imported from MySQL on.
    //Will be removed later on, because we will be directly placing data
    //on the neo4j server;
    mysql:{//mysql configuration
        host:"localhost",
        db:"routemandu",
        username:"sails",
        password:"thisisapassword"
    },

    //to convert latitude and longitude to kilometers
    coordToKmFactor:111.111,

    //fare per distance cost
    fareConstant:2,

    minFare:15,

    vehicleAvgSpeed:16,
    walkingAvgSpeed:8,

    routemaxlength:200,

    //id from mysql vehicleTypes table
    ID_SMALL_MICRO:1,
    ID_BUS:3,
    ID_TEMPO:4,
    ID_BIG_MICRO:5,

    port:10002,

    routeColors:["#4183D7", "#03C9A9", "#F9690E", "#F9BF3B", "#2980b9", "#f1c40f", "#34495e"]

}

