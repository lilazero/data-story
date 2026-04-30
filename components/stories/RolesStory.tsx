"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';

const roleData = [
    { name: 'Sales Representative', attritionRate: 39.7 },
    { name: 'Laboratory Technician', attritionRate: 23.9 },
    { name: 'Human Resources', attritionRate: 23.0 },
    { name: 'Research Scientist', attritionRate: 16.0 },
    { name: 'Manager', attritionRate: 4.9 }
];

export default function RolesStory() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-lg"><Users size={20} /></div>
                <h2 className="text-xl font-bold">Roles Bleeding Talent</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                Sales Reps and Lab Techs show the highest turnover. We should target our retention programs here.
            </p>
            <div className="h-64 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roleData} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" unit="%" tick={{ fontSize: 12 }} />
                        <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11 }} />
                        <Tooltip cursor={{ fill: '#f5f5f5' }} />
                        <Bar dataKey="attritionRate" name="Attrition Rate (%)" fill="#14b8a6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}