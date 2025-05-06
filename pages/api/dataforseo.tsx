import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { searchQuery, statMarket }: { searchQuery: string; statMarket: "playstore" | "appstore" } = req.body;

    if (!searchQuery || !statMarket) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const API_USERNAME = process.env.DATAFORSEO_USERNAME!;
    const API_PASSWORD = process.env.DATAFORSEO_PASSWORD!;
    
    const API_URLS = {
      playstore: "https://api.dataforseo.com/v3/app_data/google/app_listings/search/live",
      appstore: "https://api.dataforseo.com/v3/app_data/apple/app_listings/search/live",
    };

    const requestBody = [
      {
        categories: ["Finance", "Business"],
        description: searchQuery,
        title: searchQuery,
        limit: 100,
        additional_data: {
          filters: [
            ["item.rating.value", ">", 2.5],
            "and",
            [
              "location_code",
              "in",
              [
                2840, 20436, 20437, 20438, 20439, 20440, 20441, 20442, 20443, 20444,
                20445, 20446, 20447, 20448, 20449, 20450, 20451, 9056636, 9056637,
                9056638, 9056639, 9056640, 9056641, 9056642, 9056643, 9056644,
                9056645, 9056646, 9056647, 9056648, 9056649, 9056650, 9056651, 9069533,
              ],
            ],
          ],
        },
      },
    ];

    if (!API_URLS[statMarket]) {
      return res.status(400).json({ message: "Invalid statMarket" });
    }

    const response = await axios.post(API_URLS[statMarket], requestBody, {
      auth: {
        username: API_USERNAME,
        password: API_PASSWORD,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const items = response.data?.tasks?.[0]?.result?.[0]?.items || [];
    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching data from DataForSEO:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
