var Q=require("q");
Q.longStackSupport=true;

var fetcher=require("./fetchRoutes");
var computer=require("./computer");

module.exports=(function(){
    var initialize=function(){
        return Q.Promise(function(resolve){
            fetcher.fetch().then(function(routes){
                computer.init(routes);

                console.log("end init");

                resolve();
            })

        });

    };


    return {
        serve:function(){
            console.log("initializing");
            initialize().then(function(){
                console.log("init done");

                computer.calibrate(
                    {lat:27.6317558289,lng:85.3175048828},
                    {lat:27.6451377869,lng:85.3193969727});

            });


        }
    }
})();