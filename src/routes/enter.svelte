<svelte:head>
	<title>Join room</title>
</svelte:head>

<script>

	function clickHandler() {
		location.href='gameroom';

		// $.post("/v1/session", {
		//     "username": $('#username').val(),
		//     "password": $('#password').val()
		// })
		//         .done(function() {
		//             window.location = "/profile.html?username=" + $('#username').val();
		//         })
		//         .fail(function() {
		//             document.getElementById('errorMsg').innerHTML="Incorrect username or password";
		//         });
	}

</script>

<h1>Enter</h1>
<form on:submit|preventDefault={clickHandler}>
	Code: <label><input type="text" name="code"></label><br>
	Name: <label><input type="text" name="name"></label><br>
	<input type="submit" value="Submit">
</form>