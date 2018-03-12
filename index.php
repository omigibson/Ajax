<?php require 'partials/header.php' ?>
<main id="booksPage">
	<section>
		<h3>Don't know what you are looking for?</h3>
		<p>
			No worries! With the buttons below you can find some books based on a genre of your choosing. Of course, you can also use the search window to search for specific genres.</p>
			<button id="drama" class="btn btn-outline-success btn-sm genre">Drama</button>
			<button id="juvenile" class="btn btn-outline-success btn-sm genre">Juvenile</button>
			<button id="ghost" class="btn btn-outline-success btn-sm genre">Ghost</button>
			<button id="education" class="btn btn-outline-success btn-sm genre">Education</button>
			<button id="religion" class="btn btn-outline-success btn-sm genre">Religion</button>
			<button id=graphic class="btn btn-outline-success btn-sm genre">Graphic</button>
			
			<button class="btn btn-warning btn-sm hidden clearGenre">Clear</button>
			<ul id="genreList">
				
			</ul>
			<button class="btn btn-warning btn-sm hidden clearGenre">Clear</button>
	</section>

	<section>
		<h2>Search for books here</h2>
		<p>You can search for titles, authors, genres and much more.</p>
		<form>
			<input type="search" id="search">
			<input type="button" class="btn btn-success btn-sm" id="searchButton" value="Search">
		</form>
		<p id="totalItems"></p>
		<button class="btn btn-warning btn-sm hidden clear">Clear search</button>
			<ul id="resultList">

			</ul>
				<button type="button" class="btn btn-primary btn-sm" id="fetchMoreButton">Show 10 more titles</button>
				<button class="btn btn-warning btn-sm hidden clear">Clear search</button>
	</section>
</main>
<footer></footer>
<script src="js/main.js"></script>
</body>

</html>