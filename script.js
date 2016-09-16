$(document).ready(function(){

})

var APP = APP || {};

APP.updatePuppies = function(){
  $("#refresh").on("click", APP.getPuppies);
}

APP.getPuppies = function(e){
  e.preventDefault();
  $.ajax("https://ajax-puppies.herokuapp.com/puppies.json",
        {type: "GET",
         async: true,
         dataType: "json",
         success: APP.getPuppiesSuccess,
         error: APP.getPuppiesError
  });
}

APP.getPuppiesSuccess = function(json){
  json.forEach(function(puppy){
    var text = puppy.name + " (" + puppy.breed.name + ") " + "created ... minutes ago --";
    var newPuppy = $("<li>")
  })
}