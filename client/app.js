/*
  GET - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/get
  POST - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/post
  PUT - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/put
  DELETE - https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/delete
*/

$('#get').click(function(){
	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/get",
		method: 'GET',
		"Content-Type": "application/json",
	})
	.done((response) => {
		console.log(response);
	})
	.fail((err) => {
		console.log('error', err);
	})
});

$('#post').click(function(){
	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/post",
		method: 'POST',
		success: data => data.message.Contents.map(currVal => generateImg(`https://s3-us-west-2.amazonaws.com/photo-bucket-tmp-prjct/${currVal.Key}`)),
		dataType: 'JSON'
	})
});

$('#put').click(function(){
	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/put",
		method: 'PUT',
		success: data => data.message.Contents.map(currVal => generateImg(`https://s3-us-west-2.amazonaws.com/photo-bucket-tmp-prjct/${currVal.Key}`)),
		dataType: 'JSON'
	})
});

$('#delete').click(function(){
	$.ajax({
		url: "https://1zguq18qmj.execute-api.us-west-2.amazonaws.com/dev/delete",
		method: 'DELETE',
		success: data => data.message.Contents.map(currVal => generateImg(`https://s3-us-west-2.amazonaws.com/photo-bucket-tmp-prjct/${currVal.Key}`)),
		dataType: 'JSON'
	})
});