"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserMinus } from 'lucide-react';

const managerData = [
    { managerYears: '0-1 yr', risk: 23.5 },
    { managerYears: '2-3 yrs', risk: 14.2 },
    { managerYears: '4-5 yrs', risk: 10.8 },
    { managerYears: '6+ yrs', risk: 7.9 }
];

export default function ManagersStory({ data }: { data?: any[] }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><UserMinus size={20} /></div>
                <h2 className="text-xl font-bold">Do People Leave Managers?</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                Employees are highly vulnerable to leaving early in a manager's tenure (0-2 years). Stability breeds loyalty.
            </p>
            <div className="h-64 mt-auto w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data || managerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="managerYears" tick={{ fontSize: 12 }} />
                        <YAxis unit="%" tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="risk" name="Attrition Risk (%)" stroke="#475569" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
