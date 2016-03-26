'use strict';

describe('chordy-chord controller', () => {
	let $componentController, scope;

	beforeEach(module('chordy'));

	beforeEach(inject(($rootScope, _$componentController_) => {
		scope = $rootScope.$new();
		$componentController = _$componentController_;
	}));

	it('should have set-like methods', () => {
		const methods = [
			'open',
			'close',
			'toggle',
			'pin',
			'unpin',
			'togglePin'
		];
		const fakeSetController = {
			calls: 0
		};
		methods.forEach(method => {
			fakeSetController[method] = function () {
				this.calls += 1;
			}
		});
		const component = $componentController('chordyChord', {
			$scope: scope,
			$element: angular.element('<div></div>')
		}, {
			setCtrl: fakeSetController
		});
		methods.forEach(method => {
			expect(typeof component[method]).toBe('function');
			let calls = 0;
			component[method]({
				stopPropagation: () => {
					calls += 1;
				}
			});
			expect(calls).toBe(1);
			expect(() => {
				component[method]();
			}).not.toThrow();
		});
		expect(fakeSetController.calls).toBe(methods.length * 2);
	});
});
