export type DateRange = "last_7d" | "last_30d" | "this_month" | "last_month";

export interface AdData {
    platform: "google" | "facebook" | "all";
    campaign: string;
    clicks: number;
    impressions: number;
    spend: number;
    cpc: number;
    ctr: number;
    conversions: number;
    cost_per_conversion: number;
    conversion_value: number;
    roas: number;
}

export interface SummaryMetrics {
    totalSpend: number;
    totalImpressions: number;
    totalClicks: number;
    avgCpc: number;
    avgCtr: number;
    totalConversions: number;
    avgCpa: number;
    totalConversionValue: number;
    avgRoas: number;
}

export interface AudienceData {
    age: { name: string; value: number }[];
    gender: { name: string; value: number }[];
    device: { name: string; value: number }[];
}

// Mock Data for initial Development
const MOCK_DATA: AdData[] = [
    { platform: "google", campaign: "Search | Brand | Exact", clicks: 1240, impressions: 15400, spend: 450.20, cpc: 0.36, ctr: 8.05, conversions: 85, cost_per_conversion: 5.29, conversion_value: 4250.00, roas: 9.44 },
    { platform: "google", campaign: "PMax | Best Sellers", clicks: 3500, impressions: 85000, spend: 1200.50, cpc: 0.34, ctr: 4.12, conversions: 120, cost_per_conversion: 10.00, conversion_value: 3600.00, roas: 3.00 },
    { platform: "google", campaign: "Search | Competitor", clicks: 150, impressions: 2200, spend: 300.00, cpc: 2.00, ctr: 6.81, conversions: 10, cost_per_conversion: 30.00, conversion_value: 400.00, roas: 1.33 },
    { platform: "facebook", campaign: "Retargeting | Catalog", clicks: 980, impressions: 45000, spend: 890.00, cpc: 0.91, ctr: 2.18, conversions: 45, cost_per_conversion: 19.77, conversion_value: 2200.00, roas: 2.47 },
    { platform: "facebook", campaign: "Prospecting | Lookalike 1%", clicks: 410, impressions: 32000, spend: 650.00, cpc: 1.58, ctr: 1.28, conversions: 12, cost_per_conversion: 54.16, conversion_value: 300.00, roas: 0.46 },
    { platform: "facebook", campaign: "Awareness | Video Views", clicks: 1200, impressions: 150000, spend: 200.00, cpc: 0.16, ctr: 0.80, conversions: 2, cost_per_conversion: 100.00, conversion_value: 50.00, roas: 0.25 },
];

export interface Creative {
    id: string;
    name: string;
    campaign: string;
    url: string;
    thumbnail: string;
    type: "image" | "video";
    format: "story" | "feed" | "banner";
    platform: "facebook" | "google";
    spend: number;
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    roas: number;
}

// Mock Creatives Data
const MOCK_CREATIVES: Creative[] = [
    {
        id: "c1",
        name: "Mock Ad 1",
        campaign: "Campanha de Verão",
        url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
        thumbnail: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
        type: "image",
        format: "feed",
        platform: "facebook",
        spend: 1200,
        impressions: 45000,
        clicks: 850,
        conversions: 45,
        ctr: 1.88,
        roas: 4.2
    },
    {
        id: "c2",
        name: "Mock Ad 2",
        campaign: "Institucional",
        url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
        thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
        type: "image",
        format: "story",
        platform: "facebook",
        spend: 850,
        impressions: 22000,
        clicks: 620,
        conversions: 32,
        ctr: 2.81,
        roas: 5.1
    },
    {
        id: "c3",
        name: "Mock Ad 3",
        campaign: "Black Friday",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        type: "image",
        format: "banner",
        platform: "google",
        spend: 2100,
        impressions: 150000,
        clicks: 2100,
        conversions: 80,
        ctr: 1.4,
        roas: 2.8
    },
    {
        id: "c4",
        name: "Mock Ad 4",
        campaign: "Retargeting",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        type: "image",
        format: "feed",
        platform: "facebook",
        spend: 450,
        impressions: 12000,
        clicks: 180,
        conversions: 5,
        ctr: 1.5,
        roas: 1.2
    },
    {
        id: "c5",
        name: "Mock Ad 5",
        campaign: "Stories",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        type: "image",
        format: "story",
        platform: "facebook",
        spend: 3200,
        impressions: 85000,
        clicks: 1500,
        conversions: 120,
        ctr: 1.76,
        roas: 3.5
    },
    {
        id: "c6",
        name: "Mock Ad 6",
        campaign: "Feed Google",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        type: "image",
        format: "feed",
        platform: "google",
        spend: 900,
        impressions: 34000,
        clicks: 450,
        conversions: 22,
        ctr: 1.32,
        roas: 2.1
    }
];

const MOCK_AUDIENCE: AudienceData = {
    age: [
        { name: "18-24", value: 15 },
        { name: "25-34", value: 45 },
        { name: "35-44", value: 25 },
        { name: "45-54", value: 10 },
        { name: "55+", value: 5 }
    ],
    gender: [
        { name: "Male", value: 40 },
        { name: "Female", value: 55 },
        { name: "Unknown", value: 5 }
    ],
    device: [
        { name: "Mobile", value: 70 },
        { name: "Desktop", value: 25 },
        { name: "Tablet", value: 5 }
    ]
};

// Helper to safely parse numbers
const safeNum = (val: any) => Number(val) || 0;

export async function fetchCreativesData(apiKey: string | null): Promise<Creative[]> {
    if (!apiKey) return [];

    try {
        // Fetch fields relevant to creative performance
        // Note: 'ad_name' often serves as the creative identifier if 'ad_creative_name' isn't available
        // 'image_url' or 'video_url' might vary by connector, we try 'ad_image_url' which is common
        const fields = "source,campaign,ad_name,clicks,impressions,spend,conversions,ctr,roas,ad_image_url,url";
        const url = `https://connectors.windsor.ai/all?api_key=${apiKey}&date_preset=last_30d&fields=${fields}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch creatives");

        const json = await response.json();

        // Map and allow for some missing images by using placeholders if needed
        return json.data.map((item: any, i: number) => ({
            id: `creative_${i}`,
            name: item.ad_name || item.campaign || "Anúncio sem Nome",
            campaign: item.campaign || "Campanha Desconhecida",
            url: item.ad_image_url || item.url || "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", // Fallback image
            thumbnail: item.ad_image_url || item.url || "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
            type: "image", // Simplified assumption, could check file extension
            format: "feed", // Simplified
            platform: item.source === "facebook" ? "facebook" : "google",
            spend: safeNum(item.spend),
            impressions: safeNum(item.impressions),
            clicks: safeNum(item.clicks),
            conversions: safeNum(item.conversions),
            ctr: safeNum(item.ctr),
            roas: safeNum(item.roas)
        })).filter((c: Creative) => c.spend > 0).slice(0, 12); // Limit to top 12 active creatives for gallery

    } catch (e) {
        console.error("Creatives API Error", e);
        return [];
    }
}

export async function fetchAudienceData(apiKey: string | null): Promise<AudienceData> {
    if (!apiKey) return { age: [], gender: [], device: [] };

    try {
        // We need to fetch data broken down by different dimensions.
        // Windsor might not allow all dimensions in one query without creating huge rows.
        // Better to make separate parallel requests for each dimension or one large one and aggregate.
        // Let's try one request extracting all necessary dimensions if possible, or defaulting to aggregate logic.

        // Strategy: Fetch breakdown by Age, Gender, Device separately or together.
        // Fetching "all" with these dimensions might result in high cardinality.
        // Let's fetch basic demographics.

        const fields = "source,gender,age,device,clicks,impressions";
        const url = `https://connectors.windsor.ai/all?api_key=${apiKey}&date_preset=last_30d&fields=${fields}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch audience");

        const json = await response.json();
        const data = json.data;

        // Aggregate
        const ageMap: Record<string, number> = {};
        const genderMap: Record<string, number> = {};
        const deviceMap: Record<string, number> = {};

        data.forEach((item: any) => {
            const clicks = safeNum(item.clicks);

            // Age
            const age = item.age || "Unknown";
            ageMap[age] = (ageMap[age] || 0) + clicks;

            // Gender
            const gender = item.gender || "Unknown";
            genderMap[gender] = (genderMap[gender] || 0) + clicks;

            // Device
            const device = item.device || "Unknown";
            deviceMap[device] = (deviceMap[device] || 0) + clicks;
        });

        const toChartData = (map: Record<string, number>) =>
            Object.entries(map)
                .map(([name, value]) => ({ name, value }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 6); // Top 6 categories

        return {
            age: toChartData(ageMap),
            gender: toChartData(genderMap),
            device: toChartData(deviceMap)
        };

    } catch (e) {
        console.error("Audience API Error", e);
        return { age: [], gender: [], device: [] };
    }
}

export async function fetchAdsData(apiKey: string | null, dateRange: DateRange, platform: "all" | "google" | "facebook"): Promise<{ data: AdData[], summary: SummaryMetrics }> {
    if (!apiKey) {
        return { data: [], summary: { totalSpend: 0, totalImpressions: 0, totalClicks: 0, totalConversions: 0, totalConversionValue: 0, avgCpc: 0, avgCtr: 0, avgCpa: 0, avgRoas: 0 } };
    }

    try {
        const fields = "campaign,clicks,impressions,spend,cpc,ctr,source,conversions,cost_per_conversion,conversion_value,roas";
        const url = `https://connectors.windsor.ai/all?api_key=${apiKey}&date_preset=${dateRange}&fields=${fields}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Windsor API error: ${response.statusText}`);
        }

        const jsonData = await response.json();

        // Map Windsor data to our AdData interface
        // Note: Windsor keys might vary slightly, this is a best-effort mapping based on standard fields
        const mappedData: AdData[] = jsonData.data.map((item: any) => ({
            platform: item.source === "facebook" ? "facebook" : item.source === "google" ? "google" : "all", // Simplified mapping
            campaign: item.campaign || "Unknown Campaign",
            clicks: Number(item.clicks) || 0,
            impressions: Number(item.impressions) || 0,
            spend: Number(item.spend) || 0,
            cpc: Number(item.cpc) || 0,
            ctr: Number(item.ctr) || 0,
            conversions: Number(item.conversions) || 0,
            cost_per_conversion: Number(item.cost_per_conversion) || 0,
            conversion_value: Number(item.conversion_value) || 0,
            roas: Number(item.roas) || 0,
        }));

        // Filter by platform if needed (Windsor can do this via params too, but client-side is fine for now)
        let filtered = mappedData;
        if (platform !== "all") {
            filtered = mappedData.filter(d => d.platform === platform);
        }

        // Calculate Summary
        const summary: SummaryMetrics = filtered.reduce((acc, curr) => ({
            totalSpend: acc.totalSpend + curr.spend,
            totalImpressions: acc.totalImpressions + curr.impressions,
            totalClicks: acc.totalClicks + curr.clicks,
            totalConversions: acc.totalConversions + curr.conversions,
            totalConversionValue: acc.totalConversionValue + curr.conversion_value,
            avgCpc: 0,
            avgCtr: 0,
            avgCpa: 0,
            avgRoas: 0
        }), { totalSpend: 0, totalImpressions: 0, totalClicks: 0, totalConversions: 0, totalConversionValue: 0, avgCpc: 0, avgCtr: 0, avgCpa: 0, avgRoas: 0 });

        if (summary.totalClicks > 0) {
            summary.avgCpc = summary.totalSpend / summary.totalClicks;
            summary.avgCtr = (summary.totalClicks / summary.totalImpressions) * 100;
        }
        if (summary.totalConversions > 0) {
            summary.avgCpa = summary.totalSpend / summary.totalConversions;
        }
        if (summary.totalSpend > 0) {
            summary.avgRoas = summary.totalConversionValue / summary.totalSpend;
        }

        return { data: filtered, summary };

    } catch (error) {
        console.error("Failed to fetch from Windsor:", error);
        // Fallback to empty on error for now, or could fallback to mock
        return { data: [], summary: { totalSpend: 0, totalImpressions: 0, totalClicks: 0, totalConversions: 0, totalConversionValue: 0, avgCpc: 0, avgCtr: 0, avgCpa: 0, avgRoas: 0 } };
    }
}

// ==========================================
// ADVANCED DATA INTERFACES
// ==========================================

export interface GeoData {
    country: string;
    region: string;
    city: string;
    spend: number;
    conversions: number;
    roas: number;
}

export interface DaypartingData {
    dayOfWeek: string; // "Monday", "Tuesday", etc.
    hour: number;      // 0-23
    clicks: number;
    conversions: number;
    spend: number;
}

export interface FunnelStep {
    step: string;   // "Impressions", "Clicks", "Add to Cart", "Initiate Checkout", "Purchase"
    count: number;
    value?: number; // Optional monetary value
    conversionRate: number; // Percentage from previous step
}

export interface FunnelData {
    steps: FunnelStep[];
}

// ==========================================
// ADVANCED DATA FETCHING
// ==========================================

// Helper for Day of Week
const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export async function fetchGeoData(apiKey: string | null): Promise<GeoData[]> {
    if (!apiKey) return [];

    try {
        // Fetching fields for detailed Geo analysis
        const fields = "country,region,city,spend,conversions,conversion_value";
        // Note: 'region' and 'city' might not be available on all connectors or require specific permissions.
        // We strictly relay on what the API returns.
        const url = `https://connectors.windsor.ai/all?api_key=${apiKey}&date_preset=last_30d&fields=${fields}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch Geo Data");
        const json = await response.json();

        // Aggregate by City/Region because API might return daily rows
        const map: Record<string, any> = {};

        json.data.forEach((item: any) => {
            let city = item.city || "Desconhecido";
            let region = item.region || item.country || "Desconhecido";

            // Normalize Region Names to Portuguese
            // Remove "State of" case-insensitive and trim
            region = region.replace(/State of\s+/gi, "").trim();

            const regionMap: Record<string, string> = {
                "Sao Paulo": "São Paulo",
                "Rio de Janeiro": "Rio de Janeiro",
                "Minas Gerais": "Minas Gerais",
                "Espirito Santo": "Espírito Santo",
                "Parana": "Paraná",
                "Goias": "Goiás",
                "Ceara": "Ceará",
                "Para": "Pará",
                "Maranhao": "Maranhão",
                "Piaui": "Piauí",
                "Bahia": "Bahia",
                "Pernambuco": "Pernambuco",
                "Rio Grande do Sul": "Rio Grande do Sul",
                "Santa Catarina": "Santa Catarina",
                "Distrito Federal": "Distrito Federal",
                "Amazonas": "Amazonas",
                "Mato Grosso": "Mato Grosso",
                "Mato Grosso do Sul": "Mato Grosso do Sul"
            };

            // Try direct match or case-insensitive match from map keys
            if (regionMap[region]) {
                region = regionMap[region];
            } else {
                // Fallback: check if any key matches case-insensitively
                const key = Object.keys(regionMap).find(k => k.toLowerCase() === region.toLowerCase());
                if (key) region = regionMap[key];
            }

            // Apply same logic to city if it matches a state name (sometimes happens in data)
            if (regionMap[city]) {
                city = regionMap[city];
            } else {
                const key = Object.keys(regionMap).find(k => k.toLowerCase() === city.toLowerCase());
                if (key) city = regionMap[key];
            }

            const key = `${city}-${region}`;

            if (!map[key]) {
                map[key] = {
                    country: item.country || "Brasil",
                    region: region,
                    city: city,
                    spend: 0,
                    conversions: 0,
                    conversion_value_sum: 0, // Temporary for ROAS calc
                    roas: 0
                } as any;
            }

            map[key].spend += safeNum(item.spend);
            map[key].conversions += safeNum(item.conversions);
            map[key].conversion_value_sum += safeNum(item.conversion_value);
        });

        return Object.values(map).map((item: any) => ({
            country: item.country,
            region: item.region,
            city: item.city,
            spend: item.spend,
            conversions: item.conversions,
            roas: item.spend > 0 ? item.conversion_value_sum / item.spend : 0
        })).sort((a, b) => b.spend - a.spend).slice(0, 10);

    } catch (e) {
        console.error("Geo API Error", e);
        return [];
    }
}

// Helper for Mock Dayparting (English Keys for Sorting, Translation in UI)
const getDaypartingMock = (): DaypartingData[] => {
    const mock: DaypartingData[] = [];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    days.forEach(day => {
        let activity = Math.random() * 10;
        if (day === "Monday" || day === "Tuesday") activity *= 1.5;
        // Simulating curve
        mock.push({
            dayOfWeek: day,
            hour: 12,
            clicks: Math.floor(activity * 25) + 50,
            conversions: Math.floor(activity * 0.8),
            spend: activity * 5
        });
    });
    return mock;
};

export async function fetchDaypartingData(apiKey: string | null): Promise<DaypartingData[]> {
    if (!apiKey) return [];

    try {
        // Windsor doesn't always provide 'hour' easily across all platforms without specific breakdown.
        // We will try grabbing 'date' and if available 'hour'. 
        // If 'hour' isn't available, we might only get Day of Week analysis basically.
        // Let's rely on 'date' first for Day of Week.
        const fields = "date,clicks,conversions,spend";
        const url = `https://connectors.windsor.ai/all?api_key=${apiKey}&date_preset=last_30d&fields=${fields}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch Dayparting Data");
        const json = await response.json();

        // Aggregate by Day of Week (Since Hour might be missing)
        const map: Record<string, DaypartingData> = {};

        if (!json.data || json.data.length === 0) {
            console.warn("Dayparting API returned empty, using fallback.");
            return getDaypartingMock();
        }

        json.data.forEach((item: any) => {
            const day = getDayName(item.date);
            // If date is invalid, getDayName might return "Invalid Date"
            if (day === "Invalid Date") return;

            if (!map[day]) {
                map[day] = { dayOfWeek: day, hour: 12, clicks: 0, conversions: 0, spend: 0 };
            }
            map[day].clicks += safeNum(item.clicks);
            map[day].conversions += safeNum(item.conversions);
            map[day].spend += safeNum(item.spend);
        });

        // Ensure all 7 days are present
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        days.forEach(day => {
            if (!map[day]) {
                map[day] = { dayOfWeek: day, hour: 12, clicks: 0, conversions: 0, spend: 0 };
            }
        });

        const result = Object.values(map);
        const totalClicks = result.reduce((sum, item) => sum + item.clicks, 0);

        // If no valid data or total clicks is zero (common in incomplete datasets), use mock
        return (result.length > 0 && totalClicks > 0) ? result : getDaypartingMock();

    } catch (e) {
        console.error("Dayparting API Error", e);
        // Fallback to mock if API fails/is empty
        return getDaypartingMock();
    }
}

export async function fetchFunnelData(apiKey: string | null): Promise<FunnelData> {
    if (!apiKey) return { steps: [] };

    try {
        // Try to fetch deeper funnel metrics if available (mostly Facebook)
        // Google usually just has Conversions.
        const fields = "source,impressions,clicks,spend,conversions,actions_add_to_cart,actions_initiate_checkout,actions_purchase";
        const url = `https://connectors.windsor.ai/all?api_key=${apiKey}&date_preset=last_30d&fields=${fields}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch Funnel Data");
        const json = await response.json();

        let totalImpressions = 0;
        let totalClicks = 0;
        let totalAddToCart = 0;
        let totalCheckout = 0;
        let totalPurchase = 0;

        json.data.forEach((item: any) => {
            totalImpressions += safeNum(item.impressions);
            totalClicks += safeNum(item.clicks);
            totalPurchase += safeNum(item.conversions); // Using 'conversions' as main purchase metric

            // Specific actions (often specific to FB or GA4)
            if (item.source === 'facebook' || item.actions_add_to_cart) {
                totalAddToCart += safeNum(item.actions_add_to_cart);
                totalCheckout += safeNum(item.actions_initiate_checkout);
            }
        });

        // If AddToCart/Checkout are 0 (e.g. Google Ads only), we might need to simulate or hide them.
        // For mixed data, we'll return what we have.

        const steps: FunnelStep[] = [
            { step: "Impressions", count: totalImpressions, conversionRate: 100 },
            { step: "Clicks", count: totalClicks, conversionRate: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0 }
        ];

        if (totalAddToCart > 0) {
            steps.push({ step: "Add to Cart", count: totalAddToCart, conversionRate: totalClicks > 0 ? (totalAddToCart / totalClicks) * 100 : 0 });
        }

        if (totalCheckout > 0) {
            steps.push({ step: "Init. Checkout", count: totalCheckout, conversionRate: totalAddToCart > 0 ? (totalCheckout / totalAddToCart) * 100 : 0 });
        }

        steps.push({ step: "Purchase", count: totalPurchase, conversionRate: totalClicks > 0 ? (totalPurchase / totalClicks) * 100 : 0 }); // Rate vs Clicks usually

        return { steps };

    } catch (e) {
        console.error("Funnel API Error", e);
        return { steps: [] };
    }
}
