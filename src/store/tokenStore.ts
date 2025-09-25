import { StoreData } from "@/models/token_display";
import { create } from "zustand";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";


interface TokenStore {
  data?: StoreData;
  fetchTokenData: (fseId: string, td: string) => void;
  isMuted: boolean;
  toggleMute: () => void;
}



export const useTokenDisplayStore = create<TokenStore>((set) => ({
  data: undefined,

  fetchTokenData: (fseId, td) => {
    const docRef = doc(db, "FSE", fseId, "TokenDisplay", td);
    console.log(" Firebase token data >>>>", docRef);
    const unsubscribeFn = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as StoreData;
          console.log(" Realtime Firebase token data >>>>", data);

          set({ data: data });
        } else {
          console.error(" No such token display document in Firebase");
        }
      },
      (error) => {
        console.error(" Error in onSnapshot:", error);
      }
    );
  },

  isMuted: true,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}));
