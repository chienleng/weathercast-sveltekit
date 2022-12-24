import { PUBLIC_API_ROOT } from '$env/static/public'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {
	const params = url.searchParams
	const latitude = params.get('latitude')
	const longitude = params.get('longitude')
	/** @type {import('$lib/types').CurrentWeather | null}*/
	let current = null

	if (latitude) {
		const res = await fetch(getWeatherApiPath(latitude, longitude))
		const forecast = await res.json()

		if (forecast) {
			console.log(forecast)
			// parse response
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
function getWeatherApiPath(latitude, longitude) {
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
