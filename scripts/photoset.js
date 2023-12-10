/*
	display a photoset of public Flickr images

	Steven dosRemedios	-	15 Sep 2017
*/

function displayPhotoSet(title, id, limit){
    
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos'
        + '&api_key=f770c1579e88ed1333d734b66be40388'
        + '&photoset_id=' + id 	// 72157678950568974'
        + '&format=json&nojsoncallback=1'
        + '&user_id=88827093%40N00'
        + '&per_page=' + limit
        + '&page=1';
    
        jQuery.getJSON(url, function(data){
            var $set = jQuery('#' + id).html('').append(jQuery('<h4></h4>').addClass('photosetTitle').html(title));
            var $ul  = jQuery('<ul></ul>').addClass('photosetList').appendTo('#' + id);
    
            $.each(data.photoset.photo, function(i,item){
 //             var url  = "https://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret;
                var url  = "https://live.static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret;
                var href = url + "_b.jpg";
                var src  = url + "_s.jpg";
				var $cLink = jQuery(jQuery('<a>')).attr('href','#t4-mainnav').attr('title','Top').text('Top');
				var $caption = jQuery(jQuery('<div class="highslide-caption">'))
					.append(jQuery('<span class="caption">').text(item.title)/*.append('<br/>',$cLink)*/);
                
                var $link = jQuery('<a/>').addClass('highslide').attr('title',item.title)
                    .attr('onclick','return hs.expand(this, { slideshowGroup: "' + id + '",width:800 })')
                    .attr('href',href)
                    .append(jQuery("<img/>").attr("src", src).attr('title',item.title).attr('alt',item.title));
                var $p = jQuery('<li></li>').addClass('photosetItem').append($link, $caption);
                jQuery($p).appendTo($ul);
            });
            jQuery($ul).appendTo($set);
        });
    }
    
    // displayPhotoSet('Khajuraho', '72157678950568974', 300);
    /*
    https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
    
    https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos
    &api_key=f770c1579e88ed1333d734b66be40388
    &photoset_id=72177720304348153
    &user_id=88827093%40N00
    &format=json&nojsoncallback=1
    
    <head>
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="/docs/scripts/highslide/highslide-full.min.js"></script>
    <script type="text/javascript" src="/docs/scripts/highslide/photoset.js"></script>
    <link type="text/css" rel="stylesheet" href="/docs/scripts/highslide/highslide.css" />
    <link type="text/css" rel="stylesheet" href="/docs/css/photoset.css" />
    </head>
    <body>
		<div id="72157689016817235" class="photoset" title="Three Bars Ranch">
			<h4 class="photosetTitle">Three Bars Ranch</h4>
			<ul class="photosetList">
				<li class="photosetItem">
					<a class="highslide " title="Jinglers" onclick="return hs.expand(this, { slideshowGroup: &quot;72157689016817235&quot; })"
						href="https://farm5.static.flickr.com/4365/37072640991_962221c873_b.jpg">
						<img src="https://farm5.static.flickr.com/4365/37072640991_962221c873_s.jpg" title="Jinglers" alt="Jinglers">
					</a><br>
					<span class="caption">Jinglers</span>
				</li>        
			</ul>
		</div>
    </body>
    */
    