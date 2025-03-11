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
        formData.append("session_id", lastItem['sessionId']);
        formData.append("type", lastItem['url'] != null ? 'web' : 'app');
        formData.append("url", lastItem['url']);
        formData.append("app_name", lastItem['appName']);
        formData.append("country", lastItem['country']);
        formData.append("is_premium", lastItem['premium_backlink']);
        formData.append("keywords_optimized", lastItem['keyword_optimized']);
        formData.append("onpage_articles", "10");
        formData.append("ip", lastItem['ipAddress']);
        formData.append("user_agent",lastItem['userAgent']);
    
        const response = await fetch(
          process.env.CMS_ENDPOINT+"/api/admin/request-inquiries",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer "+process.env.CMS_TOKEN, 
            },
            body: formData,
          }
        );
    
        const contentType = response.headers.get("content-type");

        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json(); // Parse JSON only if the response is JSON
        } else {
          data = await response.text(); // Fallback to plain text
        }
        // const data = await response.json();
        res.status(response.status).json(data);
      } catch (error) {
        console.error("Error making request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}
