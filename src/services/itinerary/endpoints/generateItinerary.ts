import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '../../api/config';
import {
  CreateItineraryAPIRequest,
  CreateItineraryAPIResponse,
} from '@/features/create-itinerary/types';

export const generateItineraryEndpoint = (
  builder: EndpointBuilder<any, any, any>
) =>
  builder.mutation<CreateItineraryAPIResponse, CreateItineraryAPIRequest>({
    query: (data) => ({
      url: API_ENDPOINTS.ITINERARY.GENERATE,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: ['Itinerary'],
    transformResponse: (response: CreateItineraryAPIResponse) => {
      console.log('Generate Itinerary Success:', response);
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error('Generate Itinerary Error:', response);
      return response;
    },
  });
