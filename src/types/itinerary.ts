// Shared types for itinerary across features

export type TripType = 'budget' | 'mid-range' | 'luxury';

export type ActivityCategory = 'dining' | 'sightseeing' | 'shopping' | 'entertainment' | 'transport';

export interface Activity {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  category: ActivityCategory;
  estimatedCost: number;
  priority: number;
  tags: string[];
  notes: string;
  bookingUrl: string;
  contactInfo: string;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  weatherSummary: string;
  temperatureMin: number;
  temperatureMax: number;
  chanceOfRain: number;
  activities: Activity[];
}

export interface ItineraryData {
  itineraryId: string;
  destination: string;
  startDate: string;
  endDate: string;
  numberOfTravelers: number;
  preferences: string[];
  tripType: TripType;
  aiSummary: string;
  aiSuggestions: string[];
  weatherSummary: string;
  chanceOfRain: number;
  temperatureMin: number;
  temperatureMax: number;
  days: ItineraryDay[];
  totalEstimatedCost: number;
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryResponse {
  success: boolean;
  data: ItineraryData;
  message: string;
  statusCode: number;
  timestamp: string;
}
