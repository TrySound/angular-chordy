;

(function () {
	'use strict';

	angular.module('chordy', []);

	angular.module('chordy').component('chordyChord', {
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
		return '\n\t\t<div class="{{$ctrl.setCtrl.classHeading}}"\n\t\t\tng-class="{\'{{$ctrl.setCtrl.classHeadingOpened}}\': $ctrl.opened}"\n\t\t\tng-click="$ctrl.toggle()"\n\t\t\tng-transclude="title">\n\t\t\t{{$ctrl.title}}\n\t\t</div>\n\t\t<div class="{{$ctrl.setCtrl.classContent}}"\n\t\t\tng-transclude\n\t\t\tng-if="$ctrl.opened || $ctrl.initialized"\n\t\t\tng-init="$ctrl.initialized = true"\n\t\t\tng-show="$ctrl.opened">\n\t\t</div>\n\t';
	}

	ChordyChordController.$inject = ['$element'];

	function ChordyChordController($element) {
		angular.extend(this, {
			$onInit: init,
			$onDestroy: destroy,
			toggle: toggle,
			pin: pin
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

	angular.module('chordy').component('chordySet', {
		bindings: {
			classChord: '@',
			classHeading: '@',
			classHeadingOpened: '@',
			classTitle: '@',
			classContent: '@'
		},
		controller: ChordySetController
	});

	function ChordySetController() {
		angular.extend(this, {
			chords: [],
			add: add,
			remove: remove,
			open: open,
			close: close,
			toggle: toggle,
			pin: pin,
			unpin: unpin,
			togglePin: togglePin
		});

		function add(chord) {
			this.chords.push(chord);
		}

		function remove(chord) {
			var index = this.chords.indexOf(chord);
			if (index !== -1) {
				this.chords.splice(index, 1);
			}
		}

		function open(chord) {
			if (chord.disabled) {
				return;
			}
			var hasPinned = this.chords.reduce(function (result, item) {
				return result || item.pinned;
			}, false);
			if (hasPinned) {
				this.chords.forEach(function (item) {
					if (chord !== item && item.opened && !item.pinned) {
						item.opened = false;
					}
				});
			}
			if (!chord.opened) {
				chord.opened = true;
			}
		}

		function close(chord) {
			if (chord.disabled) {
				return;
			}
			if (chord.opened) {
				chord.opened = false;
			}
		}

		function toggle(chord) {
			if (chord.opened) {
				this.close(chord);
			} else {
				this.open(chord);
			}
		}

		function pin(chord) {
			if (chord.disabled) {
				return;
			}
			this.chords.forEach(function (item) {
				if (chord !== item && item.opened && !item.pinned) {
					item.opened = false;
				}
			});
			if (!chord.pinned) {
				chord.pinned = true;
			}
		}

		function unpin(chord) {
			if (chord.disabled) {
				return;
			}
			if (chord.pinned) {
				chord.pinned = false;
			}
		}

		function togglePin(chord) {
			if (chord.pinned) {
				this.unpin(chord);
			} else {
				this.pin(chord);
			}
		}
	}

	angular.module('chordy').directive('chordyTitle', function () {
		return {
			restrict: 'E',
			require: {
				setCtrl: '^^chordySet',
				chordCtrl: '^^chordyChord'
			},
			scope: true,
			link: chordyTitleLink
		};
	});

	function chordyTitleLink(scope, element, attrs, ctrls) {
		element.addClass(ctrls.setCtrl.classTitle);
		scope.chord = ctrls.chordCtrl;
	}
})();