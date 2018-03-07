var searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function () {
	var resultList = document.getElementById('resultList');
	var search = document.getElementById("titleSearch").value;
	
	resultList.innerHTML = "";
	fetch('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyDjFVfZ78ssXLZ--xm1jcyd2IHvOF-mcec')
		.then(function (response) {
			return response.json();
		})
		.then(function (search) {

			for (items of search['items']) {
				var resultItem = document.createElement('li');
				resultItem.innerHTML = `<p>Title: ${items.volumeInfo.title}<br/>
					Author: ${items.volumeInfo.authors}<br/>
					Published: ${items.volumeInfo.publishedDate}<br/>
					Country: ${items.saleInfo.country}<br/>
					Category: ${items.volumeInfo.categories}<br/>
					Description: ${items.volumeInfo.description}<br/>
					Google Books link: <a href=${items.volumeInfo.previewLink}>${items.volumeInfo.previewLink}</a><br/>
					Averagre rating: ${items.volumeInfo.averageRating}<br/>
					<img src=${items.volumeInfo.imageLinks.smallThumbnail}></p>`;
				resultList.appendChild(resultItem);
			}
		search.innerHTML="";
		})
	/*.catch(function (error) {
		console.log(error);
	})*/
});