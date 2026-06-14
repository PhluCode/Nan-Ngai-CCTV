'use client';
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Bell, Settings, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopHeaderProps {
  title?: string;
}

export function TopHeader({ title = 'TRAFFIC COMMAND' }: TopHeaderProps) {
  const { data: session } = useSession();
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const roleLabel = session?.user?.role === 'ADMIN' ? 'ADMINISTRATOR' : 'SYSTEM ACTIVE';
  const headerTitle = session?.user?.role === 'ADMIN' && title === 'TRAFFIC COMMAND' 
    ? 'TRAFFIC COMMAND / ADMIN' 
    : title;

  return (
    <header className="absolute top-0 left-0 w-full h-16 bg-[#0B1326] border-b border-[#3E4850] flex items-center justify-between px-8 z-10 shrink-0">
      <div className="text-[#89CEFF] text-xs font-mono font-medium tracking-[1.2px] uppercase">
        {headerTitle}
      </div>
      
      <div className="flex items-center gap-6">
        <div className="px-3 py-1 bg-[#222A3D] rounded border border-[#3E4850] flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[#DAE2FD] text-xs font-mono font-medium tracking-wide">
            {roleLabel}
          </span>
        </div>
        
        <span className="text-[#DAE2FD] text-sm font-mono w-[65px] text-center">
          {currentTime || '00:00:00'}
        </span>
        
        <div className="flex items-center gap-4 border-l border-[#3E4850] pl-6 ml-2">
          <button className="text-[#BEC8D2] hover:text-[#DAE2FD] transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="text-[#BEC8D2] hover:text-[#DAE2FD] transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
              <div className="w-8 h-8 rounded-full border border-[#3E4850] bg-[#131B2E] flex items-center justify-center overflow-hidden hover:border-[#89CEFF] transition-colors">
                {session?.user?.image ? (
                  <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-[#BEC8D2]" />
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#131B2E] border-[#3E4850] text-[#DAE2FD]">
              <DropdownMenuLabel className="flex flex-col gap-1">
                <span className="font-semibold text-white">{session?.user?.name || 'User'}</span>
                <span className="text-xs text-[#BEC8D2] font-normal">{session?.user?.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#3E4850]" />
              <DropdownMenuItem className="focus:bg-[#222A3D] focus:text-white cursor-pointer flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#222A3D] focus:text-white cursor-pointer flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#3E4850]" />
              <DropdownMenuItem 
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="focus:bg-red-900/50 focus:text-red-400 text-red-400 cursor-pointer flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
