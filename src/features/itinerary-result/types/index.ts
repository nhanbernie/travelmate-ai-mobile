export interface Activity {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  category:
    | 'dining'
    | 'sightseeing'
    | 'shopping'
    | 'entertainment'
    | 'transport';
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
  tripType: 'budget' | 'mid-range' | 'luxury';
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

export interface ItineraryResultResponse {
  success: boolean;
  data: ItineraryData;
  message: string;
  statusCode: number;
  timestamp: string;
}
