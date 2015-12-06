/**
 * Created by damo on 12/6/15.
 */
var express=require("express");
var app=express();

module.exports=(function(){
    var run=function(){
        var computer=require("./computer");

        app.get('/', function (req, res) {
//            res.send('Hello World!');

            var start={
                from:parseFloat(req.query.fromLat),
                to:parseFloat(req.query.fromLng)
            };
            var end={
                from:parseFloat(req.query.toLat),
                to:parseFloat(req.query.toLng)
            };

            var result=computer.getResultJson(start,end);
            res.send(result);
        });

        var server = app.listen(3000, function () {
            var host = server.address().address;
            var port = server.address().port;

            console.log('Example app listening at http://%s:%s', host, port);

        });
    }
    return {
        init:function(){
            run();
        }
    }
})();