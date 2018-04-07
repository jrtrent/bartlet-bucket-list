
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
        var password = $('#password').val().trim();
        var auth = firebase.auth();
        console.log('uadhgfkuhsdaku')
        var promise = auth.signInWithEmailAndPassword(email, password).then((user) => {
            database.ref('Users').child(user.uid).set({
                toVisit: [],
                visited: []
                //some more user data
            });
        });
        promise.catch(event => console.log(event.message));
    })

    states = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL",
        "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI",
        "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH",
        "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT",
        "WA", "WI", "WV", "WY"]
    for (var i = 0; i < states.length; i++) {
        var statebutton = $("<option>");
        statebutton.attr("value", states[i]);
        statebutton.text(states[i]);
        $("#statelist").append(statebutton)
    };

    // Sign-up event
    $('#sign-up').on('click', event => {
        event.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        var auth = firebase.auth();
        auth.createUserWithEmailAndPassword(email, password).then((user) => {
            console.log(user)
            database.ref().child('Users').child(user.uid).set({
                toVisit: [],
                visited: []
                //some more user data
            })
        }).catch(event => console.log(event.message));
    })

    // Realtime auth listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        console.log(firebaseUser);
        if (firebaseUser) {
            console.log('logged in!');
            console.log('UID ', firebaseUser.uid);
            UserID = firebaseUser.uid;
            $("#bucket-list").empty();
            $("#bucket-list").append("<h2> My Bucket List </h2>");
            database.ref('users/' + UserID + '/parks').on("child_added", function (childSnapshot) {
                console.log(childSnapshot.val());
                if (childSnapshot.val().visited === false) {
                    var newP = childSnapshot.val().name;
                    // var newButton = $("<button>").text('Visited')
                    //     .addClass('pure-button pure-button-primary visited-button')
                    $("#bucket-list").append('<p>' + newP + '</p>' +
                        '<button class= "pure-button pure-button-primary visited-button">Visited</button><br><br>');
                }
            })
        } else {
            console.log('not logged in')
            $('#sign-out').addClass('hide');
        }
    })

    $("#statelist").on("click", function () {
        $("#parkinfo").empty();
        var selectstate = $(this).val();
        console.log(selectstate);
        var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + selectstate + "&api_key=GlsypCqWXX4ZbgvdJZXJULl2rnm4b18QkUM9oakw";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var parkname = $("<p>");
                    parkname.text(response.data[i].fullName);
                    parkname.addClass("natparks");
                    parkname.attr("id", response.data[i].parkCode);
                    parkname.data('park', response.data[i].parkCode)
                    $("#parkinfo").append(parkname);
                }
            });
    })

    // Add park to bucket list when button is pressed
    $('body').on('click', '#add-to-bucket', function (event) {
        console.log($(this).attr('data-park-name'));
        database.ref('users/' + UserID + '/parks').push({
            name: $(this).attr('data-park-name'),
            visited: false
        })
    })
})

$("body").on("click", ".natparks", function () {
    $("#parkinfo").empty();
    var parkcode = $(this).attr('id')
    console.log(parkcode)
    var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkcode + "&api_key=GlsypCqWXX4ZbgvdJZXJULl2rnm4b18QkUM9oakw";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(response);
            $("#parkinfo").empty();
            addtolist = $("<button>");
            addtolist.attr("type", "button");
            addtolist.addClass("btn btn-primary");
            addtolist.text("Add to List");
            var parkname = response.data["0"].fullName;
            var parkdescription = response.data["0"].description;
            var parkwebsite = response.data["0"].url;
            var parkweather = response.data["0"].weatherInfo
            $("#parkinfo").append("<h2>" + parkname + "<h2>",
                "<p>" + parkdescription + "<p>",
                "<p>" + parkwebsite + "</p>",
                "<p>" + parkweather + "<p>",
                addtolist);

            var apikey = "AIzaSyAWRVHG2OAqTmPVRW1n1bOKYhkvPzDkXEg";
            console.log(parkname);

            var queryURL = "https://www.googleapis.com/youtube/v3/search?&key=" + apikey +
            "&part=snippet,id&q=" + parkname + "&order=viewCount";

            $.ajax({
                url: queryURL,
                method: "GET",
                maxResults: '2',

            })

                .then(function (response) {
                    console.log(response);
                    var videoid = response.items["0"].id.videoId
                    var youtube = $("<iframe>");
                    youtube.attr({
                        id: "ytplayer",
                        type: "text/html",
                        width: "340",
                        height: "160",
                        src: "http://www.youtube.com/embed/" + videoid +"?autoplay=1",
                        frameborder: "0",
                    })
                    $("#parkinfo").prepend(youtube);
                });

        });

})









