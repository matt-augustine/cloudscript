// Test various succes and error conditions

handlers.helloWorld = function (args) {
    var message = "Hello " + currentPlayerId + "!";
    log.info(message);
    return { messageValue: message };
}

handlers.scriptException = function (args) {
    log.info("before the error");
    var invalid = doesnotexist.yet;
}

handlers.playFabAPIBadRequest = function (args) {
    server.UpdateUserStatistics({
        PlayFabId: currentPlayerId,
        UserStatistics: "blah"
    });
}

handlers.makeHttpRequestUntilTimeout = function (args) {
    while(true) {
        var response = http.request("http://cstest123.playfab.com");
        log.debug("received: " + response);
    }
}
