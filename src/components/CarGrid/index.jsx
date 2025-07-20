import { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

export default function CarGrid({ filters = {} }) {

    useEffect(() => {
        Aos.init({ 
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }, []);

    // Mock car data with daily pricing and proper image links
    const [allCars] = useState([
        {
            id: 1,
            brand: "Audi",
            model: "A3",
            image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
            basePrice: 45,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique"
        },
        {
            id: 2,
            brand: "BMW",
            model: "X3",
            image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
            basePrice: 65,
            promotion: true,
            year: 2022,
            fuel: "Diesel",
            transmission: "Automatique"
        },
        {
            id: 3,
            brand: "Mercedes",
            model: "C-Class",
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&h=200&fit=crop",
            basePrice: 55,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Manuelle"
        },
        {
            id: 4,
            brand: "Volkswagen",
            model: "Golf",
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop",
            basePrice: 35,
            promotion: true,
            year: 2021,
            fuel: "Essence",
            transmission: "Automatique"
        },
        {
            id: 5,
            brand: "Peugeot",
            model: "308",
            image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=300&h=200&fit=crop",
            basePrice: 40,
            promotion: false,
            year: 2023,
            fuel: "Diesel",
            transmission: "Manuelle"
        },
        {
            id: 6,
            brand: "Fiat",
            model: "500",
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop",
            basePrice: 25,
            promotion: false,
            year: 2022,
            fuel: "Essence",
            transmission: "Manuelle"
        },
        {
            id: 7,
            brand: "BMW",
            model: "Series 3",
            image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=300&h=200&fit=crop",
            basePrice: 75,
            promotion: true,
            year: 2023,
            fuel: "Diesel",
            transmission: "Automatique"
        },
        {
            id: 8,
            brand: "Audi",
            model: "A4",
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
            basePrice: 60,
            promotion: false,
            year: 2022,
            fuel: "Essence",
            transmission: "Automatique"
        },
        {
            id: 9,
            brand: "Renault",
            model: "Clio",
            image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=300&h=200&fit=crop",
            basePrice: 30,
            promotion: true,
            year: 2023,
            fuel: "Essence",
            transmission: "Manuelle"
        },
        {
            id: 10,
            brand: "Toyota",
            model: "Corolla",
            image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300&h=200&fit=crop",
            basePrice: 38,
            promotion: false,
            year: 2022,
            fuel: "Hybride",
            transmission: "Automatique"
        },
        {
            id: 11,
            brand: "Opel",
            model: "Astra",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=200&fit=crop",
            basePrice: 42,
            promotion: true,
            year: 2021,
            fuel: "Diesel",
            transmission: "Manuelle"
        },
        {
            id: 12,
            brand: "Ford",
            model: "Focus",
            image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=300&h=200&fit=crop",
            basePrice: 48,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique"
        },
        {
            id: 13,
            brand: "Nissan",
            model: "Micra",
            image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&h=200&fit=crop",
            basePrice: 28,
            promotion: true,
            year: 2022,
            fuel: "Essence",
            transmission: "Manuelle"
        },
        {
            id: 14,
            brand: "Hyundai",
            model: "i30",
            image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=300&h=200&fit=crop",
            basePrice: 36,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique"
        },
        {
            id: 15,
            brand: "Kia",
            model: "Rio",
            image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=300&h=200&fit=crop",
            basePrice: 32,
            promotion: true,
            year: 2022,
            fuel: "Essence",
            transmission: "Manuelle"
        },
        {
            id: 16,
            brand: "Seat",
            model: "Leon",
            image: "https://images.unsplash.com/photo-1606016159854-8070a8de3ff7?w=300&h=200&fit=crop",
            basePrice: 41,
            promotion: false,
            year: 2023,
            fuel: "Diesel",
            transmission: "Automatique"
        },
        {
            id: 17,
            brand: "Skoda",
            model: "Octavia",
            image: "https://images.unsplash.com/photo-1549399772-f46aa5edf251?w=300&h=200&fit=crop",
            basePrice: 44,
            promotion: true,
            year: 2022,
            fuel: "Diesel",
            transmission: "Manuelle"
        },
        {
            id: 18,
            brand: "Citroen",
            model: "C3",
            image: "https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?w=300&h=200&fit=crop",
            basePrice: 33,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique"
        },
        {
            id: 19,
            brand: "Mazda",
            model: "CX-5",
            image: "https://images.unsplash.com/photo-1606914469633-e70b07c89e8d?w=300&h=200&fit=crop",
            basePrice: 58,
            promotion: true,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique"
        },
        {
            id: 20,
            brand: "Honda",
            model: "Civic",
            image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=300&h=200&fit=crop",
            basePrice: 46,
            promotion: false,
            year: 2022,
            fuel: "Hybride",
            transmission: "Automatique"
        },
        {
            id: 21,
            brand: "Subaru",
            model: "Impreza",
            image: "https://images.unsplash.com/photo-1552519456-076085e36ae0?w=300&h=200&fit=crop",
            basePrice: 52,
            promotion: true,
            year: 2023,
            fuel: "Essence",
            transmission: "Manuelle"
        },
        {
            id: 22,
            brand: "Mini",
            model: "Cooper",
            image: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=300&h=200&fit=crop",
            basePrice: 49,
            promotion: false,
            year: 2022,
            fuel: "Essence",
            transmission: "Automatique"
        },
        {
            id: 23,
            brand: "Volvo",
            model: "V40",
            image: "https://images.unsplash.com/photo-1606859937578-7e7aa89fcb20?w=300&h=200&fit=crop",
            basePrice: 56,
            promotion: true,
            year: 2021,
            fuel: "Diesel",
            transmission: "Automatique"
        },
        {
            id: 24,
            brand: "Alfa Romeo",
            model: "Giulietta",
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
            basePrice: 51,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Manuelle"
        },
        {
            id: 25,
            brand: "Dacia",
            model: "Sandero",
            image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
            basePrice: 22,
            promotion: true,
            year: 2022,
            fuel: "Essence",
            transmission: "Manuelle"
        },
        {
            id: 26,
            brand: "Tesla",
            model: "Model 3",
            image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=200&fit=crop",
            basePrice: 85,
            promotion: false,
            year: 2023,
            fuel: "Électrique",
            transmission: "Automatique"
        },
        {
            id: 27,
            brand: "Lexus",
            model: "IS",
            image: "https://images.unsplash.com/photo-1606016159854-8070a8de3ff7?w=300&h=200&fit=crop",
            basePrice: 78,
            promotion: true,
            year: 2022,
            fuel: "Hybride",
            transmission: "Automatique"
        },
        {
            id: 28,
            brand: "Jaguar",
            model: "XE",
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
            basePrice: 82,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique"
        }
    ]);

    const [filteredCars, setFilteredCars] = useState(allCars);
    const [currentPage, setCurrentPage] = useState(1);
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

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    // Refresh AOS when page or filters change
    useEffect(() => {
        Aos.refresh();
    }, [currentPage, filteredCars]);

    return (
        <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', margin: 0, marginTop: '10px'}}>
                    {filteredCars.length} voiture(s) disponible(s)
                </h2>
                {filters.startDate && filters.endDate && (
                    <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
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
                {getCurrentPageCars().map((car, index) => {
                    const totalPrice = calculateDailyPrice(car, filters.startDate, filters.endDate);
                    const dailyPrice = filters.startDate && filters.endDate ? 
                        Math.round(totalPrice / getDaysCount()) : car.basePrice;
                    
                    return (
                        <div 
                            key={car.id} 
                            data-aos="fade"
                            data-aos-delay={index * 100}
                            data-aos-duration="600"
                            style={{
                                background: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                                transition: 'box-shadow 0.2s'
                            }}>
                            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                                <img 
                                    src={car.image} 
                                    alt={`${car.brand} ${car.model}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '600',
                                    color: '#1f2937',
                                    marginBottom: '0.5rem'
                                }}>
                                    {car.brand} {car.model}
                                </h3>
                                
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
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            color: '#f97316'
                                        }}>
                                            €{totalPrice}
                                        </div>
                                        <div style={{
                                            color: '#6b7280',
                                            fontSize: '0.9rem'
                                        }}>
                                            €{dailyPrice}/jour
                                        </div>
                                    </div>
                                    
                                    <button style={{
                                        background: '#f97316',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '6px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'background 0.3s'
                                    }}>
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
        </div>
    );
}