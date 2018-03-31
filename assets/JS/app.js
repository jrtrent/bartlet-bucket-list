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
$(document).ready(() => {
    // Sign-in event
    $('#sign-in').on('click', event => {
        event.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        var auth = firebase.auth();
        var promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(event => console.log(event.message));
    })

    // Sign-up event
    $('#sign-up').on('click', event => {
        event.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        var auth = firebase.auth();
        var promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(event => console.log(event.message));
    })

    // Sign-out event
    // $('#sign-out').on('click', event => {
    //     firebase.auth().signOut();
    // })

    // Realtime auth listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser + 'logged in');
            // $('#sign-out').removeClass('hide');
        } else {
            console.log('not logged in')
            // $('#sign-out').addClass('hide');
        }
    })

})
var parkcode = "acad"//$(this).val();
var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=GlsypCqWXX4ZbgvdJZXJULl2rnm4b18QkUM9oakw";

$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response) {
    console.log(data.parkname);
    var park = $("<div>");
    var parkname = data.fullname;
    var city = data.addresses.city;
    var state = data.address.statecode;
    $("#parkinformation").append(parkname +"<br>"+ city + ", " + state)

})
   
$.ajax({
    url: queryURL,
    menthod: "GET"
})

.then(function(videoresponse){
    var video = $("<iframe>");
    var videourl = data.embed_url;
    var vidieoid =data.vieo_id;
    vidieoid.attr({
        src: "videourl",
        width: "200px",
        height: "100px",
    });
})