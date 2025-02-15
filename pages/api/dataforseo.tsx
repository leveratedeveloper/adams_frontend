'use server';
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { searchQuery, checkedItems } = req.body;

  if (!searchQuery || !checkedItems) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  const API_URL = "https://api.dataforseo.com/v3/app_data/google/app_listings/search/live";
  const API_URL2 = "https://api.dataforseo.com/v3/app_data/apple/app_listings/search/live";
  const API_USERNAME = process.env.DATAFORSEO_USERNAME || "";
  const API_PASSWORD = process.env.DATAFORSEO_PASSWORD || "";

  const requestBody = [
    {
      categories: ["Finance", "Business"],
      description: searchQuery,
      title: searchQuery,
      limit: 100,
      additional_data: {
        filters: [["language_code", "=", "en"]],
      },
    },
  ];
  
  try {
    const apiCalls = [];

    if (checkedItems["optionGoogle"]) {
      apiCalls.push(
        axios.post(API_URL, requestBody, {
          auth: {
            username: API_USERNAME,
            password: API_PASSWORD,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
    }

    if (checkedItems["optionApple"]) {
      apiCalls.push(
        axios.post(API_URL2, requestBody, {
          auth: {
            username: API_USERNAME,
            password: API_PASSWORD,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
    }

    if (apiCalls.length === 0) {
      return res.status(200).json([]);
    }
    
    const responses = await Promise.all(apiCalls);
    console.log("ini responses",responses)
    const results = responses.flatMap((response) => response.data.tasks?.[0]?.result?.[0]?.items || []);

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
