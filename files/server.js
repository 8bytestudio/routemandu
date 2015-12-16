/**
 * Created by damo on 12/6/15.
 */
var express=require("express");
var config=require("../config");
var bodyParser=require("body-parser");
var mysqlHandler=require("./mysqlHandler");
var fs=require("fs");

var app=express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

module.exports=(function(){
    var run=function(){
        var computer=require("./computer");

        app.get('/', function (req, res) {
            var start={
                latitude:parseFloat(req.query.fromLat),
                longitude:parseFloat(req.query.fromLng)
            };
            var end={
                latitude:parseFloat(req.query.toLat),
                longitude:parseFloat(req.query.toLng)
            };

            var beginTime=new Date();
            var result=computer.getResultJson(start,end);
            var endTime=new Date();

            var elapsed=endTime-beginTime;
            if(result.length>0){
                result.forEach(function(route){
                    route.elapsed=elapsed;
                })
            }

            fs.appendFile('output/eta.txt', elapsed +' \n', function (err) {
                if(err) {
                    return console.log(err);
                }

//                console.log("The file was saved!");
            });

            res.send(result);
        });

        app.post('/feedback',function(req,res){
            var data=req.body;
            mysqlHandler.saveFeedback(data).then(function(data){
                res.send(data);
            },function(data){
                res.send(data);
            })
        });

        app.get('/feedback/show',function(req,res){
            var output="<html><head><title>Feedbacks</title></head><body>" +
                "<table width='100%' align='center'><tr><th>ID</th><th>Date</th><th>Message</th></tr>";


            mysqlHandler.getFeedbacks().then(function(data){
                for(var i=0;i<data.length;i++){
                    output += "<tr align='center'><td>"+data[i].ID+"</td><td>"+data[i].timestamp+"</td><td colspan=2>"+data[i].data+"</td></tr>";
                }

                output += "</table></body></html>";

                res.send(output);
            })

        })

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