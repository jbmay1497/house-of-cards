<svelte:head>
    <title>Create Room</title>
</svelte:head>

<script>
    import {goto} from "@sapper/app";

    function clickHandler() {
        goto('gameroom');
    }
</script>


<h1>Create</h1>
<form on:submit|preventDefault={clickHandler}>
    Name: <label><input type="text" name="name"></label><br>
    <input type="submit" value="Submit">
</form>

