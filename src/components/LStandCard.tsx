"use client";

import React, { useEffect, useRef } from "react";
import { QrList } from "@/models/qr-pdf-details";
import CameraLogo from "@/assets/Camera.svg";
import DividerImg from "@/assets/Divider.svg";
import GpayLogo from "@/assets/Gpay.svg";
import MenuMamuLogoImg from "@/assets/MenuMamuLogo.svg";
import PaytmLogo from "@/assets/Paytm.svg";
import PhonepeLogo from "@/assets/Phonepe.svg";
import '@/styles/qr-pages.css'
import Image from 'next/image';
const LStandCard = ({
  qrItem,
  restaurantName,
  backGroundColor,
  titleColor,
  fontFamily,
  pageFont,
  caption,
  qrDotsColor,
  qrCornerColor,
  qrCornerDotsColor,
  index,
  subtitleFont,
  subTitle,
  fontClassName
}: {
  qrItem: QrList;
  restaurantName: string;
  backGroundColor: string | undefined;
  titleColor: string | undefined;
  fontFamily: string | undefined;
  pageFont: string | undefined;
  caption: string | undefined;
  qrDotsColor?: string;
  qrCornerColor?: string;
  qrCornerDotsColor?: string;
  index: number;
  subtitleFont:string;
  subTitle:string;
  fontClassName: string;
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrRendered = useRef(false); // Track if QR code is already rendered
   // console.log("the subtitle is ::::",subTitle)

  useEffect(() => {
    const initializeQRCode = () => {
      if (qrCodeRef.current && typeof window !== "undefined" && window.QRCodeStyling) {
        const QRCodeStyling = window.QRCodeStyling;

        if (!qrRendered.current) {
          // Render QR code only if not already rendered
          const qrCode = new QRCodeStyling({
            width: 140,
            height: 140,
            type: "svg",
            data: qrItem.qrData || "",
            dotsOptions: {
              color: qrDotsColor || "#000",
              type: "dots",
            },
            cornersSquareOptions: {
              color: qrCornerColor || "#000",
              type: "dot",
            },
            cornersDotOptions: {
              color: qrCornerDotsColor || "#000",
              type: "dot",
            },
            backgroundOptions: {
              color: "#ffffff",
            },
          });

          qrCode.append(qrCodeRef.current);
          qrRendered.current = true; // Mark as rendered
        }
      }
    };

    // Retry logic for QRCodeStyling availability
    const interval = setInterval(() => {
      if (window.QRCodeStyling) {
        initializeQRCode();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [qrItem.qrData, qrDotsColor, qrCornerColor, qrCornerDotsColor]);

  return (
    <div className="lstand-design w-full border border-gray-200"  >
      <div
        className="w-full h-[18mm] p-2 mb-2 flex flex-col justify-center items-center text-center"
        style={{ backgroundColor: backGroundColor,
          // backgroundImage: `url(/bgtransparent.png)`,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          //backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className={`text-center leading-[1.2em] ${fontClassName}`}
          style={{
            color: titleColor ?? "",
            fontSize: pageFont ?? "",
          }}
        >
          {restaurantName}
        </div>
        <div
          className={`text-center leading-[1.2em] ${fontClassName}`}
          style={{
            color: titleColor ?? "",
            fontSize: subtitleFont ?? "",
          }}
        >
          {subTitle}
        </div>
      </div>
      <div className="flex w-full p-2 justify-center items-center">
        <div className="flex w-[50%] justify-center items-center">
          <div className="relative border-2 rounded-[10%] overflow-hidden flex justify-center items-center border-orange-500 w-40 h-40">
            <div
              ref={qrCodeRef}
              className="lstand-qr-code-img top-0 left-0 w-40 h-40"
            ></div>
            {qrItem.tableNumber && qrItem.tablePosition === "center" && (
              <div className="absolute">
                <span className="text-xs font-bold bg-black rounded-full text-white p-2">
                  {qrItem.tableNumber}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="w-[50%] flex justify-center flex-col items-center">
          <div className="grid grid-cols-2 place-items-center gap-1 px-6 w-full mb-4">
            <Image src={PhonepeLogo} alt="Phonepe" width={32} height={32} />
            <Image src={GpayLogo} alt="Gpay" width={32} height={32} />
            <Image src={PaytmLogo} alt="Paytm" width={32} height={32} />
            <Image src={CameraLogo} alt="Camera" width={32} height={32} />
          </div>
          <div
            className={`text-center text-lg sm:text-sm md:text-base font-bold ${fontClassName}`}
            style={{ color: "black" }}
          >
             {qrItem.tablePosition !== "center" ? qrItem.tableNumber : caption}
          </div>
          <div className="w-full px-4 ">
            <Image src={DividerImg} alt="Divider" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div className="flex justify-center items-center mt-2 px-4">
            <Image src={MenuMamuLogoImg} alt="MenuMamuLogo" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} className="pl-[6px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LStandCard;
