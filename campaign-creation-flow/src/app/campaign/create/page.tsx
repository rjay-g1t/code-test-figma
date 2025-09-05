'use client';

import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/ui/Layout';
import { useCampaign } from '@/contexts/CampaignContext';

export default function CampaignCreation() {
  const { updateCampaign, setCurrentStep, currentStep } = useCampaign();
  const [selectedType, setSelectedType] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [files, setFiles] = useState<{ name: string; progress: number }[]>([]);
  const [activeTab, setActiveTab] = useState('new');
  const [isScanning, setIsScanning] = useState(false);
  const [productName, setProductName] = useState('YETI Glacier 65');
  const [productDescription, setProductDescription] = useState(
    'Experience unmatched cooling performance with the YETI Tundra 45 Cooler. Built with military-grade construction and up to 3 inches of PermaFrost™ insulation, this premium cooler keeps ice frozen for hours.'
  );
  const [campaignRules, setCampaignRules] = useState([
    {
      id: 1,
      text: 'This campaign is strictly by gifting; no monetary compensation will be provided. If asked about payment, inform the influencer that this opportunity is for gifting only and paid promotions are not being considered at this time.',
      enabled: true,
    },
    {
      id: 2,
      text: 'Only one free YETI Cooler will be sent per influencer.',
      enabled: true,
    },
    {
      id: 3,
      text: 'If the influencer provides their full postal address, do not request the address back in your response.',
      enabled: true,
    },
    {
      id: 4,
      text: "Confirm the influencer's interest before requesting their shipping details.",
      enabled: true,
    },
  ]);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(
    []
  );
  const [emailProvider, setEmailProvider] = useState('cheerful');
  const [sendingAccounts, setSendingAccounts] = useState([
    'sarah.marketing@firstmane.co',
    'john.sales@firstmane.com',
  ]);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [emailGenerated, setEmailGenerated] = useState(false);
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState('');

  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const step5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
    updateCampaign({ type: type as 'seeding' | 'paid' | 'other' });
  };

  const handleNextStep = (
    nextStep: number,
    targetRef?: React.RefObject<HTMLDivElement | null>
  ) => {
    setCurrentStep(nextStep);
    if (targetRef?.current) {
      setTimeout(() => {
        targetRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  };

  const simulateFileUpload = (fileName: string) => {
    const newFile = { name: fileName, progress: 0 };
    setFiles((prev) => [...prev, newFile]);

    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) =>
          file.name === fileName
            ? { ...file, progress: Math.min(file.progress + 10, 100) }
            : file
        )
      );
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setFiles((prev) =>
        prev.map((file) =>
          file.name === fileName ? { ...file, progress: 100 } : file
        )
      );
    }, 2000);
  };

  const handleFileUpload = () => {
    if (files.length === 0) {
      simulateFileUpload('document-attachment-1.pdf');
      setTimeout(() => {
        simulateFileUpload('document-attachment-2.pdf');
      }, 500);
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleNextStep(3, step3Ref);
    }, 3000);
  };

  const handleIntegrationToggle = (integration: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(integration)
        ? prev.filter((i) => i !== integration)
        : [...prev, integration]
    );
  };

  const handleGenerateEmail = () => {
    setIsGeneratingEmail(true);
    setTimeout(() => {
      setIsGeneratingEmail(false);
      setEmailGenerated(true);
    }, 3000);
  };

  const CampaignTypeCard = ({
    title,
    description,
    icon,
    isSelected,
    onClick,
  }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className={`p-4 md:p-6 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-300 ${
        isSelected
          ? 'border-purple-500 bg-purple-50'
          : 'border-gray-200 bg-white hover:bg-gray-50'
      }`}
    >
      <div className="text-center">
        <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );

  const StepCard = ({
    children,
    stepNumber,
  }: {
    children: React.ReactNode;
    stepNumber: number;
  }) => {
    const isActive = currentStep === stepNumber;

    return (
      <div
        className={`p-[0.1rem] rounded-xl md:rounded-2xl mb-8 md:mb-12 ${
          isActive
            ? 'bg-gradient-to-r from-purple-500 to-orange-500'
            : 'bg-gray-200'
        }`}
      >
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-4 md:space-y-8 pb-10 md:pb-20">
        {/* Step 1: Choose Campaign Type */}
        <StepCard stepNumber={1}>
          <div className="min-h-[300px] md:min-h-[400px]">
            <div className="mb-6 md:mb-8">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                1. Choose Campaign Type
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Select the best one that fits your goal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <CampaignTypeCard
                title="Seeding/Gifting"
                description="Send free products to creators in exchange for organic content"
                icon={
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                isSelected={selectedType === 'seeding'}
                onClick={() => handleTypeSelection('seeding')}
              />

              <CampaignTypeCard
                title="Paid Promotion"
                description="Pay creators for guaranteed content and deliverables"
                icon={
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                }
                isSelected={selectedType === 'paid'}
                onClick={() => handleTypeSelection('paid')}
              />

              <CampaignTypeCard
                title="Other"
                description="For all other types of creator collaboration campaigns"
                icon={
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                isSelected={selectedType === 'other'}
                onClick={() => handleTypeSelection('other')}
              />
            </div>

            <div className="flex justify-end">
              <button
                disabled={!selectedType}
                onClick={() => handleNextStep(2, step2Ref)}
                className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </StepCard>

        {/* Step 2: Add Campaign Information */}
        <div ref={step2Ref}>
          <StepCard stepNumber={2}>
            <div className="min-h-[300px] md:min-h-[400px]">
              <div className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  2. Add Campaign Information
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  Upload a file or paste a link — we&apos;ll pull the product
                  and campaign details for you
                </p>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 mb-4 md:mb-6 bg-gray-100 p-1 rounded-lg w-full md:w-fit overflow-x-auto">
                <button
                  onClick={() => setActiveTab('new')}
                  className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded transition-colors whitespace-nowrap ${
                    activeTab === 'new'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  New Product
                </button>
                <button
                  onClick={() => setActiveTab('existing')}
                  className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded transition-colors whitespace-nowrap ${
                    activeTab === 'existing'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Existing Products
                </button>
              </div>

              {activeTab === 'new' && (
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product URL (optional)
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Paste link"
                        value={productUrl}
                        onChange={(e) => setProductUrl(e.target.value)}
                        className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      File Upload
                    </label>
                    <div
                      onClick={handleFileUpload}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-300 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <svg
                          className="w-8 h-8 md:w-10 md:h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-sm md:text-base text-gray-600">
                          Drop in your product information files
                        </p>
                        <p className="text-sm md:text-base text-purple-600 font-medium">
                          Click to upload
                        </p>
                        <p className="text-xs text-gray-400">Or Drag</p>
                      </div>
                    </div>

                    {files.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded border"
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                                <svg
                                  className="w-4 h-4 text-red-600"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-700 truncate">
                                  {file.name}
                                </p>
                                {file.progress < 100 ? (
                                  <div className="mt-1">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                      <div
                                        className="bg-red-500 h-1.5 rounded-full transition-all duration-300"
                                        style={{ width: `${file.progress}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-xs text-green-600">
                                    ✓ Uploaded
                                  </p>
                                )}
                              </div>
                              {file.progress === 100 && (
                                <button className="text-gray-400 hover:text-gray-600">
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between pt-6">
                    <button
                      onClick={() => handleNextStep(1)}
                      className="order-2 md:order-1 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>

                    {isScanning ? (
                      <div className="order-1 md:order-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-black text-white rounded-lg flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Gathering your campaign information</span>
                      </div>
                    ) : (
                      <button
                        disabled={!productUrl && files.length === 0}
                        onClick={handleScan}
                        className="order-1 md:order-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Scan
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'existing' && (
                <div className="space-y-4">
                  <div className="relative mb-4">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </StepCard>
        </div>

        {/* Step 3: Review Campaign Information */}
        <div ref={step3Ref}>
          <StepCard stepNumber={3}>
            <div className="min-h-[300px] md:min-h-[400px]">
              <div className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  2. Review Campaign Information
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  We&apos;ve pulled product info and campaign rules from your
                  files. Review and edit if needed.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Product Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Description
                    </label>
                    <textarea
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Key Features:
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Keeps ice up to 4-6 days in normal conditions</li>
                      <li>
                        • Bear-proof certified and virtually indestructible
                      </li>
                      <li>
                        • Holds up to 54 cans with recommended 2:1 ice-to...
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Campaign Rules */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-700">
                      Campaign Rules
                    </h3>
                    <span className="text-sm text-purple-600 flex items-center cursor-pointer hover:text-purple-700">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Regenerate with AI
                    </span>
                  </div>

                  <div className="space-y-3">
                    {campaignRules.map((rule) => (
                      <div
                        key={rule.id}
                        className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs">
                            {rule.id}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-gray-700 flex-1 leading-relaxed">
                          {rule.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button className="mt-4 text-sm text-gray-600 hover:text-gray-800 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Rule
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between pt-8">
                <button
                  onClick={() => handleNextStep(2, step2Ref)}
                  className="order-2 md:order-1 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => handleNextStep(4, step4Ref)}
                  className="order-1 md:order-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </StepCard>
        </div>

        {/* Step 4: Add Integrations */}
        <div ref={step4Ref}>
          <StepCard stepNumber={4}>
            <div className="min-h-[300px] md:min-h-[400px]">
              <div className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  3. Add Integrations
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  Connect your tools to save time and reduce manual work
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                {/* Google Sheets Integration */}
                <div className="p-4 md:p-6 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M19,5H5V19H19V5M14,17V15.5H14.5V14.5H16.5V15.5H17V17H14M9.5,17V10H11V17H9.5M13,13V10H14.5V13H13M16.5,13V10H18V13H16.5M7,10V17H5.5V10H7Z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                          Google Sheet
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          Automatically track campaign results in your Google
                          Sheet
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleIntegrationToggle('google-sheets')}
                        className={`relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${
                          selectedIntegrations.includes('google-sheets')
                            ? 'bg-purple-600'
                            : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${
                            selectedIntegrations.includes('google-sheets')
                              ? 'translate-x-5 md:translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Google Sheets Configuration */}
                  {selectedIntegrations.includes('google-sheets') && (
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div>
                        <input
                          type="text"
                          placeholder="https://docs.google.com/spreadsheets/..."
                          value={googleSheetsUrl}
                          onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          tip: Get your sheet permissions to Anyone with the
                          link can edit
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          What to Track:
                        </h4>
                        <div className="space-y-2">
                          <label className="flex items-start">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-0.5 mr-3 flex-shrink-0"
                              defaultChecked
                            />
                            <span className="text-sm text-gray-700">
                              In &quot;Email&quot;, verify the influencer&apos;s
                              email from the reply is on the new add if missing
                              / asked about payment, respond gifting only
                            </span>
                          </label>
                          <label className="flex items-start">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-0.5 mr-3 flex-shrink-0"
                              defaultChecked
                            />
                            <span className="text-sm text-gray-700">
                              In &quot;Name&quot;, confirm the influencer&apos;s
                              name from the reply, update if there or
                              mismatched.
                            </span>
                          </label>
                          <label className="flex items-start">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-0.5 mr-3 flex-shrink-0"
                              defaultChecked
                            />
                            <span className="text-sm text-gray-700">
                              In &quot;Channel Name&quot;, fill in the
                              creator&apos;s channel name if provided in the
                              reply.
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shopify Integration */}
                <div className="p-4 md:p-6 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors opacity-60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.9,2.4L11.6,3L11.1,2.4C10.8,2 10.3,1.9 9.8,2.1L9.1,2.4C8.6,2.6 8.4,3.1 8.6,3.6L9.1,4.6L7.7,5.1C7.2,5.3 7,5.8 7.2,6.3L7.7,7.3L6.3,7.8C5.8,8 5.6,8.5 5.8,9L6.3,10L4.9,10.5C4.4,10.7 4.2,11.2 4.4,11.7L4.9,12.7L3.5,13.2C3,13.4 2.8,13.9 3,14.4L3.5,15.4L2.1,15.9C1.6,16.1 1.4,16.6 1.6,17.1L2.1,18.1L3.5,17.6L4.9,17.1L6.3,16.6L7.7,16.1L9.1,15.6L10.5,15.1L11.9,14.6L13.3,14.1L14.7,13.6L16.1,13.1L17.5,12.6L18.9,12.1L20.3,11.6L21.7,11.1L22.4,10.8C22.9,10.6 23.1,10.1 22.9,9.6L22.4,8.6L21,9.1L19.6,9.6L18.2,10.1L16.8,10.6L15.4,11.1L14,11.6L12.6,12.1L11.2,12.6L9.8,13.1L8.4,13.6L7,14.1L5.6,14.6L4.2,15.1L2.8,15.6L2.1,15.9L1.4,16.2C0.9,16.4 0.7,16.9 0.9,17.4L1.4,18.4C1.6,18.9 2.1,19.1 2.6,18.9L3.3,18.6L4.7,18.1L6.1,17.6L7.5,17.1L8.9,16.6L10.3,16.1L11.7,15.6L13.1,15.1L14.5,14.6L15.9,14.1L17.3,13.6L18.7,13.1L20.1,12.6L21.5,12.1L22.9,11.6L23.6,11.3C24.1,11.1 24.3,10.6 24.1,10.1L23.6,9.1C23.4,8.6 22.9,8.4 22.4,8.6L21.7,8.9L20.3,9.4L18.9,9.9L17.5,10.4L16.1,10.9L14.7,11.4L13.3,11.9L11.9,12.4L10.5,12.9L9.1,13.4L7.7,13.9L6.3,14.4L4.9,14.9L3.5,15.4L2.1,15.9L1.4,16.2L0.7,16.5C0.2,16.7 0,17.2 0.2,17.7L0.7,18.7C0.9,19.2 1.4,19.4 1.9,19.2L2.6,18.9L4,18.4L5.4,17.9L6.8,17.4L8.2,16.9L9.6,16.4L11,15.9L12.4,15.4L13.8,14.9L15.2,14.4L16.6,13.9L18,13.4L19.4,12.9L20.8,12.4L22.2,11.9L23.6,11.4L24.3,11.1C24.8,10.9 25,10.4 24.8,9.9L24.3,8.9C24.1,8.4 23.6,8.2 23.1,8.4L22.4,8.7L21,9.2L19.6,9.7L18.2,10.2L16.8,10.7L15.4,11.2L14,11.7L12.6,12.2L11.2,12.7L9.8,13.2L8.4,13.7L7,14.2L5.6,14.7L4.2,15.2L2.8,15.7L1.4,16.2L0.7,16.5C0.2,16.7 0,17.2 0.2,17.7L0.7,18.7C0.9,19.2 1.4,19.4 1.9,19.2L2.6,18.9L4,18.4L5.4,17.9L6.8,17.4L8.2,16.9L9.6,16.4L11,15.9L12.4,15.4L13.8,14.9L15.2,14.4L16.6,13.9L18,13.4L19.4,12.9L20.8,12.4L22.2,11.9L23.6,11.4L24.3,11.1C24.8,10.9 25,10.4 24.8,9.9L24.3,8.9C24.1,8.4 23.6,8.2 23.1,8.4L14.9,11.9L14.9,2.4Z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                          Shopify
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          Coming soon
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full bg-gray-200 opacity-50">
                        <span className="inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white translate-x-1" />
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between pt-8">
                <button
                  onClick={() => handleNextStep(3, step3Ref)}
                  className="order-2 md:order-1 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => handleNextStep(5, step5Ref)}
                  className="order-1 md:order-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </StepCard>
        </div>

        {/* Step 5: Email Setup */}
        <div ref={step5Ref}>
          <StepCard stepNumber={5}>
            <div className="min-h-[300px] md:min-h-[400px]">
              <div className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  4. Email Setup
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  Configure your email provider, accounts and recipients to
                  launch your campaign
                </p>
              </div>

              <div className="space-y-6">
                {/* Email Provider Selection */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Choose Email Provider
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      onClick={() => setEmailProvider('cheerful')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        emailProvider === 'cheerful'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-4 mr-2">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              emailProvider === 'cheerful'
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {emailProvider === 'cheerful' && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                            )}
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900">
                          Cheerful (Recommended)
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Use email system with automatic optimization
                      </p>
                    </div>

                    <div
                      onClick={() => setEmailProvider('external')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        emailProvider === 'external'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-4 mr-2">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              emailProvider === 'external'
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {emailProvider === 'external' && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                            )}
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900">
                          Other external provider
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Connect like Instantly, Smartlead, etc. Cheerful will
                        handle replies only
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add Connect Sending Accounts */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Add Connect Sending Accounts
                  </h3>
                  <div className="relative mb-4">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="email"
                      placeholder="Search your connected emails"
                      className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    {sendingAccounts.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <span className="text-sm text-gray-700">{email}</span>
                        <button
                          onClick={() =>
                            setSendingAccounts((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between pt-8">
                <button
                  onClick={() => handleNextStep(4, step4Ref)}
                  className="order-2 md:order-1 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>

                {isGeneratingEmail ? (
                  <div className="order-1 md:order-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-purple-600 text-white rounded-lg flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Email</span>
                  </div>
                ) : (
                  <button
                    onClick={handleGenerateEmail}
                    className="order-1 md:order-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>Generate Email</span>
                  </button>
                )}
              </div>
            </div>
          </StepCard>
        </div>

        {/* Step 6: Email Draft (shows after email generation) */}
        {emailGenerated && (
          <StepCard stepNumber={6}>
            <div className="min-h-[300px] md:min-h-[400px]">
              <div className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  4. Review Email Draft
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  Cheerful has drafted an email for you. Feel free to edit as
                  you please.
                </p>
              </div>

              <div className="space-y-6">
                {/* Recipients */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-300 transition-colors cursor-pointer">
                    <div className="flex items-center justify-center space-x-2 text-gray-500">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4"
                        />
                      </svg>
                      <span className="text-sm">
                        Click to upload CSV of Recipients
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subject Line */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Line
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      defaultValue="Hey [name], a gift from Yeti just for you"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button className="p-2 text-purple-600 hover:bg-purple-50 rounded">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Email Body */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Body
                  </label>
                  <div className="border border-gray-300 rounded-lg">
                    {/* Email Editor Toolbar */}
                    <div className="flex items-center space-x-2 p-3 border-b border-gray-200 bg-gray-50">
                      <button className="p-1 hover:bg-gray-200 rounded font-bold">
                        B
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded italic">
                        I
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded underline">
                        U
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      </button>
                      <div className="flex items-center space-x-1">
                        <button className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded flex items-center space-x-1">
                          <span># Merge Tags</span>
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                      <button className="px-2 py-1 text-xs bg-purple-600 text-white rounded">
                        ✨ Cheerful
                      </button>
                    </div>

                    {/* Email Content */}
                    <div className="p-4 min-h-[200px]">
                      <div className="text-sm text-gray-700 space-y-3">
                        <p>Hi [name],</p>
                        <p>
                          I&apos;ve been really enjoying your content on
                          [channel_name] and your honest gear reviews. Your
                          authentic approach and the way you
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between pt-8">
                <button
                  onClick={() => handleNextStep(5, step5Ref)}
                  className="order-2 md:order-1 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button className="order-1 md:order-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg hover:from-purple-700 hover:to-orange-600 transition-colors">
                  Launch!
                </button>
              </div>
            </div>
          </StepCard>
        )}
      </div>
    </Layout>
  );
}
