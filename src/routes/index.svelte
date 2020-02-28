<style>

    h1 {
        font-family: 'Roboto',serif ;
        text-align: center;
        font-size: 100px;
        font-weight: 100;
        margin: .5em;
        padding: .4vw;
        color: white;

    }
	button {
	    font-weight: 400;
	    font-family: 'Roboto',serif ;
		margin: 1.5vw;
		padding: 2vw;
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

<script context="module">
	export async function preload(page, session) {
		if (session.username && session.lobby_id){
			this.redirect(302,`lobbies/${session.lobby_id}`)
		}
	}
</script>

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
	<title>House of Cards: Main Page</title>
</svelte:head>

<body>
	<br>
	<h1>H O U S E</h1>
	<h1>O F &nbsp; C A R D S</h1>

	<button id="createButton" on:click={handleCreateClick}>
		Create Room
	</button>

	<button id="joinButton" on:click={handleJoinClick}>
		Join Game
	</button>
</body>