export interface ShowImage {
  medium: string | null;
  original: string | null;
}

interface ShowLinks {
  self: { href: string };
  previousepisode?: { href: string; name: string };
  nextepisode?: { href: string };
}

export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string;
  };
  webChannel: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string;
  } | null;
  dvdCountry: string | null;
  externals: {
    tvrage: number | null;
    thetvdb: number | null;
    imdb: string | null;
  };
  image: ShowImage | null;
  summary: string | null;
  updated: number;
  _links: ShowLinks;
}

export interface ShowSearchResults {
  score: number;
  show: Show;
}

export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number | null; // can be null for specials
  type: string; // e.g. "regular", "special"
  airdate: string | null; // format "YYYY-MM-DD"
  airtime: string | null; // e.g. "20:00"
  airstamp: string | null; // ISO8601 timestamp with timezone :contentReference[oaicite:1]{index=1}
  runtime: number | null; // in minutes
  rating: {
    average: number | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string | null; // usually HTML <p> tags
  _links: {
    self: { href: string };
    show?: { href: string; name: string };
  };
}

export type EpisodesResponse = Episode[];

export interface Person {
  id: number;
  url: string;
  name: string;
  country: Country | null;
  birthday: string | null; // "YYYY-MM-DD"
  deathday: string | null; // can be null
  gender: string | null; // "Male", "Female", "Non-binary", etc.
  image: Image | null;
  updated: number; // unix timestamp
  _links: {
    self: { href: string };
  };
}

interface Country {
  name: string;
  code: string;
  timezone: string;
}

interface Image {
  medium: string;
  original: string;
}

interface Character {
  id: number;
  url: string;
  name: string;
  image: Image | null;
  _links: {
    self: { href: string };
  };
}

export interface CastMember {
  person: Person;
  character: Character;
  self: boolean;
  voice: boolean;
}
