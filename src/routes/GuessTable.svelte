<script lang="ts">
	import type { Car } from '$lib/types';

	export let guesses: Array<Partial<Car>>;
	export let answer: Car;

	/** Sets background color according to the relation between `lhs` and `rhs`. */
	function matches(lhs: string, rhs: string | undefined): string {
		return lhs === rhs ? 'bg-success' : 'bg-error';
	}

	/**
	 * Sets background color according to the relation between `lhs` and `rhs`.
	 * Adds directional pointer after content when `lhs` does not equal `rhs`.
	 */
	function within(lhs: number, rhs: number | undefined, range: number): string {
		if (typeof rhs !== 'number') {
			return 'bg-error';
		}

		const classes = [];

		if (lhs == rhs) {
			classes.push('bg-success');
		} else {
			if (Math.abs(lhs - rhs) <= range) {
				classes.push('bg-warning');
			} else {
				classes.push('bg-error');
			}

			if (lhs > rhs) {
				classes.push('after:content-["🞁"]');
			} else {
				classes.push('after:content-["🞃"]');
			}

			classes.push('after:px-2');
		}

		return classes.join(' ');
	}
</script>

<table class="table table-pin-rows table-lg">
	<thead>
		<tr>
			<td>Make</td>
			<td>Name</td>
			<td>Year</td>
			<td>Drivetrain</td>
			<td>Power (kW)</td>
			<td>Weight (kg)</td>
		</tr>
	</thead>
	<tbody class="font-bold text-neutral">
		{#each guesses as car}
			<tr>
				<td class={matches(answer.make, car.make)}>{car.make || ''}</td>
				<td class={matches(answer.name, car.name)}>{car.name || ''}</td>
				<td class={within(answer.year, car.year, 5)}>{car.year || ''}</td>
				<td class={matches(answer.drivetrain, car.drivetrain)}>{car.drivetrain || ''}</td>
				<td class={within(answer.power, car.power, 25)}>{car.power || ''}</td>
				<td class={within(answer.weight, car.weight, 100)}>{car.weight || ''}</td>
			</tr>
		{/each}
	</tbody>
</table>
