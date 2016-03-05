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
    var response = http.request('http://httpbin.org/status/500');
    log.debug('received: ' + response);
}

handlers.httpRequestUntilTimeout = function (args) {
    while(true) {
        var response = http.request('http://httpbin.org/delay/10');
        log.debug('delayed');
    }
}

handlers.httpRequestDNSLookupFailure = function (args) {
        var response = http.request('http://cstest123.playfab.com');
}
