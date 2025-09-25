import React, { useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import CameraLogo from "@/assets/Camera.svg";
import DividerLogo from "@/assets/Divider.svg";
import GpayLogo from "@/assets/Gpay.svg";
import MenuMamuLogoImg from "@/assets/MenuMamuLogo.svg";
import PaytmLogo from "@/assets/Paytm.svg";
import PhonepeLogo from "@/assets/Phonepe.svg";
import QrPdfDetails, { QrList } from '@/models/qr-pdf-details';

declare global {
  interface Window {
    QRCodeStyling: any;
  }
}

const A4PDFTemplate = ({
  qrPdfDetails,
}: {
  qrPdfDetails: QrPdfDetails;
}) => {
  const {
    qrList,
    restaurantName,
    imageUrl,
    backGroundColor,
    qrDotsColor,
    qrCornerColor,
    qrCornerDotsColor,
    titleColor,
    pageFont,
    subTitle,
    subTitleFont,
    fontFamily,
    caption,
    fontClassName,
  } = qrPdfDetails;

  const qrRefs = useRef<(HTMLDivElement | null)[]>([]);

  const generateQrCodes = (qrList: QrList[], QRCodeStyling: any) => {
    qrList.forEach((qrItem, index) => {
      for (let i = 0; i < (qrItem.count || 1); i++) {
        const qrIndex = index * (qrItem.count || 1) + i;
        const element = qrRefs.current[qrIndex];

        if (element) {
          const qrCode = new QRCodeStyling({
            width: 450,
            height: 450,
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
      }
    });
  };

  return (
    <>
      
      <Script
        src="https://cdn.jsdelivr.net/npm/@solana/qr-code-styling@1.6.0/lib/qr-code-styling.min.js"
        strategy="lazyOnload"
        onLoad={() => generateQrCodes(qrList, window.QRCodeStyling)}
      />
      <div className="bg-gray-100 flex flex-col items-center justify-center print:bg-white">
        {qrList.flatMap((qrItem, index) =>
          Array.from({ length: qrItem.count || 1 }, (_, i) => {
            const isLastPage =
              index === qrList.length - 1 && i === (qrItem.count || 1) - 1; // Check if it's the last page
            return (
              <div
                key={`page-${index}-${i}`}
                className="w-[210mm] h-[297mm] mx-auto shadow-md overflow-hidden flex flex-col items-center justify-center gap-9 box-border relative"
                style={{
                  pageBreakAfter: isLastPage ? 'auto' : 'always', // Avoid page break after the last page
                }}
              >
                {/* Background Image */}
                <div
                  className="absolute top-0 left-0 w-full h-[40%]"
                  style={{
                    backgroundColor: backGroundColor as string,
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundImage: `url(/bgtransparent.png)`,
                  }}
                ></div>

                {/* Heading Section */}
                <div className="w-full flex flex-col justify-center items-center mt-4 z-10 text-center p-4">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Restaurant"
                      width={192} // w-48 * 4 = 192px
                      height={192} // h-48 * 4 = 192px
                      className="object-cover rounded-lg mx-auto"
                    />
                  ) : (
                    <>
                      <div
                        className={`font-bold m-0  truncate leading-[1.2] ${fontClassName}`}
                        style={{
                          color: titleColor as string,
                          fontSize: pageFont as string || '2.5rem',
                        }}
                      >
                        {restaurantName}
                      </div>
                      <div
                        className={`font-semibold  m-0 truncate leading-[1.2] ${fontClassName}`}
                        style={{
                          color: titleColor as string,
                          fontSize: subTitleFont as string || '2.5rem',
                        }}
                      >
                        {subTitle}
                      </div>
                    </>
                  )}
                </div>

                {/* QR Code Section */}
                <div className="w-[510px] h-[800px] border-4 border-orange-500 rounded-[10%] relative flex justify-center items-center bg-white">
                  <div
                    className="w-full h-full flex p-2 justify-center items-center"
                    ref={(el) => {
                      if (el) {
                        const qrIndex = index * (qrItem.count || 1) + i;
                        qrRefs.current[qrIndex] = el;
                      }
                    }}
                  ></div>
                   {qrItem.tableNumber && qrItem.tablePosition === "center" &&  (
              <div className="absolute">
                <span className="text-lg font-bold bg-black rounded-full text-white px-6 py-4 w-20 h-20 flex items-center justify-center">
                  {qrItem.tableNumber}
                </span>
              </div>
            )}

                </div>

                {/* Payment Options Section */}
                <div className="flex justify-center items-center gap-12 z-10">
                  <Image src={PhonepeLogo} alt="Phonepe" width={64} height={64} />
                  <Image src={GpayLogo} alt="Gpay" width={64} height={64} />
                  <Image src={PaytmLogo} alt="Paytm" width={64} height={64} />
                  <Image src={CameraLogo} alt="Camera" width={64} height={64} />
                </div>

                {/* Caption Section */}
                <div
                  className={`text-5xl text-black text-center w-full font-bold mt-2 ${fontClassName}`}
                >
                 {qrItem.tablePosition !== "center" ? qrItem.tableNumber : caption}

                </div>

                <Image src={DividerLogo} alt="Divider" width={0} height={0} className="w-full h-auto px-48" />
                <Image src={MenuMamuLogoImg} alt="MenuMamuLogo" width={0} height={0} className="w-full px-20 h-auto ml-4 mb-24" />
                <div
                  className="absolute bottom-0 left-0 w-full h-[5%]"
                  style={{
                    backgroundColor: backGroundColor as string,
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundImage: `url(/bgtransparent.png)`,
                  }}
                ></div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default A4PDFTemplate;