import type { GameSnapshot } from "$lib/game";

interface SaveData {
  session: string;
  snapshot: GameSnapshot;
}

export function load(): SaveData | null {
  return JSON.parse(localStorage.getItem("savedata") as any);
}

export function save(data: SaveData) {
  localStorage.setItem("savedata", JSON.stringify(data));
}
