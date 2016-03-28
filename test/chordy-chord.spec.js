'use strict';

describe('chordy-chord controller', () => {
	let component, fakeSet;

	beforeEach(module('chordy'));

	beforeEach(inject(($rootScope, $componentController) => {
		const scope = $rootScope.$new();
		function fakeMethod(method) {
			return function () {
				this.lastCalled = method;
			};
		}
		fakeSet = {
			lastCalled: null,
			add: fakeMethod('add'),
			remove: fakeMethod('remove'),
			open: fakeMethod('open'),
			close: fakeMethod('close'),
			toggle: fakeMethod('toggle'),
			pin: fakeMethod('pin'),
			unpin: fakeMethod('unpin'),
			togglePin: fakeMethod('togglePin')
		};
		component = $componentController('chordyChord', {
			$scope: scope,
			$element: angular.element('<div></div>')
		}, {
			setCtrl: fakeSet
		});
	}));

	it('should init and destroy', () => {
		component.$onInit();
		expect(fakeSet.lastCalled).toBe('add');
		component.$onDestroy();
		expect(fakeSet.lastCalled).toBe('remove');
	});

	it('should have toggle method', () => {
		component.toggle();
		expect(fakeSet.lastCalled).toBe('toggle');
		component.toggle(null, true);
		expect(fakeSet.lastCalled).toBe('open');
		component.toggle(null, false);
		expect(fakeSet.lastCalled).toBe('close');
	});

	it('should have pin method', () => {
		component.pin();
		expect(fakeSet.lastCalled).toBe('togglePin');
		component.pin(null, true);
		expect(fakeSet.lastCalled).toBe('pin');
		component.pin(null, false);
		expect(fakeSet.lastCalled).toBe('unpin');
	});

	it('should be able to pass $event as first argument to stop propagation', () => {
		let calls = 0;
		const $event = {
			stopPropagation: () => {
				calls += 1;
			}
		};
		component.toggle($event);
		expect(calls).toBe(1);
		component.toggle($event, true);
		expect(calls).toBe(2);
		component.toggle($event, false);
		expect(calls).toBe(3);
		component.pin($event);
		expect(calls).toBe(4);
		component.pin($event, true);
		expect(calls).toBe(5);
		component.pin($event, false);
		expect(calls).toBe(6);
	});
});
