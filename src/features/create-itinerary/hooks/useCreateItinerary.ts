import { useState, useCallback } from 'react';
import {
  CreateItineraryFormData,
  TravelPreference,
  AccommodationType,
  TransportationType,
} from '../types';

const initialPreferences: TravelPreference[] = [
  {
    id: '1',
    name: 'Adventure',
    icon: '🏔️',
    color: 'bg-pink-500',
    selected: false,
  },
  {
    id: '2',
    name: 'Culture',
    icon: '🏛️',
    color: 'bg-pink-500',
    selected: false,
  },
  { id: '3', name: 'Food', icon: '🍽️', color: 'bg-pink-500', selected: false },
  {
    id: '4',
    name: 'Nature',
    icon: '🌲',
    color: 'bg-pink-500',
    selected: false,
  },
  {
    id: '5',
    name: 'Relaxation',
    icon: '🏖️',
    color: 'bg-pink-500',
    selected: false,
  },
  {
    id: '6',
    name: 'Shopping',
    icon: '🛍️',
    color: 'bg-pink-500',
    selected: false,
  },
];

const initialAccommodations: AccommodationType[] = [
  { id: '1', name: 'Hotel', selected: false },
  { id: '2', name: 'Resort', selected: false },
  { id: '3', name: 'Apartment', selected: false },
  { id: '4', name: 'Hostel', selected: false },
];

const initialTransportations: TransportationType[] = [
  { id: '1', name: 'Flight', icon: 'airplane-outline', selected: false },
  { id: '2', name: 'Car', icon: 'car-outline', selected: false },
  { id: '3', name: 'Bus', icon: 'bus-outline', selected: false },
];

export const useCreateItinerary = () => {
  const [formData, setFormData] = useState<CreateItineraryFormData>({
    destination: '',
    startDate: null,
    endDate: null,
    budget: 2500,
    preferences: initialPreferences,
    accommodation: initialAccommodations,
    transportation: initialTransportations,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateDestination = useCallback(
    (destination: string) => {
      setFormData((prev) => ({ ...prev, destination }));
      if (errors.destination) {
        setErrors((prev) => ({ ...prev, destination: '' }));
      }
    },
    [errors.destination]
  );

  const updateStartDate = useCallback(
    (startDate: Date | null) => {
      setFormData((prev) => ({ ...prev, startDate }));
      if (errors.startDate) {
        setErrors((prev) => ({ ...prev, startDate: '' }));
      }
    },
    [errors.startDate]
  );

  const updateEndDate = useCallback(
    (endDate: Date | null) => {
      setFormData((prev) => ({ ...prev, endDate }));
      if (errors.endDate) {
        setErrors((prev) => ({ ...prev, endDate: '' }));
      }
    },
    [errors.endDate]
  );

  const updateBudget = useCallback((budget: number) => {
    setFormData((prev) => ({ ...prev, budget }));
  }, []);

  const togglePreference = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.map((pref) =>
        pref.id === id ? { ...pref, selected: !pref.selected } : pref
      ),
    }));
  }, []);

  const toggleAccommodation = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      accommodation: prev.accommodation.map((acc) =>
        acc.id === id ? { ...acc, selected: !acc.selected } : acc
      ),
    }));
  }, []);

  const toggleTransportation = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      transportation: prev.transportation.map((trans) =>
        trans.id === id ? { ...trans, selected: !trans.selected } : trans
      ),
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate >= formData.endDate
    ) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      destination: '',
      startDate: null,
      endDate: null,
      budget: 2500,
      preferences: initialPreferences,
      accommodation: initialAccommodations,
      transportation: initialTransportations,
    });
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    updateDestination,
    updateStartDate,
    updateEndDate,
    updateBudget,
    togglePreference,
    toggleAccommodation,
    toggleTransportation,
    validateForm,
    resetForm,
  };
};
