angular.module('app.services', ['ngResource', 'ngCordova', 'ionic'])


.service('manualModeService', function() {
  var manualModeService = this;
  manualModeService.sharedObject = {};
  manualModeService.sharedObject.manualMode = false;
  manualModeService.sharedObject.manualSwitchState = false;

  manualModeService.getManualMode = function(){
//	  console.log("Manual Mode Service:get mode: return value: " + manualModeService.sharedObject.manualMode);
	  return manualModeService.sharedObject.manualMode;
  }

  manualModeService.setManualMode = function(value){
	  manualModeService.sharedObject.manualMode = value;
//	  console.log("Manual Mode Service:set mode: value: " + manualModeService.sharedObject.manualMode);
  }

  manualModeService.getManualSwitchState  = function(){
//	  console.log("Manual Mode Service:get switch: return value: " + manualModeService.sharedObject.manualSwitchState);
	  return manualModeService.sharedObject.manualSwitchState;
  }

  manualModeService.setManualSwitchState = function(value){
	  manualModeService.sharedObject.manualSwitchState = value;
//	  console.log("Manual Mode Service:set switch: value: " + manualModeService.sharedObject.manualSwitchState);
  }
})

.service('switchService', function($cordovaDevice, $ionicPlatform) {

  var switchService = this;
  switchService.sharedObject = {};
  switchService.sharedObject.switchState = false;
  switchService.sharedObject.serialUSBInitialized = false;
  
  switchService.getSwitchState = function(){
	  console.log("get Switch: " + switchService.sharedObject.switchState);

	  return switchService.sharedObject.switchState;
  }

  switchService.setSwitchState = function(value){
	  switchService.sharedObject.switchState = value;
	  if (switchService.sharedObject.serialUSBInitialized == false){
		  switchService.serialUSBInitialize();
	  }
// TODO: write erst wenn initialize zurückgekehrt ist (z.B. als Call back)
	  // Steuern des Switches über USB;
	  switchService.serialUSBWrite(value);
	  console.log("set Switch: " + switchService.sharedObject.switchState);
  }
  
  var serialUSBErrorCallback = function(message) {
	  	console.log ("serial... error");
	    alert('Error: ' + message);
  };
  
  switchService.serialUSBInitialize = function() {
	  $ionicPlatform.ready(function() {
		  console.log ("TEST: " + $cordovaDevice.getModel());
//		  Bus 001 Device 001: ID 1d6b:0002
//		  Bus 002 Device 001: ID 1d6b:0002
//		  Bus 001 Device 002: ID 1a86:7523
		  
//		  serial.requestPermission({vid: '1a86', pid: '7523'},function(successMessage) {
		  serial.requestPermission(function(successMessage) {
			  console.log ("serial.requestPermission success");
			  serial.open(
					  {baudRate: 9600},
					  function(successMessage) {
						  console.log ("serial.open success");
						  alert(successMessage);
						  switchService.sharedObject.serialUSBInitialized = true;
					  },
					  serialUSBErrorCallback
			  );
		  },
		  serialUSBErrorCallback
		  );
	  });
  }
  
  switchService.serialUSBWrite = function(value) {
	  serialData = '';
	  if (value == true) {
		  serialData = 'A00100A100';
	  } else {
		  serialData = 'A00101A200';
	  }
	  serial.writeHex(serialData, function (successMessage) {
		  alert(successMessage);
	  },
	  serialUSBErrorCallback);
	  
  }
  
})


.factory('controllerFactory', function ($resource, configService) {
// TODO: timeout, falls Verbindung offline
	return $resource(configService.sharedObject.controllerServiceURL ,{ }, {
		getData: {method:'GET', isArray: false}
	})

})


.service('controllerService', function($timeout, controllerFactory, manualModeService, switchService) {
	var controllerService = this;
	controllerService.sharedObject = {};
	controllerService.sharedObject.controllerSwitchState = false;

	controllerService.startTimeLoop = function() {
		$timeout(function() {
			var controllerJSON = {};
			controllerJSON = controllerFactory.getData(function() {
				if (controllerJSON.value == "ON") {
					controllerService.sharedObject.controllerSwitchState = true;
				}
				else {
					controllerService.sharedObject.controllerSwitchState = false;
				}
				console.log("xxx", controllerJSON.value, manualModeService.getManualMode());
				console.log("Controller Service: timeloop: return value: ", controllerJSON.value, " / ", controllerService.sharedObject.controllerSwitchState );
				
				if (manualModeService.getManualMode() == false) {
					switchService.setSwitchState(controllerService.sharedObject.controllerSwitchState);
				}
				controllerService.startTimeLoop();
			});
// TODO: timeout aus config
		}, 3000);
		console.log('issued new timeout ')
	}
	controllerService.startTimeLoop();

	controllerService.getControllerSwitchState  = function(){
		return controllerService.sharedObject.controllerSwitchState;
	}
	
// ToDo: Brauchen wir den Setter?
//	controllerService.setControllerSwitchState = function(value){
//		controllerService.sharedObject.controllerSwitchState = value;
//		console.log("Controller Service:set switch: value: " + controllerService.sharedObject.controllerSwitchState);
//	  	}
	
})

.service('configService', function() {
	var configService = this;
	configService.sharedObject = {};
	configService.sharedObject.controllerServiceURL = 'http://localhost:5000/switchController';

	configService.getControllerServiceURL = function(){
		console.log("get controller: " + configService.sharedObject.controllerServiceURL);
		return configService.sharedObject.controllerServiceURL;
	  	}

	configService.setcontrollerServiceURL = function(value){
		configService.sharedObject.controllerServiceURL = value;
		console.log("set controller: " + configService.sharedObject.controllerServiceURL);
	  	}
	
})

	

;
