import { useState, useCallback } from 'react';
import { CreateItineraryFormData } from '../types';

export const useCreateItinerary = () => {
  const [formData, setFormData] = useState<CreateItineraryFormData>({
    destination: '',
    startDate: '',
    endDate: '',
    numberOfTravelers: 2,
    preferences: [],
    tripType: 'mid-range',
    budget: '2000000',
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
    (date: Date | null) => {
      const startDate = date ? date.toISOString().split('T')[0] : '';
      setFormData((prev) => ({ ...prev, startDate }));
      if (errors.startDate) {
        setErrors((prev) => ({ ...prev, startDate: '' }));
      }
    },
    [errors.startDate]
  );

  const updateEndDate = useCallback(
    (date: Date | null) => {
      const endDate = date ? date.toISOString().split('T')[0] : '';
      setFormData((prev) => ({ ...prev, endDate }));
      if (errors.endDate) {
        setErrors((prev) => ({ ...prev, endDate: '' }));
      }
    },
    [errors.endDate]
  );

  const updateBudget = useCallback((budget: string) => {
    setFormData((prev) => ({ ...prev, budget }));
  }, []);

  const updateNumberOfTravelers = useCallback((numberOfTravelers: number) => {
    setFormData((prev) => ({ ...prev, numberOfTravelers }));
  }, []);

  const updateTripType = useCallback(
    (tripType: 'budget' | 'mid-range' | 'luxury') => {
      setFormData((prev) => ({ ...prev, tripType }));
    },
    []
  );

  const updatePreferences = useCallback((preferences: string[]) => {
    setFormData((prev) => ({ ...prev, preferences }));
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
      startDate: '',
      endDate: '',
      numberOfTravelers: 2,
      preferences: [],
      tripType: 'mid-range',
      budget: '2000000',
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
    updateNumberOfTravelers,
    updateTripType,
    updatePreferences,
    validateForm,
    resetForm,
  };
};
