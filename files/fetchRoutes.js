module.exports=(function(){
    var fetchRoutes=function(){

    }

    return {
        fetch:function(){
            return Q.promise(function(resolve){
                fetchRoutes().then(function(){


                    resolve();

                })

            })

        }
    }
})();