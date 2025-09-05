import React from 'react';
import { cn } from '@/lib/utils';
import { CampaignTypeCardProps } from '@/lib/types';

const CampaignTypeCard: React.FC<CampaignTypeCardProps> = ({
  icon,
  title,
  description,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-6 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md',
        isSelected
          ? 'bg-gray-100 border-gray-300'
          : 'bg-white border-gray-200 hover:border-gray-300'
      )}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="text-gray-600">{icon}</div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default CampaignTypeCard;
