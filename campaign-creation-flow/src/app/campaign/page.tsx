'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CampaignPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to campaign creation flow
    router.push('/campaign/create');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-cheerful-light-gray">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-cheerful-purple to-cheerful-orange rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">C</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Cheerful</h1>
        <p className="text-gray-600">Redirecting to campaign creation...</p>
      </div>
    </div>
  );
}
