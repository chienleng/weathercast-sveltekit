<script>
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import Locations from '$lib/data/locations.js'
	import { location } from '$lib/stores/location.js'

	import CurrentConditions from '$lib/components/CurrentConditions.svelte'
	import LocationSelection from '$lib/components/LocationSelection.svelte'
	import DailyForecasts from '$lib/components/DailyForecasts.svelte'

	/** @type {import('./$types').PageData} */
	export let data

	$: console.log(data)
	$: current = data?.current
	$: forecasts = data?.forecasts || []
	$: city = data?.city

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

<LocationSelection {city} />

{#if current}
	<CurrentConditions {...current} />

	<hr />

	<DailyForecasts {forecasts} />
{/if}
