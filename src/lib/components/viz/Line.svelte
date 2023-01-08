<script>
	import { getContext } from 'svelte'

	const { data, xGet, yGet, xScale } = getContext('LayerCake')

	/** @type {String} [stroke='#ab00d6'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */
	export let stroke = '#ab00d6'

	$: isBandwidth = typeof $xScale.bandwidth === 'function'

	$: path =
		'M' +
		$data
			.map((d) => {
				return isBandwidth
					? $xScale.bandwidth() / 2 + $xGet(d) + ',' + $yGet(d)
					: $xGet(d) + ',' + $yGet(d)
			})
			.join('L')
</script>

<path class="path-line" d={path} {stroke} />

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
</style>
