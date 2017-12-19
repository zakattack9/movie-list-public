/*
  GET - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/get
  POST - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/post
  PUT - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/put
  DELETE - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/delete
*/

// LOAD MOVIES
window.onload = function(){
	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/get",
		method: 'GET',
		"Content-Type": "application/json",
	})
	.done((response) => {
		response.map(currVal => $('#allMovies').append(
			`
			<div class="movie">
				ID: ${currVal.id}
				Title: ${currVal.title}
				Year: ${currVal.year}
				Genre: ${currVal.genre}
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
				ID: ${currVal.id}
				Title: ${currVal.title}
				Year: ${currVal.year}
				Genre: ${currVal.genre}
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
				ID: <input type="text" class="input" value=""><br/>
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
/*	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/post",
		method: 'POST',
		success: data => data.message.Contents.map(currVal => generateImg(`https://s3-us-west-2.amazonaws.com/photo-bucket-tmp-prjct/${currVal.Key}`)),
		dataType: 'JSON'
	})*/
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