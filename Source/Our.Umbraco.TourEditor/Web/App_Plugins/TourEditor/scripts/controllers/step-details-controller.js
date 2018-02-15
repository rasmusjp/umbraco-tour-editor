﻿(function () {
    "use strict";

    function StepDetailsController($scope, eventsService, formHelper) {
        var vm = this;
        vm.step = null;
        vm.stepIndex = -1;       
        vm.form = null;
        vm.isIntro = false;

        var evts = [];

        vm.properties = {
            'Title': { 'label': 'Title', 'description': 'Enter the title for this step', 'propertyErrorMessage': 'The title is a required field' },
            'Content': { 'label': 'Text', 'description': 'Enter the text for this step' },
            'Type': { 'label': 'Is intro step', 'description': 'Check if it is a intro step' },
            'Element': { 'label': 'Element', 'description': 'Enter the selector for the element you wish to highlight' },
            'Event': { 'label': 'Event', 'description': 'Enter the event needed to trigger the next step eg. click' },
            'PreventClick': { 'label': 'Prevent clicking', 'description': 'Check this if you want to prevent the user clicking the highlighted element' }
        };

        evts.push(eventsService.on("toureditor.editstep", function (name, arg) {
            vm.stepIndex = arg.stepIndex;
            vm.step = $scope.model.tours[arg.tourIndex].steps[arg.stepIndex];

            vm.isIntro = vm.step.type === 'intro';
        }));

        
        //ensure to unregister from all events!
        $scope.$on('$destroy', function () {
            for (var e in evts) {
                eventsService.unsubscribe(evts[e]);
            }
        });

        $scope.$watch('vm.isIntro', function () {

            if (vm.step) {
                if (vm.isIntro) {
                    vm.step.type = 'intro';
                } else {
                    vm.step.type = null;
                }
            }
            
        });

    }

    angular.module("umbraco").controller("Our.Umbraco.TourEditor.StepDetailsController",
        [
            '$scope',
            'eventsService',           
            'formHelper',
            StepDetailsController
        ]);

})();