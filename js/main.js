var searchButton = document.getElementById("searchButton");
var resultList = document.getElementById('resultList');
var fetchMoreButton = document.getElementById("fetchMoreButton");
var startIndex = 0;
var clearButtons = document.getElementsByClassName("clear");

//Functionality of the two buttons that clear the search result. They get event listeners that listens for click, and then they remove everything inside resultList (ul) and totalItems (p).
for (clearButton of clearButtons){
	clearButton.addEventListener("click", function () {
	resultList.innerHTML = "";
	var totalItems = document.getElementById("totalItems");
	totalItems.innerHTML = "";
	//this hides both clear buttons and the Show more button until another searh is made
	for (clearButton of clearButtons){
		clearButton.style.display = "none";
		fetchMoreButton.style.display = "none";
	}
});
}

//When the search button is clicked it gets the value of the search field and then runs the fetchBooks function. If the user clicked the search button without writing anything in the search field, they get and alert asking them to write something.
searchButton.addEventListener("click", function () {
	let search = document.getElementById("search").value;
	if (search.length != 0){
		fetchBooks(search);
	}
	else {
		alert("Write something in the input field!");
	}
});

//This button runs the fetchMoreBooks function when clicked. fetchMoreBooks fetches 10 more books and displays them in the resultList (ul).
fetchMoreButton.addEventListener("click", function () {
	let search = document.getElementById("search").value;
	fetchMoreBooks(search);
});

function fetchBooks(search) {
	//clearbuttons become visible
	for (clearButton of clearButtons){
		clearButton.style.display = "inline-block";
	}
	//resultList is cleared of results of earlier searches.
	resultList.innerHTML = "";
	
	//Fetch request using the user input as search term
	fetch('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyDjFVfZ78ssXLZ--xm1jcyd2IHvOF-mcec')
	//Converting response from json to Javascript
		.then(function (response) {
			return response.json();
		})
		.then(function (search) {
		//Writing out how many books were found
		var totalItems = document.getElementById("totalItems");
		totalItems.innerHTML = `Found ${search.totalItems} titles`;
		
		//looping through book objects from the search response and adding information to a list item called resultItem.
			for (i = 0; i < search["items"].length; i++) {
				var resultItem = document.createElement('li');
				resultItem.innerHTML = `<p>${i + 1}</p>
					<h3>${search.items[i].volumeInfo.title}</h3>
					<p><strong>Author:</strong> <div id=${search.items[i].id}"author">Could not find the author(s) of this book</div><br/>
					<div class = "hidden">
					<img id=${search.items[i].id}"bookImage" src="../images/dummybook.jpeg"><br/>
					<strong>Published:</strong> ${search.items[i].volumeInfo.publishedDate}<br/>
					<strong>Country:</strong> ${search.items[i].saleInfo.country}<br/>
					<strong>Category:</strong> ${search.items[i].volumeInfo.categories}<br/>
					<strong>Description:</strong> <div id=${search.items[i].id}"bookDescription">Could not find a description of this book.</div>
					<strong>Google Books link:</strong> <a href=${search.items[i].volumeInfo.previewLink}>${search.items[i].volumeInfo.previewLink}</a><br/>
					<strong>Average rating:</strong> <div id=${search.items[i].volumeInfo.averageRating}"rating">No rating</div>
					</div>
					<button type="button" class="btn btn-outline-primary btn-sm show">Show more</button>
					</p>`;
				resultList.appendChild(resultItem);
				
				//if the author of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.authors != undefined){
					var bookAuthor = document.getElementById(`${search.items[i].id}"author"`);
					bookAuthor.innerHTML = search.items[i].volumeInfo.authors;
				}
				
				//if the image of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.imageLinks != undefined){
					var bookImage = document.getElementById(`${search.items[i].id}"bookImage"`);
					bookImage.src = search.items[i].volumeInfo.imageLinks.smallThumbnail;
				}
				//if the decription of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.description != undefined)
					{
					var bookDescription = document.getElementById(`${search.items[i].id}"bookDescription"`);
					bookDescription.innerHTML = search.items[i].volumeInfo.description;
				}
				//if average rating of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.averageRating != undefined)
					{
					var rating = document.getElementById(`${search.items[i].volumeInfo.averageRating}"rating"`);
					rating.innerHTML = search.items[i].volumeInfo.averageRating;
				}
			}
		//Show more button for every result item. It shows the content of a hidden div.
			var showButtons = document.getElementsByClassName("show");
			for (button of showButtons) {
				button.addEventListener("click", function () {
					var hiddenDiv = this.previousElementSibling;
					hiddenDiv.classList.toggle("hidden");

					if (this.innerHTML == "Show more") {
						this.innerHTML = "Hide"
					} 
					else if (this.innerHTML == "Hide") {
						this.innerHTML = "Show more";
					}
				})
			}
		
			// Display Show 10 more titles button
			fetchMoreButton.style.display = "inline-block";
			//Increase the startindex by 10. Startindex is used when fetching more books.
			startIndex = startIndex + 10;
		})
	//Show the user a message with alert if something goes wrong.
	.catch(function(error){
		alert("There has been a problem: " + error.message);
	})
}

//This function is very similar to fetchBooks (see above in code) but is uses startindex in the fetch URL
function fetchMoreBooks(search) {
	fetch('https://www.googleapis.com/books/v1/volumes?q=' + search + '&startIndex=' + startIndex + '&key=AIzaSyDjFVfZ78ssXLZ--xm1jcyd2IHvOF-mcec')
		.then(function (response) {
			return response.json();
		})
		.then(function (search) {
			for (i = 0; i < search["items"].length; i++) {
				var resultItem = document.createElement('li');
				resultItem.innerHTML = `
					<p>${startIndex + i + 1}</p>
					<h3>${search.items[i].volumeInfo.title}</h3>
					<p><strong>Author:</strong> <div id=${search.items[i].id}"author">Could not find the author(s) of this book</div><br/>
					<div class = "hidden">
					<img id=${search.items[i].id}"bookImage" src="../images/dummybook.jpeg"><br/>
					<strong>Published:</strong> ${search.items[i].volumeInfo.publishedDate}<br/>
					<strong>Country:</strong> ${search.items[i].saleInfo.country}<br/>
					<strong>Category:</strong> ${search.items[i].volumeInfo.categories}<br/>
					<strong>Description:</strong> <div id=${search.items[i].id}"bookDescription">Could not find a description of this book.</div>
					<strong>Google Books link:</strong> <a href=${search.items[i].volumeInfo.previewLink}>${search.items[i].volumeInfo.previewLink}</a><br/>
					<strong>Average rating:</strong> <div id=${search.items[i].volumeInfo.averageRating}"rating">No rating</div>
					</div>
					<button type="button" class="btn btn-outline-primary btn-sm show">Show more</button>
					</p>`;
				resultList.appendChild(resultItem);
				//if the author of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.authors != undefined){
					var bookAuthor = document.getElementById(`${search.items[i].id}"author"`);
					bookAuthor.innerHTML = search.items[i].volumeInfo.authors;
				}
				
				//if the image of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.imageLinks != undefined){
					var bookImage = document.getElementById(`${search.items[i].id}"bookImage"`);
					bookImage.src = search.items[i].volumeInfo.imageLinks.smallThumbnail;
				}
				//if the decription of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.description != undefined)
					{
					var bookDescription = document.getElementById(`${search.items[i].id}"bookDescription"`);
					bookDescription.innerHTML = search.items[i].volumeInfo.description;
				}
				//if average rating of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.averageRating != undefined)
					{
					var rating = document.getElementById(`${search.items[i].volumeInfo.averageRating}"rating"`);
					rating.innerHTML = search.items[i].volumeInfo.averageRating;
				}
			}
			var showButtons = document.getElementsByClassName("show");
			for (button of showButtons) {
				button.addEventListener("click", function () {
					var hiddenDiv = this.previousElementSibling;
					hiddenDiv.classList.toggle("hidden");

					if (this.innerHTML == "Show more") {
						this.innerHTML = "Hide"
					} 
					else if (this.innerHTML == "Hide") {
						this.innerHTML = "Show more";
					}
				})
			}
			startIndex = startIndex + 10;
		})
	.catch(function(error){
		alert("There has been a problem: " + error.message);
	})
}

var genre;

//Buttons to search for books in specific genres. when clicked they set the variable genre to the genre to search fo, and then runs the searchGenre function.
var dramaButton = document.getElementById("drama");
dramaButton.addEventListener("click", function () {
	genre = "drama";
	searchGenre();
})

var juvenileButton = document.getElementById("juvenile");
juvenileButton.addEventListener("click", function () {
	genre = "juvenile";
	searchGenre();
});
var ghostButton = document.getElementById("ghost");
ghostButton.addEventListener("click", function () {
	genre = "ghost";
	searchGenre();
});
var educationButton = document.getElementById("education");
educationButton.addEventListener("click", function () {
	genre = "education";
	searchGenre();
});
var religionButton = document.getElementById("religion");
religionButton.addEventListener("click", function () {
	genre = "religion";
	searchGenre();
});
var graphicButton = document.getElementById("graphic");
graphicButton.addEventListener("click", function () {
	genre = "Graphic+Novels";
	searchGenre();
});

//Functionality of the two buttons that clear the genre search result. They get event listeners that listens for click, and then they remove everything inside genreList (ul).
var clearGenreButtons = document.getElementsByClassName("clearGenre");
for (clearGenreButton of clearGenreButtons){
clearGenreButton.addEventListener("click", function () {
	var genreList = document.getElementById("genreList");
	genreList.innerHTML = "";
	for (clearGenreButton of clearGenreButtons){
	clearGenreButton.style.display = "none";
	}
});
}

//This functions is very similar to the other fetch requests (see above in code), but searches for genre instead of a string from user input.
function searchGenre () {
	for (clearGenreButton of clearGenreButtons){
	clearGenreButton.style.display = "block";
	}
	var genreList = document.getElementById('genreList');
	genreList.innerHTML = "";
	fetch('https://www.googleapis.com/books/v1/volumes?q=subject:' + genre + '&key=AIzaSyDjFVfZ78ssXLZ--xm1jcyd2IHvOF-mcec')
		.then(function (response) {
			return response.json();
		})
		.then(function (search) {
			for (i = 0; i < search["items"].length; i++) {
				var resultItem = document.createElement('li');
				resultItem.innerHTML = `<p>${i + 1}</p>
					<h3>${search.items[i].volumeInfo.title}</h3>
					<p><strong>Author:</strong> <div id=${search.items[i].id}"author">Could not find the author(s) of this book</div><br/>
					<div class = "hidden">
					<img id=${search.items[i].id}"bookImage" src="../images/dummybook.jpeg"><br/>
					<strong>Published:</strong> ${search.items[i].volumeInfo.publishedDate}<br/>
					<strong>Country:</strong> ${search.items[i].saleInfo.country}<br/>
					<strong>Category:</strong> ${search.items[i].volumeInfo.categories}<br/>
					<strong>Description:</strong> <div id=${search.items[i].id}"bookDescription">Could not find a description of this book.</div>
					<strong>Google Books link:</strong> <a href=${search.items[i].volumeInfo.previewLink}>${search.items[i].volumeInfo.previewLink}</a><br/>
					<strong>Average rating:</strong> <div id=${search.items[i].volumeInfo.averageRating}"rating">No rating</div>
					</div>
					<button type="button" class="btn btn-outline-primary btn-sm show">Show more</button>
					</p>`;
				genreList.appendChild(resultItem);
				//if the author of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.authors != undefined){
					var bookAuthor = document.getElementById(`${search.items[i].id}"author"`);
					bookAuthor.innerHTML = search.items[i].volumeInfo.authors;
				}
				
				//if the image of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.imageLinks != undefined){
					var bookImage = document.getElementById(`${search.items[i].id}"bookImage"`);
					bookImage.src = search.items[i].volumeInfo.imageLinks.smallThumbnail;
				}
				//if the decription of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.description != undefined)
					{
					var bookDescription = document.getElementById(`${search.items[i].id}"bookDescription"`);
					bookDescription.innerHTML = search.items[i].volumeInfo.description;
				}
				//if average rating of the book from the API is not undefined, use it.
				if (search.items[i].volumeInfo.averageRating != undefined)
					{
					var rating = document.getElementById(`${search.items[i].volumeInfo.averageRating}"rating"`);
					rating.innerHTML = search.items[i].volumeInfo.averageRating;
				}
			}
			var showButtons = document.getElementsByClassName("show");
			for (button of showButtons) {
				button.addEventListener("click", function () {
					var hiddenDiv = this.previousElementSibling;
					hiddenDiv.classList.toggle("hidden");

					if (this.innerHTML == "Show more") {
						this.innerHTML = "Hide"
					} 
					else if (this.innerHTML == "Hide") {
						this.innerHTML = "Show more";
					}
				})
			}
	})
	.catch(function(error){
		alert("There has been a problem: " + error.message);
	})
}