'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { redditCache } from '@/lib/utils/cache';
import { clearCache as clearPostsCache } from '@/lib/features/post/postSlice';
import { clearCache as clearCommentsCache } from '@/lib/features/comments/commentsSlice';
import { clearCache as clearSearchCache } from '@/lib/features/search/searchSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, RefreshCw, Clock, Database } from 'lucide-react';

const CacheManager = () => {
  const [cacheInfo, setCacheInfo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const refreshCacheInfo = () => {
    setCacheInfo(redditCache.getInfo());
  };

  useEffect(() => {
    refreshCacheInfo();
  }, []);

  const clearAllCache = () => {
    redditCache.clearAll();
    dispatch(clearPostsCache());
    dispatch(clearCommentsCache());
    dispatch(clearSearchCache());
    refreshCacheInfo();
  };

  const clearExpiredCache = () => {
    redditCache.clearExpired();
    refreshCacheInfo();
  };

  const clearSpecificCache = (key) => {
    const [type, ...params] = key.split('_');
    const paramStr = params.join('_');
    
    if (type === 'subreddit' && params[0] === 'posts') {
      dispatch(clearPostsCache(params[1]));
    } else if (type === 'search' && params[0] === 'posts') {
      dispatch(clearSearchCache(paramStr));
    } else if (type === 'comments') {
      dispatch(clearCommentsCache(paramStr));
    }
    
    refreshCacheInfo();
  };

  const formatCacheKey = (key) => {
    const parts = key.split('_');
    if (parts[0] === 'subreddit' && parts[1] === 'posts') {
      return `r/${parts[2]} posts`;
    } else if (parts[0] === 'search' && parts[1] === 'posts') {
      return `Search: "${parts.slice(2).join('_')}"`;
    } else if (parts[0] === 'comments') {
      return `Comments: ${parts.slice(1).join('_')}`;
    }
    return key;
  };

  const formatDataSize = (bytes) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline" 
        size="sm"
        className="fixed bottom-4 right-4 z-50 hidden md:flex"
      >
        <Database className="w-4 h-4 mr-1" />
        Cache ({cacheInfo.length})
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 hidden md:block">
      <Card className="bg-background/95 backdrop-blur border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="w-4 h-4" />
              Cache Manager
            </CardTitle>
            <Button 
              onClick={() => setIsOpen(false)}
              variant="ghost" 
              size="sm"
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button 
              onClick={refreshCacheInfo}
              variant="outline" 
              size="sm"
              className="flex-1"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Refresh
            </Button>
            <Button 
              onClick={clearExpiredCache}
              variant="outline" 
              size="sm"
              className="flex-1"
            >
              <Clock className="w-3 h-3 mr-1" />
              Clear Expired
            </Button>
            <Button 
              onClick={clearAllCache}
              variant="destructive" 
              size="sm"
              className="flex-1"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2">
            {cacheInfo.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No cache entries found
              </p>
            ) : (
              cacheInfo.map((cache, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted/50 rounded text-xs"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate" title={cache.key}>
                      {formatCacheKey(cache.key)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {cache.error ? (
                        <Badge variant="destructive" className="text-xs">
                          {cache.error}
                        </Badge>
                      ) : (
                        <>
                          <Badge 
                            variant={cache.isExpired ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {cache.isExpired ? 'Expired' : `${cache.timeLeftSeconds}s`}
                          </Badge>
                          <span className="text-muted-foreground">
                            {formatDataSize(cache.dataSize)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => clearSpecificCache(cache.key)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 ml-2"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CacheManager; 