function startIntro(){
	var intro = introJs();
	intro.setOptions({
		steps: [
			{
				element: '#step1',
				intro: '<strong>Panorama</strong><br/>Drag your cursor on the image to look around<br/>Use the Shift/Ctl keys to zoom in and out<br/><strong>Map</strong><br/>Select a map marker to display a panorama.<br/>The panorama orientation is displayed on the map.'
			}
		]
	});
	intro.start();
}
/*
function startIntro(){
	var intro = introJs();
	intro.setOptions({
		steps: [
			{
				element: '#step1',
				intro: 'This is a <b>bold</b> tooltip.<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>'
			},
			{
				element: '#step2',
				intro: "Ok, <i>wasn&apos;t</i> that fun?",
				position: 'right'
			},
			{
				element: '#step3',
				intro: 'More features, more <span style="color: red;">f</span><span style="color: green;">u</span><span style="color: blue;">n</span>.',
				position: 'left'
			},
			{
				element: '#step4',
				intro: '<span style="font-family: Courier New">Another step with new font!</span>',
				position: 'bottom'
			},
			{
				element: '#step5',
				intro: '<strong>Get</strong> it, <strong>use</strong> it.'
			}
		]
	});

	intro.start();
}
*/
