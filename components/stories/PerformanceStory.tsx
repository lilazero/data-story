"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award } from 'lucide-react';

const performanceData = [
    { wlb: '1 (Bad)', excellent: 84.5, outstanding: 15.5 },
    { wlb: '2 (Good)', excellent: 83.2, outstanding: 16.8 },
    { wlb: '3 (Better)', excellent: 85.1, outstanding: 14.9 },
    { wlb: '4 (Best)', excellent: 83.9, outstanding: 16.1 }
];

export default function PerformanceStory() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg"><Award size={20} /></div>
                <h2 className="text-xl font-bold">Performance & WLB</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                Top performance is consistent across all Work-Life Balance scores. Making employees overwork does not guarantee performance.
            </p>
            <div className="h-64 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" unit="%" tick={{ fontSize: 12 }} />
                        <YAxis dataKey="wlb" type="category" width={80} tick={{ fontSize: 11 }} />
                        <Tooltip cursor={{ fill: '#f5f5f5' }} />
                        <Bar dataKey="excellent" stackId="a" name="Excellent (3)" fill="#fde047" />
                        <Bar dataKey="outstanding" stackId="a" name="Outstanding (4)" fill="#eab308" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}