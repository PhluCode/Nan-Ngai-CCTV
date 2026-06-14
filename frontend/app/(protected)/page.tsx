'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TopHeader } from '@/components/TopHeader';
import { Sidebar } from '@/components/Sidebar';

// Types
interface Incident {
  id: string;
  verificationStatus: string;
}

interface CCTV {
  id: string;
  name: string;
  rtspUrl: string;
  accidentVideoUrl: string | null;
  hasActiveAlert: boolean;
  activeIncidentId: string | null;
  sector?: string;
}

export default function LiveMonitoringPage() {
  const [cctvs, setCctvs] = useState<CCTV[]>([]);
  const [loading, setLoading] = useState(true);
  const [gridSize, setGridSize] = useState<'2x2' | '3x3' | '4x4'>('4x4');
  const [selectedCameras, setSelectedCameras] = useState<CCTV[]>([]);
  const [showSwapFor, setShowSwapFor] = useState<number | null>(null);

  useEffect(() => {
    fetchCCTVs();
    const interval = setInterval(fetchCCTVs, 5000); // Poll every 5s for alerts
    return () => clearInterval(interval);
  }, []);

  const fetchCCTVs = async () => {
    try {
      const res = await fetch('/api/cctvs');
      if (res.ok) {
        const data = await res.json();
        setCctvs(data);
        // If no cameras selected, select first N based on grid size
        setSelectedCameras(prev => {
          if (prev.length === 0) {
            return data.slice(0, 16);
          }
          // Update selected cameras with fresh data (alerts might have changed)
          return prev.map(p => data.find((d: CCTV) => d.id === p.id) || p);
        });
      }
    } catch (error) {
      console.error('Failed to fetch cctvs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGridCols = () => {
    switch (gridSize) {
      case '2x2': return 'grid-cols-1 md:grid-cols-2';
      case '3x3': return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3';
      case '4x4': return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4';
      default: return 'grid-cols-4';
    }
  };

  const getMaxCameras = () => {
    switch (gridSize) {
      case '2x2': return 4;
      case '3x3': return 9;
      case '4x4': return 16;
      default: return 16;
    }
  };

  const displayedCameras = selectedCameras.slice(0, getMaxCameras());

  const handleGridChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value as '2x2' | '3x3' | '4x4';
    setGridSize(newSize);
  };

  const handleCameraSwap = (slotIndex: number, newCameraId: string) => {
    const newCamera = cctvs.find(c => c.id === newCameraId);
    if (!newCamera) return;

    setSelectedCameras(prev => {
      const next = [...prev];
      next[slotIndex] = newCamera;
      return next;
    });
    setShowSwapFor(null);
  };

  return (
    // Main Wrapper
    <div className="w-full h-screen overflow-hidden relative bg-gradient-to-t from-[#0B1326] to-[#0B1326] flex text-white font-sans">
      
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-full pt-16">
        <TopHeader />
        <div className="w-full h-full p-6 flex flex-col gap-6">
          
          {/* Header */}
          <header className="flex justify-between items-center w-full shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-5 h-3.5 bg-[#89CEFF]"></div>
              <h1 className="text-[#DAE2FD] text-2xl font-semibold">Live Video Streams</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-[#BEC8D2] text-xs font-mono font-medium tracking-wide">
                Grid Matrix:
              </span>
              <select 
                value={gridSize}
                onChange={handleGridChange}
                className="bg-[#222A3D] text-[#DAE2FD] text-sm border border-[#3E4850] rounded px-3 py-1 outline-none focus:border-[#89CEFF]"
              >
                <option value="2x2">2x2 View (4 Cameras)</option>
                <option value="3x3">3x3 View (9 Cameras)</option>
                <option value="4x4">4x4 View (16 Cameras)</option>
              </select>
            </div>
          </header>

          {/* Video Grid */}
          <div className="flex-1 min-h-0 flex flex-col">
            {loading ? (
              <div className="flex-1 flex justify-center items-center text-[#BEC8D2]">Loading streams...</div>
            ) : displayedCameras.length === 0 ? (
              <div className="flex-1 flex justify-center items-center text-[#BEC8D2]">No cameras available</div>
            ) : (
              <div className={`h-full grid ${getGridCols()} gap-2 overflow-y-auto pr-2 custom-scrollbar pb-10`}>
                {displayedCameras.map((cam, index) => {
                  const CardContent = (
                    <>
                      {/* Video Player */}
                      {cam.accidentVideoUrl ? (
                         <video 
                           src={cam.accidentVideoUrl} 
                           autoPlay 
                           loop 
                           muted 
                           playsInline
                           className="absolute inset-0 w-full h-full object-cover" 
                         />
                      ) : (
                         <div className="absolute inset-0 w-full h-full bg-[#171F33] flex justify-center items-center">
                           <span className="text-[#3E4850] text-sm font-mono">NO SIGNAL</span>
                         </div>
                      )}
                     
                      {/* Top Overlay Line */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-sky-200/10 group-hover:bg-sky-200/50 transition-colors z-10"></div>
                      
                      {/* Red Overlay for Alerts */}
                      {cam.hasActiveAlert && (
                        <div className="absolute inset-0 bg-red-500/10 z-10 pointer-events-none"></div>
                      )}

                      {/* Camera Name Label */}
                      <div className={`absolute top-2 left-2 px-2 py-0.5 rounded flex items-center gap-2 z-20 ${cam.hasActiveAlert ? 'bg-[#A40217]' : 'bg-black/60 group-hover:bg-[#89CEFF]/20 transition-colors'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${cam.hasActiveAlert ? 'bg-white animate-pulse' : 'bg-[#89CEFF]'}`}></div>
                        <span className="text-white text-[10px] font-mono leading-tight">
                          CAM-{cam.id.slice(-4)}: {cam.name || 'Unknown'}
                          {cam.hasActiveAlert && <><br/>ACTIVE ALERT</>}
                        </span>
                      </div>

                      {/* Swap Camera Button */}
                      <div className="absolute top-2 right-2 z-40">
                        {showSwapFor === index ? (
                          <select 
                            autoFocus
                            onBlur={() => setShowSwapFor(null)}
                            onChange={(e) => handleCameraSwap(index, e.target.value)}
                            value={cam.id}
                            className="bg-[#222A3D] text-xs text-[#DAE2FD] border border-[#3E4850] rounded px-2 py-1 outline-none"
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
                          >
                            <option disabled value="">Select Camera...</option>
                            {cctvs.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowSwapFor(index);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 bg-black/60 rounded text-xs text-[#BEC8D2] hover:text-white transition-opacity border border-transparent hover:border-[#3E4850]"
                          >
                            ⚙️ Swap
                          </button>
                        )}
                      </div>

                      {/* Hover Engage View (For Alerts) */}
                      {cam.hasActiveAlert && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity cursor-pointer backdrop-blur-sm z-30">
                          <Link href={`/incident/${cam.activeIncidentId}`}>
                            <button className="px-4 py-2 bg-[#A40217] rounded-xl flex items-center gap-2 shadow-lg hover:bg-red-700 transition-colors">
                              <div className="w-[18px] h-[18px] bg-[#FFAEA8]"></div>
                              <span className="text-[#FFAEA8] text-sm font-bold">ENGAGE VIEW</span>
                            </button>
                          </Link>
                        </div>
                      )}
                    </>
                  );

                  const cardClasses = `relative aspect-video rounded overflow-hidden border group transition-all ${
                    cam.hasActiveAlert 
                      ? 'bg-[#2D3449] border-red-500 shadow-[0_0_15px_2px_rgba(239,68,68,0.6)]' 
                      : 'bg-[#2D3449] border-[#3E4850] hover:border-[#89CEFF] hover:shadow-[0_0_15px_rgba(137,206,255,0.3)] cursor-pointer'
                  }`;

                  return cam.hasActiveAlert ? (
                    <div key={cam.id} className={cardClasses}>
                      {CardContent}
                    </div>
                  ) : (
                    <Link key={cam.id} href={`/camera`} className={cardClasses}>
                      {CardContent}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          
        </div>
      </main>


    </div>
  );
}
