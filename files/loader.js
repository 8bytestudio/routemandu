var Q=require("q");


var fetcher=require("./fetchRoutes");
var computer=require("./computer");

module.exports=(function(){
    var initialize=function(){
        return Q.Promise(function(resolve){
            console.log("begin init");

            console.log("fetching");
            fetcher.fetch().then(function(routes){
                computer.init(routes);

                console.log("end init");
            })

        });

    };


    return {
        serve:function(){
            console.log("initializing");
            initialize().then(function(){
                console.log("initializing done");

                computer.work();
            })

        }
    }
})();