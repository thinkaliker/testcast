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
