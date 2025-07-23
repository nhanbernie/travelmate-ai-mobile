import {
  CreateItineraryAPIRequest,
  CreateItineraryAPIResponse,
} from '../types';

const API_BASE_URL = 'https://localhost:3333'; // Thay đổi URL này

export const createItinerary = async (
  data: CreateItineraryAPIRequest
): Promise<CreateItineraryAPIResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/itinerary/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Thêm authorization header nếu cần
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: CreateItineraryAPIResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating itinerary:', error);
    throw error;
  }
};
