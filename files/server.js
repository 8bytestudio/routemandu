/**
 * Created by damo on 12/6/15.
 */
var express=require("express");
var app=express();
var config=require("../config");
module.exports=(function(){
    var run=function(){
        var computer=require("./computer");

        app.get('/', function (req, res) {
//            res.send('Hello World!');

            var start={
                lat:parseFloat(req.query.fromLat),
                lng:parseFloat(req.query.fromLng)
            };
            var end={
                lat:parseFloat(req.query.toLat),
                lng:parseFloat(req.query.toLng)
            };

            var result=computer.getResultJson(start,end);
            res.send(result);
        });

        var server = app.listen(config.port, function () {
            var host = server.address().address;
            var port = server.address().port;

            console.log('Routemandu running at http://%s:%s', host, port);

        });
    }
    return {
        init:function(){
            run();
        }
    }
})();