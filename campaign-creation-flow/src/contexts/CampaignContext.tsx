'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Campaign } from '@/lib/types';

interface CampaignContextType {
  campaign: Partial<Campaign>;
  updateCampaign: (data: Partial<Campaign>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetCampaign: () => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(
  undefined
);

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};

const initialCampaign: Partial<Campaign> = {
  name: '',
  description: '',
  type: 'seeding',
  status: 'draft',
};

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [campaign, setCampaign] = useState<Partial<Campaign>>(initialCampaign);
  const [currentStep, setCurrentStep] = useState(1);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('campaign-data');

    if (saved) {
      setCampaign(JSON.parse(saved));
    }

    // Always start at step 1, don't load saved step
    setCurrentStep(1);
  }, []);

  // Save to localStorage whenever campaign data changes
  useEffect(() => {
    localStorage.setItem('campaign-data', JSON.stringify(campaign));
  }, [campaign]);

  // Save current step
  useEffect(() => {
    localStorage.setItem('campaign-step', currentStep.toString());
  }, [currentStep]);

  const updateCampaign = (data: Partial<Campaign>) => {
    setCampaign((prev) => ({ ...prev, ...data }));
  };

  const resetCampaign = () => {
    setCampaign(initialCampaign);
    setCurrentStep(1);
    localStorage.removeItem('campaign-data');
    localStorage.removeItem('campaign-step');
  };

  return (
    <CampaignContext.Provider
      value={{
        campaign,
        updateCampaign,
        currentStep,
        setCurrentStep,
        resetCampaign,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
