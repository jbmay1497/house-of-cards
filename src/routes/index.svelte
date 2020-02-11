<style>
	h1 {
		text-align: center;
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

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<script>
    //only need this if socket connection needs to be open on home page - not likely

    import {goto} from "@sapper/app";

	function handleCreateClick() {
		goto("create")
	}

	function handleJoinClick() {
		goto("enter")
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
