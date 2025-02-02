'use server';

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
      }
    
      const apiUrl = 'https://api.dataforseo.com/v3/app_data/google/app_listings/search/live';
      const authHeader = 'Basic bWFydGVjaEBsZXZlcmF0ZS5hc2lhOjdlMTAxYzYxOGRkNzVlMzg=';
      
      const requestBody = [
        {
          title: 'vpn',
          description: 'vpn',
          categories: ['Tools'],
          order_by: ['item.installs_count,asc'],
          filters: [['item.rating.value', '>', 4.5]],
          limit: 10,
        },
      ];
    
      try {
        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
        });
    
        res.status(200).json(response.data);
      } catch (error: any) {
        console.error('Error fetching data:', error.response?.data || error.message);
        res
          .status(error.response?.status || 500)
          .json({ error: error.response?.data || 'Internal server error' });
      }
  }
  