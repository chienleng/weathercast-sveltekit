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
