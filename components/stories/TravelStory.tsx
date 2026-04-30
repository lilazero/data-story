"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase } from 'lucide-react';

const travelData = [
    { name: 'Non-Travel', attritionRate: 8.0 },
    { name: 'Travel Rarely', attritionRate: 14.9 },
    { name: 'Travel Frequently', attritionRate: 24.9 }
];

export default function TravelStory() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Briefcase size={20} /></div>
                <h2 className="text-xl font-bold">The Frequent Flyer Burnout</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                "Road warriors" leave at a substantially higher rate than non-travelers. Travel fatigue is real.
            </p>
            <div className="h-64 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={travelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis unit="%" tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="attritionRate" name="Attrition Rate (%)" stroke="#f97316" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}