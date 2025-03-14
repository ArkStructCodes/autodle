<script lang="ts">
  import { onMount } from "svelte";

  import { assertNonNullish } from "$lib/utils";
  import { Game, type GameSnapshot } from "$lib/game";
  import { GameError } from "$lib/game/error";
  import Alert, { alert } from "$lib/components/Alert.svelte";
  import Search, { type SearchResult } from "$lib/components/Search.svelte";
  import githubIcon from "$lib/icons/github.svg?raw";
  import helpIcon from "$lib/icons/help.svg?raw";

  import { celebrate } from "./confetti";
  import Help from "./Help.svelte";
  import Controls from "./Controls.svelte";
  import GuessMeter from "./GuessMeter.svelte";
  import GuessTable from "./GuessTable.svelte";
  import GameSummary from "./GameSummary.svelte";
  import type { PageProps } from "./$types";

  interface SaveData {
    session: string;
    snapshot: GameSnapshot;
  }

  let { data }: PageProps = $props();
  const { gameParams, session, nextUpdateAt, searchItems } = data;

  const game = new Game(gameParams);
  let selected: SearchResult | undefined = $state();

  // svelte-ignore non_reactive_update
  let help: Help;
  let search: Search;
  let summary: GameSummary;

  onMount(() => {
    const savedata: SaveData | null = JSON.parse(localStorage.getItem("savedata") as any);
    if (savedata) {
      if (savedata.session === session) {
        game.load(savedata.snapshot);
      }
    } else {
      help.show();
    }

    game.subscribe(snapshot => {
      if (snapshot.status !== "ready") {
        summary.show();
        if (snapshot.status === "won") {
          setTimeout(celebrate, 100);
        }
      }
      // store the snapshot persistently each time its updated
      localStorage.setItem(
        "savedata",
        JSON.stringify({ session, snapshot: game.dump() }),
      );
    });
  });
</script>

<div class="flex h-svh flex-col">
  <header class="navbar">
    <div class="navbar-start">
      <a
        href="https://github.com/ArkStructCodes/autodle"
        title="Star this project on GitHub"
        target="_blank"
        class="btn btn-circle btn-ghost"
      >
        {@html githubIcon}
      </a>
    </div>
    <div class="navbar-center">
      <h1 class="text-2xl font-black">Autodle</h1>
    </div>
    <div class="navbar-end">
      <button onclick={() => help.show()} title="Help" class="btn btn-circle btn-ghost">
        {@html helpIcon}
      </button>
    </div>
  </header>

  <main class="flex flex-1 flex-col items-center gap-6 overflow-hidden">
    <div class="flex flex-col items-center">
      <GuessMeter limit={gameParams.guessLimit} remaining={$game.guessesRemaining} />
      <Controls
        {selected}
        hintAvailable={$game.hintAvailable}
        search={() => search.show()}
        guess={() => {
          assertNonNullish(selected);
          try {
            game.guess(selected.index);
          } catch (error) {
            if (error instanceof GameError) {
              alert(error.message);
            } else {
              console.error(error);
            }
          }
          selected = undefined;
        }}
        hint={() => game.hint()}
      />
    </div>
    <div class="w-full flex-1 overflow-auto xl:w-3/4">
      <GuessTable answer={gameParams.answer} guesses={$game.guesses} />
    </div>
  </main>
</div>

<Alert />
<Search
  bind:this={search}
  bind:selected
  items={searchItems}
  placeholder="Search for a car"
/>
<Help bind:this={help} />
<GameSummary
  bind:this={summary}
  answer={gameParams.answer}
  snapshot={$game}
  {nextUpdateAt}
/>
