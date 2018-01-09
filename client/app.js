/*
  GET - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/get
  POST - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/post
  PUT - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/put
  DELETE - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/delete
*/

// LOAD MOVIES
window.onload = getMovies();

function getMovies(){
	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/get",
		method: 'GET',
		"Content-Type": "application/json",
	})
	.done((response) => {
		response.map(currVal => $('#allMovies').hide().fadeIn(500).append(
			`
			<div class="movie">
				ID: ${currVal.id}<br/>
				Title: ${currVal.title}<br/>
				Year: ${currVal.year}<br/>
				Genre: ${currVal.genre}<br/>
			</div>
			`
		));
	})
	.fail((err) => {
		console.log('error', err);
	})
}

// GET MOVIE
$('#get').click(function(){
	$('#allMovies').empty();
	
	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/get",
		method: 'GET',
		"Content-Type": "application/json",
	})
	.done((response) => {
		response.map(currVal => $('#allMovies').hide().fadeIn(500).append(
			`
			<div class="movie">
				<div class="content">
					ID: ${currVal.id}<br/>
					Title: ${currVal.title}<br/>
					Year: ${currVal.year}<br/>
					Genre: ${currVal.genre}<br/>
				</div>
			</div>
			`
		));
	})
	.fail((err) => {
		console.log('error', err);
	})
});

// ADD MOVIE
$('#post').click(function(){
	$('#allMovies').prepend(
			`
			<div class="movie movieAdd" style="background-color: #7a9f9d">
				<div class="content">
					Title: <input type="text" class="input" value=""><br/>
					Year: <input type="text" class="input" value=""><br/>
					Genre: <input type="text" class="input" value=""><br/>
					<button onclick="addMovie();">Submit</button>
				</div>
			</div>
			`
	);
});

// SUBMIT MOVIE
function addMovie(){
	$('.input').map(currVal => console.log($('.input')[currVal].value));

	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/post",
		method: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify({
			"title" : $('.input')[0].value,
			"year" : parseInt($('.input')[1].value),
			"genre" : $('.input')[2].value
		})
	})

	setTimeout(() => {$('#allMovies').empty()}, 150);
	setTimeout(() => {getMovies()}, 200);	
}


// UPDATE MOVIE
$('#put').click(function(){
	$('#allMovies').prepend(
			`
			<div class="movie movieAdd" style="background-color: #7a9f9d">
				<div class="content">
					ID: <input type="text" class="newInput" value=""><br/>
					New Title: <input type="text" class="newInput" value=""><br/>
					New Year: <input type="text" class="newInput" value=""><br/>
					New Genre: <input type="text" class="newInput" value=""><br/>
					<button onclick="updateMovie();">Submit</button>
				</div>
			</div>
			`
	);
});

// SUBMIT MOVIE UPDATE
function updateMovie(){
	$('.newInput').map(currVal => console.log($('.newInput')[currVal].value));

	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/put",
		method: 'PUT',
		contentType: "application/json; charset=utf-8",
		dataType: 'JSON',
		data: JSON.stringify({
			"id" : parseInt($('.newInput')[0].value),
			"title" : $('.newInput')[1].value,
			"year" : parseInt($('.newInput')[2].value),
			"genre" : $('.newInput')[3].value
		})
	})
}

// DELETE MOVIE
$('#delete').click(function(){
	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/delete",
		method: 'DELETE',
		success: data => data.message.Contents.map(currVal => generateImg(`https://s3-us-west-2.amazonaws.com/photo-bucket-tmp-prjct/${currVal.Key}`)),
		dataType: 'JSON'
	})
});