angular.module('chordy')
	.component('chordyChord', {
		require: {
			setCtrl: '^^chordySet'
		},
		transclude: {
			title: '?chordyTitle'
		},
		bindings: {
			title: '@',
			opened: '<',
			pinned: '<',
			disabled: '<'
		},
		template: chordyChordTemplate,
		controller: ChordyChordController
	});

function chordyChordTemplate() {
	return `
		<div class="{{$ctrl.setCtrl.classHeading}}"
			ng-class="{'{{$ctrl.setCtrl.classHeadingOpened}}': $ctrl.opened}"
			ng-click="$ctrl.toggle()"
			ng-transclude="title">
			{{$ctrl.title}}
		</div>
		<div class="{{$ctrl.setCtrl.classContent}}"
			ng-transclude
			ng-if="$ctrl.opened || $ctrl.initialized"
			ng-init="$ctrl.initialized = true"
			ng-show="$ctrl.opened">
		</div>
	`;
}

ChordyChordController.$inject = ['$element'];

function ChordyChordController($element) {
	angular.extend(this, {
		$onInit: init,
		$onDestroy: destroy,
		toggle,
		pin
	});

	var ctrl = this;

	function init() {
		$element.addClass(ctrl.setCtrl.classChord);
		ctrl.setCtrl.add(ctrl);
	}

	function destroy() {
		ctrl.setCtrl.remove(ctrl);
	}

	function toggle($event, force) {
		if ($event) {
			$event.stopPropagation();
		}
		if (force === true) {
			ctrl.setCtrl.open(ctrl);
		} else if (force === false) {
			ctrl.setCtrl.close(ctrl);
		} else {
			ctrl.setCtrl.toggle(ctrl);
		}
	}

	function pin($event, force) {
		if ($event) {
			$event.stopPropagation();
		}
		if (force === true) {
			ctrl.setCtrl.pin(ctrl);
		} else if (force === false) {
			ctrl.setCtrl.unpin(ctrl);
		} else {
			ctrl.setCtrl.togglePin(ctrl);
		}
	}
}
