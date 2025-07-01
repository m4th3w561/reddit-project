'use client';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';
import { setupListeners } from "@reduxjs/toolkit/query";
import { useEffect, useRef } from "react";

export function StoreProvider ({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  
  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={ storeRef.current }>{ children }</Provider>;
}