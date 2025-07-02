import { useEffect } from 'react';
import { redditCache } from '@/lib/utils/cache';

// Custom hook to automatically clean expired cache
export const useCacheCleanup = () => {
  useEffect(() => {
    // Clean up expired cache on mount
    redditCache.clearExpired();

    // Set up periodic cleanup every 2 minutes
    const cleanupInterval = setInterval(() => {
      redditCache.clearExpired();
    }, 2 * 60 * 1000); // 2 minutes

    // Cleanup on page visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        redditCache.clearExpired();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      clearInterval(cleanupInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}; 