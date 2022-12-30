import { PUBLIC_API_ROOT } from '$env/static/public'

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

/**
 * @param {*} daily - response object
 * @returns {import('$lib/types').Forecast[]}
 */
function transformDaily(daily) {
	/** @type {import('$lib/types').Forecast[] | null} */
	const forecasts = []

	daily.time.forEach(
		/**
		 *
		 * @param {string} time
		 * @param {number} index
		 */
		(time, index) => {
			forecasts.push({
				time,
				temperatureMax: daily['temperature_2m_max'][index],
				temperatureMin: daily['temperature_2m_min'][index],
				weatherCode: daily['weathercode'][index],
				weatherDescription: '',
				weatherIcon: ''
			})
		}
	)

	return forecasts
}

export { transformDaily, getOpenMeteoApiPath }
