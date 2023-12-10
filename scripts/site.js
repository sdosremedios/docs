/*
if (location.protocol != 'https:') {
	location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}
*/
jQuery(document).ready(function(){
	jQuery(".readmore span").text('See more ...');
	jQuery("a.highslide").attr("onclick","return hs.expand(this)");
	jQuery('div.photoset').each(function(){
		var $setid = jQuery(this).attr('title');
		var $divid = jQuery(this).attr('id');
		displayPhotoSet($setid, $divid, 300);
	});

//	forum footer text
	$("a").filter(function() {
		return $(this).text() === "Powered by";
	}).parent().attr('display','none');

//	banner text
	jQuery('<p id="bannerCaption" style="font-weight: bold; padding-left: 20px; color: white;">North Rim, Grand Canyon</p>')
		.insertAfter('div.logo-image');
	
//	nav navbar-nav level0
	jQuery('ul.addTag a, ul.nav.navbar-nav.level0 a, .readmore a, .system-readmore a, h3 a, .pagination a, h2.article-title a, .modulemenu-items a').each(function(){
		var $this = $(this);
		var href = $this.attr('href') + '#t4-megamenu-mainmenu';
		$this.attr('href',href);
	});

	$('.helpButton').click(function(){
		var pos = $(this).position();
		var $help = $('#photoHelp').css({position: "absolute", top: pos.top + 'px', left: pos.left + 'px'});
		$help.is(':visible') ? $help.hide() : $help.show().draggable();
	});

	$('#photoHelp').click(function(){
		$(this).hide();
	});
	
/* <div class="videoBox" id="VIDEO_ID" title="Click on CC icon to view captions.">Video Slideshow</div> */	
    $('div.videoBox').each(function(){
		var $this = $(this).css('width','100%');
		var id = $this.attr('id');
		var h5 = $this.html(); $this.html('');
		var text = $this.attr('title');
		if (text != '') { text = '<br/>' + text; }
		var $frame = $('<iframe class="video" frameborder="0" '
			+ 'modestbranding="1" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>')
			.attr('src','https://www.youtube.com/embed/' + id + '?rel=0').css('width','100%').css('min-height','320px'); 
		var $p = $('<p></p>').html('For best results, play fullscreen at the highest resolution your network connection permits. ' + text);
		$this.append($('<h5></h5>').html(h5),$frame,$p);
    });

/*	<div class="photoDescription" data-file="IMAGE" data-class="photoLeft" ><p>DESCRIPTION</p></div> */
	jQuery('div.photoDescription').each(function(){
		var $this = $(this);
		var caption = $this.attr('title');
		var $caption = jQuery('<div class="highslide-caption">')
			.append(jQuery('<span class="caption">').text(caption));
		var srcImage = $this.attr('data-file');
		var pClass = $this.attr('data-class');
		
		var $p = $('<p/>').addClass(pClass ? pClass : 'photoLeft')
			.append($('<a class="highslide" title="Click to enlarge" onclick="return hs.expand(this)"></a>').attr('href',srcImage)
				.append($('<img alt="" style="width: 240px;"/>').attr('src',srcImage)),$caption,$('<br/>')).append(caption);
		$p.insertBefore($this.children('p').first());
	});

/*	<p class="photoDisplay" title="IMAGE_CAPTION" data-class="photoLeft" data-file="IMAGE_FILE"></p> */
    $('p.photoDisplay').each(function(){
		var $this = $(this);
		var caption = $this.attr('title');
		var srcImage = $this.attr('data-file');
		var pClass = $this.attr('data-class');
		var $caption = jQuery(jQuery('<div class="highslide-caption">')
			.append(jQuery('<span class="caption">').text(caption)));
		var $link = jQuery();

		
		$this.addClass(pClass ? pClass : 'photoLeft')
			.append($('<a class="highslide" title="Click to enlarge" onclick="return hs.expand(this)">').attr('href',srcImage)
				.append($('<img alt="" style="width: 240px;"/>').attr('src',srcImage)), $caption,'<br/>',caption);
   });

/*	<p><img class="showImage" src="IMAGE" data-class="photoLeft photoBig" title="CAPTION" data-width="WIDTH" style="width: 240px;" /></p> */
    $('img.showImage').each(function(){
		var $this = $(this);
		var width = $this.attr('data-width');
		$this.css('width','99%');
		var $p = $this.parent();
		if (width != '') $p.css('width',width);
		
		var src = $this.attr('src');
		var pClass = $this.attr('data-class');
		var caption = $this.attr('title');
		$this.attr('title','Click to enlarge');
		var $caption = jQuery(jQuery('<div class="highslide-caption">'))
			.append(jQuery('<span class="caption">').text(caption));

		var $link = $('<a/>').addClass('highslide').attr('href',src).attr('title',caption).attr('onclick','return hs.expand(this)').append($this);
		$p.addClass(pClass).append($link,$caption,'<br/>',caption);
    });

/*	<div class="photoList" data-id="72157639083413676" title="Bird List" >Bird List</div>	*/
	$('div.photoList').each(function(){
		var title = jQuery(this).attr('title');
		var id = jQuery(this).attr('data-id');
		var limit = 300;
//		displayPhotoList($setid, $divid, 500);
		var url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos'
		+ '&api_key=f770c1579e88ed1333d734b66be40388'
		+ '&photoset_id=' + id 	// 72157678950568974'
		+ '&format=json&nojsoncallback=1'
		+ '&user_id=88827093%40N00'
		+ '&per_page=' + limit
		+ '&page=1';

		jQuery.getJSON(url, function(data){
			var $table = jQuery('<table>').addClass('photosetTable')
				.append('<tr><th>Title</th><th>URL</th></tr>');

			$.each(data.photoset.photo, function(i,item){
				var photoUrl = "https://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_b.jpg";
				var $tr	= jQuery($('<tr>')
						.append($('<td>').text(item.title),$('<td class="urlText">').text(photoUrl))
					);
				$table.append($tr);
			});
			$('div[data-id=' + id + ']').text('').append($('<h4 class="accordion photosetTitle">').text(title),$table);
		})
	});
	
/* panoBox
	$('div.panoBox').each(function(){
		var $this = $(this);
		var id = $this.attr('id');
		var $h5 = $('<h5>').text($this.attr('title'));	
		var width = $this.width();
		var height = $this.height();
		var $p = $('<p>').text('{ggpkg file="' + $this.attr('id') 
			+ '.ggpkg" start preview="true" display_map="true" width="' 
			+ width + '" height="' + height + '"}');
		$this.append($('<h5>').text($this.attr('title'))
			.append($('<p>').text('{ggpkg file="' + $this.attr('id') 
			+ '.ggpkg" start_preview="true" display_map="true" width="' 
			+ width + '" height="' + height + '"}')));
	});	
 */	
	
	/* OpenSeadragon */
	$('div.OpenSeadragon').each(function(){
		var $this = $(this);
	    $this.before('<p>').attr('title','Use scroll wheel to zoom or click image').addClass('emphasis').text('Superzoom this image');
//	    $this.after('<hr />');
	    
		var id = $this.attr('id');
		var viewer = OpenSeadragon({
	        id: id,
	        prefixUrl: "/openseadragon/images/",
	        tileSources: "/docs/images/" + id + "/GeneratedImages/dzc_output.xml",
	        defaultZoomLevel: 1
	    });
	});

	/* accordion */
	$('.accordion').next().hide();	
	$('.accordion.visible').removeClass('visible').removeClass('hide').addClass('show').next().show();
	$('.accordion.show').next().show();	
	$('.accordion').click(function(){
		var $this = $(this);
		if ($this.next().is(':visible')) {
			$this.removeClass('show').addClass('hide').next().hide();
		}
		else {
			$('.accordion').removeClass('show').addClass('hide').next().hide();
			$this.removeClass('hide').addClass('show').next().show();
			var yPos1 = $('body').scrollTop();
			var offset = $this.offset().top;
			window.scrollTo(0,yPos1+offset);
		}
	});

//  $("#cookieConsent").hide();
	var domain = 'travelshot.photography';
    var cookie = getCookie(domain);
	if (cookie != 1) {
      $("#cookieConsent").fadeIn(200);
    }
    $("#closeCookieConsent").click(function() {
    	setCookie(domain,0,0);
        $("#cookieConsent").fadeOut(200);
    }); 
    $(".cookieConsentOK").click(function() {
    	setCookie(domain,1);
        $("#cookieConsent").hide();
    }); 
});

function displayPhotoSet(title, id, limit){
    
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos'
    + '&api_key=f770c1579e88ed1333d734b66be40388'
    + '&photoset_id=' + id 	// 72157678950568974'
    + '&format=json&nojsoncallback=1'
    + '&user_id=88827093%40N00'
    + '&per_page=' + limit
    + '&page=1';

    jQuery.getJSON(url, function(data){
        var $set = jQuery('#' + id).html('').append(jQuery('<h6></h6>').addClass('photosetTitle').html(title));
        var $ul  = jQuery('<ul></ul>').addClass('photosetList').appendTo('#' + id);

        $.each(data.photoset.photo, function(i,item){
 //         var url  = "https://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret;
            var url  = "https://live.staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret;
            var href = url + "_b.jpg";
            var src  = url + "_s.jpg";
			var $cLink = jQuery(jQuery('<a>')).attr('href','#t3-mainnav').attr('title','Top').text('Top');
			var $caption = jQuery(jQuery('<div class="highslide-caption">'))
				.append(jQuery('<span class="caption">').text(item.title)/*.append('<br/>',$cLink)*/);
            
            var $link = jQuery('<a/>').addClass('highslide').attr('title',item.title)
                .attr('onclick','return hs.expand(this, { slideshowGroup: "g' + id + '",width:800 })')
                .attr('href',href)
                .append(jQuery("<img/>").attr("src", src).attr('title',item.title).attr('alt',item.title));
            var $p = jQuery('<li></li>').addClass('photosetItem').append($link, $caption);
            jQuery($p).appendTo($ul);
        });
        jQuery($ul).appendTo($set);
    });
}

function setCookie(key, value, days) {
    var expires = new Date();
    if (days) {
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
    } else {
        document.cookie = key + '=' + value + ';expires=Fri, 30 Dec 9999 23:59:59 GMT;';
    }
}
function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}
