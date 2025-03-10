'use server';

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { appID,deviceType } = req.query; // Use query params instead of req.body
  if (!appID || !deviceType) {
    return res.status(400).json({ error: "appID and deviceType are required" });
  }

  const url = "https://public-api.apptweak.com/api/public/store/keywords/suggestions/app.json";
  const params = {
    apps: appID,
    country: "id",
    language: "en",
    device: deviceType,
    limit: 40,
    offset: 0,
    sort: "volume",
    sort_direction: "desc",
  };

  try {
    const { data } = await axios.get(url, {
      headers: {
        accept: "application/json",
        "x-apptweak-key": process.env.APPTWEAK_API_KEY,
      },
      params, // Correctly pass query params
    });
    const appIDObject = { id: appID };

    res.status(200).json(data.result);
  } catch (error) {
    console.error("Error fetching data:", error || error);
    res.status(500).json({ error: error || "Internal Server Error" });
  }
}
  