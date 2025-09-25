
import React, { useRef, useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import CameraLogo from "@/assets/Camera.svg";
import DividerImg from "@/assets/Divider.svg";
import GpayLogo from "@/assets/Gpay.svg";
import MenuMamuLogoImg from "@/assets/MenuMamuLogo.svg";
import OrderMaticLogo from "@/assets/Ordermatic-logo.svg";

import PaytmLogo from "@/assets/Paytm.svg";
import PhonepeLogo from "@/assets/Phonepe.svg";
import { QrList } from '@/models/qr-pdf-details';
interface A6PDFTemplateProps {
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



const A6PDFTemplate: React.FC<A6PDFTemplateProps> = ({
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
  const qrsPerPage = 4;
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
          width: 200,
          height: 200,
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
        {pageQrsList.map((pageQrs, pageIndex) => (
      <div
        className="bg-white w-[210mm] h-[297mm] grid grid-cols-2 grid-rows-2 border border-gray-300"
        style={{ overflow: 'hidden' }}
      >
        {/* {expandedQrList.map((qrItem, index) => ( */}
         {pageQrs.map((qrItem, cardIndex) => {
            const globalIndex = pageIndex * qrsPerPage + cardIndex;
            return(
          <div
            key={globalIndex}
            className="relative flex flex-col items-center justify-between pb-4 border border-gray-200"
            style={{
              width: '105mm', // A6 width
              height: '148.5mm', // A6 height
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
              <div className="w-full flex flex-col justify-center items-center text-center p-4 mt-2">
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
                      className={`text-sm font-bold mb-2 ${fontClassName}`}
                      style={{
                        color: titleColor,
                        fontSize: pageFont || '1rem',
                      }}
                    >
                      {restaurantName}
                    </div>
                    <div
                      className={`text-sm font-bold ${fontClassName}`}
                      style={{
                        color: titleColor,
                        fontSize: subtitleFont || '1rem',
                      }}
                    >
                      {subTitle}
                    </div>
                  </>
                )}
              </div>

              {/* QR Code (unique ref for each copy) */}
               <div className="relative w-56 h-56 flex justify-center items-center border-2 border-orange-500 rounded-[10%] bg-white">

              <div
                ref={el => {
                  (qrRefs.current[globalIndex] = el);
                }}
              />
              {qrItem.tableNumber && qrItem.tablePosition === "center" &&  (
              <div className="absolute">
                <span className="text-base font-bold bg-black rounded-full text-white px-4 py-2">
                  {qrItem.tableNumber}
                </span>
              </div>
            )}
              </div>
             

              {/* Payment Icons */}
              <div className="flex justify-center items-center gap-6">
                <Image src={PhonepeLogo} alt="Phonepe" width={32} height={32} />
                <Image src={GpayLogo} alt="Gpay" width={32} height={32} />
                <Image src={PaytmLogo} alt="Paytm" width={32} height={32} />
                <Image src={CameraLogo} alt="Camera" width={32} height={32} />
              </div>

              {/* Caption */}
              <div
                className={`text-xl text-black w-full flex flex-col gap-1 font-bold text-center ${fontClassName}`}
              >
                {qrItem.tablePosition !== "center" ? qrItem.tableNumber : caption}
              <Image src={DividerImg} alt="Divider" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} className="px-20" />
              </div>

              {/* Divider */}

              {/* OrderMatic Logo */}
              <Image src={OrderMaticLogo} alt="OrderMaticLogo" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} className="px-16 mb-10 ml-4" />
            </div>
          </div>
      //  ))}
          );
          })}
      </div>
       ))}
    </>
  );
};

export default A6PDFTemplate;
