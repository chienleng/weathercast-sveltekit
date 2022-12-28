import { PUBLIC_API_ROOT } from '$env/static/public'
import Locations from '$lib/data/locations.js'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {
	const params = url.searchParams
	let latitude = params.get('latitude')
	let longitude = params.get('longitude')
	const city = params.get('city')

	/** @type {import('$lib/types').CurrentWeather | null}*/
	let current = null

	if (city) {
		const location = Locations.find((d) => d.code === city.toUpperCase())

		if (location) {
			latitude = location.latitude
			longitude = location.longitude
		}
	}

	if (latitude && longitude) {
		const res = await fetch(getOpenMeteoApiPath(latitude, longitude))
		const forecast = await res.json()

		if (forecast) {
			current = forecast.current_weather
		}
	}

	return { current }
}

/**
 * @param {Object.<string, any>} obj - key, value pairs
 * @returns {string} of querys
 */
function getObjectAsQueryString(obj) {
	return (
		'?' +
		Object.keys(obj)
			.map((k) => `${k}=${obj[k]}`)
			.join('&')
	)
}

/**
 * @param {string | null} latitude
 * @param {string | null} longitude
 * @returns {string} API path
 */
function getOpenMeteoApiPath(latitude, longitude) {
	const apiPath = `${PUBLIC_API_ROOT}/v1/forecast`
	const obj = {
		latitude,
		longitude,
		daily: 'weathercode,temperature_2m_max,temperature_2m_min',
		current_weather: true,
		timezone: 'auto'
	}

	return `${apiPath}${getObjectAsQueryString(obj)}`
}
