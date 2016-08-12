/**
 * Timer module
 */
angular.module('app.timer', [])
.service('timerService', function($timeout, callback) {
	var timerService = this;

	timerService.startTimeLoop = function(callback) {
		$timeout(function() {
			callback();
			//otherService.updateTestService('Mellow Yellow')
			console.log('update with timeout fired')
			timerService.startTimeLoop();
		}, 3000);
		console.log('issued timeout ')
	}

	timerService.startTimeLoop(callback);

});
