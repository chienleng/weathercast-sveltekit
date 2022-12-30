<script>
	import Locations from '$lib/data/locations'

	const locations = Locations
</script>

<nav>
	{#each locations as { name, code }}
		<a href="/?city={code}">{name}</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 1rem;
	}

	a {
		display: block;
		padding: 3px 6px;
	}

	a:hover {
		background-color: aqua;
		color: black;
	}
</style>
