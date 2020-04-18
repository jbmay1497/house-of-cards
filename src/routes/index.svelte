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
        height: 2px;
        margin-bottom:1%;
        background-color: black;
        display: block;
        bottom: -1px;
        animation: grow .75s;
        animation-fill-mode: forwards;
    }

    @keyframes grow {
     from {width: 0%;}
     to {width: calc(100% - 1em);}
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
	import {goto} from "@sapper/app";
	import ModalCreateLobby from '../components/ModalCreateLobby.svelte';
	import ModalJoinLobby from '../components/ModalJoinLobby.svelte';
	//import {getContext} from 'svelte';
    //const socket = getContext('socket');

	let createLobby = true;
	let joinLobby = true;

	function handleCreateClick() {
		createLobby = false;
	}
	function handleJoinClick() {
		joinLobby = false;
	}

	//console.log(socket);
</script>

<svelte:head>
	<title>House of Cards: Main Page</title>
</svelte:head>

<body>
	<br>
	<h1>H O U S E</h1>
	<h1>O F &nbsp; C A R D S</h1>

	<div class:hidden ={createLobby}>
		<ModalCreateLobby bind:hidden = {createLobby}/>
	</div>

	<div class:hidden ={joinLobby}>
		<ModalJoinLobby bind:hidden = {joinLobby}/>
	</div>

	<div class:hidden ='{!(createLobby && joinLobby)}'>
		<p><a href="/" class ="routes" on:click={handleCreateClick}> Create Game Lobby </a></p>
		<a href="/" class ="routes" on:click={handleJoinClick}> Join Game Lobby </a>
	</div>
</body>