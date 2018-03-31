
states = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"]
for (var i = 0; i < states.length; i++) {
    var statebutton = $("<a>")
    console.log(statebutton);
    statebutton.class("dropdown-item");
    statebutton.text(states[i]);
    //statebutton.attr("href", "#");
    $("#statelist").append(statebutton);
};


var selectstate = "VA" //$(this).val();
var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + selectstate + "&api_key=GlsypCqWXX4ZbgvdJZXJULl2rnm4b18QkUM9oakw";

$.ajax({
    url: queryURL,
    method: "GET"
})

    .then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var parkname = $("<p>");
            parkname.text(response.data[i].fullName);
            parkname.attr("id", response.data[i].parkCode);
            $("#topcontent").append(parkname);
        }
    });
var parkcode = "asis" //parkname id
var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkcode + "&api_key=GlsypCqWXX4ZbgvdJZXJULl2rnm4b18QkUM9oakw";

//$("#").on("click", function (event) {})

$.ajax({
    url: queryURL,
    method: "GET"
})

    .then(function (response) {
        console.log(response);
        var parkinfo = $("<p>");
        parkinfo.text(response.data["0"].fullName + "p" +
            response.data["0"].description + "p" +
            response.data["0"].url + "p" +
            response.data["0"].weatherInfo);
        $("#parkinfo").append(parkinfo);

    });



