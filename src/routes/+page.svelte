<script>
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import Locations from '$lib/data/locations.js'
	import { location } from '$lib/stores/location.js'

	/** @type {import('./$types').PageData} */
	export let data

	$: console.log(data)
	$: current = data?.current

	$: console.log('available', $location.available)
	$: console.log('checked', $location.checked)
	$: if (browser) {
		if (!current) {
			if ($location.available) {
				goto(`/?latitude=${$location.latitude}&longitude=${$location.longitude}`)
			} else {
				// show pick list of locations
				const defaultLocation = Locations[0]
				goto(`/?city=${defaultLocation.code}`)
			}
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
