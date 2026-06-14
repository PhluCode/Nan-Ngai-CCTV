import React from 'react';
import Link from 'next/link';
import { TopHeader } from '@/components/TopHeader';
import { Sidebar } from '@/components/Sidebar';

export default function EvidencePage() {
  return (
    <div className="w-full h-screen overflow-hidden relative bg-[#0B1326] flex text-white font-sans">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-full pt-16">
        
        <TopHeader />

        {/* Content Wrapper */}
        <div className="w-full h-full pt-20 px-8 pb-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">

          {/* Header & Back Link */}
          <div className="flex flex-col gap-4 shrink-0">
            <Link href="/incident-log" className="flex items-center gap-2 w-fit group">
              <div className="w-4 h-4 bg-[#89CEFF] group-hover:bg-white transition-colors"></div>
              <span className="text-[#89CEFF] text-xs font-mono font-medium tracking-wide group-hover:text-white transition-colors">Back to Logs List</span>
            </Link>

            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <h1 className="text-[#DAE2FD] text-2xl font-semibold leading-tight">Log #AC-88402</h1>
                <p className="text-[#BEC8D2] text-sm">M25 Motorway - Junction 14 Southbound | Mar 12, 2024</p>
              </div>
              <div className="px-4 py-2 bg-[#222A3D] rounded border border-[#3E4850] flex items-center gap-3">
                <span className="text-[#BEC8D2] text-xs font-mono font-medium tracking-wide">Priority</span>
                <div className="px-2 py-0.5 bg-[#93000A] rounded flex items-center">
                  <span className="text-[#FFDAD6] text-[10px] font-bold">CRITICAL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 min-h-0">
            {/* Left Column - Video Player & Details */}
            <div className="flex-[3] flex flex-col gap-4">

              {/* Video Player */}
              <div className="relative bg-[#171F33] rounded-lg border border-[#3E4850] shadow-[0_0_20px_rgba(137,206,255,0.15)] overflow-hidden aspect-video w-full flex flex-col justify-end">
                <img src="https://placehold.co/1211x636" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen" alt="Video Feed" />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent"></div>

                {/* Top Label */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 rounded border border-white/20">
                  <span className="text-[#89CEFF] text-xs font-mono">REC [CAM_SOUTH_J14_01] 2024-03-12 14:22:15</span>
                </div>
              </div>

              {/* Clip Editor / Trimmer Bar */}
              <div className="w-full py-4 bg-[#131B2E] rounded border border-slate-700 flex items-center shrink-0">
                <div className="px-5 flex items-center gap-4 shrink-0">
                  <div className="w-[22px] h-3.5 bg-[#DAE2FD]"></div>
                  <div className="w-10 h-10 bg-[#89CEFF] rounded-xl flex justify-center items-center">
                    <div className="w-3 h-3.5 bg-[#003751]"></div>
                  </div>
                  <div className="w-[22px] h-3.5 bg-[#DAE2FD]"></div>
                </div>

                <div className="flex-1 flex items-center px-8 relative">
                  <div className="w-full h-1 bg-[#2D3449] rounded-full relative">
                    <div className="absolute left-[25%] right-[10%] h-full bg-[#89CEFF] rounded-full"></div>
                    <div className="absolute left-[25%] h-full w-[8%] bg-[#FFB95F] rounded-l-full"></div>
                  </div>
                </div>

                <div className="px-5 shrink-0 text-[#BEC8D2] text-sm font-mono">00:10 / 00:30</div>
              </div>

              {/* Info & Download Bar */}
              <div className="w-full p-4 bg-[#131B2E] rounded-lg border border-[#3E4850] flex justify-between items-center shrink-0">
                <div className="flex gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#BEC8D2] text-[10px] font-bold uppercase">SOURCE</span>
                    <span className="text-[#DAE2FD] text-xs font-mono font-medium">M25-S14-C1</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#BEC8D2] text-[10px] font-bold uppercase">ENCODING</span>
                    <span className="text-[#DAE2FD] text-xs font-mono font-medium">H.265 / 4K</span>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-[#2D3449] rounded border border-[#3E4850] flex items-center gap-2 hover:bg-slate-700 transition-colors">
                  <div className="w-4 h-4 bg-[#DAE2FD]"></div>
                  <span className="text-[#DAE2FD] text-xs font-mono font-medium tracking-wide">Download Video Clip</span>
                </button>
              </div>

            </div>

            {/* Right Column - Analysis & Notes */}
            <div className="flex-[1] min-w-[320px] flex flex-col gap-6">
              <div className="w-full p-6 bg-[#171F33] rounded-lg border border-[#3E4850] shadow-xl flex flex-col gap-8 h-full">

                {/* Incident Outcome */}
                <div className="flex flex-col gap-2">
                  <span className="text-[#BEC8D2] text-xs font-mono font-medium tracking-[1.2px]">INCIDENT OUTCOME</span>
                  <div className="p-4 bg-red-900/20 border-l-4 border-[#FFB4AB] shadow-[0_0_20px_rgba(239,68,68,0.2)] rounded-r flex items-center gap-4">
                    <div className="w-5 h-5 bg-[#FFB4AB]"></div>
                    <div className="flex flex-col">
                      <span className="text-[#FFB4AB] text-lg font-bold leading-tight">CONFIRMED<br />ACCIDENT</span>
                      <span className="text-[#BEC8D2] text-xs mt-1">Verified by Sector Lead at<br />14:24:02</span>
                    </div>
                  </div>
                </div>

                {/* Temporal Analysis (Timeline) */}
                <div className="flex flex-col gap-4">
                  <span className="text-[#BEC8D2] text-xs font-mono font-medium tracking-[1.2px]">TEMPORAL ANALYSIS</span>
                  <div className="pl-4 relative flex flex-col gap-6">
                    {/* Timeline vertical line */}
                    <div className="absolute left-[3px] top-2 bottom-4 w-0.5 bg-[#3E4850]"></div>

                    {/* Timeline Item 1 */}
                    <div className="relative pl-6">
                      <div className="absolute left-[-5px] top-3 w-2.5 h-2.5 bg-[#FFB95F] rounded-full border-2 border-[#0B1326] ring-2 ring-[#FFB95F]/30"></div>
                      <div className="p-3 bg-[#222A3D] rounded border border-[#3E4850] flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[#FFB95F] text-[10px] font-bold uppercase">AI DETECTED</span>
                          <span className="text-[#DAE2FD] text-xs font-mono">14:21:48</span>
                        </div>
                        <span className="text-[#DAE2FD] text-sm">Anomalous deceleration<br />detected in lanes 2-3.</span>
                      </div>
                    </div>

                    {/* Timeline Item 2 */}
                    <div className="relative pl-6">
                      <div className="absolute left-[-5px] top-3 w-2.5 h-2.5 bg-[#89CEFF] rounded-full border-2 border-[#0B1326] ring-2 ring-[#89CEFF]/30"></div>
                      <div className="p-3 bg-[#222A3D] rounded border border-[#3E4850] flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[#89CEFF] text-[10px] font-bold uppercase">OPERATOR CONFIRMED</span>
                          <span className="text-[#DAE2FD] text-xs font-mono">14:22:15</span>
                        </div>
                        <span className="text-[#DAE2FD] text-sm">Manual visual verification<br />completed. Incident live.</span>
                      </div>
                    </div>

                    {/* Timeline Item 3 */}
                    <div className="relative pl-6">
                      <div className="absolute left-[-5px] top-3 w-2.5 h-2.5 bg-[#FFB3AD] rounded-full border-2 border-[#0B1326] ring-2 ring-[#FFB3AD]/30"></div>
                      <div className="p-3 bg-[#222A3D] rounded border border-[#3E4850] flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[#FFB3AD] text-[10px] font-bold uppercase">RESCUE DISPATCHED</span>
                          <span className="text-[#DAE2FD] text-xs font-mono">14:23:30</span>
                        </div>
                        <span className="text-[#DAE2FD] text-sm">Emergency Services Unit [ESU-<br />09] en route.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Command Log Notes */}
                <div className="flex flex-col gap-4 mt-auto">
                  <span className="text-[#BEC8D2] text-xs font-mono font-medium tracking-[1.2px]">COMMAND LOG NOTES</span>
                  <div className="p-4 bg-[#131B2E] rounded border border-[#3E4850] text-[#DAE2FD] text-sm leading-relaxed">
                    &quot;Initial observation indicated a three-vehicle collision involving two passenger cars and one HGV. The HGV appeared to suffer a tire blowout leading to lane drift. Visibility was clear at the time of the event. Operator assigned to pan-tilt-zoom camera CAM_SOUTH_J14_01 to capture high-definition evidence for police reporting. No fire detected, but significant fluid spill noted in lane 2. Traffic diversion initiated to junction 13.&quot;
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-6 h-6 bg-[#0EA5E9] rounded-full flex justify-center items-center text-[#003751] text-[10px] font-bold">JD</div>
                    <span className="text-[#BEC8D2] text-[10px] font-mono">Logged by John Doe (Senior Dispatcher)</span>
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
