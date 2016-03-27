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
		open,
		close,
		toggle,
		pin,
		unpin,
		togglePin
	});

	var ctrl = this;

	function init() {
		$element.addClass(ctrl.setCtrl.classChord);
		ctrl.setCtrl.add(ctrl);
	}

	function destroy() {
		ctrl.setCtrl.remove(ctrl);
	}

	function open($event) {
		if ($event) {
			$event.stopPropagation();
		}
		ctrl.setCtrl.open(ctrl);
	}

	function close($event) {
		if ($event) {
			$event.stopPropagation();
		}
		ctrl.setCtrl.close(ctrl);
	}

	function toggle($event) {
		if ($event) {
			$event.stopPropagation();
		}
		ctrl.setCtrl.toggle(ctrl);
	}

	function pin($event) {
		if ($event) {
			$event.stopPropagation();
		}
		ctrl.setCtrl.pin(ctrl);
	}

	function unpin($event) {
		if ($event) {
			$event.stopPropagation();
		}
		ctrl.setCtrl.unpin(ctrl);
	}

	function togglePin($event) {
		if ($event) {
			$event.stopPropagation();
		}
		ctrl.setCtrl.togglePin(ctrl);
	}
}
