handlers.helloWorld = function (args)
{
    var message = 'Hello ' + currentPlayerId + '!';
    log.info(message);
    return { messageValue: message };
}

handlers.echoToLogs = function(args)
{
	log.debug(args.debugText);
	log.info(args.infoText);
	log.error(args.errorText);
}

handlers.usingParams = function(args)
{
    var playerInternalData = server.GetUserInternalData(
	{
		PlayFabId: currentPlayerId,
		Keys: ['test-key']
	});

    return { PlayerId: currentPlayerId, RandomString: args.RandomString, RandomNumber: args.RandomNumber, PlayerData: playerInternalData.Data['test-key']  };
}

handlers.usingParamsEncoded = function(args)
{
    var playerInternalData = server.GetUserInternalData(
	{
		PlayFabId: currentPlayerId,
		Keys: ['test-key']
	});
    return { PlayerId: currentPlayerId, RandomString: args.RandomString, RandomNumber: args.RandomNumber, PlayerData: playerInternalData.Data['test-key']  };
}

handlers.scriptException = function (args) {
    log.info('before the error');
    var invalid = doesnotexist.yet;
}

handlers.playFabAPIBadRequest = function (args) {
    log.info('before the error');
    server.UpdateUserStatistics({
        PlayFabId: currentPlayerId
    });
}

handlers.httpOkRequest = function (args) {
    var response = http.request('https://aaa.playfabapi.com/HealthStatus');
    log.debug('received: ' + response);
}

handlers.httpNotFoundRequest = function (args) {
    var response = http.request('http://httpbin.org/status/404');
    log.debug('received: ' + response);
}

handlers.httpInternalServerErrorRequest = function (args) {
    var response = http.request('http://httpbin.org/status/500', null, null, null, null, true);
    log.debug('received: ' + response);
}

handlers.httpRequestUntilTimeout = function (args) {
    log.info('before the error');
    while(true) {
        var response = http.request('http://httpbin.org/delay/10');
        log.debug('delayed');
    }
}

handlers.httpRequestDNSLookupFailure = function (args) {
        var response = http.request('http://cstest123.playfab.com');
}

handlers.usingPlayStreamEventAndProfile = function (args, context) {
    var psEvent = context.playStreamEvent;
    var profile = context.playerProfile;
    return { eventName: psEvent.EventName, profileDispName: profile.DisplayName };
}

handlers.usingScheduledTaskInterval = function (args, context) {
    server.SetTitleInternalData(
    {
        Key: 'usingScheduledTaskInterval',
        Value: context.scheduledInterval
    });

    var result = server.GetTitleInternalData(
    {
        Keys: ['usingScheduledTaskInterval' ]
    });

    return { titleData: result.Data['usingScheduledTaskInterval'] };
}
