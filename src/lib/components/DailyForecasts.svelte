<script>
	import { LayerCake, Svg } from 'layercake'
	import { scaleBand } from 'd3-scale'

	import AxisX from './viz/AxisX.svelte'
	import AreaD3 from './viz/Area-D3.svelte'
	import Line from './viz/Line.svelte'
	import Column from './viz/Column.svelte'
	import { onMount } from 'svelte'

	/** @type {import('$lib/types').Forecast[]} */
	export let forecasts = []

	let locale = 'en-AU'

	$: console.log('forecasts', forecasts)
	$: points = forecasts.map((d) => {
		return {
			time: new Date(d.time).getTime(),
			dateString: d.time,
			temperatureMax: d.temperatureMax,
			temperatureMin: d.temperatureMin
		}
	})

	const formatter = (d) => {
		const date = new Date(d)
		return date.toLocaleDateString(locale, {
			month: 'short',
			day: 'numeric'
		})
	}

	onMount(() => {
		locale = navigator.language
	})
</script>

<h3>Forecasts</h3>
<ul>
	{#each forecasts as { time, temperatureMax, temperatureMin }}
		<li>{time} | min: {temperatureMin} | max: {temperatureMax}</li>
	{/each}
</ul>

<h4>Min</h4>
<div class="chart-container">
	<LayerCake data={points} x="time" y="temperatureMin" xScale={scaleBand()}>
		<Svg>
			<AxisX baseline={true} formatTick={formatter} />
			<Line />
		</Svg>
	</LayerCake>
</div>
<h4>Max</h4>
<div class="chart-container">
	<LayerCake data={points} x="time" y="temperatureMax" xScale={scaleBand()}>
		<Svg>
			<AxisX baseline={true} formatTick={formatter} />
			<Line />
		</Svg>
	</LayerCake>
</div>

<style>
	/*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
	.chart-container {
		width: 100%;
		height: 50px;
	}
</style>
