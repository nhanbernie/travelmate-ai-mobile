import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItineraryData } from '@/features/itinerary-result/types';

export interface ItineraryState {
  currentItinerary: ItineraryData | null;
  savedItineraries: ItineraryData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ItineraryState = {
  currentItinerary: null,
  savedItineraries: [],
  isLoading: false,
  error: null,
};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    setCurrentItinerary: (state, action: PayloadAction<ItineraryData>) => {
      state.currentItinerary = action.payload;
      state.error = null;
    },

    clearCurrentItinerary: (state) => {
      state.currentItinerary = null;
    },

    addSavedItinerary: (state, action: PayloadAction<ItineraryData>) => {
      const exists = state.savedItineraries.find(
        (item) => item.itineraryId === action.payload.itineraryId
      );
      if (!exists) {
        state.savedItineraries.push(action.payload);
      }
    },

    removeSavedItinerary: (state, action: PayloadAction<string>) => {
      state.savedItineraries = state.savedItineraries.filter(
        (item) => item.itineraryId !== action.payload
      );
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCurrentItinerary,
  clearCurrentItinerary,
  addSavedItinerary,
  removeSavedItinerary,
  setLoading,
  setError,
  clearError,
} = itinerarySlice.actions;

export const itineraryReducer = itinerarySlice.reducer;
