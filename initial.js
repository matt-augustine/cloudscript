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
        PlayFabId: currentPlayerId
    });
}

handlers.httpOkRequest = function (args) {
    var response = http.request("https://aaa.playfabapi.com/HealthStatus");
    log.debug("received: " + response);
}

handlers.httpNotFoundRequest = function (args) {
    var response = http.request("http://google.com/notfound");
    log.debug("received: " + response);
}

handlers.httpRequestUntilTimeout = function (args) {
    while(true) {
        var response = http.request("http://google.com");
    }
}

handlers.httpRequestDNSLookupFailure = function (args) {
        var response = http.request("http://cstest123.playfab.com");
}
