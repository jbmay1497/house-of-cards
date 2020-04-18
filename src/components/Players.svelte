<style>
    .playerPanel{
        margin: 0.25rem;
        min-width: 15em;
        border: 1px solid #dedede;
    }

    .playerHeader{
        margin-block-start: 0.25em;
        margin-block-end: 0.25em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-left: 1rem;
        color: white;
    }

    .playerList{
        list-style-type: none;
        padding-left: 0;
    }

    .playerItem{
        color: white;
        padding-right: 1rem;
        padding-left: 20px;
    }

    .curUser {
        font-weight: bold;
    }
</style>

<script>
    export let usernames;
    export let username;
</script>

<div class = "playerPanel">
    <div class = "playerHeader">Players:</div>
    <div class = "playerList">
        {#each usernames as user, i}
            <li class:host = "{i === 0}" class:curUser = "{user === username}" class = playerItem>
                {i+1} : {user}
                {#if i === 0 && user === username}
                    (Host, Me)
                {:else if i === 0}
                    (Host)
                {:else if user === username}
                    (Me)
                {/if}
            </li>
        {/each}
    </div>
</div>


