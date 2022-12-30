export type CurrentWeather = {
	temperature: number
	time: string
	weathercode: number
	winddirection: number
	windspeed: number
}

export type Location = {
	checked: boolean
	available: boolean
	label: string
	latitude: number
	longitude: number
}

export type Forecast = {
	time: string
	temperatureMin: number
	temperatureMax: number
	weatherCode: number
	weatherIcon: string
	weatherDescription: string
}
