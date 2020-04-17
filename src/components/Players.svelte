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
  .host {
  font-weight: bold;
  }

</style>

<script>
export let usernames;
</script>

<div class = "playerPanel">
    <div class = "playerHeader">Players:</div>
    <div class = "playerList">
        {#each usernames as username, i}
            <li class:host = "{i == 0}" class = playerItem>
                {i+1} : {username}
                {#if i == 0}
                 (Host)
                {/if}
            </li>
        {/each}
    </div>
</div>


