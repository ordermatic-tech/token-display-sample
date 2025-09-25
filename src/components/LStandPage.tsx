import React from 'react';
import LStandCard from './LStandCard';
import { QrList } from '@/models/qr-pdf-details';

const LStandPage = ({
    pageQrSubList,
    restaurantName,
    backGroundColor,
    titleColor,
    fontFamily,
    pageFont,
    subtitleFont,
    subTitle,
    caption,
    fontClassName,
}: {
    pageQrSubList: QrList[];
    restaurantName: string;
    backGroundColor: string | undefined;
    titleColor: string | undefined;
    fontFamily: string | undefined;
    pageFont: string | undefined;
    caption: string | undefined;
    subtitleFont:string;
    subTitle:string;
    fontClassName: string;
}) => {
    // console.log("subtitle========",subTitle)
    return (
        <div
            className="lstand-page"
            style={{
                width: '210mm',
                height: '297mm',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
                backgroundColor: '#f9f9f9',
                pageBreakAfter: 'avoid', // Prevent unnecessary page breaks
                overflow: 'hidden',
            }}
        >
            {pageQrSubList.map((qrItem, index) => (
                <LStandCard
                    key={index}
                    qrItem={qrItem}
                    restaurantName={restaurantName}
                    backGroundColor={backGroundColor}
                    titleColor={titleColor}
                    fontFamily={fontFamily}
                    pageFont={pageFont}
                    caption={caption}
                    index={index}
                    subTitle={subTitle}
                    subtitleFont={subtitleFont}
                    fontClassName={fontClassName}
                />
            ))}
        </div>
    );
};

export default LStandPage;