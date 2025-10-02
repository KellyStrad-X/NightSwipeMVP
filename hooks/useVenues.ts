import { useState, useEffect } from 'react';
import { mockVenues, Venue } from '@/data/mockVenues';

/**
 * Hook to load venue data
 * Currently returns mock data; will be replaced with Google Places API calls in Phase 4
 */
export function useVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay to mimic API call
    const timer = setTimeout(() => {
      setVenues(mockVenues);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { venues, loading };
}
