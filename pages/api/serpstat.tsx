'use server';

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { params } = req.body; // Get the domain from the request body
  const domain = params?.domain; 

  
  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' });
  }

  const apiUrl = 'https://api.serpstat.com/v4/?token='; // Replace with the actual Serpstat API URL
  const apiKey = process.env.API_SECRET_KEY; // Store your API key in an environment variable


  const postData = {
    id: "1",
    method: "SerpstatDomainProcedure.getDomainKeywords",
    params: {
      domain,
      se: "g_id",
      withIntents: true,
      sort: { region_queries_count: "desc" },
      size:"40",
      filters: {
        right_spelling: false,
        position_from: 6,
        position_to: 20,
      },
    },
  };

  try {
    const response = await axios.post(apiUrl+apiKey, postData, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${apiKey}`, // If Serpstat uses Bearer tokens
      },
    });

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error fetching data from Serpstat:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch data from Serpstat' });
  }
}
