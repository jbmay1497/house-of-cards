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

</script>

<style>
    .hidden{
    display: none;
    }
</style>

<div class:hidden ={joined}>
<Modal {lobby_id} on:join = {Joined}/>
</div>

<div class:hidden ={!joined}>
<h1>Game Lobby</h1>
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