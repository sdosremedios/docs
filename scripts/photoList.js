/*
	display a table of photoset URLs

	Steven dosRemedios	-	24 Apr 2022

<div class="photoList" id="72157639083413676" title="Bird List" >Bird List</div>

jQuery(document).ready(function(){
	jQuery('div.photoList').each(function(){
		$setid = jQuery(this).attr('title');
		$divid = jQuery(this).attr('id');
		displayPhotoList($setid, $divid, 500);
	});

});
*/

function displayPhotoList(title, id, limit){
    
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos'
    + '&api_key=f770c1579e88ed1333d734b66be40388'
    + '&photoset_id=' + id 	// 72157678950568974'
    + '&format=json&nojsoncallback=1'
    + '&user_id=88827093%40N00'
    + '&per_page=' + limit
    + '&page=1';

    jQuery.getJSON(url, function(data){
//      jQuery('#' + id).html(jQuery('<h4></h4>').addClass('photosetTitle').text(title));
        var $table = jQuery('<table>').addClass('photosetTable')
        	.append('<tr><th>Title</th><th>URL</th></tr>');

        $.each(data.photoset.photo, function(i,item){
            var url = "https://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_b.jpg";
        	var $tr	= jQuery($('<tr>')
            		.append($('<td>').text(item.title),$('<td class="urlText">').text(url))
        		);
 //       	$tr.appendTo($table);
 			$table.append($tr);
		});
		$('#' + id).text('').append($('<h4>').addClass('photosetTitle').text(title),$table);
	})
};

/*

        		
*/  