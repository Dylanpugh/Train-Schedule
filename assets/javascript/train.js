var config = {
    apiKey: "AIzaSyAlgKzBhyRA4jWBWvnVsY6O-irChzLxC9U",
    authDomain: "saturdaygroupwork.firebaseapp.com",
    databaseURL: "https://saturdaygroupwork.firebaseio.com",
    projectId: "saturdaygroupwork",
    storageBucket: "",
    messagingSenderId: "1030627840599"
  };

  firebase.initializeApp(config);

  var database= firebase.database();



  $( "#trainData" ).submit(function( event ) {
    
    event.preventDefault();

    var trainName = $("#inputTrain").val().trim();
    var trainDestination = $("#inputDestination").val().trim();
    var trainFrequency = parseInt($("#inputFrequency").val().trim());
    var trainStart = $("#inputStartTime").val().trim();
    

    database.ref().push({
        trainName : trainName,
        trainDestination : trainDestination,
        trainFrequency :  trainFrequency,
        trainStart : trainStart,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    
  });

  $("#submit").on("click", function(event) {
    $("#trainData").empty();
  });



database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().trainDestination;
    var trainFrequency = childSnapshot.val().trainFrequency;
    var trainStart = childSnapshot.val().trainStart;

    var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
  
    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("hh:mm"));
  
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time: " + diffTime);
  
    var timeRemainder = diffTime % trainFrequency;
    console.log(timeRemainder);
  
    var tMinutesTillTrain = trainFrequency - timeRemainder;
    console.log("Minutes to next train: " + tMinutesTillTrain);
  
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));


    //$("#name").append(" <div class='well'><span class='train-name'> " + childSnapshot.val().trainName + " </span><span class='train-destination'> " + childSnapshot.val().trainDestination + "</span><span class='train-frequency'>" + childSnapshot.val().trainFrequency + "</span><span class='next-arrival'>" +childSnapshot.val().nextTrain + "</span><span class='minutes-away'>" + childSnapshot.val().tMinutesTillTrain + "</span></div>");

    
 }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
}); 

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    $("#name").text(snapshot.val().trainName);
    $("#destination").text(snapshot.val().trainDestination);
    $("#frequency").text(snapshot.val().trainFrequency);

    //I am having a lot of trouble with getting the information to display on the table with these last 2 below.
    $("#next-arrival").text(snapshot.val().nextTrain);
    $("#minutes-away").text(snapshot.val().tMinutesTillTrain);
   
});

// Also, I can't get the information to display the old data, only the most current train data that was inputed.


