'use strict';

describe('chordy', () => {
	let scope, $compile;

	beforeEach(module('chordy'));

	beforeEach(inject(($rootScope, _$compile_) => {
		scope = $rootScope.$new();
		$compile = _$compile_;
	}));

	it('should add classes', () => {
		const elem = $compile(`
			<chordy-set
				class="chordy-set"
				class-chord="chordy-chord"
				class-heading="chordy-heading"
				class-heading-opened="chordy-heading-opened"
				class-title="chordy-title"
				class-content="chordy-content">
				<chordy-chord opened="true" class="custom-chord">
					<chordy-title class="custom-title"></chordy-title>
				</chordy-chord>
			</chordy-set>
		`)(scope);
		scope.$digest();

		const chord = elem.children();
		const heading = chord.children().eq(0);
		const title = heading.children(0);
		const content = chord.children().eq(1);

		expect(elem.hasClass('chordy-set')).toBe(true);
		expect(chord.hasClass('chordy-chord')).toBe(true);
		expect(chord.hasClass('custom-chord')).toBe(true);
		expect(heading.hasClass('chordy-heading')).toBe(true);
		expect(heading.hasClass('chordy-heading-opened')).toBe(true);
		expect(title.hasClass('chordy-title')).toBe(true);
		expect(title.hasClass('custom-title')).toBe(true);
		expect(content.hasClass('chordy-content')).toBe(true);
	});

	it('should share chord controller instance in chordy-title scope', () => {
		const elem = $compile(`
			<chordy-set>
				<chordy-chord title="test-title" opened="true">
					<chordy-title>
						{{chord.title}}
					</chordy-title>
					{{chord.title}}
				</chordy-chord>
			</chordy-set>
		`)(scope);
		scope.$digest();

		expect(elem.find('chordy-title').text().trim()).toBe('test-title');
		expect(elem.children().children().eq(1).text().trim()).toBe('');
	});
});
