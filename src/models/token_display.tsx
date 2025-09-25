export enum FseOrderType {
  dineIn = "dineIn",
  takeAway = "takeAway",
  pickUp = "pickUp",
  delivery = "delivery",
  global = "global",
  roomDine = "roomDine",
  swiggy = "swiggy",
  zomato = "zomato",
}

export type TokenDisplayInfo = {
  tokenNumber: number;
  targetName: string;
  orderType: FseOrderType;
  lastUpdatedTime: string;
};

export enum TargetType {
  counter = "counter",
}
export type TargetInfo = {
  targetType: TargetType;
  targetNo: string;
  splitNo: number;
};

export enum ActiveStatus {
  active = "active",
  inactive = "inactive",
}

export enum AnnouncementMode {
  NATURAL = 'natural',
  ROBOTIC = 'robotic',
   NONE = 'none'
}
export type StoreData = {
  id: string;
  name: string;
  url: string;
  logoUrl: string ;
  logoText: string ;
  maxLimit: number;
  tokenDisplayQueue: {
    [targetName: string]: TokenDisplayInfo[];
  };
  selectedTargetInfos: TargetInfo[];
  lastSelectedTokenDisplayInfo: TokenDisplayInfo;
  lastUpdatedTime: string;
  activeStatus: ActiveStatus;
  announceToken: boolean;
  announcementMode: AnnouncementMode; 
  announceLatestFirst: boolean;
  announcementCount:number
};
