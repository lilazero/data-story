"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock } from 'lucide-react';

const overtimeData = [
    { name: 'No Overtime', attritionRate: 10.4, retentionRate: 89.6 },
    { name: 'Works Overtime', attritionRate: 30.5, retentionRate: 69.5 }
];

export default function OvertimeStory({ data }: { data?: any[] }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg"><Clock size={20} /></div>
                <h2 className="text-xl font-bold">The Toll of Overtime</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                Employees working overtime quit at a dramatically higher rate. Overwork is a critical retention risk.
            </p>
            <div className="h-64 mt-auto w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data || overtimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis unit="%" tick={{ fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#f5f5f5' }} />
                        <Bar dataKey="attritionRate" name="Attrition Rate (%)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
