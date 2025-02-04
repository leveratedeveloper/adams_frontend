'use server';

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
      }
    
      try {
        const { lastItem } = req.body;

        if (!lastItem) {
          return res.status(400).json({ error: 'No lastItem provided' });
        }

        const formData = new FormData();
        formData.append("session_id", lastItem['session']);
        formData.append("type", "web");
        formData.append("url", lastItem['url']);
        formData.append("country", lastItem['country']);
        formData.append("is_premium", lastItem['premium_backlink']);
        formData.append("keywords_optimized", lastItem['keyword_optimized']);
        formData.append("onpage_articles", "10");
        formData.append("ip", "103.135.220.186");
        formData.append(
          "user_agent",
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 9_8_4; en-US) AppleWebKit/537.18 (KHTML, like Gecko) Chrome/48.0.1488.203 Safari/537"
        );
    
        const response = await fetch(
          "https://backend-stg.adamsolutions.asia/api/admin/request-inquiries",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer 1|MBJv7P6qx4mcdpGDmqat6AHGudOIBXulF5aNsIgL2225042a", // Replace with actual token
            },
            body: formData,
          }
        );
    
        console.log("response nih",response)
        const data = await response.json();
        res.status(response.status).json(data);
      } catch (error) {
        console.error("Error making request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}
