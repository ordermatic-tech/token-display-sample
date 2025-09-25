"use client";
import { useTokenDisplayStore } from "@/store/tokenStore";
import { Maximize, Maximize2, Minimize, Minimize2, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useFullscreen from "./useFullscreen";
type TokenNavBarProps = {
  logoUrl?: string;
  logoText?: string;
};

const TokenNavBar = ({ logoUrl, logoText }: TokenNavBarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMuted = useTokenDisplayStore((state) => state.isMuted);
  const toggleMute = useTokenDisplayStore((state) => state.toggleMute);
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
  };

  const formatWeekday = (date: Date) => {
    return date.toLocaleDateString(undefined, { weekday: "long" });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="w-full bg-white fixed top-0 left-0 z-50 border-b border-gray-200">
      <div
        className="flex justify-between items-center px-8 py-4"
        style={{ height: "11vh" }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex flex-col justify-center">
            <div className="text-[1.1vw] font-roboto text-gray-500 leading-tight">
              {formatWeekday(currentTime)}
            </div>
            <div className="text-[1.1vw] font-roboto text-gray-500 leading-tight">
              {formatDate(currentTime)}
            </div>
          </div>
          <div className="text-[2.5vw] font-roboto text-gray-800 leading-tight">
            {formatTime(currentTime)}
          </div>
        </div>

        <div className="flex items-center justify-center">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '12.5vw', height: '3.5vw' }} // optional
              className="object-contain"
            />
          ) : (
            <div
              className="font-roboto fade-in"
              style={{
                fontWeight: 400,
                fontSize: "44px",
                color: "#710C0C",
                lineHeight: "110%",
                letterSpacing: "0%",
              }}
            >
              {logoText}
            </div>
          )}
        </div>

        <div className="flex items-center bg-gray-100 rounded-full p-2 space-x-2">
          <button
            onClick={toggleMute}
            className={`rounded-full p-2 flex items-center justify-center transition ${isMuted ? 'bg-red-200' : 'bg-gray-200'} active:bg-gray-300`}
            title={isMuted ? "Unmute" : "Mute"}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-red-600 transition-colors" />
            ) : (
              <Volume2 className="w-6 h-6 text-green-700 transition-colors" />
            )}
          </button>

          {/*  Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className={`rounded-full p-2 flex items-center justify-center transition ${isFullscreen ? 'bg-blue-200' : 'bg-gray-200'} active:bg-gray-300`}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="w-6 h-6 text-gray-800 transition-colors" />
            ) : (
              <Maximize className="w-6 h-6 text-gray-800 transition-colors" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenNavBar;
