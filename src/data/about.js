import { Utensils, ShieldCheck, Truck } from 'lucide-react';

export const cardData = [
    {
        id: 'step1',
        title: "Restaurant Listing",
        desc: "Partners upload surplus food details to our smart dashboard.",
        icon: <Utensils color="white" />,
        colorClass: 'green'
    },
    {
        id: 'step2',
        title: "IoT Quality Assurance",
        desc: "Our sensors verify safety, freshness, and nutritional viability.",
        icon: <ShieldCheck color="white" />,
        colorClass: 'blue'
    },
    {
        id: 'step3',
        title: "NGO Distribution",
        desc: "Verified food is collected by NGOs and fed to those in need.",
        icon: <Truck color="white" />,
        colorClass: 'orange'
    }
]