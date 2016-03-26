angular.module('chordy')
	.component('chordySet', {
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
		add,
		remove,
		enable,
		disable,
		open,
		close,
		toggle,
		pin,
		unpin,
		togglePin
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
		var hasPinned = this.chords.reduce((result, item) => {
			return result || item.pinned;
		}, false);
		if (hasPinned) {
			this.chords.forEach(item => {
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
		this.chords.forEach(item => {
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
