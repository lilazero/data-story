"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarDays } from 'lucide-react';

const tenureData = [
    { years: '0-1 yr', churnVolume: 130 },
    { years: '2-4 yrs', churnVolume: 80 },
    { years: '5-7 yrs', churnVolume: 35 },
    { years: '8-10 yrs', churnVolume: 25 },
    { years: '11+ yrs', churnVolume: 15 }
];

export default function TenureStory() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-lg"><CalendarDays size={20} /></div>
                <h2 className="text-xl font-bold">The Honeymoon Phase</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                Most attrition happens in the first 0-4 years. Retention stabilizes significantly after crossing the 5-year mark.
            </p>
            <div className="h-64 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tenureData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="years" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#f5f5f5' }} />
                        <Bar dataKey="churnVolume" name="Departed Employees" fill="#ec4899" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}