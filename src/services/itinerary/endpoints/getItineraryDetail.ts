import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '../../api/config';
import { ItineraryData } from '@/features/itinerary-result/types';

export interface ItineraryDetailResponse {
  success: boolean;
  data: ItineraryData;
  message: string;
  statusCode: number;
  timestamp: string;
}

export const getItineraryDetailEndpoint = (
  builder: EndpointBuilder<any, any, any>
) =>
  builder.query<ItineraryDetailResponse, string>({
    query: (itineraryId) => ({
      url: `${API_ENDPOINTS.ITINERARY.DETAIL}/${itineraryId}`,
      method: 'GET',
    }),
    providesTags: (result, error, itineraryId) => [
      { type: 'Itinerary', id: itineraryId },
    ],
    transformResponse: (response: ItineraryDetailResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
