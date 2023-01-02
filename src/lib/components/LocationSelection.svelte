<script>
	import Locations from '$lib/data/locations'

	/** @type {string | null} */
	export let city = null

	const locations = Locations
</script>

<nav>
	<a href="/" class:selected={!city}>Your location</a>
	{#each locations as { name, code }}
		<a href="/?city={code}" class:selected={city === code}>{name}</a>
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

	a.selected,
	a:hover {
		background-color: aqua;
		color: black;
	}
</style>
