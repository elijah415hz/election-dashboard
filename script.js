$(document).ready(function () {
    $('.collapsible').collapsible();
});
// create references and variables
var addressInputEle = $('#userAddress')
var federalOfficialsMenu = $('#federalOfficials')
var stateOfficialsMenu = $('#stateOfficials')
var localOfficialsMenu = $('#localOfficials')
var offices = [];
var officials = [];

// Ajax request to Google Civic Info
function getOfficials(address) {
    var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAY3D8Rvr86w2k066vbIV1mpziRwWCO2kc&address="
    queryURL += address

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        offices = response.offices
        officials = response.officials
        addOfficialButtons(offices, officials)
    })
}

// function adds officials to dropdown menus
function addOfficialButtons(offices, officials) {
    console.log(offices)
    console.log(officials)
    // empty out current collapsible menus when user submits new location
    federalOfficialsMenu.empty()
    stateOfficialsMenu.empty()
    localOfficialsMenu.empty()
    // create header buttons for each collapsible menu
    federalOfficialsMenu.html('<div class="collapsible-header"><i class="material-icons">account_balance</i>Federal Officals</div>')
    stateOfficialsMenu.html('<div class="collapsible-header"><i class="material-icons">account_balance</i>State Officials</div>')
    localOfficialsMenu.html('<div class="collapsible-header active"><i class="material-icons">account_balance</i>Local Officials</div>')


    for (let i = 0; i < offices.length; i++) {
        var level = offices[i].levels[0]
        var newOfficialBtn = $('<div>')
        var officialName = officials[i].name
        newOfficialBtn.attr('class', 'collapsible-body')
        newOfficialBtn.text(officialName)
        newOfficialBtn.attr("data-index", i)
        switch (level) {
            case "country":
                federalOfficialsMenu.append(newOfficialBtn)
                break;
            case "administrativeArea1":
                stateOfficialsMenu.append(newOfficialBtn)
                break;
            case "administrativeArea2":
            case "locality":
                localOfficialsMenu.append(newOfficialBtn)
                break;
        }
    }
    
}

// retrieve elected officials for location when user click's submit
$('#submitBtn').on('click', function (event) {
    event.preventDefault()
    // get user input
    var userAddress = addressInputEle.val()
    // get user's elected officials
    getOfficials(userAddress)
    clickRep()
})

// repBtn is a placeholder for the buttons created under each dropdown. Replace it with whatever setting will capture those. 

// I've used federal[0] as a placeholder in the information displays, as I'm not sure how we reference the correct array. If statement for each dropdown?
function clickRep(){
    // When user chooses a representative:
    $(".sidebar").click(function(event){
        // Clear out anything currently appended to the main display div
        $('.main').empty();
        // Testing click event...
        var index = event.target.getAttribute("data-index")
        console.log(index)
        // create an img tag
        var repPic = $("<img src = '' alt = 'Picture of Representative'>");
        // Grab the img URL from the API object, if it exists
        repPic.attr("src", officials[index].photoUrl);
        // Display the image on the page
        $('.main').append(repPic);
        // Create a div to hold info about the rep
        var repInfo = $("<div>");
        // Insert information from API object:
        repInfo.html(
            `<p>Name: ${officials[index].name}</p>
            <p>Party: ${officials[index].party}</p>
            <p>Phone: ${officials[index].phones[0]}</p>
            <p>Address: ${officials[index].address[0].line1}, ${officials[index].address[0].city}, ${officials[index].address[0].state}, ${officials[index].address[0].zip}</p>
            <p>Website: ${officials[index].urls[0]}</p>`
        );
        // Display info on the page
        $('.main').append(repInfo);

    })
    };

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