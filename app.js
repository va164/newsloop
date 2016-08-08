$(function(){ // ready function
var pg = 0; // creating a new variable to count page number
$("#grid").hide(); //hiding results div 

$("#search-form").submit(function (event) { // inital submission of api request by user
	event.preventDefault();
	$("#grid").show();
	showArticles($("#query").val());
});

$("#grid").on('click', '.older', function(event) { // next page functionality 
	console.log("clicked the more button!");
	event.preventDefault();
	pg += 1
	showArticles($("#query").val());
	window.scrollTo(0, 0);
});

$("#grid").on('click', '.newer', function(event) { // previous page functionality
	console.log("clicked the more button!");
	event.preventDefault();
	pg += -1
	showArticles($("#query").val());
	window.scrollTo(0, 0);
});

function showArticles(keyword) {
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json" // API request parameters 
url += '?' + $.param({
	'api-key': "2780d8b74fe6429e8f8037d463875269",
	'q': keyword,
	'sort': "newest",
	'page': pg
});

var html = "";

$.ajax({  // AJAX Request 
	url: url,
	method: 'GET',
}).done(function(result) {
	console.log(result.response.docs.length);
	console.log(result.response.docs);
	if (result.response.docs.length != 0) {
	$.each(result.response.docs, function(index, article) {
		var time = ""
		function rTime() {  // function to calculate estimated reading time for an article
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
else {  // If search keyword produces no results
	html = "There were no available stories. Please try a different search keyword."
	$("#grid-item").html(html);
}}).fail(function(err) {
	throw err;
}); 
};
});