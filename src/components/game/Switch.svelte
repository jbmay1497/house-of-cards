<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let format;
</script>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 54px;
    height: 30px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f35221;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .format {
    font-family: 'Roboto';
    font-weight: 100;
    color: white;
  }
</style>

<label class="switch">
  <input
    type="checkbox"
    on:click={() => dispatch('toggle')}
    bind:checked={format} />
  <span class="slider round" />
</label>
<span class="format">{#if format}Table{:else}Hand{/if} Mode</span>
