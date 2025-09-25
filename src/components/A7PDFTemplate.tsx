import React, { useRef, useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import CameraLogo from "@/assets/Camera.svg";
import DividerImg from "@/assets/Divider.svg";
import GpayLogo from "@/assets/Gpay.svg";
import OrderMaticLogo from "@/assets/Ordermatic-logo.svg";
import PaytmLogo from "@/assets/Paytm.svg";
import PhonepeLogo from "@/assets/Phonepe.svg";
import { QrList } from '@/models/qr-pdf-details';
interface A7PDFTemplateProps {
  qrList: any[];
  restaurantName: string | null;
  imageUrl: string;
  backGroundColor: string;
  qrDotsColor: string;
  qrCornerColor: string;
  qrCornerDotsColor: string;
  titleColor: string;
  pageFont: string;
  fontFamily: string;
  subTitle: string;
  subtitleFont: string;
  caption: string;
  fontClassName: string;
}

const A7PDFTemplate: React.FC<A7PDFTemplateProps> = ({
  qrList,
  restaurantName,
  imageUrl,
  backGroundColor,
  qrDotsColor,
  qrCornerColor,
  qrCornerDotsColor,
  titleColor,
  pageFont,
  fontFamily,
  subTitle,
  subtitleFont,
  caption,
  fontClassName,
}) => {
  // Expand each qrItem by its `count` property
  const expandedQrList = qrList.flatMap((qrItem) =>
    Array.from({ length: qrItem.count || 1 }, () => qrItem)
  );
const qrsPerPage = 8;
    const pageQrsList: QrList[][] = [];
    for (let i = 0; i < expandedQrList.length; i += qrsPerPage) {
      pageQrsList.push(expandedQrList.slice(i, i + qrsPerPage));
    }
  // Refs for each "copy" of the QR code
  const qrRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Once the script is loaded, generate the QR codes
    if (window.QRCodeStyling) {
      generateQRCodes();
    }
  }, [expandedQrList]);

  const generateQRCodes = () => {
    expandedQrList.forEach((qrItem, index) => {
      const element = qrRefs.current[index];
      if (element && window.QRCodeStyling) {
        const qrCode = new window.QRCodeStyling({
          width: 120,
          height: 120,
          type: 'svg',
          data: qrItem.qrData || '',
          dotsOptions: { color: qrDotsColor, type: 'dots' },
          cornersSquareOptions: { type: 'dot', color: qrCornerColor },
          cornersDotOptions: { type: 'dot', color: qrCornerDotsColor },
          backgroundOptions: { color: '#ffffff' },
        });
        element.innerHTML = '';
        qrCode.append(element);
      }
    });
  };

  return (
    <>
      
      <Script
        src="https://cdn.jsdelivr.net/npm/@solana/qr-code-styling@1.6.0/lib/qr-code-styling.min.js"
        strategy="lazyOnload"
        onLoad={() => generateQRCodes()}
      />
      {/* Print-Specific Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .print-container {
            width: 297mm;
            height: 210mm;
            overflow: hidden;
          }
        }
      `}</style>
        {pageQrsList.map((pageQrs, pageIndex) => (
      <div
        className="print-container bg-white w-[297mm] h-[210mm] grid grid-cols-4 grid-rows-2 border border-gray-300"
        style={{ overflow: 'hidden' }}
      >
        {/* {expandedQrList.slice(0, 8).map((qrItem, index) => ( */}
         {pageQrs.map((qrItem, cardIndex) => {
            const globalIndex = pageIndex * qrsPerPage + cardIndex;
            return(
          <div
            key={globalIndex}
            className="relative flex flex-col items-center justify-between pb-2 border border-gray-200"
            style={{
              width: '74mm', // A7 width
              height: '105mm', // A7 height
              pageBreakInside: 'avoid',
            }}
          >
            {/* Top background band (30% of the card) */}
            <div
              className="absolute top-0 left-0 w-full"
              style={{
                height: '40%',
                backgroundColor: backGroundColor,
                // backgroundImage: `url(/bgtransparent.png)`,
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
                // backgroundRepeat: 'no-repeat',
                zIndex: 0,
              }}
            ></div>

            {/* Bottom background band (5% of the card) */}
            <div
              className="absolute bottom-0 left-0 w-full"
              style={{
                height: '5%',
                backgroundColor: backGroundColor,
                // backgroundImage: `url(/bgtransparent.png)`,
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
                // backgroundRepeat: 'no-repeat',
                zIndex: 0,
              }}
            ></div>

            {/* Content container */}
            <div className="relative z-10 flex flex-col items-center justify-between w-full h-full">
              {/* Header (Restaurant Logo or Text) */}
              <div className="w-full flex flex-col justify-center items-center text-center p-2 mt-2">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Restaurant Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    className="object-contain mx-auto"
                  />
                ) : (
                  <>
                    <div
                      className={` font-semibold mb-1 leading-[1.2] ${fontClassName}`}
                      style={{
                        color: titleColor,
                        fontSize: pageFont || '0.8rem',
                      }}
                    >
                      {restaurantName}
                    </div>
                    <div
                      className={`text-sm font-semibold leading-[1.2] ${fontClassName}`}
                      style={{
                        color: titleColor,
                        fontSize: subtitleFont || '0.8rem',
                      }}
                    >
                      {subTitle}
                    </div>
                  </>
                )}
              </div>

              {/* QR Code (unique ref for each copy) */}
         <div className="relative w-36 h-36 flex justify-center items-center border-2 border-orange-500 rounded-[10%] bg-white">

              <div
                ref={el => {
                  (qrRefs.current[globalIndex] = el);
                }}
              />
              {qrItem.tableNumber && qrItem.tablePosition === "center" &&  (
              <div className="absolute">
                <span className="text-xs font-bold bg-black rounded-full text-white p-2">
                  {qrItem.tableNumber}
                </span>
              </div>
            )}

              </div>


              {/* Payment Icons */}
              <div className="flex justify-center items-center my-2 gap-4">
                <Image src={PhonepeLogo} alt="Phonepe" width={32} height={32} />
                <Image src={GpayLogo} alt="Gpay" width={32} height={32} />
                <Image src={PaytmLogo} alt="Paytm" width={32} height={32} />
                <Image src={CameraLogo} alt="Camera" width={32} height={32} />
              </div>

              {/* Caption */}
              <div
                className={`text-lg text-black w-full font-bold text-center ${fontClassName}`}
              >
                {qrItem.tablePosition !== "center" ? qrItem.tableNumber : caption}
              </div>

              {/* Divider */}
              <Image src={DividerImg} alt="Divider" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} className="px-14" />

              {/* OrderMatic Logo */}
              <Image src={OrderMaticLogo} alt="OrderMaticLogo" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} className="px-12 mb-6 ml-2" />
            </div>
          </div>
        // ))}
       );
          })}
      </div>
       ))}
    </>
  );
};



export default A7PDFTemplate;