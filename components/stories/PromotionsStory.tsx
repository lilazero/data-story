"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const promotionData = [
    { promoYears: '0-1 yrs', attrRate: 19.5 },
    { promoYears: '2-4 yrs', attrRate: 11.2 },
    { promoYears: '5-7 yrs', attrRate: 15.3 },
    { promoYears: '8-10 yrs', attrRate: 11.1 },
    { promoYears: '11+ yrs', attrRate: 22.0 }
];

export default function PromotionsStory() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-fuchsia-100 text-fuchsia-600 rounded-lg"><TrendingUp size={20} /></div>
                <h2 className="text-xl font-bold">Promotion Stagnation</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                Highest attrition happens right after a promotion (job-hopping) or when heavily stagnated (11+ years).
            </p>
            <div className="h-64 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={promotionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="promoYears" tick={{ fontSize: 12 }} />
                        <YAxis unit="%" tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Line type="step" dataKey="attrRate" name="Attrition Rate (%)" stroke="#d946ef" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}