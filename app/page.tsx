"use client";

import React from 'react';
import OvertimeStory from '../components/stories/OvertimeStory';
import TravelStory from '../components/stories/TravelStory';
import SatisfactionStory from '../components/stories/SatisfactionStory';
import RolesStory from '../components/stories/RolesStory';
import IncomeStory from '../components/stories/IncomeStory';
import CommuteStory from '../components/stories/CommuteStory';
import TenureStory from '../components/stories/TenureStory';
import ManagersStory from '../components/stories/ManagersStory';
import PromotionsStory from '../components/stories/PromotionsStory';
import PerformanceStory from '../components/stories/PerformanceStory';

export default function HRDashboard() {
  return (
    <main className="min-h-screen bg-neutral-50 p-8 text-neutral-900">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-2">
            HR Analytics: Retention Stories
          </h1>
          <p className="text-lg text-neutral-600">
            A data-driven deep dive into what is driving our employees away and how we can retain our top talent.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <OvertimeStory />
          <TravelStory />
          <SatisfactionStory />
          <RolesStory />
          <IncomeStory />
          <CommuteStory />
          <TenureStory />
          <ManagersStory />
          <PromotionsStory />
          <PerformanceStory />
        </div>
      </div>
    </main>
  );
}
