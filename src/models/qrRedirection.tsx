import {
  ActiveStatus,
  CallToAction,
  FseOrderType,
  QrType,
  TargetType,
} from "./enums";

 type QrRedirectionModel= {
  itemDocId?: string | null;
  itemSlug?: string | null;
  pageDocId?: string | null;
  pageSlug?: string | null;
  fseDocId?: string | null;
  fseSlug?: string | null;
  docId?: string | null;
  qrSlug?: string | null;
  name?: string | null;
  redirectUrl?: string | null;
  params: Map<string, string> ;
  options: Map<string, string> ;
  orderType: FseOrderType ;
  targetType: TargetType ;
  callToAction: CallToAction ;
  enableOrdering: boolean;
  status: ActiveStatus ;
  qrType: QrType ;
  domain: string ;
  showLogo: boolean ;
  qrRoom: QrRoomModel ;
  qrCounter: QrCounterModel ;
  qrTable: QrTableModel ;
}
export default QrRedirectionModel



export type QrRoomModel= {
  section?: string | null;
  roomNo?: string | null;
}

export type QrCounterModel ={
  section?: string | null;
  counterNo?: string | null;
}


export type QrTableModel= {
  section?: string | null;
  tableNo?: string | null;
}


