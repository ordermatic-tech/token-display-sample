
import { ActiveStatus, FseOrderType, TargetType } from "./enums";
import QrRedirectionModel from "./qrRedirection";


 type QrPdfDetails ={
  templateId?: string | null;
  restaurantName?: string | null;
  fseId?: string | null;
  id?: string | null;
  pageFont?: string | null;
  page1Font?: string | null;
  backGroundColor?: string | null;
  titleColor?: string | null;
  qrDotsColor?: string | null;
  qrCornerColor?: string | null;
  qrCornerDotsColor?: string | null;
  qrData?: string | null;
  fontFamily?: string | null;
  fontClassName?: string | null;
  creatorName?: string | null;
  documentDate?: Date | null;
  createdOn?: Date | null;
  lastUpdated?: Date | null;
  count?: string | null;
  imageUrl?: string | null;
  caption?: string | null;
  centreCircleColor?: string | null;
  centreTextColor?: string | null;
  logoUrl?: string | null;
  tablePosition?: string | null;
  status: ActiveStatus ;
  subTitle?: string | null;
  subTitleFont?: string | null;
  domain: string;
  slug?: string | null;
  options: { [key: string]: string };
  orderType: FseOrderType ;
  qrList: QrList[] ;
  qrRedirectionList: QrRedirectionModel[];
  theme: { [key: string]: any };
}
export default QrPdfDetails

export function createQrPdfDetails():QrPdfDetails{
  return {
        status:ActiveStatus.active,
        domain: "https://www.nutrimony.in",
        options:  {},
        orderType: FseOrderType.dineIn,
        qrList:  [],
        qrRedirectionList: [],
        theme: {}
  }
}

export type QrList = {
  qrData?: string | null;
  tableNumber?: string | null;
  count?: number | null;
  targetType: TargetType ;
  tablePosition?: string | null;
}