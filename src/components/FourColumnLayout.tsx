"use client";

import type { TokenDisplayInfo } from "@/models/token_display";
import { AnnouncerStatus, NowPlayingItem } from "./TokenAnnouncerService";

type Props = {
  currentTokenObject: TokenDisplayInfo | null;
  targetNames: string[];
  firstTargetSlots: (TokenDisplayInfo | null)[];
  secondTargetSlots: (TokenDisplayInfo | null)[];
  thirdTargetSlots: (TokenDisplayInfo | null)[];
  fourthTargetSlots: (TokenDisplayInfo | null)[];
  currentAnnouncement: NowPlayingItem | null;
  announcerStatus: AnnouncerStatus;
};

const FourColumnsLayout = ({
  targetNames,
  currentTokenObject,
  firstTargetSlots,
  secondTargetSlots,
  thirdTargetSlots,
  fourthTargetSlots,
  currentAnnouncement,
  announcerStatus,
}: Props) => {
  return (
    <div className="w-full h-screen bg-white pt-[17vh] px-8 pb-8 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between gap-[2.09vh] mb-[2.09vh]">
          {/* Dynamic Header 1 */}
          <div
            className="flex-1 flex items-center justify-center text-white font-roboto rounded-md"
            style={{
              height: "clamp(40px, 9vh, 100px)",
              fontSize: "clamp(2rem, 3vw, 5rem)",
              background: "#3A3A3A",
            }}
          >
            {targetNames[0]}
          </div>

          {/* Dynamic Header 2 */}
          <div
            className="flex-1 flex items-center justify-center text-white font-roboto rounded-md"
            style={{
              height: "clamp(40px, 9vh, 100px)",
              fontSize: "clamp(2rem, 3vw, 5rem)",
              background: "#3A3A3A",
            }}
          >
            {targetNames[1]}
          </div>

          {/* Dynamic Header 3 */}
          <div
            className="flex-1 flex items-center justify-center text-white font-roboto rounded-md"
            style={{
              height: "clamp(40px, 9vh, 100px)",
              fontSize: "clamp(2rem, 3vw, 5rem)",
              background: "#3A3A3A",
            }}
          >
            {targetNames[2]}
          </div>

          {/* Dynamic Header 4 */}
          <div
            className="flex-1 flex items-center justify-center text-white font-roboto rounded-md"
            style={{
              height: "clamp(40px, 9vh, 100px)",
              fontSize: "clamp(2rem, 3vw, 5rem)",
              background: "#3A3A3A",
            }}
          >
            {targetNames[3] || "Target 4"}
          </div>
        </div>

        {/* Token Columns */}
        <div className="flex-1 flex justify-between gap-[2.09vh] overflow-hidden">
          {/* Dynamic Header 1 Column */}
          <div className="flex-1 flex flex-col gap-[2.09vh] h-full">
            {firstTargetSlots.map((token, index) => {
              const isCurrent =
                // token?.tokenNumber === currentTokenObject?.tokenNumber &&
                // token?.targetName === currentTokenObject?.targetName
                announcerStatus === AnnouncerStatus.PLAYING &&
                token?.tokenNumber === currentAnnouncement?.tokenNumber &&
                token?.targetName === currentAnnouncement?.targetName;
              return (
                <div
                  key={`first-${index}`}
                  className="flex items-center justify-center text-white font-roboto rounded-md"
                  style={{
                    height: "clamp(40px, 9vh, 100px)",
                    background: token
                      ? isCurrent
                        ? "#3790F5"
                        : "#4F9F59"
                      : "#D1EDD5",
                    color: "#FFFFFF",
                    fontSize: "clamp(2rem, 3.5vw, 5rem)",
                    fontWeight: 500,
                    letterSpacing: "0%",
                  }}
                >
                  {token ? token.tokenNumber : ""}
                </div>
              );
            })}
          </div>

          {/* Dynamic Header 2 Column */}
          <div className="flex-1 flex flex-col gap-[2.09vh] h-full">
            {secondTargetSlots.map((token, index) => {
              const isCurrent =
                // token?.tokenNumber === currentTokenObject?.tokenNumber &&
                // token?.targetName === currentTokenObject?.targetName
                announcerStatus === AnnouncerStatus.PLAYING &&
                token?.tokenNumber === currentAnnouncement?.tokenNumber &&
                token?.targetName === currentAnnouncement?.targetName;

              return (
                <div
                  key={`second-${index}`}
                  className="flex items-center justify-center text-white font-roboto rounded-md"
                  style={{
                    height: "clamp(40px, 9vh, 100px)",
                    background: token
                      ? isCurrent
                        ? "#3790F5"
                        : "#B85EEB"
                      : "#EDCEFF",
                    color: "#FFFFFF",
                    fontSize: "clamp(2rem, 3.5vw, 5rem)",
                    fontWeight: 500,
                    letterSpacing: "0%",
                  }}
                >
                  {token ? token.tokenNumber : ""}
                </div>
              );
            })}
          </div>

          {/* Dynamic Header 3 Column */}
          <div className="flex-1 flex flex-col gap-[2.09vh] h-full">
            {thirdTargetSlots.map((token, index) => {
              const isCurrent =
                // token?.tokenNumber === currentTokenObject?.tokenNumber &&
                // token?.targetName === currentTokenObject?.targetName
                announcerStatus === AnnouncerStatus.PLAYING &&
                token?.tokenNumber === currentAnnouncement?.tokenNumber &&
                token?.targetName === currentAnnouncement?.targetName;

              return (
                <div
                  key={`third-${index}`}
                  className="flex items-center justify-center text-white font-roboto rounded-md"
                  style={{
                    height: "clamp(40px, 9vh, 100px)",
                    background: token
                      ? isCurrent
                        ? "#3790F5"
                        : "#4F9F59"
                      : "#D1EDD5",
                    color: "#FFFFFF",
                    fontSize: "clamp(2rem, 3.5vw, 5rem)",
                    fontWeight: 500,
                    letterSpacing: "0%",
                  }}
                >
                  {token ? token.tokenNumber : ""}
                </div>
              );
            })}
          </div>

          {/* Dynamic Header 4 Column */}
          <div className="flex-1 flex flex-col gap-[2.09vh] h-full">
            {fourthTargetSlots.map((token, index) => {
              const isCurrent =
                // token?.tokenNumber === currentTokenObject?.tokenNumber &&
                // token?.targetName === currentTokenObject?.targetName
                announcerStatus === AnnouncerStatus.PLAYING &&
                token?.tokenNumber === currentAnnouncement?.tokenNumber &&
                token?.targetName === currentAnnouncement?.targetName;

              return (
                <div
                  key={`fourth-${index}`}
                  className="flex items-center justify-center text-white font-roboto rounded-md"
                  style={{
                    height: "clamp(40px, 9vh, 100px)",
                    background: token
                      ? isCurrent
                        ? "#3790F5"
                       : "#B85EEB"
                      : "#EDCEFF",
                    color: "#FFFFFF",
                    fontSize: "clamp(2rem, 3.5vw, 5rem)",
                    fontWeight: 500,
                    letterSpacing: "0%",
                  }}
                >
                  {token ? token.tokenNumber : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourColumnsLayout;
