
// Ajax request to Google Civic Info
var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAY3D8Rvr86w2k066vbIV1mpziRwWCO2kc&address=3121 franklin ave e seattle wa"
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
})