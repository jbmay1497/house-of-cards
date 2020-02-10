<script>
	import Switch from './Switch.svelte';
	import Gameboard from './Gameboard.svelte';
	import Chat from './Chat.svelte';

	let format = true;

	const toggle = () => {
		format = !format;
	}
</script>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: auto 200px;
	}
	
</style>

<svelte:head>
	<title>Playing</title>
</svelte:head>

<Switch on:toggle={() => toggle()} {format}/>

<div class="grid-container">
	<div class="grid-item">
		<Gameboard format={format}/>
	</div>
	<div class="grid-item">
		<Chat/>
	</div>
</div>