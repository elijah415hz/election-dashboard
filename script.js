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
    federal = []
    state = []
    local = []
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

// repBtn is a placeholder for the buttons created under each dropdown. Replace it with whatever setting will capture those. 

// I've used federal[0] as a placeholder in the information displays, as I'm not sure how we reference the correct array. If statement for each dropdown?
function clickRep() {
    // When user chooses a representative:
    repBtn.click(function () {
        // Clear out anything currently appended to the main display div
        $('.main').empty();
        // create an img tag
        var repPic = $("<img src = '' alt = 'Picture of Representative'>");
        // Grab the img URL from the API object, if it exists
        repPic.attr("src", federal[0].photoUrl);
        // Display the image on the page
        $('.main').append(repPic);
        // Create a div to hold info about the rep
        var repInfo = $("<div>");
        // Insert information from API object:
        repInfo.html(
            `<p>Name: ${federal[0].name}</p>
            <p>Party: ${federal[0].party}</p>
            <p>Phone: ${federal[0].phones[0]}</p>
            <p>Address: ${federal[0].address[0].line1}, ${federal[0].address[0].city}, ${federal[0].address[0].state}, ${federal[0].address[0].zip}</p>
            <p>Website: ${federal[0].urls[0]}</p>`
        );
        // Display info on the page
        $('.main').append(repInfo);

    })
};


// This function will search the NY Times for news about the official in question. Replace Inslee in the URL with a reference variable to the rep's name once we have it.
function getNews() {
    $.ajax({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Inslee&api-key=IWE6hnGq7VzMyE3QxJe363KNU2gJmwbY",
        method: "GET"
    }).then(function (stories) {
        // Creates a div to hold the news stories and displays it on the page.
        var newsHolder = $("<div>");
        $(".main").append(newsHolder);

        // For each story up to 5, creates a P tag and displays it on the page.
        for (var i = 0; i < 5; i++) {
            headline = stories.response.docs[i].abstract;
            var eachStory = $("<p>");
            eachStory.text(headline);
            newsHolder.append(eachStory);
        }
    })
}