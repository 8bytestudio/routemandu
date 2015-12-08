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
                latitude:parseFloat(req.query.fromLat),
                longitude:parseFloat(req.query.fromLng)
            };
            var end={
                latitude:parseFloat(req.query.toLat),
                longitude:parseFloat(req.query.toLng)
            };

            var begin=new Date();
            var result=computer.getResultJson(start,end);
            var end=new Date();

//            res.send({
//                elapsed:end-begin,
//                result:result
//            });
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