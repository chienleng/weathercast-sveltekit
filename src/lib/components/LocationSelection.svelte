<script>
	import Locations from '$lib/data/locations'

	/** @type {string | null} */
	export let city = null
	/** @type {HTMLElement}*/
	let detailsElement
	const locations = Locations

	$: selectedLabel = city
		? Locations.find((location) => location.code === city)?.name
		: 'Your location'

	function closeDetails() {
		detailsElement.removeAttribute('open')
	}
</script>

<h1>Location</h1>
<details role="list" bind:this={detailsElement}>
	<!-- svelte-ignore a11y-no-redundant-roles -->
	<summary aria-haspopup="listbox">
		{selectedLabel}
	</summary>
	<ul role="listbox">
		<li>
			<a href="/" class:selected={!city} on:click={closeDetails}>Your location</a>
		</li>
		{#each locations as { name, code }}
			<li>
				<a href="/?city={code}" class:selected={city === code} on:click={closeDetails}>
					{name}
				</a>
			</li>
		{/each}
	</ul>
</details>

<style>
	h1 {
		margin-bottom: 0;
	}
</style>
