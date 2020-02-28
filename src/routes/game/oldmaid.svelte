<!-- Hardcode layout for old maid just for demo -->
<script>
	import Gameboard from './_Gameboard.svelte';
	import Chat from '../../components/Chat.svelte';

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

<div class="grid-container">
	<div class="grid-item">
		<!-- Add in hardcoded layout for the gameboard here -->
	</div>
	<div class="grid-item">
		<Chat/>
	</div>
</div>