/**
 * Mock Venue Data
 * Simulates Google Places API response structure
 */

export interface Venue {
  id: string;
  name: string;
  rating: number;
  price_level: number; // 0-4 (free to very expensive)
  photo_url: string;
  address: string;
  types: string[];
}

/**
 * Mock dataset with 15 diverse date-night venues
 * Matches Google Places API field structure for future integration
 */
export const mockVenues: Venue[] = [
  {
    id: 'venue_001',
    name: 'The Moonlit Bistro',
    rating: 4.7,
    price_level: 3,
    photo_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    address: '123 Harbor St, Downtown',
    types: ['restaurant', 'fine_dining', 'romantic'],
  },
  {
    id: 'venue_002',
    name: 'Neon Nights Arcade Bar',
    rating: 4.5,
    price_level: 2,
    photo_url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800',
    address: '456 Electric Ave, Arts District',
    types: ['bar', 'arcade', 'entertainment'],
  },
  {
    id: 'venue_003',
    name: 'Starlight Rooftop',
    rating: 4.8,
    price_level: 4,
    photo_url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
    address: '789 Skyline Blvd, West End',
    types: ['bar', 'rooftop', 'cocktails'],
  },
  {
    id: 'venue_004',
    name: 'Cozy Corner Café',
    rating: 4.3,
    price_level: 1,
    photo_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    address: '321 Grove St, Old Town',
    types: ['cafe', 'coffee', 'casual'],
  },
  {
    id: 'venue_005',
    name: 'Twilight Jazz Lounge',
    rating: 4.6,
    price_level: 3,
    photo_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    address: '555 Melody Ln, Theater District',
    types: ['bar', 'live_music', 'jazz'],
  },
  {
    id: 'venue_006',
    name: 'Sunset Sushi & Sake',
    rating: 4.9,
    price_level: 3,
    photo_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    address: '888 Ocean Dr, Marina',
    types: ['restaurant', 'japanese', 'sushi'],
  },
  {
    id: 'venue_007',
    name: 'The Book Nook Wine Bar',
    rating: 4.4,
    price_level: 2,
    photo_url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',
    address: '234 Library St, University District',
    types: ['bar', 'wine_bar', 'books'],
  },
  {
    id: 'venue_008',
    name: 'Flame & Fork Steakhouse',
    rating: 4.7,
    price_level: 4,
    photo_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    address: '999 Prime Ave, Financial District',
    types: ['restaurant', 'steakhouse', 'upscale'],
  },
  {
    id: 'venue_009',
    name: 'Velvet Underground Club',
    rating: 4.2,
    price_level: 2,
    photo_url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800',
    address: '777 Beat St, Warehouse District',
    types: ['nightclub', 'dancing', 'dj'],
  },
  {
    id: 'venue_010',
    name: 'Garden Terrace Italian',
    rating: 4.6,
    price_level: 3,
    photo_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    address: '456 Vineyard Rd, Hillside',
    types: ['restaurant', 'italian', 'patio'],
  },
  {
    id: 'venue_011',
    name: 'Craft Beer Collective',
    rating: 4.5,
    price_level: 2,
    photo_url: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800',
    address: '123 Hops St, Brewery Row',
    types: ['bar', 'brewery', 'craft_beer'],
  },
  {
    id: 'venue_012',
    name: 'Midnight Taco Cantina',
    rating: 4.4,
    price_level: 1,
    photo_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    address: '890 Salsa Blvd, Mission District',
    types: ['restaurant', 'mexican', 'casual'],
  },
  {
    id: 'venue_013',
    name: 'The Cinema Café',
    rating: 4.3,
    price_level: 2,
    photo_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    address: '567 Screen St, Entertainment Complex',
    types: ['cafe', 'cinema', 'entertainment'],
  },
  {
    id: 'venue_014',
    name: 'Harbour Seafood Grill',
    rating: 4.8,
    price_level: 3,
    photo_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    address: '111 Pier Walk, Waterfront',
    types: ['restaurant', 'seafood', 'waterfront'],
  },
  {
    id: 'venue_015',
    name: 'Retro Diner & Shakes',
    rating: 4.1,
    price_level: 1,
    photo_url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
    address: '345 Nostalgia Ave, Suburbs',
    types: ['restaurant', 'diner', 'american'],
  },
];

/**
 * Helper to get price level display
 */
export function getPriceLevelDisplay(price_level: number): string {
  return '$'.repeat(Math.max(1, Math.min(4, price_level)));
}
