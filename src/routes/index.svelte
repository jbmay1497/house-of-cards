<style>
	h1 {
		text-align: center;
		font-size: 100px;
		font-weight: 600;
		margin: .5em;
		padding: .4vw;
		color: white;
		font-family: fantasy;
	}
	button {
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
	<h1>H &nbsp;O &nbsp;U &nbsp;S &nbsp;E</h1>
	<h1>o f&nbsp;&nbsp;&nbsp; C &nbsp;A &nbsp;R &nbsp;D &nbsp;S</h1>

	<button id="createButton" on:click={handleCreateClick}>
		Create Room
	</button>

	<button id="joinButton" on:click={handleJoinClick}>
		Join Game
	</button>
</body>