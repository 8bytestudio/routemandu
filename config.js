/**
 * Created by damo on 12/6/15.
 */
module.exports={
    //the file to save the queries imported from MySQL on.
    //Will be removed later on, because we will be directly placing data
    //on the neo4j server;
    mysql:{//mysql configuration
        host:"localhost",
        db:"mapsnew",
        username:"root",
        password:"root",
    },

    //to convert latitude and longitude to kilometers
    coordToKmFactor:5,

    routemaxlength:100,

    //id from mysql vehicleTypes table
    ID_SMALL_MICRO:1,
    ID_BUS:3,
    ID_TEMPO:4,
    ID_BIG_MICRO:5,


}