import { useState, useEffect } from "react";
import CarCard from "../CarCard";

export default function CarGrid({ filters = {} }) {
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
            brand: "Mercedes",
            model: "E-Class",
            image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=300&h=200&fit=crop",
            basePrice: 80,
            promotion: false,
            year: 2023,
            fuel: "Diesel",
            transmission: "Automatique"
        },
        {
            id: 10,
            brand: "Volkswagen",
            model: "Passat",
            image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop",
            basePrice: 50,
            promotion: true,
            year: 2022,
            fuel: "Diesel",
            transmission: "Manuelle"
        },
        {
            id: 11,
            brand: "Peugeot",
            model: "508",
            image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=300&h=200&fit=crop",
            basePrice: 55,
            promotion: false,
            year: 2023,
            fuel: "Essence",
            transmission: "Automatique"
        },
        {
            id: 12,
            brand: "Citroen",
            model: "C4",
            image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=300&h=200&fit=crop",
            basePrice: 38,
            promotion: false,
            year: 2022,
            fuel: "Essence",
            transmission: "Manuelle"
        },
        {
            id: 13,
            brand: "Opel",
            model: "Astra",
            image: "https://images.unsplash.com/photo-1494976688153-c15d2c10d73d?w=300&h=200&fit=crop",
            basePrice: 32,
            promotion: true,
            year: 2021,
            fuel: "Essence",
            transmission: "Automatique"
        },
        {
            id: 14,
            brand: "Suzuki",
            model: "Swift",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
            basePrice: 28,
            promotion: false,
            year: 2022,
            fuel: "Essence",
            transmission: "Manuelle"
        },
        {
            id: 15,
            brand: "BMW",
            model: "X5",
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop",
            basePrice: 95,
            promotion: false,
            year: 2023,
            fuel: "Diesel",
            transmission: "Automatique"
        },
        {
            id: 16,
            brand: "Audi",
            model: "Q5",
            image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=300&h=200&fit=crop",
            basePrice: 85,
            promotion: true,
            year: 2023,
            fuel: "Diesel",
            transmission: "Automatique"
        }
    ]);

    const [filteredCars, setFilteredCars] = useState(allCars);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 12; // Increased from 6 to 12

    // Calculate daily price based on date and car
    const calculateDailyPrice = (car, startDate, endDate) => {
        if (!startDate || !endDate) return car.basePrice;
        
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const weekendMultiplier = 1.2; // 20% more on weekends
        const promotionDiscount = car.promotion ? 0.9 : 1; // 10% discount if promotion
        
        let totalPrice = 0;
        let currentDate = new Date(startDate);
        
        for (let i = 0; i < days; i++) {
            let dayPrice = car.basePrice;
            
            // Weekend pricing
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

    // Get cars for current page
    const getCurrentPageCars = () => {
        const startIndex = (currentPage - 1) * carsPerPage;
        const endIndex = startIndex + carsPerPage;
        return filteredCars.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    return (
        <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    {filteredCars.length} voiture(s) disponible(s)
                </h2>
                {filters.startDate && filters.endDate && (
                    <div className="text-sm text-gray-600">
                        Pour {getDaysCount()} jour(s)
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentPageCars().map((car) => {
                    const totalPrice = calculateDailyPrice(car, filters.startDate, filters.endDate);
                    const dailyPrice = filters.startDate && filters.endDate ? 
                        Math.round(totalPrice / getDaysCount()) : car.basePrice;
                    
                    return (
                        <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative">
                                <img 
                                    src={car.image} 
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-48 object-cover"
                                />
                                {car.promotion && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                                        Promotion
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    {car.brand} {car.model}
                                </h3>
                                
                                <div className="text-sm text-gray-600 mb-3">
                                    <div>{car.year} • {car.fuel} • {car.transmission}</div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            €{totalPrice}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            €{dailyPrice}/jour
                                        </div>
                                    </div>
                                    
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
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
                <div className="flex justify-center mt-12 mb-8">
                    <div className="flex items-center space-x-1">
                        {/* Previous button */}
                        <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Précédent
                        </button>

                        {/* Page numbers */}
                        <div className="flex items-center space-x-1 mx-4">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
                                        currentPage === page
                                            ? 'bg-orange-500 text-white border-orange-500'
                                            : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        {/* Next button */}
                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            Suivant
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            
            {filteredCars.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">
                        Aucune voiture trouvée avec ces critères
                    </div>
                    <div className="text-gray-400 text-sm mt-2">
                        Essayez de modifier vos filtres
                    </div>
                </div>
            )}
        </div>
    );
}