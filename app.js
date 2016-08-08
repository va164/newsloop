$(function(){
var pg = 0;
$("#grid").hide();

$("#search-form").submit(function (event) {
	event.preventDefault();
	$("#grid").show();
	showArticles($("#query").val());
});

$("#grid").on('click', '.older', function(event) {
	console.log("clicked the more button!");
	event.preventDefault();
	pg += 1
	showArticles($("#query").val());
	window.scrollTo(0, 0);
});

$("#grid").on('click', '.newer', function(event) {
	console.log("clicked the more button!");
	event.preventDefault();
	pg += -1
	showArticles($("#query").val());
	window.scrollTo(0, 0);
});

function showArticles(keyword) {
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
url += '?' + $.param({
	'api-key': "2780d8b74fe6429e8f8037d463875269",
	'q': keyword,
	'sort': "newest",
	'page': pg
});

var html = "";
var imgurl = "https://static01.nyt.com/";
$.ajax({
	url: url,
	method: 'GET',
}).done(function(result) {
	console.log(result.response.docs.length);
	console.log(result.response.docs);
	if (result.response.docs.length != 0) {
	$.each(result.response.docs, function(index, article) {
		var time = ""
		function rTime() {
			rTime = article.word_count/130;
			time = Math.ceil(rTime);
		}
		rTime();
		html = html + "<li>" + "<a href=\""+article.web_url+"\"  data-lity>" + article.headline.main + "<div class='wCount'>" + time + " mins - " + "(" +article.word_count + " words)</div>" + "</a><div class='descBox'><div class='desc'>" + article.snippet + "</div></div>" + "</li>"
	});
	$("#grid-item").html(html + "<div><div class='newer'><-- Newer Articles</div><div class='older'>Older articles --></div></div>");
	if (pg == 0) {
		$(".newer").hide();
	};
}
else {
	html = "There were no available stories. Please try a different search keyword."
	$("#grid-item").html(html);
}}).fail(function(err) {
	throw err;
}); 
};




});