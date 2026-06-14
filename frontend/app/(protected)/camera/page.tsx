import React from 'react';
import Link from 'next/link';
import { TopHeader } from '@/components/TopHeader';
import { Sidebar } from '@/components/Sidebar';

export default function CameraDetailPage() {
  return (
    <div className="w-full h-screen overflow-hidden relative bg-gradient-to-t from-[#020617] to-[#020617] flex text-white font-sans">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-full pt-16">
        
        <TopHeader />

        {/* Content Wrapper */}
        <div className="w-full max-w-[1920px] mx-auto px-8 pt-[88px] pb-6 flex flex-col gap-4 h-full overflow-hidden">
          
          {/* Breadcrumb / Action Bar */}
          <div className="flex justify-between items-center pb-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[#BEC8D2] text-sm">Monitor</span>
              <div className="w-1.5 h-2 bg-[#3E4850]"></div>
              <span className="text-[#89CEFF] text-sm font-semibold">Camera 12 Detail</span>
            </div>
            <Link href="/" className="px-4 py-2 bg-[#222A3D] rounded border border-slate-700 flex items-center gap-2 hover:bg-slate-800 transition-colors">
              <div className="w-4 h-4 bg-[#DAE2FD]"></div>
              <span className="text-[#DAE2FD] text-sm">Back to Monitor</span>
            </Link>
          </div>

          <div className="flex flex-col xl:flex-row gap-4 h-full min-h-0 overflow-hidden">
            
            {/* Left Video Area */}
            <div className="flex-[2] relative bg-black rounded border border-slate-700 overflow-hidden flex justify-center items-center min-h-[400px]">
              <img src="https://placehold.co/790x840" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-sky-200/20"></div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <div className="px-2 py-0.5 bg-[#2D3449] rounded flex items-center gap-1 w-fit">
                      <div className="w-2 h-2 bg-[#BEC8D2] rounded-sm"></div>
                      <span className="text-[#BEC8D2] text-[10px] font-mono leading-none">📼 ARCHIVE RECORDING</span>
                    </div>
                    <span className="text-[#DAE2FD] text-sm font-mono mt-1">REC 12-04-A // CAM_ID: 012</span>
                  </div>
                  
                  <div className="p-3 bg-[#0B1326]/80 rounded border border-slate-700 backdrop-blur-sm flex flex-col gap-1">
                    <span className="text-[#3E4850] text-[11px] font-mono leading-none">HISTORICAL DATA</span>
                    <span className="text-[#DAE2FD] text-sm font-semibold leading-tight mt-1">Past Incident: 2026-05-15 08:30:12</span>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex gap-4">
                    <span className="text-[#3E4850] text-[10px] font-mono">ISO 400</span>
                    <span className="text-[#3E4850] text-[10px] font-mono">F 2.8</span>
                    <span className="text-[#3E4850] text-[10px] font-mono">SHUTTER 1/120</span>
                  </div>
                  <span className="text-[#BEC8D2] text-xs font-mono">2024-05-22 14:02:45 UTC</span>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 pb-4 custom-scrollbar">
              
              {/* Incident Profile Card (System Normal) */}
              <div className="p-6 bg-[#171F33] rounded-lg border border-slate-700 flex flex-col gap-6 shrink-0">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#DAE2FD] text-lg font-semibold leading-none">Incident Profile</h2>
                    <span className="text-[#BEC8D2] text-sm mt-1">Ref ID: #INC-29402-A</span>
                  </div>
                  <div className="px-3 py-1 bg-sky-500/10 rounded-full border border-sky-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                    <span className="text-sky-400 text-sm font-mono uppercase font-semibold">SYSTEM NORMAL / NO ALERTS</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="p-4 bg-[#131B2E] rounded border border-slate-700 flex flex-col gap-1">
                    <span className="text-[#3E4850] text-[10px] font-mono uppercase leading-none">ROAD SEGMENT</span>
                    <span className="text-[#DAE2FD] text-base font-semibold mt-1">M4 Eastbound, Junction 12</span>
                  </div>
                  <div className="p-4 bg-[#131B2E] rounded border border-slate-700 flex flex-col gap-1">
                    <span className="text-[#3E4850] text-[10px] font-mono uppercase leading-none">COORDINATES</span>
                    <span className="text-[#DAE2FD] text-sm font-mono mt-1">51.4542° N, 0.9781° W</span>
                  </div>
                  <div className="p-4 bg-[#131B2E] rounded border border-slate-700 flex flex-col gap-1">
                    <span className="text-[#3E4850] text-[10px] font-mono uppercase leading-none">CLOSEST LANDMARK</span>
                    <span className="text-[#DAE2FD] text-base mt-1">Reading Services (South) - 1.2km East</span>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="h-48 relative bg-[#0B1326] rounded border border-slate-700 overflow-hidden flex justify-center items-center shrink-0">
                  <img src="https://placehold.co/740x190/0B1326/3E4850?text=MAP+VIEW" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen" />
                  <div className="absolute top-[40%] left-[45%] w-6 h-6 bg-orange-400/30 rounded-full flex justify-center items-center shadow-[0_0_15px_rgba(216,138,0,0.4)]">
                    <div className="w-2 h-2 bg-[#FFB95F] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* View Camera Logs Button */}
              <div className="mt-auto shrink-0 pt-4 flex flex-col gap-4">
                <Link href="/incident-log" className="w-full">
                  <button className="w-full py-5 bg-[#89CEFF] rounded-lg border border-sky-300/20 flex justify-center items-center gap-3 hover:bg-sky-400 transition-colors shadow-lg">
                    <div className="w-5 h-5 bg-[#003751] rounded-sm"></div>
                    <span className="text-[#003751] text-lg font-bold uppercase tracking-wide">📊 VIEW THIS CAMERA LOGS</span>
                  </button>
                </Link>

                {/* Live Queue Status */}
                <div className="p-4 bg-[#131B2E] rounded border border-slate-700 border-l-4 border-l-[#89CEFF] flex flex-col gap-2">
                  <span className="text-[#3E4850] text-[10px] font-mono uppercase">LIVE QUEUE STATUS</span>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#89CEFF] rounded-full"></div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#DAE2FD] text-sm">Camera Status:</span>
                      <span className="text-[#89CEFF] text-sm">Online</span>
                      <span className="text-[#DAE2FD] text-sm mx-1">| AI System:</span>
                      <span className="text-[#89CEFF] text-sm">Active</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
