/**
 * Reddit API Caching System
 * 
 * This caching system helps manage Reddit API rate limits (10 requests per minute)
 * by storing responses in localStorage with automatic expiration.
 * 
 * Features:
 * - 5-minute cache expiration
 * - localStorage persistence (survives page refresh)
 * - Aggressive automatic cleanup of expired entries
 * - Smart cache keys for different data types
 * - Debug interface via CacheManager component (desktop only)
 * 
 * Cache Types:
 * - SUBREDDIT_POSTS: Posts from specific subreddits
 * - SEARCH_POSTS: Search results
 * - COMMENTS: Comments for specific posts
 * 
 * Automatic Cleanup:
 * - Every 1 minute (primary cleanup)
 * - Every 5 minutes (deep cleanup)
 * - On tab focus/visibility change
 * - On window focus
 * - On network reconnection
 * - On page unload
 * - Random cleanup during cache operations (10% chance)
 * 
 * Usage:
 * - Cache is automatically checked before API calls in Redux slices
 * - Manual management available via floating CacheManager component (desktop only)
 * - Fully automated - no manual intervention needed
 */

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export class RedditCache {
  constructor() {
    this.prefix = 'reddit_cache_';
  }

  // Generate cache key based on type and parameters
  generateKey(type, params) {
    const paramsStr = typeof params === 'string' ? params : JSON.stringify(params);
    return `${this.prefix}${type}_${paramsStr}`;
  }

  // Store data in localStorage with timestamp
  set(type, params, data) {
    try {
      const key = this.generateKey(type, params);
      const cacheEntry = {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + CACHE_DURATION
      };
      localStorage.setItem(key, JSON.stringify(cacheEntry));
      console.log(`Cached: ${key}`);
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }

  // Retrieve data from localStorage if not expired
  get(type, params) {
    try {
      const key = this.generateKey(type, params);
      const cached = localStorage.getItem(key);
      
      if (!cached) {
        // Occasionally clean expired entries when cache misses occur
        if (Math.random() < 0.1) { // 10% chance
          this.clearExpired();
        }
        return null;
      }

      const cacheEntry = JSON.parse(cached);
      
      // Check if cache has expired
      if (Date.now() > cacheEntry.expiresAt) {
        this.remove(type, params);
        console.log(`Cache expired: ${key}`);
        
        // When we find expired entries, clean others too
        setTimeout(() => this.clearExpired(), 100);
        
        return null;
      }

      console.log(`Cache hit: ${key}`);
      return cacheEntry.data;
    } catch (error) {
      console.warn('Failed to retrieve cached data:', error);
      return null;
    }
  }

  // Remove specific cache entry
  remove(type, params) {
    try {
      const key = this.generateKey(type, params);
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove cached data:', error);
    }
  }

  // Clear all expired cache entries
  clearExpired() {
    try {
      const keys = Object.keys(localStorage);
      const currentTime = Date.now();
      
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          try {
            const cached = localStorage.getItem(key);
            const cacheEntry = JSON.parse(cached);
            
            if (currentTime > cacheEntry.expiresAt) {
              localStorage.removeItem(key);
              console.log(`Removed expired cache: ${key}`);
            }
          } catch (error) {
            // Remove corrupted cache entries
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.warn('Failed to clear expired cache:', error);
    }
  }

  // Clear all Reddit cache
  clearAll() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      console.log('Cleared all Reddit cache');
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  // Get cache info for debugging
  getInfo() {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter(key => key.startsWith(this.prefix));
      const currentTime = Date.now();
      
      return cacheKeys.map(key => {
        try {
          const cached = localStorage.getItem(key);
          const cacheEntry = JSON.parse(cached);
          const timeLeft = cacheEntry.expiresAt - currentTime;
          
          return {
            key: key.replace(this.prefix, ''),
            isExpired: timeLeft <= 0,
            timeLeftSeconds: Math.max(0, Math.floor(timeLeft / 1000)),
            dataSize: JSON.stringify(cacheEntry.data).length
          };
        } catch {
          return { key, error: 'Corrupted' };
        }
      });
    } catch (error) {
      console.warn('Failed to get cache info:', error);
      return [];
    }
  }
}

// Create singleton instance
export const redditCache = new RedditCache();

// Cache types constants
export const CACHE_TYPES = {
  SUBREDDIT_POSTS: 'subreddit_posts',
  SEARCH_POSTS: 'search_posts', 
  COMMENTS: 'comments'
}; 