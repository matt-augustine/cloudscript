// Test various succes and error conditions

handlers.helloWorld = function (args) {
    var message = "Hello " + currentPlayerId + "!";
    log.info(message);
    return { messageValue: message };
}

handlers.incrementStat = function (args) {
    var playerStats = server.GetUserStatistics({
        PlayFabId: currentPlayerId
    }).UserStatistics;

    if (playerStats[args.statKey])
        playerStats[args.statKey] += 1;
    else
        playerStats[args.statKey] = 1;

    server.UpdateUserStatistics({
        PlayFabId: currentPlayerId,
        UserStatistics: playerStats
    });
    
    log.debug("Set " + args.statKey + " for player " + currentPlayerId + " to " + playerStats[args.statKey]);
    return { statKey: args.StatKey, statVal: playerStats[args.statKey] };
}

handlers.scriptErrorUnhandled = function (args) {
    var invalid = 1 / 0;
    log.error("invalid: " + invalid);
}

handlers.scriptErrorHandled = function (args) {
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
