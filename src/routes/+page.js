import Locations from '$lib/data/locations.js'
import { getOpenMeteoApiPath, transformDaily } from './helpers'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {
	const params = url.searchParams
	let latitude = params.get('latitude')
	let longitude = params.get('longitude')
	const city = params.get('city')

	/** @type {import('$lib/types').CurrentWeather | null} */
	let current = null

	/** @type {import('$lib/types').Forecast[] | null} */
	let forecasts = null

	if (city) {
		const location = Locations.find((d) => d.code === city.toUpperCase())

		if (location) {
			latitude = location.latitude
			longitude = location.longitude
		}
	}

	try {
		if (latitude && longitude) {
			const res = await fetch(getOpenMeteoApiPath(latitude, longitude))
			const forecast = await res.json()

			if (forecast) {
				console.log(forecast)
				current = forecast.current_weather

				forecasts = transformDaily(forecast.daily)
			}
		}
	} catch (e) {
		console.log('fetched failed', e)
	}

	return { current, forecasts }
}
