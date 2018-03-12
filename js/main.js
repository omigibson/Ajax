var searchButton = document.getElementById("searchButton");
var resultList = document.getElementById('resultList');
var fetchMoreButton = document.getElementById("fetchMoreButton");
var search;
var startIndex = 0;
var clearButtons = document.getElementsByClassName("clear");

for (clearButton of clearButtons){
clearButton.addEventListener("click", function () {
	resultList.innerHTML = "";
	var totalItems = document.getElementById("totalItems");
	totalItems.innerHTML = "";
	for (clearButton of clearButtons){
	clearButton.style.display = "none";
	}
});
}

searchButton.addEventListener("click", function () {
	fetchBooks();
});

fetchMoreButton.addEventListener("click", function () {
	fetchMoreBooks();
});

function fetchBooks() {
	for (clearButton of clearButtons){
	clearButton.style.display = "inline-block";
	}
	search = document.getElementById("search").value;
	resultList.innerHTML = "";
	fetch('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyDjFVfZ78ssXLZ--xm1jcyd2IHvOF-mcec')
		.then(function (response) {
			return response.json();
		})
		.then(function (search) {
		
		var totalItems = document.getElementById("totalItems");
		totalItems.innerHTML = `Found ${search.totalItems} titles`;
		
			for (i = 0; i < search["items"].length; i++) {
				var resultItem = document.createElement('li');
				resultItem.innerHTML = `<p>${i + 1}</p>
					<h3>${search.items[i].volumeInfo.title}</h3>
					<p><strong>Author:</strong> ${search.items[i].volumeInfo.authors}<br/>
					<div class = "hidden">
					<img id=${search.items[i].id}"bookImage" src="../images/dummybook.jpeg"><br/>
					<strong>Published:</strong> ${search.items[i].volumeInfo.publishedDate}<br/>
					<strong>Country:</strong> ${search.items[i].saleInfo.country}<br/>
					<strong>Category:</strong> ${search.items[i].volumeInfo.categories}<br/>
					<strong>Description:</strong> ${search.items[i].volumeInfo.description}<br/>
					<strong>Google Books link:</strong> <a href=${search.items[i].volumeInfo.previewLink}>${search.items[i].volumeInfo.previewLink}</a><br/>
					<strong>Average rating:</strong> ${search.items[i].volumeInfo.averageRating}
					</div>
					<button type="button" class="btn btn-outline-primary btn-sm show">Show more</button>
					</p>`;
				resultList.appendChild(resultItem);
				if (search.items[i].volumeInfo.imageLinks != undefined){
					var bookImage = document.getElementById(`${search.items[i].id}"bookImage"`);
					bookImage.src = search.items[i].volumeInfo.imageLinks.smallThumbnail;
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
			search.innerHTML = "";
			fetchMoreButton.style.display = "inline-block";
			startIndex = startIndex + 10;
		})
	/*.catch(function (error) {
		console.log(error);
	})*/
}

function fetchMoreBooks() {
	fetch('https://www.googleapis.com/books/v1/volumes?q=' + search + '&startIndex=' + startIndex + '&key=AIzaSyDjFVfZ78ssXLZ--xm1jcyd2IHvOF-mcec')
		.then(function (response) {
			return response.json();
		})
		.then(function (moreBooks) {
			for (i = 0; i < moreBooks["items"].length; i++) {
				var resultItem = document.createElement('li');
				resultItem.innerHTML = `<p>${startIndex + i + 1}</p>
					<h3>${moreBooks.items[i].volumeInfo.title}</h3>
					<p><strong>Author:</strong> ${moreBooks.items[i].volumeInfo.authors}<br/>
					<div class = "hidden">
					<img id=${moreBooks.items[i].id}"bookImage" src="../images/dummybook.jpeg"><br/>
					<strong>Published:</strong> ${moreBooks.items[i].volumeInfo.publishedDate}<br/>
					<strong>Country:</strong> ${moreBooks.items[i].saleInfo.country}<br/>
					<strong>Category:</strong> ${moreBooks.items[i].volumeInfo.categories}<br/>
					<strong>Description:</strong> ${moreBooks.items[i].volumeInfo.description}<br/>
					<strong>Google Books link:</strong> <a href=${moreBooks.items[i].volumeInfo.previewLink}>${moreBooks.items[i].volumeInfo.previewLink}</a><br/>
					<strong>Average rating:</strong> ${moreBooks.items[i].volumeInfo.averageRating}
					</div>
					<button type="button" class="btn btn-outline-primary btn-sm show">Show more</button>
					</p>`;
				resultList.appendChild(resultItem);
				if (moreBooks.items[i].volumeInfo.imageLinks != undefined){
					var bookImage = document.getElementById(`${moreBooks.items[i].id}"bookImage"`);
					bookImage.src = moreBooks.items[i].volumeInfo.imageLinks.smallThumbnail;
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
}

var genre;

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

var clearGenreButtons = document.getElementsByClassName("clearGenre");
for (clearGenreButton of clearGenreButtons){
clearGenreButton.addEventListener("click", function () {
	resultList.innerHTML = "";
	var genreList = document.getElementById("genreList");
	genreList.innerHTML = "";
	for (clearGenreButton of clearGenreButtons){
	clearGenreButton.style.display = "none";
	}
});
}

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
					<p><strong>Author:</strong> ${search.items[i].volumeInfo.authors}<br/>
					<div class = "hidden">
					<img id=${search.items[i].id}"bookImage" src="../images/dummybook.jpeg"><br/>
					<strong>Published:</strong> ${search.items[i].volumeInfo.publishedDate}<br/>
					<strong>Country:</strong> ${search.items[i].saleInfo.country}<br/>
					<strong>Category:</strong> ${search.items[i].volumeInfo.categories}<br/>
					<strong>Description:</strong> ${search.items[i].volumeInfo.description}<br/>
					<strong>Google Books link:</strong> <a href=${search.items[i].volumeInfo.previewLink}>${search.items[i].volumeInfo.previewLink}</a><br/>
					<strong>Average rating:</strong> ${search.items[i].volumeInfo.averageRating}
					</div>
					<button class="btn btn-outline-primary btn-sm show">Show more</button>
					</p>`;
				genreList.appendChild(resultItem);
				if (search.items[i].volumeInfo.imageLinks != undefined){
					var bookImage = document.getElementById(`${search.items[i].id}"bookImage"`);
					bookImage.src = search.items[i].volumeInfo.imageLinks.smallThumbnail;
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
}