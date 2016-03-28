'use strict';

describe('chordy-set controller', () => {
	let component;

	beforeEach(module('chordy'));

	beforeEach(inject(($rootScope, $componentController) => {
		component = $componentController('chordySet', {
			$scope: $rootScope.$new()
		});
	}));

	it('should add chords', () => {
		const chord1 = { opened: true };
		const chord2 = { opened: false };
		const chord3 = { opened: true, pinned: true };
		const chord4 = {};
		component.add(chord1);
		component.add(chord2);
		component.add(chord3);
		component.add(chord4);
		expect(component.chords[0]).toBe(chord1);
		expect(component.chords[1]).toBe(chord2);
		expect(component.chords[2]).toBe(chord3);
		expect(component.chords[3]).toBe(chord4);
		expect(component.chords).toEqual([
			{ opened: true },
			{ opened: false },
			{ opened: true, pinned: true },
			{}
		]);
	});

	it('should remove chords', () => {
		const chord1 = {};
		const chord2 = {};
		component.add(chord1);
		component.add(chord2);
		component.remove(chord1);
		expect(component.chords.length).toBe(1);
		expect(component.chords[0]).toBe(chord2);
		component.remove(chord2);
		expect(component.chords.length).toBe(0);
	});

	it('should open and close chord', () => {
		const chord1 = { opened: false };
		const chord2 = { opened: false };
		component.add(chord1);
		component.add(chord2);
		component.open(chord1);
		expect(component.chords).toEqual([
			{ opened: true },
			{ opened: false }
		]);
		component.open(chord2);
		expect(component.chords).toEqual([
			{ opened: true },
			{ opened: true }
		]);
		component.close(chord1);
		expect(component.chords).toEqual([
			{ opened: false },
			{ opened: true }
		]);
		component.toggle(chord1);
		expect(component.chords).toEqual([
			{ opened: true },
			{ opened: true }
		]);
		component.toggle(chord2);
		expect(component.chords).toEqual([
			{ opened: true },
			{ opened: false }
		]);
	});

	it('should open and close pinned chord', () => {
		const chord1 = { opened: false, pinned: true };
		const chord2 = { opened: true, pinned: true };
		const chord3 = { opened: false, pinned: false };
		component.add(chord1);
		component.add(chord2);
		component.add(chord3);
		component.open(chord3);
		expect(component.chords).toEqual([
			{ opened: false, pinned: true },
			{ opened: true, pinned: true },
			{ opened: true, pinned: false }
		]);
		component.open(chord1);
		expect(component.chords).toEqual([
			{ opened: true, pinned: true },
			{ opened: true, pinned: true },
			{ opened: false, pinned: false }
		]);
		component.open(chord3);
		component.close(chord2);
		expect(component.chords).toEqual([
			{ opened: true, pinned: true },
			{ opened: false, pinned: true },
			{ opened: true, pinned: false }
		]);
	});

	it('should pin and unpin chord', () => {
		const chord1 = { opened: true, pinned: false };
		const chord2 = { opened: true, pinned: false };
		component.add(chord1);
		component.add(chord2);
		component.pin(chord1);
		expect(component.chords).toEqual([
			{ opened: true, pinned: true },
			{ opened: false, pinned: false }
		]);
		component.pin(chord2);
		expect(component.chords).toEqual([
			{ opened: true, pinned: true },
			{ opened: false, pinned: true }
		]);
		component.unpin(chord1);
		expect(component.chords).toEqual([
			{ opened: true, pinned: false },
			{ opened: false, pinned: true }
		]);
		component.togglePin(chord1);
		expect(component.chords).toEqual([
			{ opened: true, pinned: true },
			{ opened: false, pinned: true }
		]);
		component.togglePin(chord2);
		expect(component.chords).toEqual([
			{ opened: true, pinned: true },
			{ opened: false, pinned: false }
		]);
	});

	it('should disable chord', () => {
		const chord = { disabled: true };
		component.add(chord);
		component.toggle(chord);
		expect(chord.opened).toBe(undefined);
		component.open(chord);
		expect(chord.opened).toBe(undefined);
		component.close(chord);
		expect(chord.opened).toBe(undefined);
		component.togglePin(chord);
		expect(chord.pinned).toBe(undefined);
		component.pin(chord);
		expect(chord.pinned).toBe(undefined);
		component.unpin(chord);
		expect(chord.pinned).toBe(undefined);

		chord.disabled = false;
		component.toggle(chord);
		expect(chord.opened).toBe(true);
		component.close(chord);
		expect(chord.opened).toBe(false);
		component.open(chord);
		expect(chord.opened).toBe(true);
		component.togglePin(chord);
		expect(chord.pinned).toBe(true);
		component.unpin(chord);
		expect(chord.pinned).toBe(false);
		component.pin(chord);
		expect(chord.pinned).toBe(true);
	});
});
