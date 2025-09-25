"use client";
import React, { useEffect } from "react";
import TwoColumnsLayout from "./TwoCoumnLayout";
import ThreeColumnsLayout from "./ThreeColumnLayout";
import FourColumnsLayout from "./FourColumnLayout";
import { TokenDisplayInfo } from "@/models/token_display";
import { AnnouncerStatus, NowPlayingItem } from "./TokenAnnouncerService";


type Props = {
  // tokenDisplayQueue: { [targetName: string]: TokenDisplayInfo[] }
  currentAnnouncement: NowPlayingItem | null;
  announcerStatus: AnnouncerStatus;
  currentTokenObject: TokenDisplayInfo | null;
  targetNames: string[];
  firstTargetSlots: (TokenDisplayInfo | null)[];
  secondTargetSlots: (TokenDisplayInfo | null)[];
  thirdTargetSlots: (TokenDisplayInfo | null)[];
  fourthTargetSlots: (TokenDisplayInfo | null)[];
  length: number;
};

const ColumnLayout = ({
  targetNames,
  currentTokenObject,
  firstTargetSlots,
  secondTargetSlots,
  thirdTargetSlots,
  fourthTargetSlots,
  length,
  currentAnnouncement,
  announcerStatus,
}: Props) => {
  return (
    <div>
      {length === 2 ? (
        <TwoColumnsLayout
          // tokenDisplayQueue={filteredTokenDisplayQueue} currentTokenObject={currentTokenObject}
          targetNames={targetNames}
          firstTargetSlots={firstTargetSlots}
          secondTargetSlots={secondTargetSlots}
          currentTokenObject={currentTokenObject}
          currentAnnouncement={currentAnnouncement}
          announcerStatus={announcerStatus}
        />
      ) : length === 3 ? (
        <ThreeColumnsLayout
          targetNames={targetNames}
          firstTargetSlots={firstTargetSlots}
          secondTargetSlots={secondTargetSlots}
          thirdTargetSlots={thirdTargetSlots}
          currentTokenObject={currentTokenObject}
          currentAnnouncement={currentAnnouncement}
          announcerStatus={announcerStatus}
        />
      ) : length === 4 ? (
        <FourColumnsLayout
          targetNames={targetNames}
          firstTargetSlots={firstTargetSlots}
          secondTargetSlots={secondTargetSlots}
          thirdTargetSlots={thirdTargetSlots}
          fourthTargetSlots={fourthTargetSlots}
          currentTokenObject={currentTokenObject}
          currentAnnouncement={currentAnnouncement}
          announcerStatus={announcerStatus}
        />
      ) : (
        <div>No valid layout selected</div>
      )}
    </div>

    //   return (
    //     <div>
    //        <h2>Data:</h2>
    //       <pre>{JSON.stringify(data, null, 2)}</pre>
    //     </div>
    //   );
    // };
  );
};

export default ColumnLayout;
