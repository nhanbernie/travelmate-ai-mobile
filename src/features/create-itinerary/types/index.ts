export interface TravelPreference {
  id: string;
  name: string;
  icon: string;
  color: string;
  selected: boolean;
}

export interface AccommodationType {
  id: string;
  name: string;
  selected: boolean;
}

export interface TransportationType {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}

export interface CreateItineraryFormData {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: number;
  preferences: TravelPreference[];
  accommodation: AccommodationType[];
  transportation: TransportationType[];
}

export interface CreateItineraryProps {
  onSubmit: (data: CreateItineraryFormData) => void;
  onCancel?: () => void;
}
