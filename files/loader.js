var Q=require("q");


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


                computer.work();
            })

        }
    }
})();