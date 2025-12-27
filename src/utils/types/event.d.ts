export type Event = {
    id: string;
    title: string;
    image: string;
    regFinalDate: string;
    bgImage: string;
    featured?: boolean;
    RegCloseTime?: {
        hours: number;
        minutes: number;
    }
    regLink?: string;
    type: 'technical' | 'nonTechnical' | 'sports';
    date?: string;
    description: string;
    venue?: string;
    eventType: string;
    memberMaxCount: number;
    memberMinCount: number;
    isOnline?: boolean;
    upi1?: string;
    upi2?: string;
    gpay?: string;
    maxParticipation?: string;
    minParticipation?: string;
    totalParticipation?: string;
    eveType?: "ind" | "team"
    registrationFee: string;
    firstPrize: string;
    secondPrize?: string;
    requiresExtraData?: boolean;
    extraFields?: { name: string; type: string }[]
    coordinators: { name: string; phone: string }[];
    rules?: string[];
};
