"use client";

import { useState, useEffect, useCallback } from "react";
import type { InventoryItem } from "./api";

export type Vehicle = InventoryItem;

const STORAGE_KEY = "kennedy-compare";
const MAX_COMPARE = 4;

export function useCompare() {
  const [compareList, setCompareList] = useState<Vehicle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCompareList(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (list: Vehicle[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
  };

  const addToCompare = useCallback((vehicle: Vehicle) => {
    setCompareList((prev) => {
      if (prev.some((v) => v.id === vehicle.id)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      const next = [...prev, vehicle];
      persist(next);
      return next;
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => {
      const next = prev.filter((v) => v.id !== id);
      persist(next);
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    persist([]);
  }, []);

  const isInCompare = useCallback(
    (id: string) => compareList.some((v) => v.id === id),
    [compareList]
  );

  return {
    compareList,
    mounted,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    maxReached: compareList.length >= MAX_COMPARE,
  };
}
