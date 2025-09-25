"use client"
import A4PDFTemplate from "@/components/A4PDFTemplate";
import A6PDFTemplate from "@/components/A6PDFTemplate";
import { dynamicFonts, DynamicFontFamily } from "@/utils/fonts";
import LStandPdfTemplate from "@/components/LStandPdfTemplate";
import PDFPageLoading from "@/components/PDFPageLoading";
import { ActiveStatus, FseOrderType } from "@/models/enums"
import {FseModel} from "@/models/fse_model";
import QrPdfDetails from "@/models/qr-pdf-details"
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
//import { useFirestore } from "reactfire";
import A7PDFTemplate from "@/components/A7PDFTemplate";
import { useFseStore } from "@/store/fseStore";
import { db } from "@/firebaseConfig";



const QrIdPage = () => {
  
  const searchParams = useSearchParams();

  //const db = useFirestore();
  //  const fseSlug   =router?.query?.fseId;
  // const fseSlug = searchParams?.get("fseId");
  
  

     const qrId = searchParams.get("qpId");
        console.log("qrId", qrId);


      //const [qrPdfDetails , setQrPdfDetails] = useRecoilState(qrPdfDetailsState);
      const qrPdfDetails=useFseStore((state)=>state.qrPdfDetailsState)
      const setQrPdfDetails=useFseStore((state)=>state.setqrPdfDetailsState)
     //const [fseModel ,setFseModel]= useRecoilState(FseModelState);
     const fseModel=useFseStore((state)=>state.fseModel);
     const setFseModel=useFseStore((state)=>state.setFseModel);
  
     //const setFseModel = useFseStore((state) => state.setFseModel);
    // const fseModel = useFseStore((state) => state.fseModelState);
     const [loading, setLoading] = useState(true);
    
     // console.log("fseId,qrId",fseSlug, qrId);
console.log("qrPdfDetails",qrPdfDetails);
console.log("setqrpdfdetails",setQrPdfDetails)
  useEffect(() => {
    const fseId = searchParams.get("fId");
    if (db != null && fseId != null) {
      const fseDocRef = doc(db, "FSE", fseId);
      const unsubscribeFse = onSnapshot(fseDocRef, (docSnapshot) => {
        if (docSnapshot.exists() && docSnapshot.data() != undefined) {
          setFseModel(docSnapshot.data() as FseModel);
        }
      });

      return () => {
        unsubscribeFse();
      };
    }
  }, [db, searchParams, setFseModel]);

  //const fseId = fseModel?.docId;
   
  
    const fseId = searchParams.get("fId");

  console.log("fseId",fseId);
  // console.log("type",typeof fseId === "string");
  useEffect(() => {
    console.log("useeffect triggering");
    console.log("db",db)
 
    if (db != null && typeof qrId === "string") {
      const qrDocRef = doc(db, `FSE/${fseId}/qrDocuments`, qrId);

      const unsubscribe = onSnapshot(qrDocRef, (querySnapshot) => {
        if (querySnapshot.exists()) {
          const data = querySnapshot.data();
console.log("data>>>>>>in useeffect",data)
      
        const updatedDetails: QrPdfDetails = {
          templateId: data.templateId ?? null,
          restaurantName: data.restaurantName ?? null,
          fseId: data.fseId ?? null,
          id: data.id ?? null,
          pageFont: data.pageFont ?? null,
          page1Font: data.page1Font ?? null,
          backGroundColor: data.backGroundColor ?? null,
          titleColor: data.titleColor ?? null,
          qrDotsColor: data.qrDotsColor ?? null,
          qrCornerColor: data.qrCornerColor ?? null,
          qrCornerDotsColor: data.qrCornerDotsColor ?? null,
          qrData: data.qrData ?? null,
            subTitle: data.subTitle ?? null,
            subTitleFont: data.subTitleFont ?? null,
         

          fontFamily: data.fontFamily ?? null,
          fontClassName: (dynamicFonts[data.fontFamily as DynamicFontFamily] || dynamicFonts.Roboto).className,
          creatorName: data.creatorName ?? null,
          documentDate: data.documentDate ?? null,
          createdOn: data.createdOn ?? null,
          lastUpdated: data.lastUpdated ?? null,
          count: data.count ?? null,
          imageUrl: data.imageUrl ?? null,
          caption: data.caption ?? null,
          centreCircleColor: data.centreCircleColor ?? null,
          centreTextColor: data.centreTextColor ?? null,
          logoUrl: data.logoUrl ?? null,
          tablePosition: data.tablePosition ?? null,
          status: data.status ?? ActiveStatus.draft,
          domain: data.domain || "",
          slug: data.slug ?? null,
          options: data.options ??{},
          orderType: data.orderType ?? FseOrderType.na,
          qrList: data.qrList ??[],
          qrRedirectionList: data.qrRedirectionList ??[],
          theme: data.theme ??{}
        } as  QrPdfDetails;

        // Update state directly with the new object
        console.log("updatedDetails",updatedDetails)
        setQrPdfDetails(updatedDetails);
      } else {
        // console.log("No such document!");
      }
      setLoading(false);
    });

      return () => {
        unsubscribe();
      };
    }
  }, [db, fseId, qrId, setQrPdfDetails]);

  const qrList = [
    {
      qrData: "https://www.nutrimony.in/?o=1&ot=2",
      tableNumber: "H2",
      count: 1,
      targetType: "Table",
      tablePosition: "center"
    },
    {
      qrData: "https://www.nutrimony.in/?o=0&ot=3",
      tableNumber: "8",
      count: 1,
      targetType: "Table",
      tablePosition: "message"
    },
    {
      qrData: "https://www.nutrimony.in/?o=0&ot=4",
      tableNumber: "2",
      count: 1,
      targetType: "Counter",
      tablePosition: "message"
    }
  ];
 if ( !qrPdfDetails) {
  return <PDFPageLoading />;
}

  return (
    <>
      {qrPdfDetails.templateId === "6D62A6B5-FBF1-47B7-9DA3-44E0C3376BD4" ? (
        <A4PDFTemplate
          qrPdfDetails={
            qrPdfDetails
          }
        />
      ) : qrPdfDetails.templateId === "2D17EE73-C256-4E52-BF65-3CFDE53DE2BA" ? (
        <LStandPdfTemplate
          qrPdfDetails={
            qrPdfDetails
          }
       
        />
      ) : qrPdfDetails.templateId === "701E11D4-2182-4562-BB35-3E68A8BA0E08" ? (
        <A6PDFTemplate
          qrList={qrPdfDetails.qrList}
          restaurantName={qrPdfDetails.restaurantName || ''}
          imageUrl={qrPdfDetails.imageUrl || ''}
          backGroundColor={qrPdfDetails.backGroundColor || ''}
          qrDotsColor={qrPdfDetails.qrDotsColor || ''}
          qrCornerColor={qrPdfDetails.qrCornerColor || ''}
          subTitle={qrPdfDetails.subTitle || ''}
          subtitleFont={qrPdfDetails.subTitleFont || ''}
          qrCornerDotsColor={qrPdfDetails.qrCornerDotsColor || ''}
          titleColor={qrPdfDetails.titleColor || ''}
          pageFont={qrPdfDetails.pageFont || ''}
          fontFamily={qrPdfDetails.fontFamily || ''}
          caption={qrPdfDetails.caption || ''}
          fontClassName={qrPdfDetails.fontClassName || ''}
        />
      ) : qrPdfDetails.templateId === "81C0E92C-6978-47DE-808A-22726F3018C9" ?
        (

          <A7PDFTemplate
            qrList={qrPdfDetails.qrList}
            restaurantName={qrPdfDetails.restaurantName || ''}
            subTitle={qrPdfDetails.subTitle || ''}
            subtitleFont={qrPdfDetails.subTitleFont || ''}
            imageUrl={qrPdfDetails.imageUrl || ''}
            backGroundColor={qrPdfDetails.backGroundColor || ''}
            qrDotsColor={qrPdfDetails.qrDotsColor || ''}
            qrCornerColor={qrPdfDetails.qrCornerColor || ''}
            qrCornerDotsColor={qrPdfDetails.qrCornerDotsColor || ''}
            titleColor={qrPdfDetails.titleColor || ''}
            pageFont={qrPdfDetails.pageFont || ''}
            fontFamily={qrPdfDetails.fontFamily || ''}
            caption={qrPdfDetails.caption || ''}
            fontClassName={qrPdfDetails.fontClassName || ''}
          />
        )
        :

        (

          <div>No template available for this ID.</div>
        )}
    </>
  );
};

const QrPreviewPage = () => {
  return (
    <Suspense fallback={<PDFPageLoading />}>
      <QrIdPage />
    </Suspense>
  );
};

export default QrPreviewPage;
