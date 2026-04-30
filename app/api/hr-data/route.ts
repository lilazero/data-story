import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), '../HR_Analytics.csv');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = Papa.parse<any>(fileContent, { header: true, dynamicTyping: true, skipEmptyLines: true });

        // Helper functions
        const calcAttrRate = (group: any[]) => {
            if (!group || group.length === 0) return 0;
            const attr = group.filter(d => d.Attrition === 'Yes').length;
            return Number(((attr / group.length) * 100).toFixed(1));
        };

        const median = (arr: number[]) => {
            if (arr.length === 0) return 0;
            const s = [...arr].sort((a, b) => a - b);
            const mid = Math.floor(s.length / 2);
            return s.length % 2 !== 0 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
        };

        // 1. Overtime Data
        const worksOt = data.filter(d => d.OverTime === 'Yes');
        const noOt = data.filter(d => d.OverTime === 'No');
        const overtimeData = [
            { name: 'No Overtime', attritionRate: calcAttrRate(noOt), retentionRate: 100 - calcAttrRate(noOt) },
            { name: 'Works Overtime', attritionRate: calcAttrRate(worksOt), retentionRate: 100 - calcAttrRate(worksOt) }
        ];

        // 2. Travel Data
        const travelData = [
            { name: 'Non-Travel', attritionRate: calcAttrRate(data.filter(d => d.BusinessTravel === 'Non-Travel')) },
            { name: 'Travel Rarely', attritionRate: calcAttrRate(data.filter(d => d.BusinessTravel === 'Travel_Rarely')) },
            { name: 'Travel Frequently', attritionRate: calcAttrRate(data.filter(d => d.BusinessTravel === 'Travel_Frequently')) }
        ];

        // 3. Satisfaction Data
        const satMap: Record<number, string> = { 1: '1 (Low)', 2: '2 (Medium)', 3: '3 (High)', 4: '4 (Very High)' };
        const satisfactionData = [1, 2, 3, 4].map(score => ({
            score: satMap[score],
            attritionRate: calcAttrRate(data.filter(d => d.JobSatisfaction === score))
        }));

        // 4. Role Data
        const roles = Array.from(new Set(data.map(d => d.JobRole)));
        const roleData = roles.map(role => ({
            name: role,
            attritionRate: calcAttrRate(data.filter(d => d.JobRole === role))
        })).sort((a, b) => b.attritionRate - a.attritionRate).slice(0, 5); // top 5

        // 5. Money Data
        const moneyData = [
            { status: 'Active (Stayed)', income: median(data.filter(d => d.Attrition === 'No').map(d => d.MonthlyIncome)) },
            { status: 'Departed (Left)', income: median(data.filter(d => d.Attrition === 'Yes').map(d => d.MonthlyIncome)) }
        ];

        // 6. Commute Data
        const commuteData = [
            { range: '0-5 miles', rate: calcAttrRate(data.filter(d => d.DistanceFromHome <= 5)) },
            { range: '6-10 miles', rate: calcAttrRate(data.filter(d => d.DistanceFromHome >= 6 && d.DistanceFromHome <= 10)) },
            { range: '11-15 miles', rate: calcAttrRate(data.filter(d => d.DistanceFromHome >= 11 && d.DistanceFromHome <= 15)) },
            { range: '16-20 miles', rate: calcAttrRate(data.filter(d => d.DistanceFromHome >= 16 && d.DistanceFromHome <= 20)) },
            { range: '21+ miles', rate: calcAttrRate(data.filter(d => d.DistanceFromHome >= 21)) }
        ];

        // 7. Tenure Data
        const getTenureBin = (y: number) => {
            if (y <= 1) return '0-1 yr';
            if (y <= 4) return '2-4 yrs';
            if (y <= 7) return '5-7 yrs';
            if (y <= 10) return '8-10 yrs';
            return '11+ yrs';
        };
        const tenureData = ['0-1 yr', '2-4 yrs', '5-7 yrs', '8-10 yrs', '11+ yrs'].map(bin => ({
            years: bin,
            churnVolume: data.filter(d => d.Attrition === 'Yes' && getTenureBin(d.YearsAtCompany) === bin).length
        }));

        // 8. Manager Data
        const getManagerBin = (y: number) => {
            if (y <= 1) return '0-1 yr';
            if (y <= 3) return '2-3 yrs';
            if (y <= 5) return '4-5 yrs';
            return '6+ yrs';
        };
        const managerData = ['0-1 yr', '2-3 yrs', '4-5 yrs', '6+ yrs'].map(bin => ({
            managerYears: bin,
            risk: calcAttrRate(data.filter(d => getManagerBin(d.YearsWithCurrManager) === bin))
        }));

        // 9. Promotion Data
        const getPromoBin = (y: number) => {
            if (y <= 1) return '0-1 yrs';
            if (y <= 4) return '2-4 yrs';
            if (y <= 7) return '5-7 yrs';
            if (y <= 10) return '8-10 yrs';
            return '11+ yrs';
        };
        const promotionData = ['0-1 yrs', '2-4 yrs', '5-7 yrs', '8-10 yrs', '11+ yrs'].map(bin => ({
            promoYears: bin,
            attrRate: calcAttrRate(data.filter(d => getPromoBin(d.YearsSinceLastPromotion) === bin))
        }));

        // 10. Performance Data
        const wlbMap: Record<number, string> = { 1: '1 (Bad)', 2: '2 (Good)', 3: '3 (Better)', 4: '4 (Best)' };
        const performanceData = [1, 2, 3, 4].map(wlb => {
            const group = data.filter(d => d.WorkLifeBalance === wlb);
            const total = group.length;
            if (total === 0) return { wlb: wlbMap[wlb], excellent: 0, outstanding: 0 };
            const excellent = group.filter(d => d.PerformanceRating === 3).length;
            const outstanding = group.filter(d => d.PerformanceRating === 4).length;
            return {
                wlb: wlbMap[wlb],
                excellent: Number(((excellent / total) * 100).toFixed(1)),
                outstanding: Number(((outstanding / total) * 100).toFixed(1))
            };
        });

        return NextResponse.json({
            overtimeData,
            travelData,
            satisfactionData,
            roleData,
            moneyData,
            commuteData,
            tenureData,
            managerData,
            promotionData,
            performanceData
        });
    } catch (error) {
        console.error("Error generating HR data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}