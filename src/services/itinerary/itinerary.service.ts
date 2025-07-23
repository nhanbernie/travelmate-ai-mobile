import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../api/baseQuery';
import { generateItineraryEndpoint } from './endpoints';

export const itineraryApi = createApi({
  reducerPath: 'itineraryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Itinerary'],
  endpoints: (builder) => ({
    generateItinerary: generateItineraryEndpoint(builder),
  }),
});

export const {
  useGenerateItineraryMutation,
} = itineraryApi;
