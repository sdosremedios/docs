/*
videoBox v 1.0.0

Steven dos Remedios
03 March 2022

<div class="videoBox" id="pcljQJXASqQ" title="Enjoy the Cumbia music.">Video Slideshow</div>
<h4>Video Slideshow</h4>
<iframe width="270" height="152" src="https://www.youtube.com/embed/pcljQJXASqQ?rel=0" frameborder="0" modestbranding="1" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>
<p>For best results, play fullscreen at the highest resolution your network connection permits.<br />Enjoy the Cumbia music.</p>
</div>
*/
function videoBox($this) {
//  var $this = $(this);
    var id = $this.attr('id');
    var h4 = $this.html(); $this.html('');
    var text = $this.attr('title');
	if (text != '') { text = '<br/>' + text; }
    var $frame = $('<iframe width="270" height="152" frameborder="0" '
		+ 'modestbranding="1" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>')
        .attr('src','https://www.youtube.com/embed/' + id + '?rel=0');
    var $p = $('<p></p>').html('For best results, play fullscreen at the highest resolution your network connection permits. ' + text);
    $this.append($('<h4></h4>').html(h4),$frame,$p);
}
