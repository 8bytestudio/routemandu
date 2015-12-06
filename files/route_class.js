/**
 * Created by damo on 12/3/15.
 */
var Route_Class=function(route){
    this.locations=route.locations;
    this.id=route.ID;
}

Route_Class.prototype.goesThroughLocation=function(object){
    if(! object)return;

    if(! object.id)object=location.getById(id);

    return this.locations.indexOf(object) >= 0;
}

Route_Class.prototype.goesThroughLocations=function(){
    //convert all locations to IDs
    for(var i=0;i<arguments.length;i++){
        if(arguments[i] instanceof Object)
            arguments[i]=arguments[i].ID;
    }

    //check for each of them to exist in the route
    for(var i=0;i<arguments.length;i++){
        if( this.locations.indexOf(arguments[i]) < 0 )
            return false;
    }

    return true;
}

//This uses the following method:
//First get all possible methods
//Return the shortest distance between two points
Route_Class.prototype.getPlacesInBetween=function(a,b){

}

module.exports=Route_Class;