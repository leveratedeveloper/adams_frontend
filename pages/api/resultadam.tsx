'use server';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
      }
      
      try {
        const { lastItem } = req.body;
      
        if (!lastItem || !Array.isArray(lastItem) || lastItem.length === 0) {
          return res.status(400).json({ error: "Invalid lastItem format" });
        }
      
        const items = Array.isArray(lastItem) ? lastItem : [lastItem]; // ✅ Normalize to an array
        const sessionId = items[0]?.session_id;
        
        if (!sessionId) {
          return res.status(400).json({ error: "Missing session_id" });
        }
      
        const formData = new FormData();
        formData.append("session_id", sessionId); // ✅ Correct extraction
        formData.append("result", JSON.stringify(items[0]?.result)); // Convert result to JSON if needed
      
        const response = await fetch(
          process.env.CMS_ENDPOINT+"/api/admin/request-results",
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
          data = await response.json();
        } else {
          data = await response.text();
        }
      
        res.status(response.status).json(data);
      } catch (error) {
        console.error("Error making request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      
}
