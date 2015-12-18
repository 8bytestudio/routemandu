/**
 * Created by damo on 12/6/15.
 */
var express=require("express");
var config=require("../config");
var bodyParser=require("body-parser");
var mysqlHandler=require("./mysqlHandler");
var fs=require("fs");
var nodemailer = require('nodemailer');

var app=express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

module.exports=(function(){
    var sendEmail=function(msg){
        var transporter = nodemailer.createTransport();

        var mailOptions = {
            from: 'Backend Support ✔ <backend@8bytestudio.com>', // sender address
            to: 'hi@8bytestudio.com', // list of receivers
            subject: 'Hello fuckers', // Subject line
            text: msg, // plaintext body
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }

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

            fs.appendFile('output/eta.txt', elapsed +'\n', function (err) {
                if(err) {
                    return console.log(err);
                }
            });

            fs.appendFile("output/data-usage.txt",JSON.stringify(result).length+"\n",function(err){
                if(err){
                    return console.log(err);
                }

                console.log("success");
            })

            res.send(result);
        });

        app.post('/feedback',function(req,res){
            var data=req.body;
            mysqlHandler.saveFeedback(data).then(function(data){
                res.send(data);
            },function(data){
                res.send(data);
            })

            sendEmail(req.body);
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

        app.get("/stats",function(req,res){

            var output={};

            //elapsed time
            fs.readFile('output/eta.txt', 'utf8', function (err,data) {
                if (err) {
                    return console.log(err,"error");
                }

                //elapsed time namespace
                (function(){
                    data=data.replace("\n"," ").replace("\n","").split(" ");
                    var sum=0;
                    var count=0;

                    data.forEach(function(d){
                        if(! d)return;
                        d=parseInt(d);
                        if(! d) return;

                        count ++;
                        sum += d;
                    })

                    output.elapsed={
                        sum:sum,
                        count:count,
                        avg:sum/count,
                    };
                })();


                fs.readFile('output/data-usage.txt', 'utf8', function (err,data) {
                    if (err) {
                        return console.log(err, "error");
                    }

                    (function(){
                        data=data.split("\n");

                        var sum=0;
                        var count=0;

                        data.forEach(function(d){
                            if(! d)return;
                            d=parseInt(d.trim());
                            if(! d) return;

                            count++;
                            sum += d;
                        })

                        output.usage={
                            sum:sum,
                            count:count,
                            avg:sum/count,
                        };

                    })();


                    res.send(output);
                })


            });
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