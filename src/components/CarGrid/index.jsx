import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import alternativeImage from "/img/alternativePicture/default_image.png";

export default function CarGrid({ filters = {} }) {

    // Mock car data with daily pricing and proper image links
    const [allCars] = useState([
        {
            id: 1,
            brand: "Audi",
            model: "A3",
            image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1606016159854-8070a8de3ff7?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1549399772-f46aa5edf251?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1606914469633-e70b07c89e8d?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1552519456-076085e36ae0?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1606859937578-7e7aa89fcb20?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1606016159854-8070a8de3ff7?w=300&h=200&fit=crop",
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
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
            alternativeImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
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
    const [rentHovered, setRentHovered] = useState(false);
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

        // if (filters.depot) {
        //     filtered = filtered.filter(car =>
        //         car.city && car.city.toLowerCase().includes(filters.depot.toLowerCase())
        //     );
        // }

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
                    {filteredCars.length} voiture(s) disponible(s)
                </h2>
                {filters.startDate && filters.endDate && (
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', marginRight: '100px', marginTop: '10px' }}>
                        Pour {getDaysCount()} jour(s)
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

                    return (
                        <div 
                            key={car.id} 
                            style={{
                                background: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                                transition: 'box-shadow 0.2s'
                            }}
                            onMouseEnter={() => setHoveredCardId(car.id)}
                            onMouseLeave={() => setHoveredCardId(null)}
                        >
                            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                                <img 
                                    src={car.image} 
                                    alt={`${car.brand} ${car.model}`}
                                    onError={(e) => {
                                        e.currentTarget.src = alternativeImage; // Fallback to alternative image
                                    }}
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s',
                                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                />
                                {car.promotion && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '-3px',
                                        background: '#F5C906',
                                        color: 'white',
                                        padding: '4px 8px 4px 15px',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        PROMO
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
                                        {car.city}
                                    </p>
                                </div>
                                
                                <div style={{
                                    color: '#6b7280',
                                    fontSize: '0.9rem',
                                    marginBottom: '1rem'
                                }}>
                                    {car.year} • {car.fuel} • {car.transmission}
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
                                            {totalPrice}<p style={{ color: '#f97316',  }}>dh</p>
                                        </div>
                                        <div style={{
                                            color: '#6b7280',
                                            fontSize: '0.9rem'
                                        }}>
                                            {dailyPrice}dh/jour
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
                                <i className="icon-chevron-left text-12" />
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
                                    {((currentPage - 1) * carsPerPage) + 1} – {Math.min(currentPage * carsPerPage, filteredCars.length)} of {filteredCars.length} voitures trouvées
                                </div>
                            </div>
                        </div>

                        <div className="col-auto md:order-2">
                            <button 
                                className="button -dark-1 size-40 rounded-full border-light"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                            >
                                <i className="icon-chevron-right text-12" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {filteredCars.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                        Aucune voiture trouvée avec ces critères
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                        Essayez de modifier vos filtres
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
                    >
                        <section style={{ flex: 1, display: 'flex', alignItems: 'stretch', gap: '20px', background: 'white' }}>
                            <div
                                style={{ 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '200px',
                                    background: 'white',
                                    flex: 1,
                                    marginRight: 0,
                                }}
                                onMouseEnter={() => setRentHovered(true)}
                                onMouseLeave={() => setRentHovered(false)}
                            > 
                                <div className="col-auto">
                                    <h1 className="text-30 sm:text-25 fw-600">{rentedCar.brand} {rentedCar.model}</h1>
                                </div>

                                <div className="col-auto" style={{ marginTop: '10px' }}>
                                    <div className="text-14">Prix: <label className="text-15 fw-500">{rentedCar.totalPrice}MAD</label></div>
                                    <div className="text-14">{rentedCar.year} • {rentedCar.fuel} • {rentedCar.transmission}</div>
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
                                                    {filters.depot || rentedCar.city}
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
                                                {rentedCar.city}
                                            </>
                                        )}
                                    </div>
                                    <div className="text-14">{rentedCar.dailyPrice}dh/jour</div>
                                </div>

                                <div className="col-auto" style={{ marginTop: 'auto' }}>
                                    <div className="button h-50 px-24 -dark-2 bg-brown-2 text-white" style={{ marginTop: '27px', cursor: 'pointer'  }}>
                                        Plus de details
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
                                <img 
                                    style={{  
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover', 
                                        display: 'block', 
                                        transition: 'transform 0.5s',
                                        transform: rentHovered ? 'scale(1)' : 'scale(1.05)'
                                     }} 
                                    src={rentedCar.image} 
                                    alt={`${rentedCar.brand} ${rentedCar.model}`}
                                    // onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    // onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    onError={(e) => { e.currentTarget.src = alternativeImage; }}
                                />
                            </div>
                        </section>
                        {rentedCar.promotion && (
                            <div style={{
                                position: 'absolute',
                                top: '13px',
                                right: '-42px',
                                rotate: '40deg',
                                width: '150px',
                                textAlign: 'center',
                                background: '#F5C906',
                                color: 'white',
                                padding: '4px 15px 4px 15px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                            }}>
                                PROMO
                            </div>
                        )}
                    </div>
                </div>, document.body
            )}
        </div>
    );
}