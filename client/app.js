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
	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/get",
		method: 'GET',
		"Content-Type": "application/json",
	})
	.done((response) => {
		response.map(currVal => $('#allMovies').append(
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
});

// ADD MOVIE
$('#post').click(function(){
	$('#allMovies').prepend(
			`
			<div class="movie">
				Title: <input type="text" class="input" value=""><br/>
				Year: <input type="text" class="input" value=""><br/>
				Genre: <input type="text" class="input" value=""><br/>
				<button onclick="addMovie();">Submit</button>
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
	setTimeout(() => {getMovies()}, 150);	
}


// UPDATE MOVIE
$('#put').click(function(){
	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/put",
		method: 'PUT',
		success: data => data.message.Contents.map(currVal => generateImg(`https://s3-us-west-2.amazonaws.com/photo-bucket-tmp-prjct/${currVal.Key}`)),
		dataType: 'JSON'
	})
});

// DELETE MOVIE
$('#delete').click(function(){
	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/delete",
		method: 'DELETE',
		success: data => data.message.Contents.map(currVal => generateImg(`https://s3-us-west-2.amazonaws.com/photo-bucket-tmp-prjct/${currVal.Key}`)),
		dataType: 'JSON'
	})
});