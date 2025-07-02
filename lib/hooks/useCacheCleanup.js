import { useEffect } from 'react';
import { redditCache } from '@/lib/utils/cache';

// Custom hook to automatically clean expired cache
export const useCacheCleanup = () => {
  useEffect(() => {
    // Clean up expired cache on mount
    redditCache.clearExpired();

    // More aggressive cleanup intervals
    // Primary cleanup every 60 seconds (1 minute)
    const primaryCleanupInterval = setInterval(() => {
      redditCache.clearExpired();
    }, 60 * 1000); // 1 minute

    // Secondary deeper cleanup every 5 minutes
    const secondaryCleanupInterval = setInterval(() => {
      redditCache.clearExpired();
      console.log('🧹 Deep cache cleanup completed');
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup on page visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        redditCache.clearExpired();
        console.log('🔄 Cache cleaned on tab focus');
      }
    };

    // Cleanup when page is about to unload
    const handleBeforeUnload = () => {
      redditCache.clearExpired();
    };

    // Cleanup on window focus (when user clicks back into the window)
    const handleFocus = () => {
      redditCache.clearExpired();
    };

    // Cleanup on network status change (when coming back online)
    const handleOnline = () => {
      setTimeout(() => {
        redditCache.clearExpired();
        console.log('🌐 Cache cleaned on network reconnection');
      }, 1000); // Small delay to ensure network is stable
    };

    // Register all event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleOnline);

    // Cleanup on unmount
    return () => {
      clearInterval(primaryCleanupInterval);
      clearInterval(secondaryCleanupInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('online', handleOnline);
    };
  }, []);
}; 