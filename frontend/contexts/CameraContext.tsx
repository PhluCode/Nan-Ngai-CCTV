'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { useWebSocket } from '@/hooks/use-websocket';

export interface CCTV {
  id: string;
  name: string;
  rtspUrl: string;
  accidentVideoUrl: string | null;
  hasActiveAlert: boolean;
  activeIncidentId: string | null;
  sector?: string;
}

interface CameraContextType {
  cctvs: CCTV[];
  loading: boolean;
  gridSize: '2x2' | '3x3' | '4x4';
  setGridSize: (size: '2x2' | '3x3' | '4x4') => void;
  selectedCameras: CCTV[];
  setSelectedCameras: React.Dispatch<React.SetStateAction<CCTV[]>>;
  getMaxCameras: () => number;
  getDisplayTime: (id: string) => number | undefined;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export function useCamera() {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCamera must be used within a CameraProvider');
  }
  return context;
}

// Background processor for a single camera
function BackgroundCameraProcessor({ cam, setDisplayTime }: { cam: CCTV, setDisplayTime: (id: string, time: number) => void }) {
  const WS_URL = process.env.NEXT_PUBLIC_BACKEND_WS_URL || 'ws://localhost:8000/ws/detect';
  const { status, send } = useWebSocket(WS_URL, {
    reconnectOnClose: true,
    onMessage: (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'frame' && data.display_time !== undefined) {
          setDisplayTime(cam.id, data.display_time);
        }
      } catch(e) {}
    }
  });
  
  const startedRef = useRef(false);

  useEffect(() => {
    if (status === 'open' && !startedRef.current) {
      startedRef.current = true;
      send(
        JSON.stringify({
          type: 'process_video',
          video_url: cam.accidentVideoUrl ? cam.accidentVideoUrl : cam.rtspUrl,
          camera_name: cam.name,
          camera_id: cam.id,
        })
      );
    }
  }, [status, cam.id, cam.name, cam.rtspUrl, cam.accidentVideoUrl, send]);

  return null;
}

export function CameraProvider({ children }: { children: ReactNode }) {
  const [cctvs, setCctvs] = useState<CCTV[]>([]);
  const [loading, setLoading] = useState(true);
  const [gridSize, setGridSize] = useState<'2x2' | '3x3' | '4x4'>('2x2');
  const [selectedCameras, setSelectedCameras] = useState<CCTV[]>([]);
  const displayTimesRef = useRef<Record<string, number>>({});

  const getMaxCameras = useCallback(() => {
    switch (gridSize) {
      case '2x2': return 4;
      case '3x3': return 9;
      case '4x4': return 16;
      default: return 4;
    }
  }, [gridSize]);

  const fetchCCTVs = async () => {
    try {
      const res = await fetch('/api/cctvs');
      if (res.ok) {
        const data = await res.json();
        setCctvs(data);
        setSelectedCameras(prev => {
          if (prev.length === 0) {
            return data.slice(0, 16);
          }
          return prev.map((p: CCTV) => data.find((d: CCTV) => d.id === p.id) || p);
        });
      }
    } catch (error) {
      console.error('Failed to fetch cctvs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCCTVs();
    const interval = setInterval(() => {
      fetchCCTVs();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const setDisplayTime = useCallback((id: string, time: number) => {
    displayTimesRef.current[id] = time;
  }, []);

  const getDisplayTime = useCallback((id: string) => {
    return displayTimesRef.current[id];
  }, []);

  const displayedCameras = selectedCameras.slice(0, getMaxCameras());

  return (
    <CameraContext.Provider value={{
      cctvs, loading, gridSize, setGridSize, selectedCameras, setSelectedCameras, getMaxCameras, getDisplayTime
    }}>
      {/* Run background processing for displayed cameras globally */}
      {displayedCameras.map(cam => (
        <BackgroundCameraProcessor key={`bg-${cam.id}`} cam={cam} setDisplayTime={setDisplayTime} />
      ))}
      
      {children}
    </CameraContext.Provider>
  );
}
