"use client";
import { TokenDisplayInfo } from "@/models/token_display";

import React from "react";
import { AnnouncerStatus, NowPlayingItem } from "./TokenAnnouncerService"


type Props = {
  currentTokenObject: TokenDisplayInfo | null;
  targetNames: string[];
  firstTargetSlots: (TokenDisplayInfo | null)[];
  currentAnnouncement: NowPlayingItem | null;
  announcerStatus: AnnouncerStatus;
};

const CircleLayout = ({
  targetNames,
  currentTokenObject,
  firstTargetSlots,
  currentAnnouncement,
  announcerStatus,
}: Props) => {
  const filteredTokens = firstTargetSlots
    .filter(
      (token) =>
        token?.tokenNumber !== currentTokenObject?.tokenNumber ||
        token?.targetName?.toLowerCase() !==
          currentTokenObject?.targetName?.toLowerCase()
    )
    .slice(0, 6);
  const displayTokens = [...filteredTokens];
  while (displayTokens.length < 6) {
    displayTokens.push(null);
  }

  const currentToken = currentTokenObject?.tokenNumber;
  const isAnnouncing =
    announcerStatus === AnnouncerStatus.PLAYING && currentAnnouncement;
  const isSameTarget =
    currentAnnouncement?.targetName?.toLowerCase() ===
    targetNames[0]?.toLowerCase();

  const displayCircleNumber =
    isAnnouncing && isSameTarget
      ? currentAnnouncement.tokenNumber
      : currentTokenObject?.tokenNumber;

  return (
    <div className="w-full h-screen bg-white grid grid-cols-2 gap-6 px-6 pt-12">
      {/* Left - Main Token Circle */}
      <div className="flex justify-end items-center pr-28">
        <div
          className="rounded-full flex items-center justify-center text-white font-roboto shadow-xl"
          style={{
            background: isAnnouncing ? "#3790F5" : "#4F9F59",
            width: "clamp(230px, 35vw, 700px)",
            height: "clamp(230px, 35vw, 700px)",
            fontSize: "15vw",
          }}
        >
          {displayCircleNumber ?? ""}
        </div>
      </div>

      {/* Right - Title + Tokens */}
      <div className="flex flex-col justify-center items-start gap-6  mr-24">
        {/* Title */}
        <div
          className="bg-gray-800 text-white font-roboto flex items-center justify-center text-center shadow-lg"
          style={{
            width: "100%",
            maxWidth: "960px", // slightly wider on full HD
            height: "clamp(90px, 13vh, 150px)",
            borderRadius: "10px",
            fontSize: "clamp(2rem, 5vw, 7rem)",
          }}
        >
          {targetNames[0]}
        </div>

        {/* Token Boxes */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-[960px]">
          {displayTokens.map((token, i) => {
            const isFilled = token !== null;
            return (
              <div
                key={i}
                className={`flex items-center justify-center text-center font-roboto  rounded-md shadow-md
                  ${
                    isFilled
                      ? "bg-[#4F9F59] text-white"
                      : "bg-[#D1EDD5] text-white"
                  }`}
                style={{
                  height: "clamp(90px, 13vh, 150px)",
                  fontSize: "clamp(2rem, 5vw, 7rem)",
                }}
              >
                {isFilled ? token.tokenNumber : ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CircleLayout;
