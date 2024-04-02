<script lang="ts">
	export let guesses: Car[];
	export let answer: Car;

	import type { Car } from '$lib/schema';

    const answerRangeThreshold = 10;

	function matchesAnswer(field: string, value: string | number) {
		const prop = Object.getOwnPropertyDescriptor(answer, field)!;
		return prop.value == value ? 'bg-success' : 'bg-error';
	}

    // TODO: optimize garbage
	function inAnswerRange(field: string, value: number) {
		const prop = Object.getOwnPropertyDescriptor(answer, field)!;
        const result = ['after:p-2', 'after:text-xl'];

		if (prop.value == value) {
			result.push('bg-success');
		} else {
            if (Math.abs(prop.value - value) <= answerRangeThreshold) {
                result.push("bg-warning");
            } else {
                result.push('bg-error');
            }

            if (prop.value > value) {
                result.push("after:content-['↑']");
            } else {
                result.push("after:content-['↓']");
            }
		}

        return result.join(' ');
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
				<td class={matchesAnswer('make', car.make)}>{car.make}</td>
				<td class={matchesAnswer('name', car.name)}>{car.name}</td>
				<td class={inAnswerRange('year', car.year)}>{car.year}</td>
				<td class={matchesAnswer('drivetrain', car.drivetrain)}>{car.drivetrain}</td>
				<td class={inAnswerRange('power', car.power)}>{car.power}</td>
				<td class={inAnswerRange('weight', car.weight)}>{car.weight}</td>
			</tr>
		{/each}
	</tbody>
</table>
