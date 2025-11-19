import express from "express";
import type { Request, Response } from "express";
import type { ShowSearchResults } from "./types.js";
import type { Show } from "./types.js";
import cors from "cors";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

interface PageQuery {
  page: string;
}

interface searchQuery {
  showQuery: string;
}

interface ShowPath {
  showId: string;
}

interface Error {
  name: string;
  message: string;
  code: number;
  status: number;
}

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get(
  "/api/shows/:showId",
  async (req: Request<ShowPath, {}, {}, {}>, res: Response) => {
    const { showId } = req.params;

    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);

      let data: any = {};
      let rawText: string | null = null;

      try {
        data = await response.json();
      } catch {
        rawText = await response.text().catch(() => null);
      }

      if (!response.ok) {
        const msg =
          data?.message ||
          data?.name ||
          rawText ||
          response.statusText ||
          "Unknown API error!";
        return res
          .status(response.status)
          .json({ message: `API error: ${msg}` });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error("Internal server error: ", error);
      res.status(500).json({ message: `Internal Server error!` });
    }
  }
);

app.get(
  "/api/shows/",
  async (req: Request<{}, {}, {}, PageQuery>, res: Response) => {
    const { page } = req.query;
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/shows?page=${parseInt(page)}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(401);
    }
  }
);

app.get(
  "/api/shows/:showId/episodes",
  async (req: Request<ShowPath, {}, {}, {}>, res: Response) => {
    const { showId } = req.params;

    try {
      const response = await fetch(
        `https://api.tvmaze.com/shows/${showId}/episodes`
      );

      let data: any = [];
      let rawText: string | null = null;

      try {
        data = await response.json();
      } catch {
        rawText = await response.text().catch(() => null);
      }

      if (!response.ok) {
        const msg =
          data?.message ||
          data?.name ||
          rawText ||
          response.statusText ||
          "Unknown API error!";

        return res.status(response.status).json({ message: `${msg}` });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: `Internal server error!` });
    }
  }
);

app.get(
  "/api/shows/:showId/cast",
  async (req: Request<ShowPath, {}, {}, {}>, res: Response) => {
    const { showId } = req.params;

    try {
      const response = await fetch(
        `https://api.tvmaze.com/shows/${showId}/cast`
      );

      let data: any = [];
      let rawText: string | null = null;

      try {
        data = await response.json();
      } catch {
        rawText = await response.text().catch(() => null);
      }

      if (!response.ok) {
        const msg =
          data?.message ||
          data?.name ||
          rawText ||
          response.statusText ||
          "Unknown API error!";
        console.log(msg);
        return res.status(response.status).json({ message: `${msg}` });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: `Internal server error!` });
    }
  }
);

app.get(
  "/api/search/",
  async (req: Request<{}, {}, {}, searchQuery>, res: Response) => {
    const { showQuery } = req.query;
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${showQuery}`
      );
      if (!response.ok) {
        return res
          .status(response.status)
          .json({ message: `An error occurred!: ${response.statusText}` });
      }

      const data = (await response.json()) as ShowSearchResults[];
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error!" });
    }
  }
);

app.listen(port, () => {
  console.log("Server running successfully on port ", port);
});
