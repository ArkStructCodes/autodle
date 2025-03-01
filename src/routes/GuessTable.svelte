<script lang="ts">
  import { fly } from "svelte/transition";

  import type { Car } from "$lib/schema";

  interface Props {
    answer: Car;
    guesses: Partial<Car>[];
  }

  let { answer, guesses }: Props = $props();
</script>

{#snippet textComparison(original: string, value: any)}
  {@const isEqual = original === value}
  <td class:bg-rose-500={!isEqual} class:bg-emerald-500={isEqual}>
    {value || ""}
  </td>
{/snippet}

{#snippet numberComparison(original: number, value: any, range: number)}
  {@const gap = original - value}
  <td
    class:bg-rose-500={isNaN(gap) || Math.abs(gap) > range}
    class:bg-amber-500={gap !== 0 && Math.abs(gap) <= range}
    class:bg-emerald-500={gap === 0}
  >
    <span class="flex justify-center gap-2">
      <span>{value ?? ""}</span>
      {#if !isNaN(gap)}
        <span>{gap === 0 ? "" : gap > 0 ? "▲" : "▼"}</span>
      {/if}
    </span>
  </td>
{/snippet}

<table class="table-pin-rows table-lg table w-full">
  <thead>
    <tr>
      <th class="min-w-36">Country</th>
      <th class="min-w-36">Make</th>
      <th class="w-[16ch]">Year</th>
      <th class="min-w-60">Name</th>
      <th class="w-[16ch]">Drivetrain</th>
      <th class="w-[16ch]">Power (kW)</th>
      <th class="w-[16ch]">Weight (kg)</th>
    </tr>
  </thead>
  <tbody class="text-neutral font-bold">
    {#each guesses as guess}
      <tr in:fly={{ delay: 150, y: "-100%" }}>
        {@render textComparison(answer.country, guess.country)}
        {@render textComparison(answer.make, guess.make)}
        {@render numberComparison(answer.year, guess.year, 5)}
        {@render textComparison(answer.name, guess.name)}
        {@render textComparison(answer.drivetrain, guess.drivetrain)}
        {@render numberComparison(answer.power, guess.power, 50)}
        {@render numberComparison(answer.weight, guess.weight, 200)}
      </tr>
    {/each}
  </tbody>
</table>
