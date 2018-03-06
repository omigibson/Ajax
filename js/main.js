var searchButton = document.getElementById("searchButton");

var search = document.getElementById("titleSearch").value

searchButton.addEventListener("click", function () {
	fetch('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyDjFVfZ78ssXLZ--xm1jcyd2IHvOF-mcec')
		.then(function (response) {
			return response.json();
		})
		.then(function (search) {

			for (items of search['items']) {
				console.log(items.volumeInfo.title);
				console.log(items.volumeInfo.authors);
				console.log(items.volumeInfo.publishedDate);
				console.log(items.saleInfo.country);
				console.log(items.volumeInfo.description);
				console.log(items.volumeInfo.previewLink)
				console.log(items.volumeInfo.averageRating);

				// SKAPA IMAGETAG!
				//console.log(items.volumeInfo.imageLinks.smallThumbnail);
			}
			//console.log(search['items'][0]['volumeInfo']['title']);
		})
		/*.catch(function (error) {
			console.log(error);
		})*/
});