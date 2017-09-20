 //key = AIzaSyCXZxUdYbRvuZ0DEWGajzK8BeEXyrVsIgA 

jQuery(document).ready(function($) {
 var opeend = {
 	key:'AIzaSyCXZxUdYbRvuZ0DEWGajzK8BeEXyrVsIgA',
 	a:{
 		href:'',
 		id:'',
 		blogger:'',
 	},
 	url:'https://www.googleapis.com/blogger/v3/blogs/7532365568353843688/posts/',
 	parametro:'?alt=json&key=AIzaSyCXZxUdYbRvuZ0DEWGajzK8BeEXyrVsIgA',
 };
//click em links
$(document).on('click', 'a', function(event) {
	event.preventDefault();
	opeend.a.href = $(this).attr('href');
	opeend.a.id = $(this).attr('data-id') || false;
	opeend.a.blogger = $(this).attr('data-blogger') || false;
	console.log(opeend.a);

	if(opeend.a.id){
		//enviando o id
		getContent(opeend.a.id);
	}
	if(opeend.a.href === '#' && $(this).text() === 'Home'){
		$('#header').removeClass('active');
		$('#main-home').show();
		$('#post_content').hide();
	}

});
//Pegando conteudo
function getContent(id) {

$.ajax({
	url:opeend.url + id + opeend.parametro,
	type: 'GET',
	dataType: 'json',
})
.done(function(json) {

	console.log(json);
	var title = json.title;
	var content = json.content;
//buscando img
	var regex = /\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/g;
	var str =content ;
	var img;
	img = regex.exec(str)[1];
//buscando iframe
	var regex2 = /\<iframe.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/g;
	var iframe;
	iframe = regex2.exec(str)[0];
	console.log(iframe);
//alterando
$('#header').addClass('active');
$('.mask_img img').attr('src', img);
$('.embed-responsive').html(iframe);
$('.title_video h2').text(title);
$('.media_container').html(content);
$('#main-home').hide();
$('#post_content').show();

	

})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});

	
}


 });