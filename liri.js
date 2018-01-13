var dotenv = require("dotenv").config(); 
var fs = require("fs"); 
var key = require("./key.js"); 
var Twitter = require("twitter"); 
var spotifyAPI = require("node-spotify-api");
var request = require("request"); 



var command = process.argv[2];
var track = process.argv[3];

switch (command) {
	case "my-tweets": 
		myTweets();
};



function myTweets() {
	var client = new Twitter(key);
	var parameters = {
		screen_name: 'slowtocode', 
		count: 20
	};
client.get('statuses/user_timeline', parameters, function(error, tweets, response){
	if (error){
		console.log(error);
	}
	else {
		console.log("Amanda's tweets");
		tweets.forEach(function(userTweets){
			console.log("Date: " + userTweets.created_at);
			console.log(userTweets.text);
		}); 
		};
	});
}; 

function spotifyThisSong(track) {
	if (track === undefined){
		track = "The Sign by Ace of Base";
	}
var spotify = new spotifyAPI({
	id: "493a072918fc4c219a7e302f9880e5b9",
	secret: "b1e2191ee570456e8276d65a12808ce6"
});
spotify.serch({type: 'track', query: track}, function(error, data){
	if (error) {
		return console.log("ERROR" + error);
	}
	console.log("Artist" + data.tracks.items[0].album.artists[0].name);
	console.log("Title" + data.tracks.items[0].name);
	console.log("Album" + data.tracks.items[0].album.name);
	console.log("Preview" + data.tracks.items[0].external_urls.spotify);
}) 

}; 

function movieThis() {

}; 

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(error, data){
		if (error){
			return console.log(error); 
		}
		else {
			doWhat = data.split(",");
			spotifyThisSong(doWhat[0], doWhat[1]);
		}
	})
}; 