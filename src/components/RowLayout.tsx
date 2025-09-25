"use client";
import { TokenDisplayInfo } from "@/models/token_display";

import { AnnouncerStatus, NowPlayingItem } from "./TokenAnnouncerService"

type Props = {
   currentAnnouncement: NowPlayingItem | null;
   announcerStatus:AnnouncerStatus
  currentTokenObject: TokenDisplayInfo | null;
  targetNames: string[];
  firstTargetSlots: (TokenDisplayInfo | null)[];
  secondTargetSlots: (TokenDisplayInfo | null)[];
  thirdTargetSlots: (TokenDisplayInfo | null)[];
  fourthTargetSlots: (TokenDisplayInfo | null)[];
  fifthTargetSlots: (TokenDisplayInfo | null)[];
  sixthTargetSlots: (TokenDisplayInfo | null)[];
  seventhTargetSlots: (TokenDisplayInfo | null)[];
};

const RowsLayout = ({
  currentAnnouncement,
  announcerStatus,
  currentTokenObject,
  targetNames,
  firstTargetSlots,
  secondTargetSlots,
  thirdTargetSlots,
  fourthTargetSlots,
  fifthTargetSlots,
  sixthTargetSlots,
  seventhTargetSlots
}: Props) => {
  const getTokenBackground = (
    token: TokenDisplayInfo | null,
    isCurrent: boolean,
    colorType: "green" | "red"
  ) => {
    if (token === null) {
      return colorType === "red" ? "#EDCEFF" : "#D1EDD5";
    }
    if (isCurrent) {
      return "#3790F5";
    }
    return colorType === "red" ? "#B85EEB" : "#4F9F59";
  };

  const getRow = (
    rowName: string,
    color: "green" | "red",
    slots: (TokenDisplayInfo | null)[]
  ) => (
    <div
      key={rowName}
      className="w-full flex"
      style={{
        gap: "1%", // horizontal gap between cells
      }}
    >
      {/* Target Name */}
      <div
        className="flex items-center justify-center text-white font-roboto rounded-md overflow-hidden"
        style={{
          width: "36vw",
         // minHeight: "65px",
         // height: "10vh",
                         height: "clamp(40px, 9vh, 100px)",

          background: "#3A3A3A",
          fontSize: "clamp(24px, 3.5vw, 100px)",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        {rowName.charAt(0).toUpperCase() + rowName.slice(1)}
      </div>

    
      {/* {slots.slice(0, 5).map((token, index) => { */}
      {slots.map((token, index) => {
        const isCurrent =
          // token?.tokenNumber === currentTokenObject?.tokenNumber &&
          // token?.targetName === currentTokenObject?.targetName;
            announcerStatus === AnnouncerStatus.PLAYING &&
            token?.tokenNumber === currentAnnouncement?.tokenNumber &&
          token?.targetName === currentAnnouncement?.targetName;

        return (
          <div
            key={`${rowName}-${index}`}
            className="flex items-center justify-center text-white font-roboto rounded-md"
            style={{
              width: "14vw",
               
            //  minHeight: "50px",
             // height: "10vh",
                             height: "clamp(40px, 9vh, 100px)",

              background: getTokenBackground(token, isCurrent, color),
              fontSize: "clamp(24px, 3.5vw, 100px)",
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            {token ? token.tokenNumber : ""}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full h-screen bg-white pt-[17vh] px-8 pb-8 overflow-hidden">
      <div className="h-full flex flex-col">
        <div
          className="flex flex-col h-full"
          style={{
            rowGap: "2.5%",
          }}
        >
          {targetNames[0] && getRow(targetNames[0], "green", firstTargetSlots)}
          {targetNames[1] && getRow(targetNames[1], "red", secondTargetSlots)}
          {targetNames[2] && getRow(targetNames[2], "green", thirdTargetSlots)}
          {targetNames[3] && getRow(targetNames[3], "red", fourthTargetSlots)}
          {targetNames[4] && getRow(targetNames[4], "green", fifthTargetSlots)}
          {targetNames[5] && getRow(targetNames[5], "red", sixthTargetSlots)}
            {targetNames[6] && getRow(targetNames[6], "green", seventhTargetSlots)}
        </div>
      </div>
    </div>
  );
};

export default RowsLayout;
