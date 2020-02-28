<style>
	.hidden {
		display: none;
	}

    * {
    box-sizing:border-box;
    }

    h1 {
        font-family: 'Roboto',serif ;
        text-align: center;
        font-weight: 100;
        font-size: 100px;
        margin: .5em;
        padding: .4vw;
        color: white;
    }

	button {
	    font-family: 'Roboto',serif ;
	    font-weight: 400;
        font-size: 15px;
		margin: 1.5vw auto;
		padding: 2vw;
		position: relative;
		top: 50%;
		width: 50%;
		color: darkred;
		display: flex;
		justify-content: center
	}

	a {
	font-family: 'Roboto',serif ;
	font-weight: 100;
	font-size: 100px;
    display: flex;
    justify-content: center;
    text-decoration: none;
    position: relative;
    width: fit-content;
    margin:0 auto;
	}

	.routes:hover::after {
        position: absolute;
        content: '';
        width: calc(100% - 1em);
        height: 2px;
        margin-bottom:1%;
        background-color: black;
        display: block;
        bottom: -1px;
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
	import ModalCreateRoom from '../components/ModalCreateRoom.svelte';
	import ModalJoinRoom from '../components/ModalJoinRoom.svelte';

	let createRoom = true;
	let joinRoom = true;

	function handleCreateClick() {
		createRoom = false;
	}
	function handleJoinClick() {
		joinRoom = false;
	}
</script>

<svelte:head>
	<title>House of Cards: Main Page</title>
</svelte:head>

<body>
	<br>
	<h1>H O U S E</h1>
	<h1>O F &nbsp; C A R D S</h1>

	<div class:hidden ={createRoom}>
		<ModalCreateRoom/>
	</div>

	<div class:hidden ={joinRoom}>
		<ModalJoinRoom/>
	</div>

	<div class:hidden ={!(createRoom && joinRoom)}>
		<p><a class ="routes" on:click={handleCreateClick}> Create Game </a></p>
		<a class ="routes" on:click={handleJoinClick}> Join Game </a>
	</div>
</body>