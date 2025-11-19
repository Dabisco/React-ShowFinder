import type { Show } from "./types.ts";
import { apiFetch } from "./api";
import type { ShowSearchResults } from "@/services/types";
import type { Episode } from "@/services/types";
import type { CastMember } from "./types.ts";

export const getPopularShows = (endpoint: string): Promise<Show[]> => {
  return apiFetch<Show[]>(`/shows?page=${endpoint}`);
};

export function getSearchResults(
  endpoint: string
): Promise<ShowSearchResults[]> {
  return apiFetch<ShowSearchResults[]>(`/search?showQuery=${endpoint}`);
}

export function getShow(endpoint: string | undefined): Promise<Show> {
  return apiFetch<Show>(`/shows/${endpoint}`);
}
export function getShowEpisodes(
  endpoint: string | undefined
): Promise<Episode[]> {
  return apiFetch<Episode[]>(`/shows/${endpoint}/episodes`);
}

export function getShowCast(endpoint: string): Promise<CastMember[]> {
  return apiFetch<CastMember[]>(`/shows/${endpoint}/cast`);
}
