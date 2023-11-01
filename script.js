var myVar = setInterval(function () {
  myTimer();
}, 1000);

function myTimer() {
  var d = new Date();
  document.getElementById("clock").innerHTML = d.toLocaleTimeString();
}

var date = new Date(),
  weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
  day = weekday[date.getDay()],
  style = "color:#eee;text-shadow:0px 2px 2px rgba(0,0,0,0.9);";
document.getElementById(day).style.cssText = style;


// Function to fetch and display news headlines
function fetchNews() {
	var rssFeedURL = 'https://www.haberturk.com/rss/manset.xml';
	var proxyURL = 'https://cors-anywhere.herokuapp.com/';

	// Fetch RSS feed using CORS Proxy
	fetch(proxyURL + rssFeedURL)
			.then(response => response.text())
			.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
			.then(data => parseRSS(data))
			.catch(error => {
					console.error('Error fetching RSS feed:', error);
			});
}

// Function to parse XML and display headlines
function parseRSS(xml) {
	var items = xml.querySelectorAll("item");
	var newsFeed = document.getElementById('news-feed');
	newsFeed.innerHTML = ''; // Clear existing headlines


	/* get just 1 headline */
	items.forEach(function(item, index) {
		var title = item.querySelector("title").textContent.trim();
		var description = item.querySelector("description").textContent.trim();
		var link = item.querySelector("link").textContent.trim();

		var listItem = document.createElement('li');
		listItem.innerHTML = `<strong>${title}</strong>`;

		var random = Math.floor(Math.random() * 3) + 1;
		if (index == random) {
			newsFeed.appendChild(listItem);
		}
		else {
			return false;
		}
	});

}

// Fetch news headlines initially
fetchNews();


// Set interval to fetch news every 5 minutes (300,000 milliseconds)
setInterval(fetchNews, 300000);
