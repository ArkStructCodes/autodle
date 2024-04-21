<script lang="ts">
	import type { Car } from '$lib/types';

	export let guesses: Array<Partial<Car>>;
	export let answer: Car;

	function isEqual(lhs: any, rhs: any) {
		return lhs === rhs ? 'bg-success' : 'bg-error';
	}

	function inRange(lhs: number, rhs: number | undefined, range: number) {
        if (typeof rhs !== 'number') {
            return 'bg-error';
        }

        const classes = ['after:p-2', 'after:text-xl'];

		if (lhs == rhs) {
			classes.push('bg-success');
		} else {
            if (Math.abs(lhs - rhs) <= range) {
                classes.push("bg-warning");
            } else {
                classes.push('bg-error');
            }

            if (lhs > rhs) {
                classes.push("after:content-['↑']");
            } else {
                classes.push("after:content-['↓']");
            }
		}

        return classes.join(' ');
	}
</script>

<table class="table table-lg table-pin-rows">
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
	<tbody class="text-white font-bold" style="text-shadow: 2px 2px 4px #00000080">
		{#each guesses as car}
			<tr>
				<td class={isEqual(answer.make, car.make)}>{car.make || ''}</td>
				<td class={isEqual(answer.name, car.name)}>{car.name || ''}</td>
				<td class={inRange(answer.year, car.year, 5)}>{car.year || ''}</td>
				<td class={isEqual(answer.drivetrain, car.drivetrain)}>{car.drivetrain || ''}</td>
				<td class={inRange(answer.power, car.power, 25)}>{car.power || ''}</td>
				<td class={inRange(answer.weight, car.weight, 100)}>{car.weight || ''}</td>
			</tr>
		{/each}
	</tbody>
</table>
