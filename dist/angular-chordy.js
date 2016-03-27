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
		return '\n\t\t<div class="{{$ctrl.setCtrl.classHeading}}"\n\t\t\tng-click="$ctrl.toggle()"\n\t\t\tng-transclude="title">\n\t\t\t{{$ctrl.title}}\n\t\t</div>\n\t\t<div class="{{$ctrl.setCtrl.classContent}}"\n\t\t\tng-transclude\n\t\t\tng-if="$ctrl.opened || $ctrl.initialized"\n\t\t\tng-init="$ctrl.initialized = true"\n\t\t\tng-show="$ctrl.opened">\n\t\t</div>\n\t';
	}

	ChordyChordController.$inject = ['$element'];

	function ChordyChordController($element) {
		angular.extend(this, {
			$onInit: init,
			$onDestroy: destroy,
			open: open,
			close: close,
			toggle: toggle,
			pin: pin,
			unpin: unpin,
			togglePin: togglePin
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

	angular.module('chordy').component('chordySet', {
		bindings: {
			classChord: '@',
			classHeading: '@',
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
			enable: enable,
			disable: disable,
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

		function enable(chord) {
			if (chord.disabled) {
				chord.disabled = false;
			}
		}

		function disable(chord) {
			if (!chord.disabled) {
				chord.disabled = true;
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