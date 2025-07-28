import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import alternativeImage from "/img/alternativePicture/default_image.png";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

export default function CarGrid({ filters = {} }) {
    const { lang } = useContext(LanguageContext);

    // Add translation function for car specs
    const translateCarSpec = (spec) => {
        const specMap = {
            'Essence': t[lang].carSpecs.essence,
            'Diesel': t[lang].carSpecs.diesel,
            'Électrique': t[lang].carSpecs.electric,
            'Hybride': t[lang].carSpecs.hybrid,
            'Manuelle': t[lang].carSpecs.manual,
            'Automatique': t[lang].carSpecs.automatic
        };
        return specMap[spec] || spec;
    };

    // Add translation function for cities
    const translateCity = (cityKey) => {
        const cityMap = {
            'Casablanca': t[lang].cities.casablanca,
            'Rabat': t[lang].cities.rabat,
            'Marrakech': t[lang].cities.marrakech,
            'Agadir': t[lang].cities.agadir,
            'Fès': t[lang].cities.fes,
            'Tanger': t[lang].cities.tanger
        };
        return cityMap[cityKey] || cityKey;
    };

    // Mock car data with daily pricing and proper image links
    const [allCars] = useState([
        {
            id: 1,
            brand: "Audi",
            model: "A3",
            images: [
                "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 450,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique",
            city: "Casablanca"
        },
        {
            id: 2,
            brand: "BMW",
            model: "X3",
            images: [
                "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=300&h=200&fit=crop"
            ],
            basePrice: 650,
            promotion: true,
            year: 2022,
            fuel: "Diesel",
            transmission: "Automatique",
            city: "Rabat"
        },
        {
            id: 3,
            brand: "Mercedes",
            model: "C-Class",
            images: [
                "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 550,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Manuelle",
            city: "Marrakech"
        },
        {
            id: 4,
            brand: "Volkswagen",
            model: "Golf",
            images: [
                "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=300&h=200&fit=crop"
            ],
            basePrice: 350,
            promotion: true,
            year: 2021,
            fuel: "Essence",
            transmission: "Automatique",
            city: "Agadir"
        },
        {
            id: 5,
            brand: "Peugeot",
            model: "308",
            images: [
                "https://images.unsplash.com/photo-1549924231-f129b911e442?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 400,
            promotion: false,
            year: 2023,
            fuel: "Diesel",
            transmission: "Manuelle",
            city: "Fès"
        },
        {
            id: 6,
            brand: "Fiat",
            model: "500",
            images: [
                "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 250,
            promotion: false,
            year: 2022,
            fuel: "Essence",
            transmission: "Manuelle",
            city: "Tanger"
        },
        {
            id: 7,
            brand: "BMW",
            model: "Series 3",
            images: [
                "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=300&h=200&fit=crop"
            ],
            basePrice: 750,
            promotion: true,
            year: 2023,
            fuel: "Diesel",
            transmission: "Automatique",
            city: "Casablanca"
        },
        {
            id: 8,
            brand: "Audi",
            model: "A4",
            images: [
                "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 600,
            promotion: false,
            year: 2022,
            fuel: "Essence",
            transmission: "Automatique",
            city: "Rabat"
        },
        {
            id: 9,
            brand: "Renault",
            model: "Clio",
            images: [
                "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 300,
            promotion: true,
            year: 2023,
            fuel: "Essence",
            transmission: "Manuelle",
            city: "Marrakech"
        },
        {
            id: 10,
            brand: "Toyota",
            model: "Corolla",
            images: [
                "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 380,
            promotion: false,
            year: 2022,
            fuel: "Hybride",
            transmission: "Automatique",
            city: "Agadir"
        },
        {
            id: 11,
            brand: "Opel",
            model: "Astra",
            images: [
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 420,
            promotion: true,
            year: 2021,
            fuel: "Diesel",
            transmission: "Manuelle",
            city: "Fès"
        },
        {
            id: 12,
            brand: "Ford",
            model: "Focus",
            images: [
                "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 480,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique",
            city: "Tanger"
        },
        {
            id: 13,
            brand: "Nissan",
            model: "Micra",
            images: [
                "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 280,
            promotion: true,
            year: 2022,
            fuel: "Essence",
            transmission: "Manuelle",
            city: "Casablanca"
        },
        {
            id: 14,
            brand: "Hyundai",
            model: "i30",
            images: [
                "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 360,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique",
            city: "Rabat"
        },
        {
            id: 15,
            brand: "Kia",
            model: "Rio",
            images: [
                "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 320,
            promotion: true,
            year: 2022,
            fuel: "Essence",
            transmission: "Manuelle",
            city: "Marrakech"
        },
        {
            id: 16,
            brand: "Seat",
            model: "Leon",
            images: [
                "https://images.unsplash.com/photo-1606016159854-8070a8de3ff7?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 410,
            promotion: false,
            year: 2023,
            fuel: "Diesel",
            transmission: "Automatique",
            city: "Agadir"
        },
        {
            id: 17,
            brand: "Skoda",
            model: "Octavia",
            images: [
                "https://images.unsplash.com/photo-1549399772-f46aa5edf251?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 440,
            promotion: true,
            year: 2022,
            fuel: "Diesel",
            transmission: "Manuelle",
            city: "Fès"
        },
        {
            id: 18,
            brand: "Citroen",
            model: "C3",
            images: [
                "https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 330,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique",
            city: "Tanger"
        },
        {
            id: 19,
            brand: "Mazda",
            model: "CX-5",
            images: [
                "https://images.unsplash.com/photo-1606914469633-e70b07c89e8d?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 580,
            promotion: true,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique",
            city: "Casablanca"
        },
        {
            id: 20,
            brand: "Honda",
            model: "Civic",
            images: [
                "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 460,
            promotion: false,
            year: 2022,
            fuel: "Hybride",
            transmission: "Automatique",
            city: "Rabat"
        },
        {
            id: 21,
            brand: "Subaru",
            model: "Impreza",
            images: [
                "https://images.unsplash.com/photo-1552519456-076085e36ae0?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 520,
            promotion: true,
            year: 2023,
            fuel: "Essence",
            transmission: "Manuelle",
            city: "Marrakech"
        },
        {
            id: 22,
            brand: "Mini",
            model: "Cooper",
            images: [
                "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 490,
            promotion: false,
            year: 2022,
            fuel: "Essence",
            transmission: "Automatique",
            city: "Agadir"
        },
        {
            id: 23,
            brand: "Volvo",
            model: "V40",
            images: [
                "https://images.unsplash.com/photo-1606859937578-7e7aa89fcb20?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 560,
            promotion: true,
            year: 2021,
            fuel: "Diesel",
            transmission: "Automatique",
            city: "Fès"
        },
        {
            id: 24,
            brand: "Alfa Romeo",
            model: "Giulietta",
            images: [
                "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 510,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Manuelle",
            city: "Tanger"
        },
        {
            id: 25,
            brand: "Dacia",
            model: "Sandero",
            images: [
                "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 220,
            promotion: true,
            year: 2022,
            fuel: "Essence",
            transmission: "Manuelle",
            city: "Casablanca"
        },
        {
            id: 26,
            brand: "Tesla",
            model: "Model 3",
            images: [
                "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 850,
            promotion: false,
            year: 2023,
            fuel: "Électrique",
            transmission: "Automatique",
            city: "Rabat"
        },
        {
            id: 27,
            brand: "Lexus",
            model: "IS",
            images: [
                "https://images.unsplash.com/photo-1606016159854-8070a8de3ff7?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 780,
            promotion: true,
            year: 2022,
            fuel: "Hybride",
            transmission: "Automatique",
            city: "Marrakech"
        },
        {
            id: 28,
            brand: "Jaguar",
            model: "XE",
            images: [
                "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
            ],
            basePrice: 820,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique",
            city: "Agadir"
        }
    ]);

    const [filteredCars, setFilteredCars] = useState(allCars);
    const [currentPage, setCurrentPage] = useState(1);
    const [showRentedCar, setShowRentedCar] = useState(false);
    let [rentedCar, setRentedCar] = useState(null);
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [hoveredLeftBtnId, setHoveredLeftBtnId] = useState(null);
    const [hoveredRightBtnId, setHoveredRightBtnId] = useState(null);
    const [activeImageIndexes, setActiveImageIndexes] = useState({});
    const [prevImageIndexes, setPrevImageIndexes] = useState({});
    const [nextImageIndexes, setNextImageIndexes] = useState({});
    const [slideDirections, setSlideDirections] = useState({});
    const [animatingCars, setAnimatingCars] = useState({});
    const [rentHovered, setRentHovered] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const [modalLeftBtnHovered, setModalLeftBtnHovered] = useState(false);
    const [modalRightBtnHovered, setModalRightBtnHovered] = useState(false);
    const [modalAnimating, setModalAnimating] = useState(false);
    const [modalSlideDirection, setModalSlideDirection] = useState('');
    const [modalPrevImageIndex, setModalPrevImageIndex] = useState(null);
    const carsPerPage = 12;

    // Calculate daily price based on date and car
    const calculateDailyPrice = (car, startDate, endDate) => {
        if (!startDate || !endDate) return car.basePrice;
        
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const weekendMultiplier = 1.2;
        const promotionDiscount = car.promotion ? 0.9 : 1;
        
        let totalPrice = 0;
        let currentDate = new Date(startDate);
        
        for (let i = 0; i < days; i++) {
            let dayPrice = car.basePrice;
            
            if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
                dayPrice *= weekendMultiplier;
            }
            
            totalPrice += dayPrice;
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return Math.round(totalPrice * promotionDiscount);
    };

    // Filter cars based on applied filters
    useEffect(() => {
        let filtered = allCars;

        if (filters.brand) {
            filtered = filtered.filter(car => 
                car.brand.toLowerCase().includes(filters.brand.toLowerCase())
            );
        }

        if (filters.model) {
            filtered = filtered.filter(car => 
                car.model.toLowerCase().includes(filters.model.toLowerCase())
            );
        }


        if (filters.city) {
            filtered = filtered.filter(car =>
                car.city && car.city.toLowerCase().includes(filters.city.toLowerCase())
            );
        }

        if (filters.depart) {
            filtered = filtered.filter(car =>
                car.city && car.city.toLowerCase().includes(filters.depart.toLowerCase())
            );
        }

        if (filters.promotion) {
            filtered = filtered.filter(car => car.promotion === true);
        }

        setFilteredCars(filtered);
    }, [filters, allCars]);

    const getDaysCount = () => {
        if (!filters.startDate || !filters.endDate) return 1;
        return Math.ceil((filters.endDate - filters.startDate) / (1000 * 60 * 60 * 24));
    };

    const getCurrentPageCars = () => {
        const startIndex = (currentPage - 1) * carsPerPage;
        const endIndex = startIndex + carsPerPage;
        return filteredCars.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    //Lock/unlock body scroll when rented car opens/closes
    useEffect(() => {
        if(showRentedCar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [showRentedCar]);

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
                    {filteredCars.length} {t[lang].rentals.carsAvailable}
                </h2>
                {filters.startDate && filters.endDate && (
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', marginRight: '100px', marginTop: '10px' }}>
                        {t[lang].rentals.forDays.replace('{count}', getDaysCount())}
                    </div>
                )}
            </div>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                maxWidth: '980px',
                gap: '1.5rem',
                marginTop: '-17px',
                marginBottom: '3rem',
            }}>
                {getCurrentPageCars().map((car) => {
                    const totalPrice = calculateDailyPrice(car, filters.startDate, filters.endDate);
                    const dailyPrice = filters.startDate && filters.endDate ? 
                        Math.round(totalPrice / getDaysCount()) : car.basePrice;
                    const isHovered = hoveredCardId === car.id;
                    const leftBtnIsHovered = hoveredLeftBtnId === car.id;
                    const rightBtnIsHovered = hoveredRightBtnId === car.id;
                    const activeImageIndex = activeImageIndexes[car.id] || 0;
                    const prevImageIndex = typeof prevImageIndexes[car.id] !== 'undefined' ? prevImageIndexes[car.id] : null;
                    const nextImageIndex = typeof nextImageIndexes[car.id] !== 'undefined' ? nextImageIndexes[car.id] : null;
                    const slideDirection = slideDirections[car.id] || '';
                    const isAnimating = animatingCars[car.id] || false;

                    // Ensure each car has at least 3 images by duplicating if needed
                    const carImages = [...car.images];
                    while (carImages.length < 3) {
                        carImages.push(...car.images);
                    }
                    carImages.splice(3); // Keep only first 3 images

                    return (
                        <div 
                            key={car.id} 
                            style={{
                                background: 'white',
                                borderRadius: '12px',
                                boxShadow: isHovered ? '0 2px 15px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                                transition: 'box-shadow 0.2s'
                            }}
                            onMouseEnter={() => setHoveredCardId(car.id)}
                            onMouseLeave={() => setHoveredCardId(null)}
                        >
                            <div 
                                style={{ position: 'relative', height: '200px', overflow: 'hidden' }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    {carImages.map((img, idx) => {
                                        // Animation logic for proper sliding effect
                                        let transform = 'translateX(100%)';
                                        let opacity = 0;
                                        let zIndex = 0;
                                        
                                        if (idx === activeImageIndex) {
                                            // The currently active/visible image
                                            transform = 'translateX(0) scale(' + (isHovered ? '1.05' : '1') + ')';
                                            opacity = 1;
                                            zIndex = 2;
                                        } else if (prevImageIndex !== null && idx === prevImageIndex) {
                                            // The outgoing image during animation
                                            if (slideDirection === 'left') {
                                                // LEFT button: old image should slide out to the RIGHT
                                                transform = 'translateX(100%) scale(1)';
                                            } else if (slideDirection === 'right') {
                                                // RIGHT button: old image should slide out to the LEFT
                                                transform = 'translateX(-100%) scale(1)';
                                            }
                                            opacity = 1;
                                            zIndex = 1;
                                        
                                        } else {
                                            // Hidden images positioning for incoming animation
                                            if (slideDirection === 'left') {
                                                // LEFT button: new image comes from the LEFT
                                                transform = 'translateX(-100%) scale(1)';
                                            } else if (slideDirection === 'right') {
                                                // RIGHT button: new image comes from the RIGHT
                                                transform = 'translateX(100%) scale(1)';
                                            } else {
                                                // Default: hide on the right
                                                transform = leftBtnIsHovered ? 'translateX(-100%) scale(1)' : 'translateX(100%) scale(1)';
                                            }
                                            opacity = 0;
                                            zIndex = 0;
                                        }
                                        
                                        return (
                                            <img
                                                key={img}
                                                src={img}
                                                alt={`${car.brand} ${car.model}`}
                                                onError={(e) => {
                                                    e.currentTarget.src = alternativeImage;
                                                }}
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
                                {car.promotion && (
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
                                        {t[lang].sideBar.promo.cartitle}
                                    </div>
                                )}
                                {/* Fade-in navigation buttons on card hover */}
                                {isHovered && (
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
                                        { (lang === 'ar') ? (
                                            <>
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
                                                        transition: 'background 0.5s, color 0.3s'
                                                    }}
                                                    onMouseEnter={() => !isAnimating && setHoveredRightBtnId(car.id)}
                                                    onMouseLeave={() => setHoveredRightBtnId(null)}
                                                    onClick={(e) => {
                                                        if (isAnimating) return;
                                                        e.stopPropagation();
                                                        
                                                        // Set animating state
                                                        setAnimatingCars(prev => ({ ...prev, [car.id]: true }));
                                                        
                                                        // Set direction and previous image index
                                                        setSlideDirections(prev => ({ ...prev, [car.id]: 'right' }));
                                                        setPrevImageIndexes(prev => ({ ...prev, [car.id]: activeImageIndex }));
                                                        
                                                        // Change to next image immediately
                                                        setActiveImageIndexes(prev => {
                                                            const total = carImages.length;
                                                            const current = activeImageIndex;
                                                            return {
                                                                ...prev,
                                                                [car.id]: (current + 1) % total
                                                            };
                                                        });
                                                        
                                                        // Clear animation state after animation
                                                        setTimeout(() => {
                                                            setSlideDirections(prev => ({ ...prev, [car.id]: '' }));
                                                            setPrevImageIndexes(prev => ({ ...prev, [car.id]: null }));
                                                            setAnimatingCars(prev => ({ ...prev, [car.id]: false }));
                                                        }, 1000);
                                                    }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.5 12.5L10 8L5.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
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
                                                    onMouseEnter={() => !isAnimating && setHoveredLeftBtnId(car.id)}
                                                    onMouseLeave={() => setHoveredLeftBtnId(null)}
                                                    onClick={(e) => {
                                                        if (isAnimating) return;
                                                        e.stopPropagation();
                                                        
                                                        // Set animating state
                                                        setAnimatingCars(prev => ({ ...prev, [car.id]: true }));
                                                        
                                                        // Set direction and previous image index
                                                        setSlideDirections(prev => ({ ...prev, [car.id]: 'left' }));
                                                        setPrevImageIndexes(prev => ({ ...prev, [car.id]: activeImageIndex }));
                                                        
                                                        // Change to previous image immediately
                                                        setActiveImageIndexes(prev => {
                                                            const total = carImages.length;
                                                            const current = activeImageIndex;
                                                            return {
                                                                ...prev,
                                                                [car.id]: (current - 1 + total) % total
                                                            };
                                                        });
                                                        
                                                        // Clear animation state after animation
                                                        setTimeout(() => {
                                                            setSlideDirections(prev => ({ ...prev, [car.id]: '' }));
                                                            setPrevImageIndexes(prev => ({ ...prev, [car.id]: null }));
                                                            setAnimatingCars(prev => ({ ...prev, [car.id]: false }));
                                                        }, 1000);
                                                    }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.5 3.5L6 8L10.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </>
                                        ): (
                                            <>
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
                                                    onMouseEnter={() => !isAnimating && setHoveredLeftBtnId(car.id)}
                                                    onMouseLeave={() => setHoveredLeftBtnId(null)}
                                                    onClick={(e) => {
                                                        if (isAnimating) return;
                                                        e.stopPropagation();
                                                        
                                                        // Set animating state
                                                        setAnimatingCars(prev => ({ ...prev, [car.id]: true }));
                                                        
                                                        // Set direction and previous image index
                                                        setSlideDirections(prev => ({ ...prev, [car.id]: 'left' }));
                                                        setPrevImageIndexes(prev => ({ ...prev, [car.id]: activeImageIndex }));
                                                        
                                                        // Change to previous image immediately
                                                        setActiveImageIndexes(prev => {
                                                            const total = carImages.length;
                                                            const current = activeImageIndex;
                                                            return {
                                                                ...prev,
                                                                [car.id]: (current - 1 + total) % total
                                                            };
                                                        });
                                                        
                                                        // Clear animation state after animation
                                                        setTimeout(() => {
                                                            setSlideDirections(prev => ({ ...prev, [car.id]: '' }));
                                                            setPrevImageIndexes(prev => ({ ...prev, [car.id]: null }));
                                                            setAnimatingCars(prev => ({ ...prev, [car.id]: false }));
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
                                                        transition: 'background 0.5s, color 0.3s'
                                                    }}
                                                    onMouseEnter={() => !isAnimating && setHoveredRightBtnId(car.id)}
                                                    onMouseLeave={() => setHoveredRightBtnId(null)}
                                                    onClick={(e) => {
                                                        if (isAnimating) return;
                                                        e.stopPropagation();
                                                        
                                                        // Set animating state
                                                        setAnimatingCars(prev => ({ ...prev, [car.id]: true }));
                                                        
                                                        // Set direction and previous image index
                                                        setSlideDirections(prev => ({ ...prev, [car.id]: 'right' }));
                                                        setPrevImageIndexes(prev => ({ ...prev, [car.id]: activeImageIndex }));
                                                        
                                                        // Change to next image immediately
                                                        setActiveImageIndexes(prev => {
                                                            const total = carImages.length;
                                                            const current = activeImageIndex;
                                                            return {
                                                                ...prev,
                                                                [car.id]: (current + 1) % total
                                                            };
                                                        });
                                                        
                                                        // Clear animation state after animation
                                                        setTimeout(() => {
                                                            setSlideDirections(prev => ({ ...prev, [car.id]: '' }));
                                                            setPrevImageIndexes(prev => ({ ...prev, [car.id]: null }));
                                                            setAnimatingCars(prev => ({ ...prev, [car.id]: false }));
                                                        }, 1000);
                                                    }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.5 12.5L10 8L5.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </>
                                        )}
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
                                        {car.brand} {car.model}
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
                                        {translateCity(car.city)}
                                    </p>
                                </div>
                                
                                <div style={{
                                    color: '#6b7280',
                                    fontSize: '0.9rem',
                                    marginBottom: '1rem'
                                }}>
                                    {car.year} • {translateCarSpec(car.fuel)} • {translateCarSpec(car.transmission)}
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
                                            {totalPrice}<p style={{ color: '#f97316',  }}>{t[lang].rentals.currency}</p>
                                        </div>
                                        <div style={{
                                            color: '#6b7280',
                                            fontSize: '0.9rem'
                                        }}>
                                            {dailyPrice}{t[lang].rentals.currency}{t[lang].rentals.perDayShort}
                                        </div>
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
                                        onClick={() => {
                                            setRentedCar({ ...car, totalPrice, dailyPrice });
                                            setShowRentedCar(true);
                                            setModalImageIndex(0); // Reset modal image index
                                        }}
                                    >
                                        {t[lang].rentals.reserve}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
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
                                <i className="icon-chevron-right text-12" />
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

                            <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const pageNumber = Math.max(1, currentPage - 2) + i;
                                    if (pageNumber > totalPages) return null;
                                    
                                    return (
                                        <div key={pageNumber} className="col-auto">
                                            <button
                                                className={`size-40 flex-center rounded-full cursor-pointer ${
                                                    pageNumber === currentPage ? "bg-brown-2 text-white" : ""
                                                }`}
                                                onClick={() => handlePageChange(pageNumber)}
                                            >
                                                {pageNumber}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="text-center mt-30 md:mt-10">
                                <div className="text-14 text-light-1">
                                    {((currentPage - 1) * carsPerPage) + 1} – {Math.min(currentPage * carsPerPage, filteredCars.length)} of {filteredCars.length} {t[lang].rentals.carsFound}
                                </div>
                            </div>
                        </div>

                        <div className="col-auto md:order-2">
                            <button 
                                className="button -dark-1 size-40 rounded-full border-light"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                            >
                                <i className="icon-chevron-left text-12" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {filteredCars.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                        {t[lang].rentals.noCarsFound}
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                        {t[lang].rentals.tryModifyFilters}
                    </div>
                </div>
            )}
            {rentedCar && createPortal(
                <div
                    style={{
                        position: 'fixed', 
                        inset: 0, 
                        background: 'rgba(0, 0, 25, 0.40)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        zIndex: 9999,
                        opacity: showRentedCar ? 1 : 0,
                        pointerEvents: showRentedCar ? 'auto' : 'none',
                        transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1)'
                    }}
                    onClick={() => setShowRentedCar(false)}
                >
                    <div
                        key={rentedCar.id}
                        className="pt-40 pb-30 px-20 sm:px-50 md:px-70 lg:px-100 xl:px-150"
                        style={{
                            background: 'white',
                            width: 'auto',
                            height: 'auto',
                            borderRadius: '12px',
                            boxShadow: '0 0 50px rgba(0,0,0,0.4)',
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 600,
                            minHeight: 300,
                            maxWidth: 600,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={() => setRentHovered(true)}
                        onMouseLeave={() => setRentHovered(false)}
                    >
                        <section 
                            style={{ flex: 1, display: 'flex', alignItems: 'stretch', gap: '20px', background: 'white' }}
                        >
                            <div
                                style={{ 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '200px',
                                    background: 'white',
                                    flex: 1,
                                    marginRight: 0,
                                }}
                                
                            > 
                                <div className="col-auto">
                                    <h1 className="text-30 sm:text-25 fw-600">{rentedCar.brand} {rentedCar.model}</h1>
                                </div>

                                <div className="col-auto" style={{ marginTop: '10px' }}>
                                    <div className="text-14">{t[lang].rentals.price}: <label className="text-15 fw-500">{rentedCar.totalPrice} {t[lang].rentals.currency}</label></div>
                                    <div className="text-14">{rentedCar.year} • {translateCarSpec(rentedCar.fuel)} • {translateCarSpec(rentedCar.transmission)}</div>
                                    <div className="text-14" style={{ marginLeft: '-5px' }}>
                                        { (filters.depot && filters.depart) ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                                                    {filters.depart || rentedCar.city}
                                                </div>
                                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '18px' }}>
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="4" cy="9" r="1.5" fill="#f97316"/>
                                                        <circle cx="9" cy="9" r="1.5" fill="#f97316"/>
                                                        <circle cx="14" cy="9" r="1.5" fill="#f97316"/>
                                                    </svg>
                                                </span>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                                                    {translateCity(filters.depot || rentedCar.city)}
                                                </div>
                                            </div>
                                        ) : (
                                            <>
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
                                                {translateCity(rentedCar.city)}
                                            </>
                                        )}
                                    </div>
                                    <div className="text-14">{rentedCar.dailyPrice}{t[lang].rentals.currency}{t[lang].rentals.perDayShort}</div>
                                </div>

                                <div className="col-auto" style={{ marginTop: 'auto' }}>
                                    <div className="button h-50 px-24 -dark-2 bg-brown-2 text-white" style={{ marginTop: '27px', cursor: 'pointer'  }}>
                                        {t[lang].rentals.moreDetails}
                                        <div className="icon-arrow-top-right ml-15"/>
                                    </div>
                                </div>
                                
                            </div>
                            <div 
                                style={{ 
                                    borderRadius: '5px', 
                                    flex: 1, 
                                    display: 'flex', 
                                    alignItems: 'stretch', 
                                    position: 'relative', 
                                    overflow: 'hidden' 
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    {rentedCar.images.map((img, idx) => {
                                        let transform = 'translateX(100%)';
                                        let opacity = 0;
                                        let zIndex = 0;
                                        
                                        if (idx === modalImageIndex) {
                                            transform = 'translateX(0) scale(' + (rentHovered ? '1' : '1.05') + ')';
                                            opacity = 1;
                                            zIndex = 2;
                                        } else if (modalPrevImageIndex !== null && idx === modalPrevImageIndex) {
                                            if (modalSlideDirection === 'left') {
                                                transform = 'translateX(-100%) scale(1)';
                                            } else if (modalSlideDirection === 'right') {
                                                transform = 'translateX(100%) scale(1)';
                                            }
                                            opacity = 1;
                                            zIndex = 1;
                                        } else {
                                            if (modalSlideDirection === 'left') {
                                                transform = 'translateX(100%) scale(1)';
                                            } else if (modalSlideDirection === 'right') {
                                                transform = 'translateX(-100%) scale(1)';
                                            } else {
                                                transform = modalLeftBtnHovered ? 'translateX(-100%) scale(1)' : 'translateX(100%) scale(1)';
                                            }
                                            opacity = 0;
                                            zIndex = 0;
                                        }
                                        
                                        return (
                                            <img
                                                key={img}
                                                src={img}
                                                alt={`${rentedCar.brand} ${rentedCar.model}`}
                                                onError={(e) => { e.currentTarget.src = alternativeImage; }}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                    transition: 'transform 0.5s ease-in-out',
                                                    transform,
                                                    opacity,
                                                    zIndex,
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                                
                                {/* Navigation buttons for modal */}
                                {rentedCar.images.length > 1 && (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        position: 'absolute',
                                        width: '100%',
                                        top: '50%',
                                        left: '0',
                                        transform: 'translateY(-50%)',
                                        opacity: 1,
                                        pointerEvents: 'auto',
                                        zIndex: 3,
                                    }}>
                                        {(lang === 'ar') ? (
                                            <>
                                                <button 
                                                    disabled={modalAnimating}
                                                    style={{
                                                        background: modalRightBtnHovered ? '#ffe736ff' : 'white',
                                                        borderRadius: '50%',
                                                        width: '35px',
                                                        height: '35px',
                                                        border: 'none',
                                                        color: modalRightBtnHovered ? '#ffffffff' : '#374151',
                                                        marginRight: 16,
                                                        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                                                        cursor: modalAnimating ? 'default' : 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'background 0.3s, color 0.3s'
                                                    }}
                                                    onMouseEnter={() => !modalAnimating && setModalRightBtnHovered(true)}
                                                    onMouseLeave={() => setModalRightBtnHovered(false)}
                                                    onClick={(e) => {
                                                        if (modalAnimating) return;
                                                        e.stopPropagation();
                                                        
                                                        setModalAnimating(true);
                                                        setModalSlideDirection(lang === "ar" ? 'left' : 'right');
                                                        setModalPrevImageIndex(modalImageIndex);
                                                        
                                                        const total = rentedCar.images.length;
                                                        const newIndex = lang === "ar" ? 
                                                            (modalImageIndex - 1 + total) % total : 
                                                            (modalImageIndex + 1) % total;
                                                        setModalImageIndex(newIndex);
                                                        
                                                        setTimeout(() => {
                                                            setModalSlideDirection('');
                                                            setModalPrevImageIndex(null);
                                                            setModalAnimating(false);
                                                        }, 500);
                                                    }}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d= "M5.5 12.5L10 8L5.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                                <button 
                                                    disabled={modalAnimating}
                                                    style={{
                                                        background: modalLeftBtnHovered ? '#ffe736ff' : 'white',
                                                        borderRadius: '50%',
                                                        width: '35px',
                                                        height: '35px',
                                                        border: 'none',
                                                        color: modalLeftBtnHovered ? '#ffffffff' : '#374151',
                                                        marginLeft: 16,
                                                        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                                                        cursor: modalAnimating ? 'default' : 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'background 0.3s, color 0.3s'
                                                    }}
                                                    onMouseEnter={() => !modalAnimating && setModalLeftBtnHovered(true)}
                                                    onMouseLeave={() => setModalLeftBtnHovered(false)}
                                                    onClick={(e) => {
                                                        if (modalAnimating) return;
                                                        e.stopPropagation();
                                                        
                                                        setModalAnimating(true);
                                                        setModalSlideDirection(lang === "ar" ? 'right' : 'left');
                                                        setModalPrevImageIndex(modalImageIndex);
                                                        
                                                        const total = rentedCar.images.length;
                                                        const newIndex = lang === "ar" ? 
                                                            (modalImageIndex + 1) % total : 
                                                            (modalImageIndex - 1 + total) % total;
                                                        setModalImageIndex(newIndex);
                                                        
                                                        setTimeout(() => {
                                                            setModalSlideDirection('');
                                                            setModalPrevImageIndex(null);
                                                            setModalAnimating(false);
                                                        }, 500);
                                                    }}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d= "M10.5 3.5L6 8L10.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button 
                                                    disabled={modalAnimating}
                                                    style={{
                                                        background: modalLeftBtnHovered ? '#ffe736ff' : 'white',
                                                        borderRadius: '50%',
                                                        width: '35px',
                                                        height: '35px',
                                                        border: 'none',
                                                        color: modalLeftBtnHovered ? '#ffffffff' : '#374151',
                                                        marginLeft: 16,
                                                        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                                                        cursor: modalAnimating ? 'default' : 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'background 0.3s, color 0.3s'
                                                    }}
                                                    onMouseEnter={() => !modalAnimating && setModalLeftBtnHovered(true)}
                                                    onMouseLeave={() => setModalLeftBtnHovered(false)}
                                                    onClick={(e) => {
                                                        if (modalAnimating) return;
                                                        e.stopPropagation();
                                                        
                                                        setModalAnimating(true);
                                                        setModalSlideDirection(lang === "ar" ? 'right' : 'left');
                                                        setModalPrevImageIndex(modalImageIndex);
                                                        
                                                        const total = rentedCar.images.length;
                                                        const newIndex = lang === "ar" ? 
                                                            (modalImageIndex + 1) % total : 
                                                            (modalImageIndex - 1 + total) % total;
                                                        setModalImageIndex(newIndex);
                                                        
                                                        setTimeout(() => {
                                                            setModalSlideDirection('');
                                                            setModalPrevImageIndex(null);
                                                            setModalAnimating(false);
                                                        }, 500);
                                                    }}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d={lang === "ar" ? "M5.5 12.5L10 8L5.5 3.5" : "M10.5 3.5L6 8L10.5 12.5"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                                <button 
                                                    disabled={modalAnimating}
                                                    style={{
                                                        background: modalRightBtnHovered ? '#ffe736ff' : 'white',
                                                        borderRadius: '50%',
                                                        width: '35px',
                                                        height: '35px',
                                                        border: 'none',
                                                        color: modalRightBtnHovered ? '#ffffffff' : '#374151',
                                                        marginRight: 16,
                                                        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                                                        cursor: modalAnimating ? 'default' : 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'background 0.3s, color 0.3s'
                                                    }}
                                                    onMouseEnter={() => !modalAnimating && setModalRightBtnHovered(true)}
                                                    onMouseLeave={() => setModalRightBtnHovered(false)}
                                                    onClick={(e) => {
                                                        if (modalAnimating) return;
                                                        e.stopPropagation();
                                                        
                                                        setModalAnimating(true);
                                                        setModalSlideDirection(lang === "ar" ? 'left' : 'right');
                                                        setModalPrevImageIndex(modalImageIndex);
                                                        
                                                        const total = rentedCar.images.length;
                                                        const newIndex = lang === "ar" ? 
                                                            (modalImageIndex - 1 + total) % total : 
                                                            (modalImageIndex + 1) % total;
                                                        setModalImageIndex(newIndex);
                                                        
                                                        setTimeout(() => {
                                                            setModalSlideDirection('');
                                                            setModalPrevImageIndex(null);
                                                            setModalAnimating(false);
                                                        }, 500);
                                                    }}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d={lang === "ar" ? "M5.5 12.5L10 8L5.5 3.5" : "M10.5 3.5L6 8L10.5 12.5"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>
                        {rentedCar.promotion && (
                            <div style={{
                                position: 'absolute',
                                top: '13px',
                                [lang === "ar" ? 'left' : 'right']: '-42px',
                                transform: `rotate(${lang === "ar" ? '-40deg' : '40deg'})`,
                                width: '150px',
                                textAlign: 'center',
                                background: '#F5C906',
                                color: 'white',
                                padding: '4px 15px 4px 15px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                zIndex: 9
                            }}>
                                {t[lang].sideBar.promo.cartitle}
                            </div>
                        )}
                    </div>
                </div>, document.body
            )}
        </div>
    );
}