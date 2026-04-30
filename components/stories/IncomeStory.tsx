"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign } from 'lucide-react';

const moneyData = [
    { status: 'Active (Stayed)', income: 5204 },
    { status: 'Departed (Left)', income: 3202 }
];

export default function IncomeStory() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><DollarSign size={20} /></div>
                <h2 className="text-xl font-bold">Does Money Buy Loyalty?</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                Employees who leave tend to have noticeably lower median monthly incomes.
            </p>
            <div className="h-64 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moneyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                        <YAxis unit="$" tick={{ fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#f5f5f5' }} formatter={(val: any) => `$${val}`} />
                        <Bar dataKey="income" name="Median Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}