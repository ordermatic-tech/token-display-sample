
import React from 'react';
import LStandPage from './LStandPage';
import QrPdfDetails, { QrList } from '@/models/qr-pdf-details';
import Head from 'next/head';
import Script from 'next/script';

const LStandPdfTemplate = ({
  qrPdfDetails,
}: {
  qrPdfDetails: QrPdfDetails;
}) => {
  const {
    qrList,
    restaurantName,
    backGroundColor,
    titleColor,
    fontFamily,
    pageFont,
    subTitle,
    subTitleFont,
    caption,
    fontClassName,
  } = qrPdfDetails;

  const expandedQrList: QrList[] = [];
  qrList.forEach((qrItem) => {
    const count = qrItem.count || 1;
    for (let i = 0; i < count; i++) {
      expandedQrList.push(qrItem);
    }
  });


  const qrsPerPage = 8;
  const pageQrsList: QrList[][] = [];
  for (let i = 0; i < expandedQrList.length; i += qrsPerPage) {
    pageQrsList.push(expandedQrList.slice(i, i + qrsPerPage));
  }

  // console.log('the fonts are :::', fontFamily);
  // console.log('the fonts are :::', subTitleFont);
  // console.log('the subtitle are  :::', subTitle);

  return (
    <>
      <Head>
        <title>Ordermatic Relay</title>
        <meta name="description" content="Powering Smart Restaurant Displays in real-time." />
        
        
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/@solana/qr-code-styling@1.6.0/lib/qr-code-styling.min.js"
        strategy="lazyOnload"
      />
      <div className="w-full h-full">
        {pageQrsList.map((pageQrSubList, pageIndex) => (
          <LStandPage
            key={`page-${pageIndex}`}
            pageQrSubList={pageQrSubList}
            restaurantName={restaurantName as string}
            backGroundColor={backGroundColor as string}
            titleColor={titleColor as string}
            fontFamily={fontFamily as string}
            pageFont={pageFont as string}
            caption={caption as string}
            subtitleFont={subTitleFont as string}
            subTitle={subTitle as string}
            fontClassName={fontClassName || ''}
          />
        ))}
      </div>
    </>
  );
};

export default LStandPdfTemplate;
