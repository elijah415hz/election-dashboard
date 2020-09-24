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
var index = "";

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
    // empty out current collapsible menus when user submits new location
    federalOfficialsMenu.empty()
    stateOfficialsMenu.empty()
    localOfficialsMenu.empty()
    // create header buttons for each collapsible menu
    federalOfficialsMenu.html('<div class="collapsible-header"><i class="material-icons">account_balance</i>Federal Officials</div>')
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
        index = event.target.getAttribute("data-index")
        // Creates and appends card
        var infoCard = $("<div class = 'card horizontal'>")
        $(".main").append(infoCard)

        // Creates image placement on card
        if (officials[index].photoUrl){
        var cardImage = $("<div class = 'card-image'>");
        infoCard.append(cardImage);
        // Creates image and populates it with picture from API, if available
        var repPic = $("<img src = '' alt = 'Picture of Representative'>");
        repPic.attr("src", officials[index].photoUrl);
        $('.card-image').append(repPic);
        };

        // Create a div to hold info about the rep
        var repContentBox = $("<div class = 'card-stacked'>");
        infoCard.append(repContentBox);
        var repInfo = $("<div class = 'card-content'>");
        repContentBox.append(repInfo);
        // Insert information from API object, if applicable:
        if (officials[index].name){
            var repName = `<p>Name: ${officials[index].name}</p>`;
            repInfo.append(repName);
        };
        // if (offices[index].name){
        //     var repTitle = `<p>Title: ${offices[index].name}`
        //     repInfo.append(repTitle);
        // };
        if (officials[index].party){
            var repParty = `<p>Party: ${officials[index].party}</p>`;
            repInfo.append(repParty);
        };
        if (officials[index].phones[0]){
            var repPhone = `<p>Phone: ${officials[index].phones[0]}</p>`;
            repInfo.append(repPhone);
        };
        if (officials[index].address[0].line1){
            var repAddress1 = `<p>Address: ${officials[index].address[0].line1}</p>`;
            repInfo.append(repAddress1);
        };
        if (officials[index].address[0].line2){
            var repAddress2 = `<p>${officials[index].address[0].line2}</p>`;
            repInfo.append(repAddress2);
        };
        if (officials[index].address[0].line3){
            var repAddress3 = `<p>${officials[index].address[0].line3}</p>`;
            repInfo.append(repAddress3);
        };
        if (officials[index].city && officials[index].state && officials[index].zip){
            var repCityStateZip = `<p>${officials[index].city}, ${officials[index].state}, ${officials[index].zip}</p>`;
            repInfo.append(repCity);
        };
        if (officials[index].urls[0]){
            var repWebsite = `<p>Website: ${officials[index].urls[0]}</p>`;
            repInfo.append(repWebsite);
        };
        
        // Runs getNews function to display news stories:
        getNews();

    })
    };

    function getNews() {
        $.ajax({
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${officials[index].name}&api-key=IWE6hnGq7VzMyE3QxJe363KNU2gJmwbY`,
            method: "GET"
        }).then(function (stories) {
            // Creates a div to hold the news stories and displays it on the page.
            var newsCard = $("<div class = 'card horizontal'>");
            $(".main").append(newsCard);

            var repNewsBox = $("<div class = 'card-stacked'>");
            newsCard.append(repNewsBox);

            var repNews = $("<div class = 'card-content'>");
            repNewsBox.append(repNews);
            var newsHeader = $("<b>Recent News:</b>");
            repNews.append(newsHeader);
    
            // For each story up to 5, creates a P tag and displays it on the page.
            for (var i = 0; i < 5; i++) {
                headline = stories.response.docs[i].abstract;
                var eachStory = $("<p>");
                eachStory.html(`${headline}<br><br>`);
                repNews.append(eachStory);
            }
        })
    }