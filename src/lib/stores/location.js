import { browser } from '$app/environment'
import { readable } from 'svelte/store'

/** @type {import ('$lib/types').Location} */
let defaultLocation = {
	checked: false,
	available: false,
	label: 'No location',
	latitude: 0,
	longitude: 0
}

const location = readable(defaultLocation, (set) => {
	if (browser) {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				set({
					checked: true,
					available: true,
					label: 'Current location',
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				})
			})
		} else {
			set({
				checked: true,
				available: false,
				label: 'No location',
				latitude: 0,
				longitude: 0
			})
		}
	}

	return () => {}
})

export { location }
