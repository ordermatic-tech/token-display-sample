"use client";
import React, { useEffect, useMemo, Suspense } from "react";
import TokenNavBar from "@/components/TokenNavBar";
import CircleLayout from "@/components/CircleLayout";
import ColumnLayout from "@/components/ColumnLayout";
import RowsLayout from "@/components/RowLayout";
import {
  AnnouncementMode,
  FseOrderType,
  TokenDisplayInfo,
} from "@/models/token_display";
import { useTokenDisplayStore } from "@/store/tokenStore";
import { useSearchParams } from "next/navigation";
import {
  AnnouncerConfig,
  AnnouncerPrefix,
  AnnouncerStatus,
} from "@/components/TokenAnnouncerService";
import { useTokenAnnouncer } from "@/components/useTokenAnnouncer";

const TokenDisplayPageContent = () => {
  const { data, fetchTokenData } = useTokenDisplayStore();
  const { isMuted } = useTokenDisplayStore();
  const searchParams = useSearchParams();
  const logoUrl = data?.logoUrl;
  const logoText = data?.logoText;

  //const file = searchParams.get("file") || "2";
  const fseId = searchParams.get("fId");
  const td = searchParams.get("tdId");
  useEffect(() => {
    if (fseId && td) {
      fetchTokenData(fseId, td);
    }
  }, [fetchTokenData, fseId, td]);

  const announcerConfig: AnnouncerConfig = useMemo(
    () => ({
      cdnBaseUrl: "https://cdn.nutrimony.in",
      assetsPath: "token-announcer/audio_assets",
      assetCollectionName: "TokenSystem",
      voiceId: "p297",
      chunkSize: 100,
    }),
    []
  );

  
  // const announcerConfig: AnnouncerConfig = useMemo(() => ({
  //     assetCollectionName: 'TokenSystem',
  //     voiceId: 'p297',
  //     chunkSize: 100,
  //     assetsPath: 'audio_assets',
  // }), []);

  const { announcer, announcerStatus, currentAnnouncement } =
    useTokenAnnouncer(announcerConfig);
  // console.log("currentAnnouncement>>>", currentAnnouncement);
  const selectedTargets = data?.selectedTargetInfos;
  const tokenDisplayInfo = data?.tokenDisplayQueue;
  const lastUpdatedTime = data?.lastUpdatedTime;
  const announcementMode = data?.announcementMode;
  // console.log("announcement mode", announcementMode);
  const announceLatestFirst = data?.announceLatestFirst;

  // console.log("tokenDisplayInfo", tokenDisplayInfo);
  const length = selectedTargets?.length || 0;
  // console.log("length=======", length);
  const targetNos =
    selectedTargets?.map((info) => info.targetNo.toLowerCase()) || [];
  // console.log("targetNos", targetNos);
  const targetName = selectedTargets?.map((info) => info.targetNo) || [];
  //  creating  target names and their corresponding token queues
  const tokenDisplayQueue = Object.entries(tokenDisplayInfo || {}).reduce(
    (acc: { [targetName: string]: TokenDisplayInfo[] }, [key, value]) => {
      if (targetNos.includes(key.toLowerCase())) {
        // in selected targets which target nos are there that one we filtering
        acc[key.toLowerCase()] = value; // ex:acc[swiggy]=[{tn:2--etc}]
      }
      return acc;
    },
    {}
  );

  const currentTokenObject = data?.lastSelectedTokenDisplayInfo || null;

  const announcementCount = data?.announcementCount;

  const targetNames = Object.keys(tokenDisplayQueue); // e.g., ["Swiggy", "Zomato"] from token displayques fetching keys
  // console.log("targetNames>>>>>", targetNames);
  //  Maximum number of tokens to show in each column
  const maxSlotsPerColumn = 6;

  //  Prepare all token slots for each target
  const allTargetSlots: Record<string, (TokenDisplayInfo | null)[]> = {};

  //  Loop through each target and prepare a  list of tokens
  for (const targetName of targetNos) {
    //  Get tokens for this target and reverse the order
    const columnTokens = [...(tokenDisplayQueue[targetName] || [])] // for this give the tokenlist for that tergetname({tn:2})
      .filter(
        (
          t // remove the token from the list if it have the current token
        ) =>
          !(
            t.tokenNumber === currentTokenObject?.tokenNumber &&
            t.targetName.toLowerCase() ===
              currentTokenObject?.targetName.toLowerCase()
          )
      )
      .reverse(); // [1,2,3]=>[3,2,1]

    if (
      currentTokenObject &&
      currentTokenObject?.targetName.toLowerCase() === targetName.toLowerCase()
    ) {
      columnTokens.unshift(currentTokenObject); //o/p(currenttokenobject,rest)
    }

    //  Take up to 6 tokens, and pad with null if needed(if if column tokens have more that 6 we cut it down )
    const padded: (TokenDisplayInfo | null)[] = columnTokens.slice(
      0,
      maxSlotsPerColumn
    );
    while (padded.length < maxSlotsPerColumn) padded.push(null); // if column tokens have less tah 6 means we add null

    //  Save this target’s slots in the map
    allTargetSlots[targetName] = padded;
  }

  //  Create an ordered list of target slots to pass to layout components
  const targetSlots = targetNos.map((name) => allTargetSlots[name]);
  // console.log(
  //   "  announcementMode === AnnouncementMode.NONE ",
  //   announcementMode === AnnouncementMode.NONE
  // );
  useEffect(() => {
    if (
      !currentTokenObject ||
      isMuted ||
      announcementMode === AnnouncementMode.NONE ||
      announcementMode === undefined ||
      announcerStatus === AnnouncerStatus.ERROR
    )
      return;

    const tokenNumberStr = currentTokenObject.tokenNumber.toString().trim();

    const targetName = currentTokenObject.targetName;
    const orderType = currentTokenObject.orderType;

    // adding  the  announcement prefix based on the ordertype
    let prefix = AnnouncerPrefix.TOKEN_NUMBER; // Set a default prefix

    if (orderType === FseOrderType.swiggy) {
      prefix = AnnouncerPrefix.SWIGGY_ORDER; // for swiggy ordertype adding prefix as swiggy
    } else if (orderType === FseOrderType.zomato) {
      prefix = AnnouncerPrefix.ZOMATO_ORDER; //for zomato ordertype adding prefix as zomato
    }
    // For all other orderTypes like dinein ,takeaway, the prefix remains the default TOKEN_NUMBER

    // Determine the mode to play
    const modeToPlay = announcementMode;
    // console.log("modeToPlay>>>>", modeToPlay);
    console.log("useeffect runs")
 console.log("announcementCount",announcementCount)
    announcer.play(
      {
        tokenPrefix: prefix,
        tokenNumber: tokenNumberStr,
        mode: modeToPlay,
        repeatCount: announcementCount ?? 1,
        displayText: `Token ${tokenNumberStr} for ${targetName}`,
        targetName: targetName,
      },
      announceLatestFirst
    );
  }, [
    currentTokenObject?.tokenNumber,
    currentTokenObject?.targetName,
    lastUpdatedTime,
    announcementMode,
    announcer,
    announceLatestFirst,

    isMuted,
  ]);

  return (
    <div>
      <TokenNavBar logoUrl={logoUrl} logoText={logoText} />

      {length === 1 ? (
        <CircleLayout
          targetNames={targetName}
          firstTargetSlots={targetSlots[0]}
          currentTokenObject={currentTokenObject}
          currentAnnouncement={currentAnnouncement}
          announcerStatus={announcerStatus}
        />
      ) : length >= 2 && length <= 4 ? (
        <ColumnLayout
          targetNames={targetName}
          firstTargetSlots={targetSlots[0]}
          secondTargetSlots={targetSlots[1]}
          thirdTargetSlots={targetSlots[2]}
          fourthTargetSlots={targetSlots[3]}
          currentTokenObject={currentTokenObject}
          currentAnnouncement={currentAnnouncement}
          announcerStatus={announcerStatus}
          length={length}
        />
      ) : length > 4 ? (
        <RowsLayout
          targetNames={targetName}
          firstTargetSlots={targetSlots[0]}
          secondTargetSlots={targetSlots[1]}
          thirdTargetSlots={targetSlots[2]}
          fourthTargetSlots={targetSlots[3]}
          fifthTargetSlots={targetSlots[4]}
          sixthTargetSlots={targetSlots[5]}
          seventhTargetSlots={targetSlots[6]} 
          currentTokenObject={currentTokenObject}
          currentAnnouncement={currentAnnouncement}
          announcerStatus={announcerStatus}
        />
      ) : (
        <div className="text-center pt-20 text-lg text-gray-500">
          No targets selected.
        </div>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TokenDisplayPageContent />
    </Suspense>
  );
};

export default Page;