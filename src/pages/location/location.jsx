import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import CarGrid from "../components/CarGrid";

function Filters({ onFiltersChange, isMobile = false, onClose }) {
    const OptionList = ["Abarth", "Acrea", "AC", "Daewoo", "Acura", "Cadilac", "Skoda", "GAZ", "Lifan"
        , "Geely", "Alfa Romeo", "Aston Martin", "Rolls-Royce", "Audi", "Volkswagen", "Citroen",
        "Suzuki", "Fiat", "Opel", "Mercedes", "BMW", "Peugeot"];

    // Brand to models mapping
    const BrandModels = {
        "Audi": ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
        "BMW": ["X1", "X3", "X5", "Series 3", "Series 5"],
        "Mercedes": ["C-Class", "E-Class", "S-Class", "GLA", "GLC"],
        "Volkswagen": ["Golf", "Passat", "Polo", "Tiguan"],
        "Peugeot": ["208", "308", "508", "2008", "3008"],
        "Abarth": ["500", "595", "124 Spider"],
        "Fiat": ["500", "Panda", "Tipo", "500X"],
        "Opel": ["Corsa", "Astra", "Insignia", "Mokka"],
        "Citroen": ["C3", "C4", "C5", "Berlingo"],
        "Suzuki": ["Swift", "Vitara", "Jimny", "Baleno"]
    };

    const [showDropDown, setShowDropDown] = useState(false);
    const [showModelDropDown, setShowModelDropDown] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [modelSearch, setModelSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Current date
    const [promotion, setPromotion] = useState(false);

    const handleChange = (e) => {
        setSearch(e.target.value);
        setShowDropDown(true);
    }

    const handleModelChange = (e) => {
        setModelSearch(e.target.value);
        setShowModelDropDown(true);
    }

    const handleOptionSelect = (option) => {
        setSearch(option);
        setSelectedBrand(option);
        setShowDropDown(false);
        // Clear model selection when brand changes
        setModelSearch("");
    }

    const handleModelSelect = (option) => {
        setModelSearch(option);
        setShowModelDropDown(false);
    }

    const filteredOptions = OptionList.filter(car => 
        car.toLowerCase().includes(search.toLowerCase())
    );

    // Get models for selected brand
    const availableModels = selectedBrand && BrandModels[selectedBrand] ? BrandModels[selectedBrand] : [];
    
    const filteredModels = availableModels.filter(model => 
        model.toLowerCase().includes(modelSearch.toLowerCase())
    );

    const formatDate = (date) => {
        if (!date) return "";
        return new Intl.DateTimeFormat('fr-FR', {
            weekday: 'short',
            day: 'numeric',
            month: 'numeric'
        }).format(date);
    };

    const formatDateForDisplay = (date) => {
        if (!date) return "";
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit'
        }).format(date);
    };

    const formatDayName = (date) => {
        if (!date) return "";
        return new Intl.DateTimeFormat('fr-FR', {
            weekday: 'short'
        }).format(date);
    };

    const handleDateSelect = (date) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else {
            if (date > startDate) {
                setEndDate(date);
            } else {
                setStartDate(date);
                setEndDate(null);
            }
        }
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
        
        const days = [];
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }
        
        return days;
    };

    const getPriceForDate = (date) => {
        // More varied price data based on realistic patterns
        const dayOfMonth = date.getDate();
        const dayOfWeek = date.getDay();
        
        // Weekends tend to be more expensive
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return { bgColor: 'bg-red-200', textColor: 'text-red-800', level: 'high' };
        }
        // Mid-month tends to be medium priced
        else if (dayOfMonth >= 10 && dayOfMonth <= 20) {
            return { bgColor: 'bg-orange-200', textColor: 'text-orange-800', level: 'medium' };
        }
        // Other days are cheaper
        else {
            return { bgColor: 'bg-green-200', textColor: 'text-green-800', level: 'low' };
        }
    };

    const navigateMonth = (direction) => {
        setCurrentMonth(prevMonth => {
            const newMonth = new Date(prevMonth);
            newMonth.setMonth(prevMonth.getMonth() + direction);
            return newMonth;
        });
    };

    const renderMonth = (monthDate) => {
        const monthName = monthDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        const days = getDaysInMonth(monthDate);
        
        return (
            <div key={monthDate.getTime()} className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-center capitalize">{monthName}</h4>
                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
                        <div key={day} className="font-medium text-gray-500 py-2">{day}</div>
                    ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                    {days.map((date, index) => {
                        if (!date) {
                            return <div key={index} className="h-12"></div>;
                        }
                        
                        const isSelected = (startDate && date.toDateString() === startDate.toDateString()) || 
                                         (endDate && date.toDateString() === endDate.toDateString());
                        const isInRange = startDate && endDate && date > startDate && date < endDate;
                        const isToday = date.toDateString() === new Date().toDateString();
                        const isPast = date < new Date().setHours(0, 0, 0, 0);
                        const priceData = getPriceForDate(date);
                        
                        return (
                            <button
                                key={index}
                                disabled={isPast}
                                className={`
                                    h-12 w-12 text-sm rounded relative transition-colors flex flex-col items-center justify-center
                                    ${isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                      isSelected ? 'bg-orange-500 text-white' : 
                                      isInRange ? 'bg-orange-100 text-orange-800' : 
                                      isToday ? 'bg-blue-500 text-white' : 
                                      `${priceData.bgColor} ${priceData.textColor}`}
                                    ${!isPast ? 'hover:opacity-80' : ''}
                                `}
                                onClick={() => !isPast && handleDateSelect(date)}
                            >
                                <span className="text-xs font-medium">
                                    {date.getDate()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Lock/unlock body scroll when calendar opens/closes
    useEffect(() => {
        if (showCalendar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showCalendar]);

    const handleSearch = () => {
        const filters = {
            brand: selectedBrand,
            model: modelSearch,
            startDate: startDate,
            endDate: endDate,
            promotion: promotion
        };
        
        onFiltersChange(filters);
    };

    return (
        <aside className={`gap-y-200 w-[250px] ${isMobile ? 'h-full overflow-y-auto' : 'hidden xl:block'}`}>
            {isMobile && (
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Filtrer les voitures</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Marque Filter */}
            <div className="border-b border-gray-200 py-4 mt-4 relative">
                <h5 className="font-bold font-sans text-lg mb-3">Marque</h5>
                <div className="relative">
                    <input 
                        autoComplete="off" 
                        type="text" 
                        placeholder="Ex: Dacia" 
                        className="w-full bg-gray-50 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                        value={search}
                        onChange={handleChange}
                        onFocus={() => setShowDropDown(true)}
                    />
                    {showDropDown && filteredOptions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white rounded-b shadow-lg max-h-48 overflow-y-auto z-10">
                            {filteredOptions.map((car, index) => (
                                <div
                                    key={index}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm last:border-b-0"
                                    onClick={() => handleOptionSelect(car)}
                                >
                                    {car}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {showDropDown && (
                    <div 
                        className="fixed inset-0 z-5" 
                        onClick={() => setShowDropDown(false)}
                    ></div>
                )}
            </div>

            {/* Modèle Filter - Only show when brand is selected */}
            {selectedBrand && availableModels.length > 0 && (
                <div className="border-b border-gray-200 py-4 relative">
                    <h5 className="font-bold font-sans text-lg mb-3">Modèle</h5>
                    <div className="relative">
                        <input 
                            autoComplete="off" 
                            type="text" 
                            placeholder="Ex: A3" 
                            className="w-full bg-gray-50 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                            value={modelSearch}
                            onChange={handleModelChange}
                            onFocus={() => setShowModelDropDown(true)}
                        />
                        {showModelDropDown && filteredModels.length > 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white rounded-b shadow-lg max-h-48 overflow-y-auto z-10">
                                {filteredModels.map((model, index) => (
                                    <div
                                        key={index}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm last:border-b-0"
                                        onClick={() => handleModelSelect(model)}
                                    >
                                        {model}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {showModelDropDown && (
                        <div 
                            className="fixed inset-0 z-5" 
                            onClick={() => setShowModelDropDown(false)}
                        ></div>
                    )}
                </div>
            )}

            {/* Période Filter */}
            <div className="border-b border-gray-200 py-4 relative">
                <h5 className="font-bold font-sans text-lg mb-3">Période</h5>
                <div 
                    className="bg-gray-50 rounded px-3 py-2 cursor-pointer"
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <div className="text-xs text-gray-500">
                                {startDate ? formatDayName(startDate) : "sam."}
                            </div>
                            <div className="text-sm">
                                {startDate ? formatDateForDisplay(startDate) : "04/07"}
                            </div>
                        </div>
                        <div className="mx-2 text-gray-400">-</div>
                        <div className="flex-1">
                            <div className="text-xs text-gray-500">
                                {endDate ? formatDayName(endDate) : "lun."}
                            </div>
                            <div className="text-sm">
                                {endDate ? formatDateForDisplay(endDate) : "09/07"}
                            </div>
                        </div>
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Promotion Filter */}
            <div className="border-b border-gray-200 py-4">
                <h5 className="font-bold font-sans text-lg mb-3">Promotion</h5>
                <label className="flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={promotion}
                        onChange={(e) => setPromotion(e.target.checked)}
                        className="mr-2"
                    />
                    <span className="text-sm">Oui</span>
                </label>
            </div>

            {/* Calendar Modal */}
            {showCalendar && (
                <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="bg-green-400 text-white px-2 py-1 rounded text-xs font-medium">
                                    €
                                </div>
                                <div className="bg-orange-400 text-white px-2 py-1 rounded text-xs font-medium">
                                    €€
                                </div>
                                <div className="bg-red-400 text-white px-2 py-1 rounded text-xs font-medium">
                                    €€€
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowCalendar(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Month Navigation */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <button 
                                onClick={() => navigateMonth(-1)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="text-center">
                                <h4 className="text-lg font-semibold capitalize">
                                    {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                </h4>
                            </div>
                            <button 
                                onClick={() => navigateMonth(1)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Calendar Content */}
                        <div className="p-4 flex-1 overflow-y-auto">
                            {renderMonth(currentMonth)}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 p-4 bg-gray-50">
                            <div className="flex justify-between items-center mb-4 border border-gray-200 rounded-lg p-3 bg-white">
                                <div className="text-sm flex-1">
                                    <label className="block text-gray-600 mb-1">Start date</label>
                                    <div className="text-lg font-medium">
                                        {startDate ? `${formatDayName(startDate)} ${formatDateForDisplay(startDate)}` : "Mon 14/7"}
                                    </div>
                                    <div className="text-sm text-blue-600 cursor-pointer">Noon ⌄</div>
                                </div>
                                <div className="w-px h-12 bg-gray-200 mx-4"></div>
                                <div className="text-sm flex-1">
                                    <label className="block text-gray-600 mb-1">End date</label>
                                    <div className="text-lg font-medium">
                                        {endDate ? `${formatDayName(endDate)} ${formatDateForDisplay(endDate)}` : "Mon 21/7"}
                                    </div>
                                    <div className="text-sm text-blue-600 cursor-pointer">Noon ⌄</div>
                                </div>
                            </div>
                            <button 
                                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                                onClick={() => setShowCalendar(false)}
                            >
                                Select these dates
                            </button>
                        </div>
                    </div>
                </div>
            )}

            

            {/* Search Button */}
            <div className="py-4">
                <button 
                    onClick={() => {
                        handleSearch();
                        if (isMobile && onClose) onClose();
                    }}
                    className="w-full bg-gray-700 text-white py-3 px-4 rounded text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Rechercher
                </button>
            </div>
        </aside>
    );
}

export default function Location() {
    const [currentFilters, setCurrentFilters] = useState({});
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const handleFiltersChange = (filters) => {
        setCurrentFilters(filters);
        console.log('Applied filters:', filters);
    };

    // Lock body scroll when mobile filters are open
    useEffect(() => {
        if (showMobileFilters) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showMobileFilters]);

    return (
        <section className="flex layout-pt-md layout-pb-lg justify-around">
            <PageTitle title="Location" />
            <div className="flex gap-[40px] mt-[20px] relative">
                {/* Desktop Filters */}
                <Filters onFiltersChange={handleFiltersChange} />
                
                {/* Mobile Filter Button */}
                <button
                    onClick={() => setShowMobileFilters(true)}
                    className="xl:hidden fixed bottom-6 left-4 bg-white border border-gray-300 rounded-full p-3 shadow-lg z-50 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span className="text-sm font-medium">Filtres</span>
                </button>

                {/* Mobile Filter Sidebar */}
                {showMobileFilters && (
                    <div className="xl:hidden fixed inset-0 z-50">
                        {/* Backdrop */}
                        <div 
                            className="absolute inset-0 bg-opacity-20 backdrop-blur-sm"
                            onClick={() => setShowMobileFilters(false)}
                        ></div>
                        
                        {/* Sidebar */}
                        <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
                            <div className="px-4">
                                <Filters 
                                    onFiltersChange={handleFiltersChange} 
                                    isMobile={true}
                                    onClose={() => setShowMobileFilters(false)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <CarGrid filters={currentFilters} />
            </div>
        </section>
    );
}