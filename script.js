
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
    console.log(federal, state, local);
})


// repBtn is a placeholder for the buttons created under each dropdown. Replace it with whatever setting will capture those. repPic.attr needs to be tied back to the correct variable based on how the buttons are generating info. Needs to be made into a function.
function clickRep(){
    repBtn.click(function(){
        var repPic = $("<img src = '' alt = 'Picture of Representative'>");
        repPic.attr("src", ${response.officials[i].photoUrl});
        $('.main').append(repPic);
    })
    };

// Twitter info request, when ready, copy this into click event for elected official and build out the display functionality in the part of the ajax reqeuest after function (tweets). Replace 'response' in URL below with necessary reference to the google electeds' api response. 
// var twitterSettings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": `https://e1yr-twitfeed-v1.p.rapidapi.com/feed.api?id=${response.officials[i].channels[1].id}`,
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "e1yr-twitfeed-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "321fc84846msh233ba135d69274fp1b3f3bjsnb87b309afa99"
// 	}
// };

// $.ajax(twitterSettings).done(function (tweets) {
// 	console.log(tweets); 
// Use console log to get needed elements. CODE TO DISPLAY INFO ON PAGE GOES HERE
// });