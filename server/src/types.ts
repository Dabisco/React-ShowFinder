interface ShowImage {
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
