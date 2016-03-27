'use strict';

describe('chordy-chord controller', () => {
	let component;

	beforeEach(module('chordy'));

	beforeEach(inject(($rootScope, $componentController) => {
		const scope = $rootScope.$new();
		const setComponent = $componentController('chordySet', {
			$scope: scope
		});
		component = $componentController('chordyChord', {
			$scope: scope,
			$element: angular.element('<div></div>')
		}, {
			setCtrl: setComponent
		});
	}));

	it('should have toggle method', () => {
		expect(component.opened).toBe(undefined);
		// toggle
		component.toggle();
		expect(component.opened).toBe(true);
		component.toggle(null, true);
		expect(component.opened).toBe(true);
		component.toggle();
		// force the same
		expect(component.opened).toBe(false);
		component.toggle(null, false);
		expect(component.opened).toBe(false);
		// force reverted
		component.toggle(null, true);
		expect(component.opened).toBe(true);
		component.toggle(null, false);
		expect(component.opened).toBe(false);
	});

	it('should have pin method', () => {
		expect(component.pinned).toBe(undefined);
		// pin
		component.pin();
		expect(component.pinned).toBe(true);
		component.pin(null, true);
		expect(component.pinned).toBe(true);
		component.pin();
		// force the same
		expect(component.pinned).toBe(false);
		component.pin(null, false);
		expect(component.pinned).toBe(false);
		// force reverted
		component.pin(null, true);
		expect(component.pinned).toBe(true);
		component.pin(null, false);
		expect(component.pinned).toBe(false);
	});

	it('should disable chord', () => {
		component.disabled = true;
		component.toggle();
		expect(component.opened).toBe(undefined);
		component.toggle(null, true);
		expect(component.opened).toBe(undefined);
		component.toggle(null, false);
		expect(component.opened).toBe(undefined);
		component.pin();
		expect(component.pinned).toBe(undefined);
		component.pin(null, true);
		expect(component.pinned).toBe(undefined);
		component.pin(null, false);
		expect(component.pinned).toBe(undefined);

		component.disabled = false;
		component.toggle();
		expect(component.opened).toBe(true);
		component.toggle(null, false);
		expect(component.opened).toBe(false);
		component.toggle(null, true);
		expect(component.opened).toBe(true);
		component.pin();
		expect(component.pinned).toBe(true);
		component.pin(null, false);
		expect(component.pinned).toBe(false);
		component.pin(null, true);
		expect(component.pinned).toBe(true);
	});

	it('should be able to pass $event as first argument to stop propagation', () => {
		let calls = 0;
		const $event = {
			stopPropagation: () => {
				calls += 1;
			}
		};

		component.toggle($event);
		component.toggle($event, true);
		component.toggle($event, false);
		component.pin($event);
		component.pin($event, true);
		component.pin($event, false);

		expect(calls).toBe(6);
	});
});
