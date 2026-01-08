import AB from '../assets/images/Restaurants/AB.webp';
import DT from '../assets/images/Restaurants/DT.webp';
import MJ from '../assets/images/Restaurants/MJ.webp';
import PK from '../assets/images/Restaurants/PK.webp';
import RM from '../assets/images/Restaurants/RM.webp';
import SG from '../assets/images/Restaurants/SG.webp';

import AT from '../assets/images/NGO/AT.webp';
import FFAF from '../assets/images/NGO/FFAF.webp';
import HK from '../assets/images/NGO/HK.webp';
import SF from '../assets/images/NGO/SF.webp';

export const restaurants = [
    {
        id: 1,
        name: "Annapurna Bhojanalaya",
        location: "Shiv Nagar",
        type: "Satvik Thali",
        joined: "Aug 2023",
        totalDonations: 172,
        portionsServed: 2580,
        rating: 4.9,
        impact: "Fed 860 families",
        logo: AB
    },
    {
        id: 2,
        name: "Rasoi Mahal",
        location: "Rajpath Extension",
        type: "Royal Indian",
        joined: "Oct 2023",
        totalDonations: 149,
        portionsServed: 2235,
        rating: 4.8,
        impact: "Fed 745 families",
        logo: RM
    },
    {
        id: 3,
        name: "Desi Tandoor",
        location: "Suraj Colony",
        type: "North Indian",
        joined: "Jan 2024",
        totalDonations: 104,
        portionsServed: 1560,
        rating: 4.7,
        impact: "Fed 520 families",
        logo: DT
    },
    {
        id: 4,
        name: "Prakriti Kitchen",
        location: "Green Park Enclave",
        type: "Organic & Millet",
        joined: "Jul 2023",
        totalDonations: 201,
        portionsServed: 3015,
        rating: 5.0,
        impact: "Fed 1005 families",
        logo: PK
    },
    {
        id: 5,
        name: "Masala Junction",
        location: "Vikas Marg",
        type: "Multi-Cuisine",
        joined: "Sep 2023",
        totalDonations: 138,
        portionsServed: 2070,
        rating: 4.8,
        impact: "Fed 690 families",
        logo: MJ
    },
    {
        id: 6,
        name: "Swaad Ghar",
        location: "Shanti Vihar",
        type: "Home-Style Meals",
        joined: "Nov 2023",
        totalDonations: 121,
        portionsServed: 1815,
        rating: 4.9,
        impact: "Fed 605 families",
        logo: SG
    }
];

export const ngos = [
    {
        id: 1,
        name: "Food For All Foundation",
        location: "Jaipur Central",
        type: "Hunger Relief",
        established: "2018",
        peopleServed: 15000,
        partnersCount: 24,
        rating: 5.0,
        focus: "Daily meal distribution",
        logo: FFAF
    },
    {
        id: 2,
        name: "Hope Kitchen",
        location: "Multiple Locations",
        type: "Community Kitchen",
        established: "2019",
        peopleServed: 12500,
        partnersCount: 18,
        rating: 4.9,
        focus: "Children & elderly care",
        logo: HK
    },
    {
        id: 3,
        name: "Seva Foundation",
        location: "Mansarovar",
        type: "Social Welfare",
        established: "2017",
        peopleServed: 18000,
        partnersCount: 31,
        rating: 5.0,
        focus: "Urban poverty relief",
        logo: SF
    },
    {
        id: 4,
        name: "Annapurna Trust",
        location: "Raja Park",
        type: "Food Security",
        established: "2020",
        peopleServed: 9000,
        partnersCount: 15,
        rating: 4.8,
        focus: "Emergency food aid",
        logo: AT
    }
];
