"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPin } from 'lucide-react';

const commuteData = [
    { range: '0-5 miles', rate: 13.5 },
    { range: '6-10 miles', rate: 16.2 },
    { range: '11-15 miles', rate: 19.8 },
    { range: '16-20 miles', rate: 21.4 },
    { range: '21+ miles', rate: 24.2 }
];

export default function CommuteStory({ data }: { data?: any[] }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><MapPin size={20} /></div>
                <h2 className="text-xl font-bold">The Commute Drain</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                Employees with longer commutes are visibly more likely to leave the company.
            </p>
            <div className="h-64 mt-auto w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data || commuteData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                        <YAxis unit="%" tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Line type="step" dataKey="rate" name="Attrition Rate (%)" stroke="#6366f1" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
