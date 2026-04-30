'use client';

import { useState, useEffect } from 'react';
import OvertimeStory from '@/components/stories/OvertimeStory';
import TravelStory from '@/components/stories/TravelStory';
import SatisfactionStory from '@/components/stories/SatisfactionStory';
import RolesStory from '@/components/stories/RolesStory';
import IncomeStory from '@/components/stories/IncomeStory';
import CommuteStory from '@/components/stories/CommuteStory';
import TenureStory from '@/components/stories/TenureStory';
import ManagersStory from '@/components/stories/ManagersStory';
import PromotionsStory from '@/components/stories/PromotionsStory';
import PerformanceStory from '@/components/stories/PerformanceStory';
import { RefreshCw } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/hr-data');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        console.error("Failed to fetch HR data");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-neutral-200 pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-950">
              HR Stories
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 font-medium max-w-2xl">
              An interactive analysis of HR data tracking paths.
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OvertimeStory data={data?.overtimeData} />
          <TravelStory data={data?.travelData} />
          <SatisfactionStory data={data?.satisfactionData} />
          <RolesStory data={data?.roleData} />
          <IncomeStory data={data?.moneyData} />
          <CommuteStory data={data?.commuteData} />
          <TenureStory data={data?.tenureData} />
          <ManagersStory data={data?.managerData} />
          <PromotionsStory data={data?.promotionData} />
          <PerformanceStory data={data?.performanceData} />
        </div>

        <footer className="pt-12 pb-6 border-t border-neutral-200 text-center text-sm text-neutral-400">
          <p>Analysis based on IBM HR Analytics Attrition Dataset.</p>
        </footer>
      </div>
    </main>
  );
}
