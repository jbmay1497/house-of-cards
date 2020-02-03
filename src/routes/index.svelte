<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	button {
		position: relative;
		top: 50%;
		left: 25%;
		width: 50%;
		color: darkred;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<script>
	function handleCreateClick() {
		location.href='about'
	}

	function handleJoinClick() {
		location.href='about'
	}
</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Welcome to House of Cards!</h1>

<button id="createButton" on:click={handleCreateClick}>
	Create Room
</button>

<button id="joinButton" on:click={handleJoinClick}>
	Join Game
</button>
