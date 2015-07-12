var receiver = new cast.receiver.Receiver('YOUR_APP_ID', ['com.nerdwin15.demo']);
receiver.start();
window.addEventListener('load', function() {
  $("#message").text("Loaded!");
});

var onMessage = function(event) {
  var message = event.message;
  if (message.type == 'message')
    $("#message").html("Got: <span class='message'>" + message.text + "</span>");
  if (message.type == "color")
    $("body").css("backgroundColor", message.color);
};

channelHandler = new cast.receiver.ChannelHandler('com.nerdwin15.demo');
channelHandler.addEventListener(cast.receiver.Channel.EventType.MESSAGE,
    onMessage.bind(this));
channelHandler.addChannelFactory(receiver.createChannelFactory("com.nerdwin15.demo"));
