var searchButton = document.getElementById("searchButton");

var search = document.getElementById("titleSearch").value

searchButton.addEventListener("click", function () {
	fetch('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyDjFVfZ78ssXLZ--xm1jcyd2IHvOF-mcec')
		.then(function (response) {
			return response.json();
		})
		.then(function (search) {

			for (items of search['items']) {

				var resultList = document.getElementById('resultList');
				var resultItem = document.createElement('li');
				resultItem.innerHTML = `<p>Title: ${items.volumeInfo.title}<br/>
					Author: ${items.volumeInfo.authors}<br/>
					Published: ${items.volumeInfo.publishedDate}<br/>
					Country: ${items.saleInfo.country}<br/>
					Description: ${items.volumeInfo.description}<br/>
					Google Books link: <a href=${items.volumeInfo.previewLink}>${items.volumeInfo.previewLink}</a><br/>
					Averagre rating: ${items.volumeInfo.averageRating}<br/>
					<img src=${items.volumeInfo.imageLinks.smallThumbnail}></p>`;
				resultList.appendChild(resultItem);
			}
		})
	/*.catch(function (error) {
		console.log(error);
	})*/
});