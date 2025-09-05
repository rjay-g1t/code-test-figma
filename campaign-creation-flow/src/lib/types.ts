// TypeScript interfaces for the Campaign Creation Flow

export interface Campaign {
  id: string;
  type: 'seeding' | 'paid' | 'other';
  name: string;
  description: string;
  status: 'draft' | 'processing' | 'active' | 'completed';
  product: Product;
  rules: CampaignRule[];
  integrations: Integration[];
  email: EmailDraft;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string; // "YETI Glacier® 65"
  description: string; // Full product description with features
  keyFeatures: string[];
  url?: string;
  uploadedFiles: UploadedFile[];
}

export interface CampaignRule {
  id: string;
  order: number;
  description: string;
  type: 'disclosure' | 'content' | 'shipping' | 'other';
  isRequired: boolean;
}

export interface Integration {
  id: string;
  service: 'google-sheets' | 'shopify' | 'mailchimp';
  isEnabled: boolean;
  status: 'connected' | 'pending' | 'error' | 'coming-soon';
  config?: {
    url?: string;
    trackingRules?: TrackingRule[];
  };
}

export interface TrackingRule {
  id: string;
  description: string;
  field: string;
  isActive: boolean;
}

export interface EmailDraft {
  provider: 'cheerful' | 'external';
  sendingAccounts: string[];
  recipients: string[];
  subject: string;
  body: string; // Rich text HTML
  mergeTags: string[];
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
}

// UI Component Props
export interface LayoutProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

export interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'gradient';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface CampaignTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}
