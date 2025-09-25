import { Lobster, Poppins, Open_Sans, Noto_Sans, Lato, Rubik_Burned, Roboto } from 'next/font/google';

const lobsterFont = Lobster({ subsets: ['latin'], weight: '400' });
const poppinsFont = Poppins({ subsets: ['latin'], weight: '400' });
const openSansFont = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const notoSansFont = Noto_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const latoFont = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const rubikBurnedFont = Rubik_Burned({ subsets: ['latin'], weight: '400' });
const robotoFont = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export const dynamicFonts = {
  Lobster: lobsterFont,
  Poppins: poppinsFont,
  Open_Sans: openSansFont,
  Noto_Sans: notoSansFont,
  Lato: latoFont,
  Rubik_Burned: rubikBurnedFont,
  Roboto: robotoFont,
  // Add other fonts as needed
};

export type DynamicFontFamily = keyof typeof dynamicFonts;