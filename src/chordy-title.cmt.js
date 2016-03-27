angular.module('chordy')
	.directive('chordyTitle', () => {
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
