<svelte:head>
    <title>lobby</title>
</svelte:head>

<script context="module">

    //these keep track of new users who join
    //allows us to update the lobbys for other users in the lobby
    //when a new user joins, without having to fetch from the db.
    //They must be stores so they can be reactive within the component
    import { writable } from 'svelte/store';
    const new_count = writable(0);
    const new_usernames = writable([]);

    //called when a new user enters the lobby
    export function updateLobby (data){
        console.log(`Updating lobby`);
         new_count.set(data.count);
         new_usernames.set(data.usernames);
     }

	export async function preload({params}, session) {
        //checks if the user enters the lobbies through the /enter route,
        //or through the lobbys url
	    let joined = !!(session.lobby_id && session.username);

	    //checks if user is in a different lobby, then redirects them there
		if (session.lobby_id && session.lobby_id !== params.lobby_id) {
		  return this.redirect(302, `lobbies/${session.lobby_id}`);
		}

		//fetching lobbies data
		const res = await this.fetch(`api/lobby/${params.lobby_id}`, {
		    method: 'GET',
		    credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
             }
		});

		const data = await res.json();
		if (res.status === 200) {
            data.joined = joined;
            data.username = joined ? session.username : "";
            return { lobby: data };
        } else {
            this.redirect(302, ``)
        }

	}
</script>

<script>
     import Modal from '../../components/Modal.svelte';

     //allows us to retrieve the lobbies from the module context

     export let lobby;

     let lobby_id = lobby._id;
     let usernames = lobby.usernames;
     let count = lobby.count;
     let joined = lobby.joined;
     let username = lobby.username;

     //set initial values for new_count and new_usernames,
     //so they are not set to default values
     $new_count = count;
     $new_usernames = usernames;

     //updates count and usernames whenever new_count and new_username changes
     $: if ($new_count !== count){
         count = $new_count;
     }
     $: if ($new_usernames.length !== usernames.length){
         usernames = $new_usernames;
     }

     //handles joined event from the modal
     const Joined = event => {
         joined = event.detail.joined;
         username = event.detail.username;
     }

     import {goto} from "@sapper/app"

     function handleCardClick() {
         goto("game/custom")
     }
</script>

<style>
    .hidden{
    display: none;
    }

    .container{
        padding: 2px;
        text-align: center;
    }

    h1 {
        padding: 1vw;
        color: white;
        font-size: 60px;
        font-family: fantasy;
    }

    p {
        margin: 2vw 0vw 1vw 0vw;
        color: white;
        font-family: fantasy;
    }

    .dropbtn {
        background-color: #4CAF50;
        color: white;
        padding: 2vw;
        font-size: 20px;
        font-family: fantasy;
        border: none;
        border-radius: 20px;
    }

    /* The container <div> - needed to position the dropdown content */
    .dropdown {
        position: relative;
        right: 15%;
        display: inline-block;
    }

    .custom {
        position: relative;
        left: 15%;
        display: inline-block;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
        position: absolute;
        display: none;
        background-color: #f1f1f1;
        max-width: 120px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 99;
    }

    /* Links inside the dropdown */
    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content a:hover {background-color: #ddd;}

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {display: block;}

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .dropbtn {background-color: #3e8e41;}

    img {
        width: 15%;
        position: relative;
        padding: 1em;
        border-radius: 25px;
    }
</style>

<body class="container">
    <div class:hidden ={joined}>
        <Modal {lobby_id} on:join = {Joined}/>
    </div>

    <h1>Game Lobby</h1>
    <div class:hidden ={!joined}>
        <div class="dropdown">
            <button class="dropbtn">Existing Games</button>
            <div class="dropdown-content">
                <a href="game/oldmaid">Old Maid</a>
                <a href="game">War</a>
                <a href="game">Solitaire</a>
            </div>
        </div>

        <div class="custom">
            <button class="dropbtn">Custom Game</button>
        </div>

        <p>
            Or click below to play with a virtual card deck!
        </p>
        <figure>
            <img on:click={handleCardClick} src = 'images/face_down.jpg' alt="face down card"/>
        </figure>

        <div>
            <form>
                <div>Welcome {username}!</div>
                <div> lobby Code: {lobby_id}</div>
                <div>Players:</div>
                <ul>
                    {#each usernames as username, i}
                        <li>
                            {i+1} : {username}
                        </li>
                    {/each}
                </ul>
            </form>
        </div>
    </div>

</body>
