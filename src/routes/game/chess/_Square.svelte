<script>
    export let value;
    export let selected;
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();


    function start(e) {

        	dispatch('message', {
        			text: 'checkMove'
        		});
        	}

    function drop(e) {
        e.preventDefault();
    	dispatch('message', {
    			text: 'checkMove'
    		});
    	}
</script>

<td
ondragover="return false"
on:dragenter={()=>"return false"}
on:drop
class:selected on:click>

<div draggable = {true}
on:dragstart|stopPropagation={e => start(e)}>
{value}
</div></td>
<style>
    td {
        text-align: center;
        vertical-align: middle;
        width: 4ex;
        height: 4ex;
        font-size: 240%;
        border: 4px solid transparent;
        transition: all .4s ease-out;
    }
    td.selected {
        border-color: black;
    }
    tr:nth-child(odd) > td:nth-child(odd), tr:nth-child(even) > td:nth-child(even) {
        background-color: #ddd;
    }
    tr:nth-child(odd) > td:nth-child(even), tr:nth-child(even) > td:nth-child(odd) {
            background-color: white;
        }
</style>