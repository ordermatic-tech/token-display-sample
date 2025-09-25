import { FseModel } from "@/models/fse_model";
import QrPdfDetails from "@/models/qr-pdf-details";
import { create } from "zustand";

export interface FseState {
  fseModel?: FseModel;
  setFseModel: (fseModel: FseModel) => void;
  qrPdfDetailsState: QrPdfDetails | null;
  setqrPdfDetailsState:(qrDetails:QrPdfDetails)=>void,
    getFseModelState: (fseDocId: string | undefined,fseData:FseModel) => void;

}

export const useFseStore = create<FseState>((set, get) => ({
      qrPdfDetailsState:null, // not undefined

 setFseModel: (fseModel: FseModel) => {
    console.log("fseModel>>>>>>>",fseModel)
    set((state) => ({
      ...state.fseModel,
      fseModel: fseModel,
    }));
  },
setqrPdfDetailsState:(qrDetails)=>{
     set({qrPdfDetailsState:qrDetails})
  },

   getFseModelState : (fseDocId: string | undefined,fseData) => {
            console.log("fseModel",fseData),

    set({
      fseModel:fseData,
   

     });
    }

}));
