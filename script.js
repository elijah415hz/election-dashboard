
// Ajax request to Google Civic Info
var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAY3D8Rvr86w2k066vbIV1mpziRwWCO2kc&address=267 w 70th st new york new york"
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    var offices = response.offices
    var officials = response.officials
    var federal = []
    var state = []
    var local = []
    for (let i=0; i<offices.length; i++) {
        var level = offices[i].levels[0]
        console.log(level);
        switch (level) { 
        case "country":
            federal.push(officials[i])
            break;
        case "administrativeArea1":
            state.push(officials[i])
            break;
        case "administrativeArea2":
        case "locality":
            local.push(officials[i])
            break;
        }
    }
})