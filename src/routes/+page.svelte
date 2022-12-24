<script>
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import Locations from '$lib/data/locations.js'

	/** @type {import('./$types').PageData} */
	export let data

	$: console.log(data)
	$: current = data?.current
	$: if (!current) {
		console.log('no data, set to default location', Locations[0])
		// get browser location if failed, default to first locations
		if (browser) {
			const defaultLocation = Locations[0]
			goto(`/?latitude=${defaultLocation.latitude}&longitude=${defaultLocation.longitude}`)
		}
	}
</script>

<ul>
	<li>{current?.temperature}</li>
	<li>{current?.time}</li>
	<li>{current?.weathercode}</li>
	<li>{current?.winddirection}</li>
	<li>{current?.windspeed}</li>
</ul>
