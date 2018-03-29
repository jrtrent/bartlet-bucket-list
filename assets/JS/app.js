var parkname = $(this).val();
var queryURL = "https://developer.nps.gov/api/v1/parks?"parkCode=acad"&api_key=GlsypCqWXX4ZbgvdJZXJULl2rnm4b18QkUM9oakw";

$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response) {
    var park =$("<p>");
    var parkname = data.fullname;
    var city = data.addresses.city;
    var state = data.address.statecode;
    $("#parkinformation").append(parkname +"<br>"+ city + ", " + state)

})
   