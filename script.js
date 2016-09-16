$(document).ready(function() {
  APP.formListener();
  APP.getBreeds();
  APP.updatePuppies();
})

var APP = APP || {};

APP.updatePuppies = function(){
  $("#refresh").on("click", APP.getPuppies);
};

APP.getPuppies = function(e){
  e.preventDefault();
  $.ajax("https://ajax-puppies.herokuapp.com/puppies.json",
        {type: "GET",
         async: true,
         dataType: "json",
         success: APP.getPuppiesSuccess,
         error: APP.getPuppiesError
  });
};

APP.getPuppiesSuccess = function(object){
  console.log('hello');
  var list = $('#puppy-list');
  list.html('');
  object.forEach(function(puppy){
    newPuppy = APP.buildPuppyItem(puppy);
    list.append(newPuppy);
    newPuppy.append("<a href='#' class='adopt-link'>Adopt Me!</a>")
  })
};

APP.getCreatedDistance = function(puppy) {
  var created = new Date(puppy.created_at);
  var distance = new Date() - created;
  return Math.floor(distance/60000)
};

APP.buildPuppyItem = function(puppy) {
  var distance = APP.getCreatedDistance(puppy);
  var text = puppy.name + " (" + puppy.breed.name + ") " + "created " + distance + " minutes ago";
  return $("<li>").text(text);
};

APP.getBreeds = function() {
  $.ajax("https://ajax-puppies.herokuapp.com/breeds.json",
        {type: "GET",
         async: true,
         dataType: "json",
         success: APP.getBreedsSuccess,
         error: APP.getBreedsError
  });
};

APP.getBreedsSuccess = function(data) {
  data.forEach(function(breed) {
    var option = $("<option>");
    option.text(breed.name);
    option.attr('value', breed.id);
    $('#breeds').append(option);
  })
};

APP.formListener = function() {
  $('#submit-form').on('click', APP.buildPuppy);
};

APP.buildPuppy = function(e) {
  e.preventDefault();
  var name = $('#name').val();
  $('#name').val('');
  var breed = $('#breeds').find(":selected").val();
  var breedName = $('#breeds').find(":selected").text();
  $('#breeds').val('');
  $.ajax("https://ajax-puppies.herokuapp.com/puppies.json",
        {type: "POST",
         async: true,
         dataType: "json",
         data: JSON.stringify({name: name, breed_id: breed}),
         success: function(puppy) {
           APP.buildPuppiesSuccess(puppy, breedName)
         },
         error: APP.buildPuppiesError,
         contentType: 'application/json'
  });
};

APP.buildPuppiesSuccess = function(puppy, breedName) {
  puppy.breed = {name: breedName}
  var puppyItem = APP.buildPuppyItem(puppy);
  $('#puppy-list').prepend(puppyItem);
};
