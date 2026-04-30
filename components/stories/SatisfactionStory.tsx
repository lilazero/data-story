"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Frown } from 'lucide-react';

const satisfactionData = [
    { score: '1 (Low)', attritionRate: 22.8 },
    { score: '2 (Medium)', attritionRate: 16.4 },
    { score: '3 (High)', attritionRate: 16.5 },
    { score: '4 (Very High)', attritionRate: 11.3 }
];

export default function SatisfactionStory() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Frown size={20} /></div>
                <h2 className="text-xl font-bold">Disengagement Drives Departure</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                Employees with the lowest job satisfaction (1) drop out at the highest rate.
            </p>
            <div className="h-64 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={satisfactionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="score" tick={{ fontSize: 12 }} />
                        <YAxis unit="%" tick={{ fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#f5f5f5' }} />
                        <Bar dataKey="attritionRate" name="Attrition Rate (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}