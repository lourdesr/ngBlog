angular.module('myApp',['ui.router'])
.config(['$urlRouterProvider','$stateProvider',
function($urlRouterProvider,$stateProvider){

$urlRouterProvider.otherwise('/');

$stateProvider
	.state('home',{
		url:'/',
		templateUrl: 'app/home/template/home.html'
			
		});


	}]);