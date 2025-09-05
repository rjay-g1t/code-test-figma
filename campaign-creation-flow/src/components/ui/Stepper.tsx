import React from 'react';
import Image from 'next/image';
import { useCampaign } from '@/contexts/CampaignContext';

const Stepper: React.FC = () => {
  const { currentStep } = useCampaign();
  const totalSteps = 4;

  return (
    <div className="flex flex-col items-center space-y-6 py-4">
      {/* Step indicator text */}
      <div className="text-sm text-gray-500 font-medium">
        {currentStep}/{totalSteps}
      </div>

      {/* Step circles */}
      <div className="flex flex-col items-center space-y-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCurrentOrCompleted = stepNumber <= currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <div className="relative">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Image
                    src={
                      isCurrentOrCompleted
                        ? '/icons/selected-step-circle.png'
                        : '/icons/unselected-step-circle.png'
                    }
                    alt={
                      isCurrentOrCompleted ? 'Selected step' : 'Unselected step'
                    }
                    width={32}
                    height={32}
                  />
                </div>
              </div>

              {/* Connect lines between steps */}
              {index < totalSteps - 1 && (
                <div
                  className={`w-0.5 h-6 mt-2 ${
                    stepNumber < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
