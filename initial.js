// Test various succes and error conditions

handlers.helloWorld = function (args) {
    var message = "Hello " + currentPlayerId + "!";
    log.info(message);
    return { messageValue: message };
}

handlers.scriptExceptionUnhandled = function (args) {
    log.info("before the error");
    var invalid = doesnotexist.yet;
}

handlers.scriptExceptionHandled = function (args) {
    try {
        var invalid = 1 / 0;
    }
    catch(e)
    {
        log.error("caught: " + e);
    }
}

handlers.playFabAPIBadRequest = function (args) {
    server.UpdateUserStatistics({
        PlayFabId: currentPlayerId,
        UserStatistics: "blah"
    });
}

handlers.makeHttpRequestUntilTimeout = function (args) {
    while(true) {
        var response = http.request("http://google.com");
        log.debug("received: " + response);
    }
}
