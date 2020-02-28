<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>


	div {
		position: absolute;
		top: 0;
		left: 0;
		min-height: 100%;
		min-width: 100%;
		background: linear-gradient(to right, darkgreen 0%, seagreen 20%, seagreen 80%, darkgreen 100%);
	}

	main {
		position: relative;
		margin: 0 auto;
	}
</style>
<svelte:head>
<link href="https://fonts.googleapis.com/css?family=Roboto:100,400&display=swap" rel="stylesheet">
</svelte:head>
<div>
	<Nav {segment}/>

	<main>
		<slot></slot>
	</main>
</div>

