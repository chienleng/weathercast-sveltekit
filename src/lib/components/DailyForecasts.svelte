<script>
	/** @type {import('$lib/types').Forecast[]} */
	export let forecasts = []
</script>

<h3>Forecasts</h3>
<ul>
	{#each forecasts as { time, temperatureMax, temperatureMin }}
		<li>{time} | min: {temperatureMin} | max: {temperatureMax}</li>
	{/each}
</ul>
