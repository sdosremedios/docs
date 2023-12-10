function startIntro(){ 
    var intro = introJs();
    intro.setOptions({
        steps: [
            {
                element: '#step1',
                intro: '<p>Panoramas are interactive images that allow you see all around a particular spot. '
				+ 'You can click-drag right on the image to look around, or you can use the little control buttons at the bottom. '
				+ 'Many panoramas are best viewed full-screen (the right-most control button.)</p>',
				position: 'bottom'
            },
            {
                element: '#step2',
                intro: 'The Gallery is a collection of still images that you can view by clicking on a thumbnail. '
				+ 'You&apos;ll then have options to view next and previous images as well as start a slideshow.',
                position: 'top'
            }
        ]
    });

    intro.start();
}
