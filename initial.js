// Test various succes and error conditions

handlers.helloWorld = function (args) {
    var message = "Hello " + currentPlayerId + "!";
    log.info(message);
    return { messageValue: message };
}

handlers.scriptExceptionUnhandled = function (args) {
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
    
    return { handledException: e };
}

handlers.playFabAPIBadRequest = function (args) {
    server.UpdateUserStatistics({
        PlayFabId: currentPlayerId,
        UserStatistics: "blah"
    });
}

handlers.callPlayFabAPIUntilTimeout = function (args) {
    while(true) {
        server.GetTitleNews({
        });
    }
}
