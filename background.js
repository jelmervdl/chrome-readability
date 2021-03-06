var Readability = function(oauth)
{
	this.oauth = oauth;
}

Readability.prototype.root = 'https://www.readability.com/api/rest/v1';

Readability.prototype.getUnread = function(callback)
{
	var url = this.root + '/bookmarks';

	var request = {
		'method': 'GET',
		'parameters': {
			'archive': '0'
		}
	};

	var request_callback = function(response, xhr)
	{
		var data = JSON.parse(response);
		callback(data.bookmarks);
	}

	this.oauth.sendSignedRequest(url, request_callback, request);
}

var oauth = ChromeExOAuth.initBackgroundPage({
	'request_url': 'https://www.readability.com/api/rest/v1/oauth/request_token/',
	'authorize_url': 'https://www.readability.com/api/rest/v1/oauth/authorize/',
	'access_url': 'https://www.readability.com/api/rest/v1/oauth/access_token/',

	'consumer_key': 'jelmervdl',
	'consumer_secret': 'VeLU6VF2wnfvYLjnsXdgtX5CVWSVv46Z',

	'scope': 'https://www.readability.com/',
	'app_name': 'Chrome Readability Extension',

	'callback_page': 'oauth_callback.html'
});

var readability = new Readability(oauth);

oauth.authorize(function() {
	readability.getUnread(function(bookmarks) {
		console.log(bookmarks);
		localStorage['bookmarks'] = JSON.stringify(bookmarks);
	});
});
