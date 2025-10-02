import { useState } from 'react';

export type SwipeDirection = 'left' | 'right';
export type UserType = 'A' | 'B';

export interface SwipeDecision {
  venueId: string;
  direction: SwipeDirection;
  liked: boolean; // right = yes/liked, left = no/disliked
  timestamp: number;
}

export interface SwipeHistory {
  userA: SwipeDecision[];
  userB: SwipeDecision[];
}

/**
 * Hook to manage swipe state for both users
 * Tracks individual swipe decisions for later aggregation
 */
export function useSwipeState() {
  const [currentUser, setCurrentUser] = useState<UserType>('A');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<SwipeHistory>({
    userA: [],
    userB: [],
  });

  /**
   * Record a swipe decision for the current user
   */
  const recordSwipe = (venueId: string, direction: SwipeDirection) => {
    const decision: SwipeDecision = {
      venueId,
      direction,
      liked: direction === 'right',
      timestamp: Date.now(),
    };

    setSwipeHistory((prev) => ({
      ...prev,
      [currentUser === 'A' ? 'userA' : 'userB']: [
        ...(currentUser === 'A' ? prev.userA : prev.userB),
        decision,
      ],
    }));

    // Move to next card
    setCurrentIndex((prev) => prev + 1);
  };

  /**
   * Switch between User A and User B
   */
  const toggleUser = (user: UserType) => {
    setCurrentUser(user);
  };

  /**
   * Reset the swipe session
   */
  const resetSession = () => {
    setCurrentIndex(0);
    setSwipeHistory({ userA: [], userB: [] });
    setCurrentUser('A');
  };

  /**
   * Get matches (venues both users liked)
   */
  const getMatches = () => {
    const userALikes = new Set(
      swipeHistory.userA.filter((s) => s.liked).map((s) => s.venueId)
    );
    const userBLikes = new Set(
      swipeHistory.userB.filter((s) => s.liked).map((s) => s.venueId)
    );

    return Array.from(userALikes).filter((venueId) => userBLikes.has(venueId));
  };

  /**
   * Check if both users have completed swiping
   */
  const isBothUsersComplete = (totalVenues: number) => {
    return swipeHistory.userA.length === totalVenues && swipeHistory.userB.length === totalVenues;
  };

  /**
   * Get progress for each user
   */
  const getProgress = (totalVenues: number) => {
    return {
      userA: swipeHistory.userA.length,
      userB: swipeHistory.userB.length,
      total: totalVenues,
    };
  };

  return {
    currentUser,
    currentIndex,
    swipeHistory,
    recordSwipe,
    toggleUser,
    resetSession,
    getMatches,
    isBothUsersComplete,
    getProgress,
  };
}
