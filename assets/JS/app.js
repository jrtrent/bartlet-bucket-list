
$(document).ready(() => {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAWRVHG2OAqTmPVRW1n1bOKYhkvPzDkXEg",
        authDomain: "bartlet-s-bucket-list.firebaseapp.com",
        databaseURL: "https://bartlet-s-bucket-list.firebaseio.com",
        projectId: "bartlet-s-bucket-list",
        storageBucket: "bartlet-s-bucket-list.appspot.com",
        messagingSenderId: "129357236055"
    };

    firebase.initializeApp(config);

    var database = firebase.database();
    var userID = "";

    // Sign-in event
    $('#sign-in').on('click', event => {
        event.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        var auth = firebase.auth();
        var promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(event => console.log(event.message));
    })

    states = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"]
    for (var i = 0; i < states.length; i++) {
        var statebutton = $("<a>")
        console.log(statebutton);
        statebutton.class("dropdown-item");
        statebutton.text(states[i]);
        //statebutton.attr("href", "#");
        $("#statelist").append(statebutton);
    };



   

    // Realtime auth listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        console.log(firebaseUser);
        if (firebaseUser) {
            console.log(firebaseUser + 'logged in');
            console.log('UID', firebaseUser.uid);
            UserID = firebaseUser.uid;
            // $('#sign-out').removeClass('hide');
            $("#bucket-list").empty();
            if (!database.ref(){
                database.ref('users/' + userID).set({
                    username: name,
                    email: email
                    //some more user data
                });
            }
        } else {
            console.log('not logged in')
            // $('#sign-out').addClass('hide');
        }
    })

})

// Populate the sidebar with bucket list
function WriteSidebar(bucketListDB, UID) {

}

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



