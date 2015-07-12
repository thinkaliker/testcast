var cast_api, cv_activity, receiver;
var APP_ID = "B07518FC";

if (window.cast && window.cast.isAvailable) {
  initializeApi();
} else {
  window.addEventListener("message", function(event) {
    if (event.source == window && event.data &&
      event.data.source == "CastApi" &&
      event.data.event == "Hello")
      initializeApi();
  });
};

initializeApi = function() {
  cast_api = new cast.Api();
  $("#cast-list").castReceiverList({
    api: cast_api,
    appId: APP_ID,
    onSelect: function(r) {
      receiver = r;
      $(".unlaunchedOption").removeAttr("disabled");
    }
  });
};

doLaunch = function() {
  var request = new window.cast.LaunchRequest(APP_ID, receiver);
  cast_api.launch(request, onLaunch);
};

onLaunch = function(activity) {
  cv_activity = activity;
  $("#log").append("<li>OnLaunch was fired with activity id: " + activity.activityId + "</li>");
  $(".launchedOption").show();
  $(".unlaunchedOption").hide();
};

sendMessage = function() {
  var text = $("#message").val();
  var data = { type : "message", text : text };
  cast_api.sendMessage(cv_activity.activityId, "com.nerdwin15.demo", data, function(error) {
    $("#log").append("<li>Sent message of " + text + " to cast</li>");
  });
};

sendColor = function() {
  var color = $("#color").val();
  var data = { type : "color", color : color };
  cast_api.sendMessage(cv_activity.activityId, "com.nerdwin15.demo", data, function(error) {
    $("#log").append("<li>Sent color change to " + color + " to cast</li>");
  });
}

stop = function() {
  cast_api.stopActivity(cv_activity.activityId, function() {
    $("#log").append("<li>Stopped activity with id: " + cv_activity.activityId + "</li>");
    cv_activity = null;
  });
  $(".launchedOption").hide();
  $(".unlaunchedOption").show();
};
