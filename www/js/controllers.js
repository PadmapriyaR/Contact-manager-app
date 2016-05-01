angular.module('directory.controllers', [])

    .controller('EmployeeIndexCtrl', function ($scope, $ionicModal, $timeout, EmployeeService) {

            console.log('I am from addList');
        $scope.modal = $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope : $scope,
        }).then(function(modal){
            $scope.modal = modal;
        });

            $scope.newtask = function() {
                $scope.modal.show();
                /*$timeout(function(){
                    $scope.taskmodal.show(); 
                },0)*/
            };

            $scope.closenewtask = function() {
                $scope.modal.hide();
            };
            
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
                $scope.modal.remove();
        });


        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            findAllEmployees();
        }

        $scope.search = function () {
            EmployeeService.findByName($scope.searchKey).then(function (employees) {
                $scope.employees = employees;
            });
        }

        var findAllEmployees = function() {
            EmployeeService.findAll().then(function (employees) {
                $scope.employees = employees;
            });
        }

        findAllEmployees();

    })

    .controller('EmployeeDetailCtrl', function ($scope, $stateParams, EmployeeService) {
        EmployeeService.findById($stateParams.employeeId).then(function(employee) {
            $scope.employee = employee;
        });

        $scope.remove = function(person){
            EmployeeService.findByIndex(person).then(function(employees)
            {
                $scope.employees = employees;
            });
        }
    })

    .controller('EmployeeReportsCtrl', function ($scope, $stateParams, EmployeeService) {
        EmployeeService.findByManager($stateParams.employeeId).then(function(employees) {
            $scope.employees = employees;
        });
    });
