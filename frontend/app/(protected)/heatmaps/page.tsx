import React from 'react';
import Link from 'next/link';
import { TopHeader } from '@/components/TopHeader';
import { Sidebar } from '@/components/Sidebar';

export default function HeatmapsPage() {
  return (
    <div className="w-full h-screen overflow-hidden relative bg-[#0B1326] flex text-white font-sans">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-full pt-16">
        
        <TopHeader />

        {/* Filters Bar */}
        <div className="w-full h-16 mt-16 bg-[#0B1326]/80 backdrop-blur-md border-b border-[#3E4850] px-8 flex items-center gap-4 shrink-0">
          
          <div className="flex items-center gap-2">
            <div className="w-4.5 h-5 bg-[#88929B]"></div>
            <div className="px-4 py-2 bg-[#222A3D] rounded border border-[#3E4850] flex items-center gap-8 cursor-pointer hover:bg-slate-700">
               <span className="text-[#DAE2FD] text-sm">Last 30 Days</span>
               <div className="w-3 h-1.5 bg-[#6B7280]"></div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-5 bg-[#88929B]"></div>
            <div className="px-4 py-2 bg-[#222A3D] rounded border border-[#3E4850] flex items-center gap-8 cursor-pointer hover:bg-slate-700">
               <span className="text-[#DAE2FD] text-sm">All Districts</span>
               <div className="w-3 h-1.5 bg-[#6B7280]"></div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5.5 h-5 bg-[#88929B]"></div>
            <div className="px-4 py-2 bg-[#222A3D] rounded border border-[#3E4850] flex items-center gap-8 cursor-pointer hover:bg-slate-700">
               <span className="text-[#DAE2FD] text-sm">All Severities</span>
               <div className="w-3 h-1.5 bg-[#6B7280]"></div>
            </div>
          </div>

          <div className="flex-1 flex justify-end items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer hover:text-white group">
               <div className="w-4.5 h-3 bg-[#BEC8D2] group-hover:bg-white transition-colors"></div>
               <span className="text-[#BEC8D2] text-base group-hover:text-white transition-colors">Advanced Filters</span>
            </div>
            <button className="px-4 py-2 bg-[#0EA5E9] rounded flex items-center gap-2 hover:bg-sky-400 transition-colors">
               <div className="w-4 h-4 bg-[#003751]"></div>
               <span className="text-[#003751] text-base font-bold">Export Data</span>
            </button>
          </div>

        </div>

        {/* Content Wrapper */}
        <div className="w-full max-w-[1920px] mx-auto p-8 flex gap-8 h-full overflow-hidden">
          
          {/* Left Area - Map */}
          <div className="flex-[2] relative bg-slate-800/70 rounded-lg border border-[#3E4850] backdrop-blur-md overflow-hidden min-h-[500px]">
             <img src="https://placehold.co/783x877" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity bg-white bg-blend-saturation" />
             
             {/* Fake Heatmap Blobs Overlay */}
             <div className="absolute inset-0 z-0">
               <div className="absolute w-[250px] h-[150px] bg-red-500/60 blur-3xl rounded-full" style={{ left: '35%', top: '35%' }}></div>
               <div className="absolute w-[150px] h-[90px] bg-red-500/60 blur-2xl rounded-full" style={{ left: '40%', top: '40%' }}></div>
               <div className="absolute w-[300px] h-[180px] bg-red-500/50 blur-3xl rounded-full" style={{ left: '55%', top: '45%' }}></div>
               <div className="absolute w-[180px] h-[110px] bg-orange-500/50 blur-3xl rounded-full" style={{ left: '25%', top: '50%' }}></div>
               <div className="absolute w-[120px] h-[70px] bg-orange-500/50 blur-2xl rounded-full" style={{ left: '75%', top: '30%' }}></div>
             </div>

             {/* Intensity Legend */}
             <div className="absolute top-4 left-4 p-3 bg-[#060E20]/90 rounded border border-[#3E4850] backdrop-blur-sm flex flex-col gap-2 z-10">
                <span className="text-[#88929B] text-xs font-mono font-medium tracking-wide">HEATMAP INTENSITY</span>
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 bg-[#FFB4AB] rounded-full"></div>
                   <span className="text-[#BEC8D2] text-xs">High</span>
                   <div className="w-3 h-3 bg-[#D88A00] rounded-full"></div>
                   <span className="text-[#BEC8D2] text-xs">Med</span>
                   <div className="w-3 h-3 bg-[#89CEFF] rounded-full"></div>
                   <span className="text-[#BEC8D2] text-xs">Low</span>
                </div>
             </div>

             {/* Stats Overlay */}
             <div className="absolute bottom-4 right-4 p-4 bg-[#222A3D]/90 rounded border border-[#3E4850] backdrop-blur-sm flex items-center gap-6 z-10">
                <div className="flex flex-col">
                   <span className="text-[#88929B] text-xs font-mono">INCIDENT RADIUS</span>
                   <span className="text-[#89CEFF] text-base font-mono">12.4km</span>
                </div>
                <div className="w-px h-10 bg-[#3E4850]"></div>
                <div className="flex flex-col">
                   <span className="text-[#88929B] text-xs font-mono">ACTIVE PATROLS</span>
                   <span className="text-[#89CEFF] text-base font-mono">34</span>
                </div>
             </div>
          </div>

          {/* Right Area - Stats & Trends */}
          <div className="flex-[1] flex flex-col gap-6 overflow-y-auto pr-1 pb-4 custom-scrollbar min-w-[350px]">
            
            {/* Accidents by Time of Day */}
            <div className="p-6 bg-slate-800/70 rounded-lg border border-[#3E4850] backdrop-blur-md flex flex-col gap-6 shrink-0">
              <div className="flex justify-between items-center">
                 <h2 className="text-[#DAE2FD] text-lg font-semibold">Accidents by Time of Day</h2>
                 <div className="w-5 h-5 bg-[#88929B]"></div>
              </div>
              
              {/* Fake Bar Chart */}
              <div className="flex justify-between items-end h-24 pt-4 border-b border-[#3E4850]">
                 <div className="w-8 bg-[#3E4850] h-[20%] hover:bg-[#89CEFF] transition-all cursor-pointer rounded-t-sm"></div>
                 <div className="w-8 bg-[#3E4850] h-[40%] hover:bg-[#89CEFF] transition-all cursor-pointer rounded-t-sm"></div>
                 <div className="w-8 bg-[#89CEFF] h-[75%] shadow-[0_0_10px_rgba(137,206,255,0.4)] transition-all cursor-pointer rounded-t-sm"></div>
                 <div className="w-8 bg-[#3E4850] h-[60%] hover:bg-[#89CEFF] transition-all cursor-pointer rounded-t-sm"></div>
                 <div className="w-8 bg-[#FFB4AB] h-[95%] shadow-[0_0_10px_rgba(255,180,171,0.4)] transition-all cursor-pointer rounded-t-sm"></div>
                 <div className="w-8 bg-[#3E4850] h-[30%] hover:bg-[#89CEFF] transition-all cursor-pointer rounded-t-sm"></div>
              </div>

              {/* Chart Labels */}
              <div className="flex justify-between">
                 <span className="text-[#88929B] text-[10px] font-mono">00:00</span>
                 <span className="text-[#88929B] text-[10px] font-mono">04:00</span>
                 <span className="text-[#89CEFF] text-[10px] font-mono">08:00</span>
                 <span className="text-[#88929B] text-[10px] font-mono">12:00</span>
                 <span className="text-[#FFB4AB] text-[10px] font-mono">17:00</span>
                 <span className="text-[#88929B] text-[10px] font-mono">21:00</span>
              </div>
            </div>

            {/* Monthly Incident Trends */}
            <div className="p-6 bg-slate-800/70 rounded-lg border border-[#3E4850] backdrop-blur-md flex flex-col gap-6 shrink-0">
               <div className="flex justify-between items-center">
                 <h2 className="text-[#DAE2FD] text-lg font-semibold">Monthly Incident Trends</h2>
                 <div className="w-5 h-3 bg-[#88929B]"></div>
              </div>
              
              <div className="h-40 relative flex flex-col justify-end">
                 {/* Fake Area Chart */}
                 <div className="w-full h-20 border-t-2 border-[#89CEFF] bg-gradient-to-b from-[#89CEFF]/20 to-transparent relative"></div>
                 
                 {/* Labels */}
                 <div className="flex justify-between mt-2 px-1">
                    <span className="text-[#88929B] text-[10px] font-mono">JAN</span>
                    <span className="text-[#88929B] text-[10px] font-mono">APR</span>
                    <span className="text-[#88929B] text-[10px] font-mono">JUL</span>
                    <span className="text-[#88929B] text-[10px] font-mono">OCT</span>
                    <span className="text-[#88929B] text-[10px] font-mono">DEC</span>
                 </div>
              </div>
            </div>

            {/* Top 3 High-Risk Roads */}
            <div className="p-6 bg-slate-800/70 rounded-lg border border-[#3E4850] backdrop-blur-md flex flex-col gap-6 shrink-0">
               <div className="flex justify-between items-center">
                 <h2 className="text-[#DAE2FD] text-lg font-semibold">Top 3 High-Risk Roads</h2>
                 <div className="w-5 h-3 bg-[#88929B]"></div>
              </div>

              <div className="flex flex-col gap-4">
                 
                 {/* Row 1 */}
                 <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                       <span className="text-[#BEC8D2] text-base font-mono">01</span>
                       <div className="flex flex-col">
                          <span className="text-[#DAE2FD] text-base font-semibold">I-95 Northbound</span>
                          <span className="text-[#88929B] text-[10px] font-mono">Sector A - Mile 22</span>
                       </div>
                    </div>
                    <div className="flex flex-col text-right">
                       <span className="text-[#FFB4AB] text-base font-mono">452</span>
                       <span className="text-[#88929B] text-[10px] font-mono">INCIDENTS</span>
                    </div>
                 </div>

                 <div className="w-full h-px bg-[#3E4850]"></div>

                 {/* Row 2 */}
                 <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                       <span className="text-[#BEC8D2] text-base font-mono">02</span>
                       <div className="flex flex-col">
                          <span className="text-[#DAE2FD] text-base font-semibold">Broadway Ave</span>
                          <span className="text-[#88929B] text-[10px] font-mono">Central District</span>
                       </div>
                    </div>
                    <div className="flex flex-col text-right">
                       <span className="text-[#FFB95F] text-base font-mono">388</span>
                       <span className="text-[#88929B] text-[10px] font-mono">INCIDENTS</span>
                    </div>
                 </div>

                 <div className="w-full h-px bg-[#3E4850]"></div>

                 {/* Row 3 */}
                 <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                       <span className="text-[#BEC8D2] text-base font-mono">03</span>
                       <div className="flex flex-col">
                          <span className="text-[#DAE2FD] text-base font-semibold">Harbor Bridge</span>
                          <span className="text-[#88929B] text-[10px] font-mono">Industrial Corridor</span>
                       </div>
                    </div>
                    <div className="flex flex-col text-right">
                       <span className="text-[#FFB95F] text-base font-mono">312</span>
                       <span className="text-[#88929B] text-[10px] font-mono">INCIDENTS</span>
                    </div>
                 </div>
              </div>

              <button className="w-full py-2 mt-2 rounded border border-[#89CEFF]/20 flex justify-center items-center hover:bg-[#89CEFF]/10 transition-colors">
                 <span className="text-[#89CEFF] text-xs font-mono font-medium tracking-wide">VIEW FULL RANKING</span>
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
