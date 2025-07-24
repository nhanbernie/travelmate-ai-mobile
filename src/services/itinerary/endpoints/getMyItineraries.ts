import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '../../api/config';
import { ItineraryData } from '@/features/itinerary-result/types';

export interface MyItinerariesResponse {
  success: boolean;
  data: ItineraryData[];
  message: string;
  statusCode: number;
  timestamp: string;
}

export const getMyItinerariesEndpoint = (
  builder: EndpointBuilder<any, any, any>
) =>
  builder.query<MyItinerariesResponse, void>({
    query: () => ({
      url: API_ENDPOINTS.ITINERARY.MY_ITINERARIES,
      method: 'GET',
    }),
    providesTags: ['Itinerary'],
    transformResponse: (response: MyItinerariesResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
