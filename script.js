// create references and variables
var addressInputEle = $('#userAddress')
var federalOfficialsMenu = $('#federalOfficials')
var stateOfficialsMenu = $('#stateOfficials')
var localOfficialsMenu = $('#localOfficials')
var federal = []
var state = []
var local = []
var offices;

// Ajax request to Google Civic Info
function getOfficials(address) {
    var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAY3D8Rvr86w2k066vbIV1mpziRwWCO2kc&address="
    queryURL += address

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var offices = response.offices
        var officials = response.officials
        for (let i = 0; i < offices.length; i++) {
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
        addOfficialButtons(federal, state, local)
    })
}

// function adds officials to dropdown menus
function addOfficialButtons(federalArr, stateArr, localArr) {
    // empty out current dropdown menus when user submits new location
    federalOfficialsMenu.empty()
    stateOfficialsMenu.empty()
    localOfficialsMenu.empty()
    // create disabled select buttons for each dropdown menu
    federalOfficialsMenu.html('<option disabled selected>Federal Officials</option>')
    stateOfficialsMenu.html('<option disabled selected>State Officials</option>')
    localOfficialsMenu.html('<option disabled selected>Local Officials</option>')

    // for each federal official
    federalArr.forEach(function (official) {
        // create a new option element
        var newOfficialBtn = $('<option>')
        // store the name of the current official
        var officialName = official.name
        // change option text to official's name
        newOfficialBtn.text(officialName)
        // apend option to it's dropdown menu
        federalOfficialsMenu.append(newOfficialBtn)
    })
    // for each state official
    stateArr.forEach(function (official) {
        // create a new option element
        var newOfficialBtn = $('<option>')
        // store the name of the current official
        var officialName = official.name
        newOfficialBtn.text(officialName)
        // apend option to it's dropdown menu
        stateOfficialsMenu.append(newOfficialBtn)
    })
    // for each local official
    localArr.forEach(function (official) {
        // create a new option element
        var newOfficialBtn = $('<option>')
        // store the name of the current official
        var officialName = official.name
        // change option text to official's name
        newOfficialBtn.text(officialName)
        // apend option to it's dropdown menu
        localOfficialsMenu.append(newOfficialBtn)
    })
}

// retrieve elected officials for location when user click's submit
$('#submitBtn').on('click', function (event) {
    event.preventDefault()
    // get user input
    var userAddress = addressInputEle.val()
    // get user's elected officials
    getOfficials(userAddress)
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
