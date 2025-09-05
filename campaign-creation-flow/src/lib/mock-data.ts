import { Product, CampaignRule, Integration, UploadedFile } from './types';

// Mock YETI Cooler products for existing products tab
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Yeti Cooler',
    description: 'Premium insulated cooler',
    keyFeatures: ['Insulated', 'Durable', 'Portable'],
    uploadedFiles: [],
  },
  {
    id: '2',
    name: 'Yeti Cooler',
    description: 'Premium insulated cooler',
    keyFeatures: ['Insulated', 'Durable', 'Portable'],
    uploadedFiles: [],
  },
  {
    id: '3',
    name: 'Yeti Cooler',
    description: 'Premium insulated cooler',
    keyFeatures: ['Insulated', 'Durable', 'Portable'],
    uploadedFiles: [],
  },
  {
    id: '4',
    name: 'Yeti Cooler',
    description: 'Premium insulated cooler',
    keyFeatures: ['Insulated', 'Durable', 'Portable'],
    uploadedFiles: [],
  },
  {
    id: '5',
    name: 'Yeti Cooler',
    description: 'Premium insulated cooler',
    keyFeatures: ['Insulated', 'Durable', 'Portable'],
    uploadedFiles: [],
  },
  {
    id: '6',
    name: 'Yeti Cooler',
    description: 'Premium insulated cooler',
    keyFeatures: ['Insulated', 'Durable', 'Portable'],
    uploadedFiles: [],
  },
];

// Mock product dates for display
export const mockProductDates = [
  'Created 16/12/22',
  'Created 15/12/22',
  'Created 14/12/22',
  'Created 13/12/22',
  'Created 12/12/22',
  'Created 11/12/22',
];

// Mock detailed product for review screen
export const mockYetiProduct: Product = {
  id: 'yeti-1',
  name: 'YETI Glacier® 65',
  description: `Experience unmatched cooling performance with the YETI Tundra 45 Cooler. Built with military-grade construction and up to 3 inches of PermaFrost™ insulation, this premium cooler can keep ice frozen for days, not hours. The rumacast construction creates an incredibly durable exterior that can withstand drops, falls, and whatever adventure throws at it.

Key Features:
• Keeps ice up to 4-6 days in normal conditions
• Bear-proof certified and virtually indestructible  
• Holds up to 54 cans with recommended 2:1 ice-to-contents ratio`,
  keyFeatures: [
    'Keeps ice up to 4-6 days in normal conditions',
    'Bear-proof certified and virtually indestructible',
    'Holds up to 54 cans with recommended 2:1 ice-to-contents ratio',
  ],
  uploadedFiles: [],
};

// Mock campaign rules
export const mockCampaignRules: CampaignRule[] = [
  {
    id: '1',
    order: 1,
    description:
      'This campaign is strictly for gifting; no monetary compensation will be provided. If paid collaboration were to occur an influencer that this opportunity is for gifting only and paid promotions are not being considered at this time.',
    type: 'disclosure',
    isRequired: true,
  },
  {
    id: '2',
    order: 2,
    description: 'Only one Yeti Cooler will be sent per influencer.',
    type: 'content',
    isRequired: true,
  },
  {
    id: '3',
    order: 3,
    description:
      'If the influencer provides their full postal address, do not repeat the address back in your response.',
    type: 'other',
    isRequired: true,
  },
  {
    id: '4',
    order: 4,
    description:
      "Confirm the influencer's interest before requesting their shipping details.",
    type: 'shipping',
    isRequired: true,
  },
];

// Mock integrations
export const mockIntegrations: Integration[] = [
  {
    id: '1',
    service: 'google-sheets',
    isEnabled: false,
    status: 'connected',
    config: {
      url: 'https://docs.google.com/spreadsheets/url...',
      trackingRules: [
        {
          id: '1',
          description:
            'In "Email", verify the influencer\'s email from the reply is in the row, add if missing, if asked about payment, respond gifting only',
          field: 'email',
          isActive: true,
        },
        {
          id: '2',
          description:
            'In "Name", confirm the influencer\'s name from the reply, update if blank or mismatched',
          field: 'name',
          isActive: true,
        },
        {
          id: '3',
          description:
            'In "Channel Name", fill in the creator\'s channel name if provided in the reply',
          field: 'channel_name',
          isActive: true,
        },
      ],
    },
  },
  {
    id: '2',
    service: 'shopify',
    isEnabled: false,
    status: 'coming-soon',
  },
];

// Mock uploaded files
export const mockUploadedFiles: UploadedFile[] = [
  {
    id: '1',
    name: 'document-attachment-1.pdf',
    type: 'application/pdf',
    size: 2048576, // 2MB
    uploadProgress: 100,
    status: 'completed',
  },
  {
    id: '2',
    name: 'document-attachment-2.pdf',
    type: 'application/pdf',
    size: 1572864, // 1.5MB
    uploadProgress: 100,
    status: 'completed',
  },
];

// Mock email accounts
export const mockEmailAccounts = [
  'sarah.marketing@cheerful.com',
  'john.sales@mailtest.com',
];

// Mock email draft
export const mockEmailDraft = {
  provider: 'cheerful' as const,
  sendingAccounts: mockEmailAccounts,
  recipients: [],
  subject: 'Hey [name], a gift from Yeti just for you',
  body: `Hi [name],

I've been really enjoying your content on [channel_name] and your honest gear reviews. Your authentic approach and the way you`,
  mergeTags: ['name', 'channel_name'],
};
