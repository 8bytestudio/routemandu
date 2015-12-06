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
}

module.exports=Route_Class;