import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import alternativeImage from "/img/alternativePicture/default_image.png";
import { createPortal } from "react-dom";

const MecanicGrid = ({ filters }) => {
    const { lang } = useContext(LanguageContext);

    // Translation function for mechanic specs
    const translateMecanicSpec = (spec) => {
        const specMap = {
            'Mécanique générale': t[lang]?.mecanicSpecs?.general || 'Mécanique générale',
            'Électricité auto': t[lang]?.mecanicSpecs?.electrical || 'Électricité auto',
            'Carrosserie': t[lang]?.mecanicSpecs?.bodywork || 'Carrosserie',
            'Climatisation': t[lang]?.mecanicSpecs?.aircon || 'Climatisation',
            'Transmission': t[lang]?.mecanicSpecs?.transmission || 'Transmission',
            'Suspensions': t[lang]?.mecanicSpecs?.suspension || 'Suspensions',
            'Diagnostic électronique': t[lang]?.mecanicSpecs?.diagnostic || 'Diagnostic électronique',
            'Peinture': t[lang]?.mecanicSpecs?.painting || 'Peinture'
        };
        return specMap[spec] || spec;
    };

    // Translation function for cities
    const translateCity = (cityKey) => {
        const cityMap = {
            'Casablanca': t[lang]?.cities?.casablanca || 'Casablanca',
            'Rabat': t[lang]?.cities?.rabat || 'Rabat',
            'Marrakech': t[lang]?.cities?.marrakech || 'Marrakech',
            'Agadir': t[lang]?.cities?.agadir || 'Agadir',
            'Fès': t[lang]?.cities?.fes || 'Fès',
            'Tanger': t[lang]?.cities?.tanger || 'Tanger'
        };
        return cityMap[cityKey] || cityKey;
    };
    const [allMecanics] = useState([
        {
            id: 1,
            name: "Garage Al-Maghrib",
            specialties: ["Mécanique générale", "Électricité auto"],
            services: ["Vidange", "Freinage", "Embrayage"],
            images: [
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop"
            ],
            basePrice: 150,
            promotion: true,
            promotionDiscount: 15,
            rating: 4.8,
            reviewCount: 127,
            city: "Casablanca",
            address: "123 Rue Mohammed V",
            phone: "+212 522 123 456",
            isUrgent: true,
            availableToday: true,
            workingHours: "8h - 18h",
            description: "Garage spécialisé dans la mécanique générale et l'électricité automobile avec plus de 20 ans d'expérience."
        },
        {
            id: 2,
            name: "Auto Service Rabat",
            specialties: ["Climatisation", "Diagnostic électronique"],
            services: ["Climatisation", "Diagnostic", "Carrosserie"],
            images: [
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
            ],
            basePrice: 200,
            promotion: false,
            rating: 4.5,
            reviewCount: 89,
            city: "Rabat",
            address: "45 Avenue Hassan II",
            phone: "+212 537 654 321",
            isUrgent: false,
            availableToday: true,
            workingHours: "9h - 17h",
            description: "Service automobile moderne avec équipement de diagnostic de pointe."
        },
        {
            id: 3,
            name: "Garage Marrakech Express",
            specialties: ["Carrosserie", "Peinture"],
            services: ["Carrosserie", "Peinture", "Pare-brise"],
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop"
            ],
            basePrice: 300,
            promotion: true,
            promotionDiscount: 20,
            rating: 4.9,
            reviewCount: 156,
            city: "Marrakech",
            address: "78 Route de Fès",
            phone: "+212 524 987 654",
            isUrgent: false,
            availableToday: false,
            workingHours: "8h - 16h",
            description: "Spécialiste en carrosserie et peinture automobile avec finitions de qualité."
        },
        {
            id: 4,
            name: "Meca-Pro Fès",
            specialties: ["Transmission", "Suspensions"],
            services: ["Transmission", "Suspension", "Amortisseurs"],
            images: [
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop"
            ],
            basePrice: 250,
            promotion: false,
            rating: 4.6,
            reviewCount: 98,
            city: "Fès",
            address: "156 Boulevard Moulay Youssef",
            phone: "+212 535 111 222",
            isUrgent: true,
            availableToday: true,
            workingHours: "7h - 19h",
            description: "Expert en transmission et suspensions avec une équipe hautement qualifiée."
        },
        {
            id: 5,
            name: "Garage Océan Agadir",
            specialties: ["Mécanique générale", "Carrosserie"],
            services: ["Vidange", "Carrosserie", "Freinage"],
            images: [
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop"
            ],
            basePrice: 180,
            promotion: true,
            promotionDiscount: 10,
            rating: 4.7,
            reviewCount: 134,
            city: "Agadir",
            address: "89 Avenue du Prince Héritier",
            phone: "+212 528 333 444",
            isUrgent: false,
            availableToday: true,
            workingHours: "8h - 17h",
            description: "Garage complet offrant tous types de services automobiles."
        },
        {
            id: 6,
            name: "Tanger Auto Center",
            specialties: ["Électricité auto", "Diagnostic électronique"],
            services: ["Électricité", "Diagnostic", "Batterie"],
            images: [
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop"
            ],
            basePrice: 120,
            promotion: false,
            rating: 4.4,
            reviewCount: 76,
            city: "Tanger",
            address: "234 Rue de la Liberté",
            phone: "+212 539 555 666",
            isUrgent: false,
            availableToday: false,
            workingHours: "8h - 17h",
            description: "Garage de proximité avec service personnalisé et tarifs abordables."
        },
        {
            id: 7,
            name: "Atlas Mécanique",
            specialties: ["Mécanique générale", "Transmission"],
            services: ["Vidange", "Transmission", "Embrayage"],
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop"
            ],
            basePrice: 220,
            promotion: true,
            promotionDiscount: 25,
            rating: 4.6,
            reviewCount: 203,
            city: "Casablanca",
            address: "567 Boulevard Zerktouni",
            phone: "+212 522 789 012",
            isUrgent: true,
            availableToday: true,
            workingHours: "7h - 20h",
            description: "Garage moderne spécialisé dans la mécanique avancée et les transmissions."
        },
        {
            id: 8,
            name: "Garage Premium Rabat",
            specialties: ["Carrosserie", "Climatisation"],
            services: ["Carrosserie", "Climatisation", "Peinture"],
            images: [
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
            ],
            basePrice: 280,
            promotion: false,
            rating: 4.8,
            reviewCount: 165,
            city: "Rabat",
            address: "321 Avenue Allal Ben Abdallah",
            phone: "+212 537 777 888",
            isUrgent: false,
            availableToday: true,
            workingHours: "8h - 18h",
            description: "Garage haut de gamme spécialisé dans la carrosserie et la climatisation."
        },
        {
            id: 9,
            name: "Méca Express Casa",
            specialties: ["Mécanique générale", "Freinage"],
            services: ["Vidange", "Freinage", "Échappement"],
            images: [
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop"
            ],
            basePrice: 160,
            promotion: true,
            promotionDiscount: 12,
            rating: 4.5,
            reviewCount: 92,
            city: "Casablanca",
            address: "88 Rue Ibn Batouta",
            phone: "+212 522 445 556",
            isUrgent: true,
            availableToday: true,
            workingHours: "8h - 17h",
            description: "Service rapide et efficace pour tous vos besoins mécaniques."
        },
        {
            id: 10,
            name: "Auto Diagnostic Marrakech",
            specialties: ["Diagnostic électronique", "Électricité auto"],
            services: ["Diagnostic", "Électricité", "Injection"],
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop"
            ],
            basePrice: 240,
            promotion: false,
            rating: 4.9,
            reviewCount: 178,
            city: "Marrakech",
            address: "145 Avenue Mohammed VI",
            phone: "+212 524 667 778",
            isUrgent: false,
            availableToday: false,
            workingHours: "9h - 16h",
            description: "Spécialiste en diagnostic électronique avec équipement dernière génération."
        },
        {
            id: 11,
            name: "Garage Al-Andalous Fès",
            specialties: ["Suspensions", "Transmission"],
            services: ["Suspension", "Transmission", "Direction"],
            images: [
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop"
            ],
            basePrice: 190,
            promotion: true,
            promotionDiscount: 18,
            rating: 4.6,
            reviewCount: 115,
            city: "Fès",
            address: "67 Rue Abou Inane",
            phone: "+212 535 223 334",
            isUrgent: false,
            availableToday: true,
            workingHours: "8h - 18h",
            description: "Expert en suspensions et transmissions avec garantie prolongée."
        },
        {
            id: 12,
            name: "Souss Auto Agadir",
            specialties: ["Climatisation", "Peinture"],
            services: ["Climatisation", "Peinture", "Vitrage"],
            images: [
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop"
            ],
            basePrice: 210,
            promotion: false,
            rating: 4.7,
            reviewCount: 143,
            city: "Agadir",
            address: "23 Boulevard Hassan II",
            phone: "+212 528 889 990",
            isUrgent: true,
            availableToday: true,
            workingHours: "8h - 17h",
            description: "Spécialiste en climatisation et peinture automobile de qualité."
        },
        {
            id: 13,
            name: "Détroit Mécanique Tanger",
            specialties: ["Mécanique générale", "Carrosserie"],
            services: ["Vidange", "Carrosserie", "Pare-chocs"],
            images: [
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop"
            ],
            basePrice: 175,
            promotion: true,
            promotionDiscount: 15,
            rating: 4.4,
            reviewCount: 87,
            city: "Tanger",
            address: "199 Avenue des FAR",
            phone: "+212 539 101 112",
            isUrgent: false,
            availableToday: false,
            workingHours: "8h - 17h",
            description: "Garage de confiance pour tous vos besoins automobiles."
        },
        {
            id: 14,
            name: "Speed Auto Casa",
            specialties: ["Freinage", "Échappement"],
            services: ["Freinage", "Échappement", "Filtres"],
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop"
            ],
            basePrice: 140,
            promotion: false,
            rating: 4.3,
            reviewCount: 69,
            city: "Casablanca",
            address: "456 Rue El Jadida",
            phone: "+212 522 213 324",
            isUrgent: true,
            availableToday: true,
            workingHours: "7h - 19h",
            description: "Service rapide spécialisé en freinage et systèmes d'échappement."
        },
        {
            id: 15,
            name: "Capital Auto Rabat",
            specialties: ["Électricité auto", "Injection"],
            services: ["Électricité", "Injection", "Allumage"],
            images: [
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop"
            ],
            basePrice: 195,
            promotion: true,
            promotionDiscount: 20,
            rating: 4.8,
            reviewCount: 156,
            city: "Rabat",
            address: "78 Rue Patrice Lumumba",
            phone: "+212 537 435 546",
            isUrgent: false,
            availableToday: true,
            workingHours: "8h - 18h",
            description: "Expert en électricité automobile et systèmes d'injection."
        },
        {
            id: 16,
            name: "Palmeraie Garage Marrakech",
            specialties: ["Climatisation", "Diagnostic électronique"],
            services: ["Climatisation", "Diagnostic", "Refroidissement"],
            images: [
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop"
            ],
            basePrice: 230,
            promotion: false,
            rating: 4.7,
            reviewCount: 129,
            city: "Marrakech",
            address: "334 Route de l'Ourika",
            phone: "+212 524 757 868",
            isUrgent: false,
            availableToday: false,
            workingHours: "9h - 17h",
            description: "Service climatisation et diagnostic dans un cadre moderne."
        },
        {
            id: 17,
            name: "Médina Auto Fès",
            specialties: ["Carrosserie", "Peinture"],
            services: ["Carrosserie", "Peinture", "Redressage"],
            images: [
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop"
            ],
            basePrice: 320,
            promotion: true,
            promotionDiscount: 22,
            rating: 4.9,
            reviewCount: 187,
            city: "Fès",
            address: "112 Boulevard Mohammed V",
            phone: "+212 535 647 758",
            isUrgent: true,
            availableToday: true,
            workingHours: "8h - 16h",
            description: "Atelier de carrosserie artisanale avec finitions exceptionnelles."
        },
        {
            id: 18,
            name: "Atlantic Auto Agadir",
            specialties: ["Transmission", "Direction"],
            services: ["Transmission", "Direction", "Différentiel"],
            images: [
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop"
            ],
            basePrice: 260,
            promotion: false,
            rating: 4.6,
            reviewCount: 104,
            city: "Agadir",
            address: "89 Avenue 29 Février",
            phone: "+212 528 869 970",
            isUrgent: false,
            availableToday: true,
            workingHours: "8h - 17h",
            description: "Spécialiste en transmission et direction assistée."
        },
        {
            id: 19,
            name: "Nord Auto Tanger",
            specialties: ["Suspensions", "Amortisseurs"],
            services: ["Suspension", "Amortisseurs", "Ressorts"],
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop"
            ],
            basePrice: 185,
            promotion: true,
            promotionDiscount: 14,
            rating: 4.5,
            reviewCount: 96,
            city: "Tanger",
            address: "267 Rue de Hollande",
            phone: "+212 539 081 192",
            isUrgent: false,
            availableToday: false,
            workingHours: "8h - 17h",
            description: "Expert en systèmes de suspension et amortisseurs."
        },
        {
            id: 20,
            name: "Anfa Mécanique Casa",
            specialties: ["Mécanique générale", "Injection"],
            services: ["Vidange", "Injection", "Distribution"],
            images: [
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop"
            ],
            basePrice: 170,
            promotion: false,
            rating: 4.4,
            reviewCount: 78,
            city: "Casablanca",
            address: "445 Boulevard d'Anfa",
            phone: "+212 522 203 314",
            isUrgent: true,
            availableToday: true,
            workingHours: "8h - 18h",
            description: "Garage moderne avec expertise en injection et distribution."
        },
        {
            id: 21,
            name: "Souissi Auto Rabat",
            specialties: ["Climatisation", "Électricité auto"],
            services: ["Climatisation", "Électricité", "Batterie"],
            images: [
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop"
            ],
            basePrice: 205,
            promotion: true,
            promotionDiscount: 16,
            rating: 4.7,
            reviewCount: 134,
            city: "Rabat",
            address: "89 Avenue de Souissi",
            phone: "+212 537 425 536",
            isUrgent: false,
            availableToday: true,
            workingHours: "8h - 17h",
            description: "Service climatisation et électricité dans un quartier résidentiel."
        },
        {
            id: 22,
            name: "Gueliz Auto Marrakech",
            specialties: ["Freinage", "Carrosserie"],
            services: ["Freinage", "Carrosserie", "Jantes"],
            images: [
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop"
            ],
            basePrice: 155,
            promotion: false,
            rating: 4.3,
            reviewCount: 65,
            city: "Marrakech",
            address: "178 Avenue Mohammed V",
            phone: "+212 524 647 758",
            isUrgent: true,
            availableToday: false,
            workingHours: "8h - 17h",
            description: "Garage au cœur de Gueliz pour freinage et carrosserie."
        },
        {
            id: 23,
            name: "Atlas Auto Fès",
            specialties: ["Diagnostic électronique", "Transmission"],
            services: ["Diagnostic", "Transmission", "Embrayage"],
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop"
            ],
            basePrice: 275,
            promotion: true,
            promotionDiscount: 25,
            rating: 4.8,
            reviewCount: 198,
            city: "Fès",
            address: "234 Route d'Imouzzer",
            phone: "+212 535 859 960",
            isUrgent: false,
            availableToday: true,
            workingHours: "7h - 19h",
            description: "Technologie avancée pour diagnostic et transmission."
        },
        {
            id: 24,
            name: "Founty Garage Agadir",
            specialties: ["Peinture", "Vitrage"],
            services: ["Peinture", "Vitrage", "Polissage"],
            images: [
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop"
            ],
            basePrice: 290,
            promotion: false,
            rating: 4.6,
            reviewCount: 112,
            city: "Agadir",
            address: "67 Quartier Founty",
            phone: "+212 528 071 182",
            isUrgent: false,
            availableToday: true,
            workingHours: "8h - 16h",
            description: "Spécialiste en peinture et vitrage automobile de prestige."
        },
        {
            id: 25,
            name: "Kasbah Auto Tanger",
            specialties: ["Mécanique générale", "Échappement"],
            services: ["Vidange", "Échappement", "Catalyseur"],
            images: [
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop"
            ],
            basePrice: 145,
            promotion: true,
            promotionDiscount: 13,
            rating: 4.2,
            reviewCount: 54,
            city: "Tanger",
            address: "123 Rue de la Kasbah",
            phone: "+212 539 293 304",
            isUrgent: true,
            availableToday: false,
            workingHours: "8h - 17h",
            description: "Garage traditionnel près de la Kasbah pour mécanique générale."
        },
        {
            id: 26,
            name: "Hay Riad Auto Casa",
            specialties: ["Suspensions", "Direction"],
            services: ["Suspension", "Direction", "Géométrie"],
            images: [
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop"
            ],
            basePrice: 215,
            promotion: false,
            rating: 4.5,
            reviewCount: 89,
            city: "Casablanca",
            address: "356 Boulevard Hay Riad",
            phone: "+212 522 315 426",
            isUrgent: false,
            availableToday: true,
            workingHours: "8h - 18h",
            description: "Expert en géométrie et systèmes de direction."
        },
        {
            id: 27,
            name: "Agdal Mécanique Rabat",
            specialties: ["Injection", "Refroidissement"],
            services: ["Injection", "Refroidissement", "Radiateur"],
            images: [
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
            ],
            basePrice: 225,
            promotion: true,
            promotionDiscount: 19,
            rating: 4.7,
            reviewCount: 145,
            city: "Rabat",
            address: "198 Avenue de l'Agdal",
            phone: "+212 537 537 648",
            isUrgent: false,
            availableToday: false,
            workingHours: "8h - 17h",
            description: "Spécialiste en injection et systèmes de refroidissement."
        },
        {
            id: 28,
            name: "Hivernage Auto Marrakech",
            specialties: ["Carrosserie", "Luxe"],
            services: ["Carrosserie", "Detailing", "Restauration"],
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop"
            ],
            basePrice: 380,
            promotion: false,
            rating: 4.9,
            reviewCount: 234,
            city: "Marrakech",
            address: "45 Zone Hivernage",
            phone: "+212 524 869 970",
            isUrgent: false,
            availableToday: true,
            workingHours: "9h - 17h",
            description: "Garage haut de gamme pour véhicules de luxe et collection."
        },
        {
            id: 29,
            name: "Saiss Auto Fès",
            specialties: ["Électricité auto", "Climatisation"],
            services: ["Électricité", "Climatisation", "Alternateur"],
            images: [
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop"
            ],
            basePrice: 165,
            promotion: true,
            promotionDiscount: 17,
            rating: 4.4,
            reviewCount: 73,
            city: "Fès",
            address: "289 Avenue Saiss",
            phone: "+212 535 181 292",
            isUrgent: true,
            availableToday: true,
            workingHours: "8h - 18h",
            description: "Service électricité et climatisation près de l'aéroport."
        },
        {
            id: 30,
            name: "Inezgane Auto Agadir",
            specialties: ["Freinage", "Transmission"],
            services: ["Freinage", "Transmission", "Hydraulique"],
            images: [
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop"
            ],
            basePrice: 185,
            promotion: false,
            rating: 4.3,
            reviewCount: 67,
            city: "Agadir",
            address: "123 Zone Industrielle Inezgane",
            phone: "+212 528 393 404",
            isUrgent: false,
            availableToday: false,
            workingHours: "8h - 17h",
            description: "Garage industriel spécialisé en freinage et transmission."
        },
        {
            id: 31,
            name: "Malabata Garage Tanger",
            specialties: ["Diagnostic électronique", "Carrosserie"],
            services: ["Diagnostic", "Carrosserie", "Scanner"],
            images: [
                "https://images.unsplash.com/photo-1625047509291-5ba48720b0c2?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1580414053675-64b425fc5ccf?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop"
            ],
            basePrice: 255,
            promotion: true,
            promotionDiscount: 21,
            rating: 4.6,
            reviewCount: 126,
            city: "Tanger",
            address: "67 Route de Malabata",
            phone: "+212 539 505 616",
            isUrgent: false,
            availableToday: true,
            workingHours: "8h - 17h",
            description: "Technologie de pointe pour diagnostic et carrosserie moderne."
        },
        {
            id: 32,
            name: "Maarif Express Casa",
            specialties: ["Vidange", "Filtres"],
            services: ["Vidange", "Filtres", "Maintenance"],
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1625047509252-ec46d0ee6249?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop"
            ],
            basePrice: 120,
            promotion: false,
            rating: 4.1,
            reviewCount: 45,
            city: "Casablanca",
            address: "234 Rue Maarif",
            phone: "+212 522 617 728",
            isUrgent: true,
            availableToday: true,
            workingHours: "7h - 20h",
            description: "Service express pour vidange et maintenance préventive."
        }
    ]);

    const [filteredMecanics, setFilteredMecanics] = useState(allMecanics);
    const [currentPage, setCurrentPage] = useState(1);
    const [showSelectedMecanic, setShowSelectedMecanic] = useState(false);
    let [selectedMecanic, setSelectedMecanic] = useState(null);
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [hoveredLeftBtnId, setHoveredLeftBtnId] = useState(null);
    const [hoveredRightBtnId, setHoveredRightBtnId] = useState(null);
    const [activeImageIndexes, setActiveImageIndexes] = useState({});
    const [prevImageIndexes, setPrevImageIndexes] = useState({});
    const [slideDirections, setSlideDirections] = useState({});
    const [animatingMecanics, setAnimatingMecanics] = useState({});
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const [modalLeftBtnHovered, setModalLeftBtnHovered] = useState(false);
    const [modalRightBtnHovered, setModalRightBtnHovered] = useState(false);
    const [modalAnimating, setModalAnimating] = useState(false);
    const [modalSlideDirection, setModalSlideDirection] = useState('');
    const [modalPrevImageIndex, setModalPrevImageIndex] = useState(null);
    const mecanicsPerPage = 9;

    // Filter mechanics based on filters
    useEffect(() => {
        let filtered = allMecanics;

        if (filters) {
            // Filter by service type
            if (filters.service && filters.service !== 'Tous') {
                filtered = filtered.filter(mecanic => 
                    mecanic.services.includes(filters.service)
                );
            }

            // Filter by specialty
            if (filters.specialty && filters.specialty !== 'Toutes') {
                filtered = filtered.filter(mecanic => 
                    mecanic.specialties.includes(filters.specialty)
                );
            }

            // Filter by city
            if (filters.city && filters.city !== 'Toutes les villes') {
                filtered = filtered.filter(mecanic => 
                    mecanic.city === filters.city
                );
            }

            // Filter by price range
            if (filters.priceRange) {
                const [min, max] = filters.priceRange;
                filtered = filtered.filter(mecanic => 
                    mecanic.basePrice >= min && mecanic.basePrice <= max
                );
            }

            // Filter by availability
            if (filters.availableToday) {
                filtered = filtered.filter(mecanic => mecanic.availableToday);
            }

            if (filters.urgentOnly) {
                filtered = filtered.filter(mecanic => mecanic.isUrgent);
            }

            // Filter by promotion
            if (filters.promotion) {
                filtered = filtered.filter(mecanic => mecanic.promotion === true);
            }
        }

        setFilteredMecanics(filtered);
        setCurrentPage(1);
    }, [filters, allMecanics]);

    const getCurrentPageMecanics = () => {
        const startIndex = (currentPage - 1) * mecanicsPerPage;
        return filteredMecanics.slice(startIndex, startIndex + mecanicsPerPage)
    }

    // Calculate pagination
    const totalPages = Math.ceil(filteredMecanics.length / mecanicsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    //Lock/unlock body scroll when mechanic modal opens/closes
    useEffect(() => {
        if(showSelectedMecanic) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [showSelectedMecanic]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    return (
        <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginTop: '10px'}}>
                    {filteredMecanics.length} {filteredMecanics.length === 1 ? 'mécanicien disponible' : 'mécaniciens disponibles'}
                </h2>
            </div>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                {getCurrentPageMecanics().map(mecanic => {
                    const isHovered = hoveredCardId === mecanic.id;
                    const leftBtnIsHovered = hoveredLeftBtnId === mecanic.id;
                    const rightBtnIsHovered = hoveredRightBtnId === mecanic.id;
                    const activeImageIndex = activeImageIndexes[mecanic.id] || 0;
                    const prevImageIndex = prevImageIndexes[mecanic.id];
                    const slideDirection = slideDirections[mecanic.id];
                    const isAnimating = animatingMecanics[mecanic.id];
                    const mecanicImages = mecanic.images || [];
                    
                    const finalPrice = mecanic.promotion 
                        ? Math.round(mecanic.basePrice * (1 - mecanic.promotionDiscount / 100))
                        : mecanic.basePrice;

                    return (
                        <div
                            key={mecanic.id}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                boxShadow: isHovered 
                                    ? '0 20px 40px rgba(0,0,0,0.15)' 
                                    : '0 4px 20px rgba(0,0,0,0.08)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                            }}
                            onMouseEnter={() => setHoveredCardId(mecanic.id)}
                            onMouseLeave={() => {
                                setHoveredCardId(null);
                                setHoveredLeftBtnId(null);
                                setHoveredRightBtnId(null);
                            }}
                            onClick={() => {
                                setSelectedMecanic(mecanic);
                                setShowSelectedMecanic(true);
                                setModalImageIndex(0);
                            }}
                        >
                            <div style={{
                                position: 'relative',
                                height: '240px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%'
                                }}>
                                    {mecanicImages.map((image, index) => {
                                        let transform = '';
                                        let opacity = 0;
                                        let zIndex = 1;

                                        if (index === activeImageIndex) {
                                            opacity = 1;
                                            zIndex = 2;
                                            
                                            if (slideDirection === 'left') {
                                                transform = 'translateX(0%)';
                                            } else if (slideDirection === 'right') {
                                                transform = 'translateX(0%)';
                                            }
                                        } else if (index === prevImageIndex && slideDirection) {
                                            opacity = 0;
                                            zIndex = 1;
                                            
                                            if (slideDirection === 'left') {
                                                transform = 'translateX(-100%)';
                                            } else if (slideDirection === 'right') {
                                                transform = 'translateX(100%)';
                                            }
                                        }

                                        return (
                                            <img
                                                key={`${mecanic.id}-${index}`}
                                                src={image}
                                                alt={`${mecanic.name} - Image ${index + 1}`}
                                                onError={(e) => { e.currentTarget.src = alternativeImage; }}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s ease-in-out',
                                                    transform,
                                                    opacity,
                                                    zIndex,
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                                {mecanic.promotion && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '-3px',
                                        background: '#F5C906',
                                        zIndex: 3,
                                        color: 'white',
                                        padding: '4px 8px 4px 15px',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        PROMO
                                    </div>
                                )}
                                {/* Fade-in navigation buttons on card hover */}
                                {isHovered && mecanicImages.length > 1 && (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        position: 'absolute',
                                        width: '100%',
                                        top: '50%',
                                        left: '0',
                                        transform: 'translateY(-50%)',
                                        opacity: isHovered ? 1 : 0,
                                        transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1)',
                                        pointerEvents: 'auto',
                                        zIndex: 3,
                                    }}>
                                        <button
                                            disabled={isAnimating}
                                            style={{
                                                background: leftBtnIsHovered ? '#ffe736ff' : 'white',
                                                borderRadius: '50%',
                                                width: '30px',
                                                height: '30px',
                                                border: 'none',
                                                color: leftBtnIsHovered ? '#ffffffff' : '#374151',
                                                marginLeft: 16,
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'background 0.3s, color 0.3s'
                                            }}
                                            onMouseEnter={() => !isAnimating && setHoveredLeftBtnId(mecanic.id)}
                                            onMouseLeave={() => setHoveredLeftBtnId(null)}
                                            onClick={(e) => {
                                                if (isAnimating) return;
                                                e.stopPropagation();
                                                
                                                // Set animating state
                                                setAnimatingMecanics(prev => ({ ...prev, [mecanic.id]: true }));
                                                
                                                // Set direction and previous image index
                                                setSlideDirections(prev => ({ ...prev, [mecanic.id]: 'left' }));
                                                setPrevImageIndexes(prev => ({ ...prev, [mecanic.id]: activeImageIndex }));
                                                
                                                // Change to previous image immediately
                                                setActiveImageIndexes(prev => {
                                                    const total = mecanicImages.length;
                                                    const current = activeImageIndex;
                                                    return {
                                                        ...prev,
                                                        [mecanic.id]: (current - 1 + total) % total
                                                    };
                                                });
                                                
                                                // Clear animation state after animation
                                                setTimeout(() => {
                                                    setSlideDirections(prev => ({ ...prev, [mecanic.id]: '' }));
                                                    setPrevImageIndexes(prev => ({ ...prev, [mecanic.id]: null }));
                                                    setAnimatingMecanics(prev => ({ ...prev, [mecanic.id]: false }));
                                                }, 1000);
                                            }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.5 3.5L6 8L10.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button 
                                            disabled={isAnimating}
                                            style={{
                                                background: rightBtnIsHovered ? '#ffe736ff' : 'white',
                                                borderRadius: '50%',
                                                width: '30px',
                                                height: '30px',
                                                border: 'none',
                                                color: rightBtnIsHovered ? '#ffffffff' : '#374151',
                                                marginRight: 16,
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'background 0.3s, color 0.3s'
                                            }}
                                            onMouseEnter={() => !isAnimating && setHoveredRightBtnId(mecanic.id)}
                                            onMouseLeave={() => setHoveredRightBtnId(null)}
                                            onClick={(e) => {
                                                if (isAnimating) return;
                                                e.stopPropagation();
                                                
                                                // Set animating state
                                                setAnimatingMecanics(prev => ({ ...prev, [mecanic.id]: true }));
                                                
                                                // Set direction and previous image index
                                                setSlideDirections(prev => ({ ...prev, [mecanic.id]: 'right' }));
                                                setPrevImageIndexes(prev => ({ ...prev, [mecanic.id]: activeImageIndex }));
                                                
                                                // Change to next image immediately
                                                setActiveImageIndexes(prev => {
                                                    const total = mecanicImages.length;
                                                    const current = activeImageIndex;
                                                    return {
                                                        ...prev,
                                                        [mecanic.id]: (current + 1) % total
                                                    };
                                                });
                                                
                                                // Clear animation state after animation
                                                setTimeout(() => {
                                                    setSlideDirections(prev => ({ ...prev, [mecanic.id]: '' }));
                                                    setPrevImageIndexes(prev => ({ ...prev, [mecanic.id]: null }));
                                                    setAnimatingMecanics(prev => ({ ...prev, [mecanic.id]: false }));
                                                }, 1000);
                                            }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.5 12.5L10 8L5.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <h3 style={{
                                        fontSize: '1.2rem',
                                        fontWeight: '600',
                                        color: '#1f2937',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {mecanic.name}
                                    </h3>
                                    <p>
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 20 20"
                                            fill="#f97316"
                                            style={{ verticalAlign: 'middle', marginBottom: '5px' }}
                                        >
                                            <path
                                                d="M10 2C6.686 2 4 4.686 4 8c0 4.418 5.25 9.25 5.477 9.464a1 1 0 0 0 1.046 0C10.75 17.25 16 12.418 16 8c0-3.314-2.686-6-6-6zm0 13.293C8.14 13.01 6 10.36 6 8a4 4 0 1 1 8 0c0 2.36-2.14 5.01-4 7.293z"
                                                fill="#f97316"
                                            />
                                            <circle cx="10" cy="8" r="2" fill="#f97316" />
                                        </svg>
                                        {translateCity(mecanic.city)}
                                    </p>
                                </div>
                                
                                <div style={{
                                    color: '#6b7280',
                                    fontSize: '0.9rem',
                                    marginBottom: '1rem'
                                }}>
                                    {mecanic.specialties.slice(0, 2).join(" • ")}
                                </div>
                                
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            color: '#f97316'
                                        }}>
                                            {finalPrice}<p style={{ color: '#f97316' }}>DH</p>
                                        </div>
                                        {mecanic.promotion && (
                                            <div style={{
                                                color: '#6b7280',
                                                fontSize: '0.9rem',
                                                textDecoration: 'line-through'
                                            }}>
                                                {mecanic.basePrice}DH
                                            </div>
                                        )}
                                    </div>
                                    
                                    <button 
                                        style={{
                                            background: '#f97316',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px 20px',
                                            borderRadius: '6px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'background 0.3s'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.background = '#e85d04';
                                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.background = '#f97316';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedMecanic(mecanic);
                                            setShowSelectedMecanic(true);
                                            setModalImageIndex(0);
                                        }}
                                    >
                                        Réserver
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            
            {/* Show message if no mechanics found */}
            {filteredMecanics.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#6b7280'
                }}>
                    <div style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '0.5rem'
                    }}>
                        Aucun mécanicien trouvé
                    </div>
                    <div>
                        Essayez de modifier vos critères de recherche
                    </div>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="border-top-light mt-30 pt-30">
                    <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
                        <div className="col-auto md:order-1">
                            <button 
                                className="button -dark-1 size-40 rounded-full border-light"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage <= 1}
                            >
                                {(lang === "ar") ? <i className="icon-chevron-right text-12" /> : <i className="icon-chevron-left text-12" />}
                            </button>
                        </div>

                        <div className="col-md-auto md:order-3">
                            <div className="row x-gap-20 y-gap-20 items-center md:d-none">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const pageNumber = Math.max(1, currentPage - 2) + i;
                                    if (pageNumber > totalPages) return null;
                                    
                                    return (
                                        <div key={pageNumber} className="col-auto">
                                            <button
                                                className="size-40 flex-center rounded-full cursor-pointer"
                                                style={pageNumber === currentPage ? 
                                                    { backgroundColor: '#f97316', color: 'white' } : 
                                                    {}
                                                }
                                                onClick={() => handlePageChange(pageNumber)}
                                            >
                                                {pageNumber}
                                            </button>
                                        </div>
                                    );
                                })}
                                
                                {currentPage < totalPages - 2 && (
                                    <>
                                        <div className="col-auto">
                                            <div className="size-40 flex-center rounded-full">...</div>
                                        </div>
                                        <div className="col-auto">
                                            <button
                                                className="size-40 flex-center rounded-full cursor-pointer"
                                                onClick={() => handlePageChange(totalPages)}
                                            >
                                                {totalPages}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="col-auto md:order-2">
                            <button 
                                className="button -dark-1 size-40 rounded-full border-light"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                            >
                                {(lang === "ar") ? <i className="icon-chevron-left text-12" /> : <i className="icon-chevron-right text-12" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mechanic Details Modal */}
            {showSelectedMecanic && selectedMecanic && (
                <div 
                    style={{ 
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)', 
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => setShowSelectedMecanic(false)}
                >
                    <div 
                        style={{ 
                            width: '90%',
                            maxWidth: '900px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            zIndex: 10000 
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1.5rem',
                                borderBottom: '1px solid #e5e7eb'
                            }}>
                                <h5 style={{
                                    margin: 0,
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    color: '#1f2937'
                                }}>
                                    {selectedMecanic.name}
                                </h5>
                                <button 
                                    type="button"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        fontSize: '1.5rem',
                                        cursor: 'pointer',
                                        color: '#6b7280',
                                        padding: '0.25rem',
                                        borderRadius: '4px',
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => setShowSelectedMecanic(false)}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    ×
                                </button>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: window.innerWidth >= 768 ? 'row' : 'column',
                                    gap: '1.5rem'
                                }}>
                                    <div style={{
                                        flex: '1',
                                        minWidth: '300px'
                                    }}>
                                        <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                                            <img 
                                                src={selectedMecanic.images[modalImageIndex]} 
                                                alt={selectedMecanic.name}
                                                style={{ 
                                                    width: '100%',
                                                    height: '300px', 
                                                    objectFit: 'cover' 
                                                }}
                                                onError={(e) => { e.currentTarget.src = alternativeImage; }}
                                            />
                                            
                                            {/* Promo Badge */}
                                            {selectedMecanic.promotion && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    left: '12px',
                                                    background: '#F5C906',
                                                    color: 'white',
                                                    padding: '4px 12px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600',
                                                    zIndex: 2
                                                }}>
                                                    PROMO
                                                </div>
                                            )}
                                            
                                            {/* City Badge */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '12px',
                                                left: '12px',
                                                background: 'rgba(0,0,0,0.7)',
                                                color: 'white',
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                zIndex: 2
                                            }}>
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        d="M10 2C6.686 2 4 4.686 4 8c0 4.418 5.25 9.25 5.477 9.464a1 1 0 0 0 1.046 0C10.75 17.25 16 12.418 16 8c0-3.314-2.686-6-6-6zm0 13.293C8.14 13.01 6 10.36 6 8a4 4 0 1 1 8 0c0 2.36-2.14 5.01-4 7.293z"
                                                    />
                                                    <circle cx="10" cy="8" r="2" />
                                                </svg>
                                                {translateCity(selectedMecanic.city)}
                                            </div>
                                            
                                            {/* Navigation Arrows */}
                                            {selectedMecanic.images.length > 1 && (
                                                <>
                                                    <button
                                                        style={{
                                                            position: 'absolute',
                                                            left: '12px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            background: modalLeftBtnHovered ? '#f9e216ff' : 'rgba(255,255,255,0.9)',
                                                            borderRadius: '50%',
                                                            width: '40px',
                                                            height: '40px',
                                                            border: 'none',
                                                            color: modalLeftBtnHovered ? 'white' : '#374151',
                                                            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            transition: 'all 0.3s',
                                                            zIndex: 3
                                                        }}
                                                        onMouseEnter={() => setModalLeftBtnHovered(true)}
                                                        onMouseLeave={() => setModalLeftBtnHovered(false)}
                                                        onClick={() => {
                                                            const newIndex = modalImageIndex === 0 
                                                                ? selectedMecanic.images.length - 1 
                                                                : modalImageIndex - 1;
                                                            setModalImageIndex(newIndex);
                                                        }}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.5 3.5L6 8L10.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </button>
                                                    
                                                    <button
                                                        style={{
                                                            position: 'absolute',
                                                            right: '12px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            background: modalRightBtnHovered ? '#f9e216ff' : 'rgba(255,255,255,0.9)',
                                                            borderRadius: '50%',
                                                            width: '40px',
                                                            height: '40px',
                                                            border: 'none',
                                                            color: modalRightBtnHovered ? 'white' : '#374151',
                                                            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            transition: 'all 0.3s',
                                                            zIndex: 3
                                                        }}
                                                        onMouseEnter={() => setModalRightBtnHovered(true)}
                                                        onMouseLeave={() => setModalRightBtnHovered(false)}
                                                        onClick={() => {
                                                            const newIndex = (modalImageIndex + 1) % selectedMecanic.images.length;
                                                            setModalImageIndex(newIndex);
                                                        }}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.5 12.5L10 8L5.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                        
                                        {/* Image Indicators */}
                                        {selectedMecanic.images.length > 1 && (
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginTop: '1rem'
                                            }}>
                                                {selectedMecanic.images.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        style={{
                                                            width: '8px',
                                                            height: '8px',
                                                            borderRadius: '50%',
                                                            border: 'none',
                                                            margin: '0 4px',
                                                            background: index === modalImageIndex ? '#f97316' : '#d1d5db',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s'
                                                        }}
                                                        onClick={() => setModalImageIndex(index)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{
                                        flex: '1',
                                        minWidth: '300px'
                                    }}>
                                        <div style={{ padding: '0 15px' }}>
                                            {/* Title with price */}
                                            <div style={{ marginBottom: '16px' }}>
                                                <h4 style={{ 
                                                    fontSize: '1.5rem', 
                                                    fontWeight: '700', 
                                                    marginBottom: '4px',
                                                    color: '#1f2937'
                                                }}>
                                                    {selectedMecanic.name}
                                                </h4>
                                                <div style={{ 
                                                    fontSize: '1.25rem', 
                                                    fontWeight: '600',
                                                    color: '#f97316',
                                                    marginBottom: '8px'
                                                }}>
                                                    Prix: {selectedMecanic.promotion 
                                                        ? Math.round(selectedMecanic.basePrice * (1 - selectedMecanic.promotionDiscount / 100))
                                                        : selectedMecanic.basePrice
                                                    } dh
                                                    {selectedMecanic.promotion && (
                                                        <span style={{
                                                            fontSize: '1rem',
                                                            color: '#6b7280',
                                                            textDecoration: 'line-through',
                                                            marginLeft: '8px'
                                                        }}>
                                                            {selectedMecanic.basePrice} dh
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Details */}
                                            <div style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '0' }}>
                                                <div style={{ marginBottom: '8px' }}>
                                                    {selectedMecanic.basePrice}dh/jour
                                                </div>
                                            </div>
                                            
                                            {/* Service Details */}
                                            <div style={{ marginTop: '20px' }}>
                                                <div style={{ marginBottom: '12px' }}>
                                                    <strong style={{ color: '#1f2937' }}>Spécialités:</strong>
                                                    <div style={{ color: '#6b7280', marginTop: '4px' }}>
                                                        {selectedMecanic.specialties.join(", ")}
                                                    </div>
                                                </div>
                                                
                                                <div style={{ marginBottom: '12px' }}>
                                                    <strong style={{ color: '#1f2937' }}>Services:</strong>
                                                    <div style={{ color: '#6b7280', marginTop: '4px' }}>
                                                        {selectedMecanic.services.join(", ")}
                                                    </div>
                                                </div>
                                                
                                                <div style={{ marginBottom: '12px' }}>
                                                    <strong style={{ color: '#1f2937' }}>Adresse:</strong>
                                                    <div style={{ color: '#6b7280', marginTop: '4px' }}>
                                                        {selectedMecanic.address}, {selectedMecanic.city}
                                                    </div>
                                                </div>
                                                
                                                <div style={{ marginBottom: '12px' }}>
                                                    <strong style={{ color: '#1f2937' }}>Téléphone:</strong>
                                                    <div style={{ color: '#6b7280', marginTop: '4px' }}>
                                                        {selectedMecanic.phone}
                                                    </div>
                                                </div>
                                                
                                                {/* <div style={{ marginBottom: '12px' }}>
                                                    <strong style={{ color: '#1f2937' }}>Horaires:</strong>
                                                    <div style={{ color: '#6b7280', marginTop: '4px' }}>
                                                        {selectedMecanic.workingHours}
                                                    </div>
                                                </div> */}
                                                
                                                <div style={{ marginBottom: '16px' }}>
                                                    <strong style={{ color: '#1f2937' }}>Description:</strong>
                                                    <div style={{ color: '#6b7280', marginTop: '4px' }}>
                                                        {selectedMecanic.description}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Action Button */}
                                            <button 
                                                style={{
                                                    backgroundColor: '#4b5563',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    padding: '12px 24px',
                                                    width: '100%',
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    transition: 'background-color 0.3s'
                                                }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f27425ff'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = '#4b5563'}
                                            >
                                                Plus de détails
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M5.5 12.5L10 8L5.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MecanicGrid;
