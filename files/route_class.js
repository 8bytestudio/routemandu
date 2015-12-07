/**
 * Created by damo on 12/3/15.
 */
var utils=require("./utils");

var Route_Class=function(route){
    this.locations=route.locations;
    this.id=route.ID;
    this.vehicles=route.vehicles;
}

Route_Class.prototype.locations=[];
Route_Class.prototype.vehicles=[];
Route_Class.prototype.id=0;
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

Route_Class.prototype.indexesOf=function(point){
    var answers=[];
    for(var i=0;i<this.locations.length;i++){
        if(this.locations[i]==point)answers.push(i);
    }

    return answers;
}

//This uses the following method:
//First get all possible methods
//Return the shortest distance between two points
Route_Class.prototype.getPlacesInBetween=function(a,b){
    var aIndexes=this.indexesOf(a);
    var bIndexes=this.indexesOf(b);

    var permutations=[];

    for(var i=0;i<aIndexes.length;i++){
        for(var j=0;j<bIndexes.length;j++){
            distance=Route_Class.prototype.getDistanceBetweenIndexes(aIndexes[i],bIndexes[j]);

            permutations.push({
                "a":aIndexes[i],
                "b":bIndexes[j],
                distance:distance
            });
        }
    }

    var shortestDistance=10000000000000000;
    var shortestPermutation=null;
    for(var i=0;i<permutations.length;i++){
        if(permutations[i].distance<shortestDistance){
            shortestDistance=permutations[i].distance;
            shortestPermutation=permutations[i];
        }
    }

    return this.getPlacesInBetweenIndexes(shortestPermutation.a,shortestPermutation.b);
}


Route_Class.prototype.getPlacesInBetweenIndexes=function(a,b){
    var result=[];

//    console.log(this.locations);
//    console.log(this.id);
//    console.log(this);

    if(b<a){
        result= this.locations.slice(a,this.locations.length);
        result= result.concat( this.locations.slice(0,b+1) );
    }else if(b>a){

        result=(this.locations.slice(a,b+1));
    }

    return result;
}

Route_Class.prototype.getDistanceBetweenIndexes=function(a,b){
//    console.log(this);
    var places=this.getPlacesInBetweenIndexes(a,b);


    var distance=0;
    for(var i=0;i<places.length-2;i++){
        distance +=utils.distanceBetween(places[i],places[i+1]);
    }

    return distance;
}

module.exports=Route_Class;