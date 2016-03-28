'use strict';

describe('chordy-chord controller', () => {
	let component, fakeSet;

	beforeEach(module('chordy'));

	beforeEach(inject(($rootScope, $componentController) => {
		const scope = $rootScope.$new();
		fakeSet = {
			add: angular.noop,
			remove: angular.noop,
			open: angular.noop,
			close: angular.noop,
			toggle: angular.noop,
			pin: angular.noop,
			unpin: angular.noop,
			togglePin: angular.noop
		};
		spyOn(fakeSet, 'add');
		spyOn(fakeSet, 'remove');
		spyOn(fakeSet, 'open');
		spyOn(fakeSet, 'close');
		spyOn(fakeSet, 'toggle');
		spyOn(fakeSet, 'pin');
		spyOn(fakeSet, 'unpin');
		spyOn(fakeSet, 'togglePin');
		component = $componentController('chordyChord', {
			$scope: scope,
			$element: angular.element('<div></div>')
		}, {
			setCtrl: fakeSet
		});
	}));

	it('should init chord', () => {
		component.$onInit();
		expect(fakeSet.add).toHaveBeenCalledTimes(1);
		expect(fakeSet.add).toHaveBeenCalledWith(component);
	});

	it('should destroy chord', () => {
		component.$onDestroy();
		expect(fakeSet.remove).toHaveBeenCalledTimes(1);
		expect(fakeSet.remove).toHaveBeenCalledWith(component);
	});

	it('should toggle chord', () => {
		component.toggle();
		expect(fakeSet.toggle).toHaveBeenCalledTimes(1);
		expect(fakeSet.toggle).toHaveBeenCalledWith(component);
	});

	it('should open chord', () => {
		component.toggle(null, true);
		expect(fakeSet.open).toHaveBeenCalledTimes(1);
		expect(fakeSet.open).toHaveBeenCalledWith(component);
	});

	it('should close chord', () => {
		component.toggle(null, false);
		expect(fakeSet.close).toHaveBeenCalledTimes(1);
		expect(fakeSet.close).toHaveBeenCalledWith(component);
	});

	it('should toggle pin chord', () => {
		component.pin();
		expect(fakeSet.togglePin).toHaveBeenCalledTimes(1);
		expect(fakeSet.togglePin).toHaveBeenCalledWith(component);
	});

	it('should pin chord', () => {
		component.pin(null, true);
		expect(fakeSet.pin).toHaveBeenCalledTimes(1);
		expect(fakeSet.pin).toHaveBeenCalledWith(component);
	});

	it('should unpin chord', () => {
		component.pin(null, false);
		expect(fakeSet.unpin).toHaveBeenCalledTimes(1);
		expect(fakeSet.unpin).toHaveBeenCalledWith(component);
	});

	it('should be able to pass $event as first argument to stop propagation', () => {
		const $event = {
			stopPropagation: angular.noop
		};
		spyOn($event, 'stopPropagation');
		component.toggle($event);
		expect($event.stopPropagation).toHaveBeenCalledTimes(1);
		component.toggle($event, true);
		expect($event.stopPropagation).toHaveBeenCalledTimes(2);
		component.toggle($event, false);
		expect($event.stopPropagation).toHaveBeenCalledTimes(3);
		component.pin($event);
		expect($event.stopPropagation).toHaveBeenCalledTimes(4);
		component.pin($event, true);
		expect($event.stopPropagation).toHaveBeenCalledTimes(5);
		component.pin($event, false);
		expect($event.stopPropagation).toHaveBeenCalledTimes(6);
	});
});
