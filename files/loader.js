var Q=require("q");
var _=require("underscore");

var fetcher=require("./fetchRoutes");
var computer=require("./computer");


module.exports=(function(){
	var initialize=function(){
        return Q.Promise(function(resolve){
            fetcher.fetch().then(function(routes){
                computer.init(routes);

                resolve();
            })

        });

	};


	return {
        serve:function(){
            initialize().then(function(){
                computer.work();
            })

        }
    }
})();