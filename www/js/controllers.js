
angular.module('app.controllers', ['app.services'])

.controller('switchControlCtrl', function($scope, manualModeService, switchService, controllerService) {
	
	visualState = [{
		'src' : 'img/orkwgOYwRAKg9Z6UZC2Q_graycircle.png',
		'text': "INACTIVE"			
	}, {
		'src' : 'img/sT5Uc3fTFekyP1jHJ1Ax_redcircle.png',
		'text': "OFF"			
	}, {
		'src' : 'img/ilfW0PoFSwGaUU9KXBlm_greencircle.png',
		'text': "ON"			
	}];
	
	$scope.boolToText = function (value, active) {
		index = 0;
		if (active == true) {
			index++;
			if (value == true) index++;
		}
		return visualState[index].text;
	}

	$scope.boolToImg = function (value, active) {
		index = 0;
		if (active == true) {
			index++;
			if (value == true) index++;
		}
		return visualState[index].src;
	}
	
	$scope.updateView = function() {
		$scope.apply();
	}
	
	
	$scope.manualMode = manualModeService.getManualMode();
	$scope.manualSwitchState = manualModeService.getManualSwitchState();
	$scope.switchState = switchService.getSwitchState();
// TODO: woran erkennt man, dass der externe Controller aktiv ist?
	$scope.externalControllerActive = true;
	$scope.controllerSwitchState = controllerService.getControllerSwitchState();
 	
	console.log("Status Controller: " + $scope.switchState + " / " + $scope.manualMode + " / " + $scope.controllerSwitchState);
	
	$scope.manualModeImg = $scope.boolToImg($scope.manualSwitchState, $scope.manualMode);
	$scope.switchStateImg = $scope.boolToImg($scope.switchState, true);
//	$scope.switchStateImg = $scope.boolToImg(switchService.getSwitchState(), true);
	$scope.externalControllerImg = $scope.boolToImg($scope.controllerSwitchState, $scope.externalControllerActive);
	console.log("Status Controller: switch_img:" + $scope.switchStateImg);

// UpdateView on event wenn controllerswitchstate sich verändert hat.	
	
})
   
.controller('switchControl2Ctrl', function($scope, manualModeService, switchService, controllerService) {
	$scope.test = "bla";
	this.manualMode = false;
	this.manualSwitchState = false;
	
	$scope.manualMode = manualModeService.getManualMode();
	$scope.manualSwitchState = manualModeService.getManualSwitchState();
	console.log("Control Controller. Manual Mode: " + $scope.manualMode + " / " + $scope.manualSwitchState);

	$scope.updateManualModeService = function() {
		manualModeService.setManualMode(this.manualMode);
		manualModeService.setManualSwitchState(this.manualSwitchState);
	    console.log("Updated Manual Mode to: " + this.manualMode + " / " + this.manualSwitchState);
	    if (this.manualMode == true) {
	    	switchService.setSwitchState(this.manualSwitchState); 
	    }
	}
})
   
.controller('switchControl3Ctrl', function($scope, manualModeService, switchService, controllerService) {

});