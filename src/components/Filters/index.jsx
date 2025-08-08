import { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import CustomDropdown from "../customDropDown";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

export default function Filters({ onFiltersChange, isMobile = false, onClose }) {
    const { lang } = useContext(LanguageContext);
    
    // Add functions to translate months and days
    const translateMonth = (monthIndex) => {
        const months = [
            t[lang].months.january, t[lang].months.february, t[lang].months.march,
            t[lang].months.april, t[lang].months.may, t[lang].months.june,
            t[lang].months.july, t[lang].months.august, t[lang].months.september,
            t[lang].months.october, t[lang].months.november, t[lang].months.december
        ];
        return months[monthIndex];
    };

    const translateDayOfWeek = (dayIndex) => {
        const days = [
            t[lang].days.sunday, t[lang].days.monday, t[lang].days.tuesday,
            t[lang].days.wednesday, t[lang].days.thursday, t[lang].days.friday, t[lang].days.saturday
        ];
        return days[dayIndex];
    };

    // Add function to translate city names
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
    const [showCityDropDown, setShowCityDropDown] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [modelSearch, setModelSearch] = useState("");
    const [citySearch, setCitySearch] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [departSearch, setDepartSearch] = useState("");
    const [selectedDepart, setSelectedDepart] = useState("");
    const [showDepartDropDown, setShowDepartDropDown] = useState(false);
    const [depotSearch, setDepotSearch] = useState("");
    const [selectedDepot, setSelectedDepot] = useState("");
    const [showDepotDropDown, setShowDepotDropDown] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [tempStartDate, setTempStartDate] = useState(null);
    const [tempEndDate, setTempEndDate] = useState(null);
    const [startHour, setStartHour] = useState("");
    const [endHour, setEndHour] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(null); // 'start' or 'end' or null
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Current date
    const [promotion, setPromotion] = useState(false);
    const [localisation, setLocalisation] = useState("same");
    const [selectFocused, setSelectFocused] = useState(false);
    const [filtersApplied, setFiltersApplied] = useState(false);

    const handleChange = (e) => {
        setSearch(e.target.value);
        setShowDropDown(true);
    }

    const handleModelChange = (e) => {
        const value = e.target.value;
        setModelSearch(value);
        setShowModelDropDown(value.trim().length > 0);
        
        // Clear selected model if input is empty
        if (value.trim() === "") {
            // Model search is already being cleared above
        }
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


    // List of cities from car data (hardcoded for now, should match car data)
    const CityList = [
        "Casablanca", "Rabat", "Marrakech", "Agadir", "Fès", "Tanger"
    ];

    const filteredOptions = OptionList.filter(car => 
        car.toLowerCase().includes(search.toLowerCase())
    );

    const filteredCities = CityList.filter(city =>
        city.toLowerCase().includes(citySearch.toLowerCase())
    );
    const filteredDeparts = CityList.filter(city =>
        city.toLowerCase().includes(departSearch.toLowerCase())
    );
    const filteredDepots = CityList.filter(city =>
        city.toLowerCase().includes(depotSearch.toLowerCase())
    );

    // Get models for selected brand
    const availableModels = selectedBrand && BrandModels[selectedBrand] ? BrandModels[selectedBrand] : [];
    
    const filteredModels = availableModels.filter(model => 
        model.toLowerCase().includes(modelSearch.toLowerCase())
    );

    // Time slots for the time picker
    const timeSlots = [
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
    ];

    const formatDateForDisplay = (date) => {
        if (!date) return "";
        // const locale = lang === 'ar' ? 'ar-SA' : 'fr-FR';
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit'
        }).format(date);
    };

    const formatDayName = (date) => {
        if (!date) return "";
        const locale = lang === 'ar' ? 'ar-SA' : 'fr-FR';
        return new Intl.DateTimeFormat(locale, {
            weekday: 'short'
        }).format(date);
    };

    const handleDateSelect = (date) => {
        if (!tempStartDate || (tempStartDate && tempEndDate)) {
            setTempStartDate(date);
            setTempEndDate(null);
        } else {
            if (date > tempStartDate) {
                setTempEndDate(date);
            } else {
                setTempStartDate(date);
                setTempEndDate(null);
            }
        }
    };

    const confirmDateSelection = () => {
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        setShowCalendar(false);
    };

    const openCalendar = () => {
        // Initialize temp dates with current selection when opening calendar
        setTempStartDate(startDate);
        setTempEndDate(endDate);
        setShowCalendar(true);
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

    // --- Fix Calendar Grid Rendering ---
    const renderMonth = (monthDate) => {
        const monthName = `${translateMonth(monthDate.getMonth())} ${monthDate.getFullYear()}`;
        const days = getDaysInMonth(monthDate);
        const weekDays = [
            translateDayOfWeek(1), translateDayOfWeek(2), translateDayOfWeek(3), 
            translateDayOfWeek(4), translateDayOfWeek(5), translateDayOfWeek(6), translateDayOfWeek(0)
        ];
        return (
            <div key={monthDate.getTime()} style={{ marginBottom: 24 }}>
                {/* <h4 style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', margin: '1.5rem 0 1rem 0', color: '#16213e', letterSpacing: 0 }}>{monthName}</h4> */}
                <div style={{ display: 'grid',  gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, textAlign: 'center', marginBottom: 8 }}>
                    {weekDays.map((day, index) => (
                        <div key={index} style={{ fontWeight: 600, color: '#16213e', fontSize: 16, padding: '6px 0' }}>{day}</div>
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                    {days.map((date, index) => {
                        if (!date) {
                            return <div key={index} style={{ height: 40 }}></div>;
                        }
                        const isSelected = (tempStartDate && date.toDateString() === tempStartDate.toDateString()) || 
                                         (tempEndDate && date.toDateString() === tempEndDate.toDateString());
                        const isInRange = tempStartDate && tempEndDate && date > tempStartDate && date < tempEndDate;
                        const isToday = date.toDateString() === new Date().toDateString();
                        const isPast = date < new Date().setHours(0, 0, 0, 0);
                        const priceData = getPriceForDate(date);
                        let bg = '#f3f4f6', color = '#16213e', border = 'none';
                        if (isPast) {
                            bg = '#f3f4f6'; color = '#bdbdbd';
                        } else if (isSelected) {
                            bg = '#fb923c'; color = '#fff'; border = '2px solid #f97316';
                        } else if (isInRange) {
                            bg = '#ffe0b2'; color = '#fb923c';
                        } else if (isToday) {
                            bg = '#2563eb'; color = '#fff';
                        } else if (priceData.level === 'high') {
                            bg = '#fee2e2'; color = '#dc2626';
                        } else if (priceData.level === 'medium') {
                            bg = '#fef3c7'; color = '#f59e42';
                        } else if (priceData.level === 'low') {
                            bg = '#d1fae5'; color = '#059669';
                        }
                        return (
                            <button
                                key={index}
                                disabled={isPast}
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 8,
                                    fontWeight: 600,
                                    fontSize: 16,
                                    background: bg,
                                    color: color,
                                    border: border,
                                    outline: isSelected ? '2px solid #fb923c' : 'none',
                                    cursor: isPast ? 'not-allowed' : 'pointer',
                                    transition: 'background 0.15s, color 0.15s',
                                    boxShadow: isSelected ? '0 0 0 2px #fb923c' : 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onClick={() => !isPast && handleDateSelect(date)}
                            >
                                {date.getDate()}
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
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showCalendar]);

    const handleSearch = () => {
        const filters = {
            brand: selectedBrand || "",
            model: modelSearch || "",
            city: localisation === 'same' ? selectedCity || "" : "",
            depart: localisation === 'different' ? selectedDepart || "" : "",
            depot: localisation === 'different' ? selectedDepot || "" : "",
            startDate: startDate,
            endDate: endDate,
            startHour: startHour,
            endHour: endHour,
            promotion: promotion
        };
        // Check if any filters are active
        const hasActiveFilters = selectedBrand || modelSearch || selectedCity || selectedDepart || selectedDepot || startDate || endDate || startHour || endHour || promotion;
        setFiltersApplied(hasActiveFilters);
        onFiltersChange(filters);
    };

    const clearAllFilters = () => {
        setSearch("");
        setSelectedBrand("");
        setModelSearch("");
        setCitySearch("");
        setSelectedCity("");
        setDepartSearch("");
        setSelectedDepart("");
        setDepotSearch("");
        setSelectedDepot("");
        setStartDate(null);
        setEndDate(null);
        setStartHour("");
        setEndHour("");
        setPromotion(false);
        setShowDropDown(false);
        setShowModelDropDown(false);
        setShowCityDropDown(false);
        setShowDepartDropDown(false);
        setShowDepotDropDown(false);
        setFiltersApplied(false);
        // Apply empty filters immediately
        onFiltersChange({
            brand: "",
            model: "",
            city: "",
            depart: "",
            depot: "",
            startDate: null,
            endDate: null,
            startHour: "",
            endHour: "",
            promotion: false
        });
    };

    return (
        <>
            <aside style={{
                width: isMobile ? '100%' : '300px',
                height: isMobile ? 'fit-content' : 'fit-content',
                overflowY: isMobile ? 'auto' : 'visible',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#fff',
                marginTop: isMobile ? '0' : '47px',
                marginLeft: isMobile ? '0' : '20px',
                padding: '5px',
            }}>
            {/* Marque Filter */}
            <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e',  marginLeft: isMobile ? '-20px' : '-20px' }}>{t[lang].sideBar.brand.title}</div>
                <div style={{ position: 'relative' }}>
                    <input 
                        className="filter-input"
                        type="text"
                        placeholder={t[lang].sideBar.brand.placeholder}
                        style={{ 
                            width: '100%', 
                            height: '48px', 
                            background: '#ffffffff', 
                            fontFamily: 'Roboto, sans-serif', 
                            borderRadius: 6, 
                            fontSize: '1rem', 
                            outline: 'none', 
                            marginBottom: -10, 
                            fontWeight: 500, 
                            color: '#222', 
                            marginTop: -10, 
                            marginLeft: (lang === "ar") ? -30 : -30, 
                            padding: (lang === "ar") ? '0.75rem 0rem' : '0.75rem 0.7rem',

                        }}
                        value={search}
                        onChange={handleChange}
                        onFocus={() => setShowDropDown(true)}
                    />
                    {showDropDown && filteredOptions.length > 0 && (
                        <div style={{ position: 'absolute', top: '160%', left: -25, right: (lang === "ar") ? -25 : 0, background: '#fff', borderRadius: '0 0 8px 8px', overflowY: 'auto', zIndex: 10, width: isMobile ? '114%' : '279px', maxHeight: '385px', padding: '0.7rem 0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)'}}>
                            {filteredOptions.map((car, index) => (
                                <div
                                    key={index}
                                    style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500, width: isMobile ? '85%' : '80%', height: '34px', gap: '10%', marginLeft: '10%', background: 'transparent', transition: 'background 0.15s', color: '#222', borderRadius: 9}}
                                    onMouseEnter={e => e.currentTarget.style.background = '#fffff3ff'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    onClick={() => handleOptionSelect(car)}
                                >
                                    {car}
                                </div>
                            ))}
                        </div>
                    )}
                    {showDropDown && (
                        <div 
                            style={{ position: 'fixed', inset: 0, zIndex: 5 }}
                            onClick={() => setShowDropDown(false)}
                        ></div>
                    )}
                </div>
            </div>

            {/* Modèle Filter - Only show when brand is selected */}
            {selectedBrand && availableModels.length > 0 && (
                <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                    <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>{t[lang].sideBar.model.title}</div>
                    <div style={{ position: 'relative' }}>
                        <input 
                            type="text"
                            placeholder={t[lang].sideBar.model.placeholder}
                            style={{ width: '100%', height: '48px', background: '#ffffffff', borderRadius: 6, padding: (lang === "ar") ? '0.75rem 0rem' : '0.75rem 1rem', fontSize: '1rem', outline: 'none', marginBottom: 0, fontWeight: 500, color: '#222',  marginLeft: isMobile ? '-35px' : '-35px', fontFamily: 'Roboto, sans-serif' }}
                            value={modelSearch}
                            onChange={handleModelChange}
                            onFocus={() => setShowModelDropDown(true)}
                        />
                        {showModelDropDown && filteredModels.length > 0 && (
                            <div style={{ position: 'absolute', top: '140%', left: -23, right: (lang === "ar") ? -25 : 0, background: '#fff', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', maxHeight: '12rem', overflowY: 'auto', zIndex: 10, width: isMobile ? '350px' : '289px' }}>
                                {filteredModels.map((model, index) => (
                                    <div
                                        key={index}
                                        style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.9rem', width: '80%', height: '35px', gap: '10%', marginLeft: '10%', background: 'transparent', transition: 'background 0.15s', color: '#222', borderRadius: 9}}
                                        onMouseEnter={e => e.currentTarget.style.background = '#fffff3ff'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        onClick={() => handleModelSelect(model)}
                                    >
                                        {model}
                                    </div>
                                ))}
                            </div>
                        )}
                        {showModelDropDown && (
                            <div 
                                style={{ position: 'fixed', inset: 0, zIndex: 5 }}
                                onClick={() => setShowModelDropDown(false)}
                            ></div>
                        )}
                    </div>
                </div>
            )}

            {/* Période Filter (Calendar Trigger) */}
            <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', position: 'relative', background: '#fff' }}>
            <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>{t[lang].rental.period}</div>
                <div 
                    className="filter-date"
                    style={{ background: '#ffffffff', borderRadius: '6px', padding: '0.75rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'fit-content', boxShadow: '0px 0px 8px rgba(0,0,0,0.09)', marginTop: '14px', marginLeft: isMobile ? '-20px' : '-20px', position: 'relative' }}
                    onClick={() => openCalendar()}
                >
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center', color: '#fd861dff' }}>
                        <div style={{ minWidth: 60, display: 'flex', flexDirection: endDate ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', gap: endDate ? '' : '0.5rem', marginRight: endDate ? 0 : -30 }}>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>{startDate ? formatDayName(startDate) : t[lang].rental.startDate}</div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: endDate ? 'column' : 'row',
                                gap: endDate ? '0' : '1.9rem',
                            }}>
                                <div style={{ fontSize: '1rem', fontWeight: 600 , marginLeft: endDate ? -0 : 0}}>{startDate ? formatDateForDisplay(startDate) : '--/--'}</div>
                                {/* Show pickup time under date for multi-day rentals */}
                                {(
                                    <div style={{ 
                                        fontSize: endDate ? '0.7rem' : '1.0rem', 
                                        color: '#9ca3af', 
                                        marginTop: '2px',
                                        transform: startHour ? 'translateY(0)' : 'translateY(-10px)',
                                        opacity: startHour ? 1 : 0,
                                        pointerEvents: startHour ? 'auto' : 'none',
                                        transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)'
                                    }}>{startHour}</div>
                                )}
                            </div>
                        </div>
                        
                        { (
                            <div style={{
                                display: 'flex',
                                gap: '0.5rem',
                                alignItems: 'center',
                                transform: endDate ? 'translateX(0)' : 'translateX(-100px)',
                                opacity: endDate ? 1 : 0,
                                pointerEvents: endDate ? 'auto' : 'none',
                                transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)'
                            }}>
                                <div style={{ margin: '0 0.5rem', color: '#9ca3af', fontWeight: 700, fontSize: 18 }}>-</div>
                                <div style={{minWidth: 60, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>{endDate ? formatDayName(endDate) : t[lang].rental.endDate}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 600 }}>{endDate ? formatDateForDisplay(endDate) : '--/--'}</div>
                                    {/* Show dropoff time under date for multi-day rentals */}
                                    {(
                                        <div style={{ 
                                            fontSize: endDate ? '0.7rem' : '1.0rem', 
                                            color: '#9ca3af', 
                                            marginTop: '2px',
                                            transform: endHour ? 'translateY(0)' : 'translateY(-10px)',
                                            opacity: endHour ? 1 : 0,
                                            pointerEvents: endHour ? 'auto' : 'none',
                                            transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)'
                                        }}>{endHour}</div>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        <svg style={{ width: 20, height: 20, color: '#fd861dff' }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Pickup / Drop-off Section */}
            <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>{t[lang].rental.dropoffLocation}</div>
                <div className="filter-date" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ width: '100%', maxWidth: 240, marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>
                        <CustomDropdown
                            value={localisation}
                            onChange={setLocalisation}
                            placeholder={t[lang].rental.selectPlaceholder}
                            options={[
                                { value: 'same', label: t[lang].rental.sameLocation },
                                { value: 'different', label: t[lang].rental.differentLocation }
                            ]}
                        />
                    </div>
                    {/* City dropdown for 'same' location */}
                    {localisation === 'same' && (
                        <div style={{ position: 'relative' }}>
                            <input
                                className="filter-input"
                                type="text"
                                placeholder={t[lang].rental.cityPlaceholder}
                                style={{ marginBottom: 0, background: '#ffffffff', fontFamily: 'Roboto, sans-serif', borderRadius: 6, fontSize: 15, fontWeight: 500, color: '#222', marginLeft: isMobile ? '-30px' : '-30px' }}
                                value={citySearch}
                                onChange={e => { setCitySearch(e.target.value); setShowCityDropDown(true); }}
                                onFocus={() => setShowCityDropDown(true)}
                            />
                            {showCityDropDown && filteredCities.length > 0 && (
                                <div style={{ position: 'absolute', top: '140%', left: -23, right: (lang === "ar") ? -25 : 0, background: '#fff', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', maxHeight: '12rem', overflowY: 'auto', zIndex: 10, width: isMobile ? '350px' : '289px' }}>
                                    {filteredCities.map((city, index) => (
                                        <div
                                            key={index}
                                            style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.9rem', width: '80%', height: '35px', gap: '10%', marginLeft: '10%', background: 'transparent', transition: 'background 0.15s', color: '#222', borderRadius: 9}}
                                            onMouseEnter={e => e.currentTarget.style.background = '#fffff3ff'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                            onClick={() => { setSelectedCity(city); setCitySearch(city); setShowCityDropDown(false); }}
                                        >
                                            {translateCity(city)}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {showCityDropDown && (
                                <div 
                                    style={{ position: 'fixed', inset: 0, zIndex: 5 }}
                                    onClick={() => setShowCityDropDown(false)}
                                ></div>
                            )}
                        </div>
                    )}
                    {/* For 'different' location, keep as is or implement similar dropdowns for both fields if needed */}
                    {localisation === 'different' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ flex: 1, position: 'relative', marginTop: '10px' }}>
                                <div className="date-label" style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Roboto, sans-serif', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>{t[lang].rental.departureLabel}</div>
                                <input
                                    className="filter-input"
                                    type="text"
                                    placeholder={t[lang].rental.cityPlaceholder}
                                    style={{ marginBottom: 0, background: '#ffffffff', fontFamily: 'Roboto, sans-serif', borderRadius: 6, fontSize: 15, fontWeight: 500, color: '#222', marginTop: -10, marginLeft: isMobile ? '-30px' : '-30px' }}
                                    value={departSearch}
                                    onChange={e => { setDepartSearch(e.target.value); setShowDepartDropDown(true); }}
                                    onFocus={() => setShowDepartDropDown(true)}
                                />
                                {showDepartDropDown && filteredDeparts.length > 0 && (
                                    <div style={{ position: 'absolute', top: '125%', left: -23, right: 0, background: '#fff', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', maxHeight: '12rem', overflowY: 'auto', zIndex: 10, width: isMobile ? '115%' : '119%' }}>
                                        {filteredDeparts.map((city, index) => (
                                            <div
                                                key={index}
                                                style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.9rem', width: '80%', height: '35px', gap: '10%', marginLeft: '10%', background: 'transparent', transition: 'background 0.15s', color: '#222', borderRadius: 9}}
                                                onMouseEnter={e => e.currentTarget.style.background = '#fffff3ff'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                onClick={() => { setSelectedDepart(city); setDepartSearch(city); setShowDepartDropDown(false); }}
                                            >
                                                {translateCity(city)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {showDepartDropDown && (
                                    <div 
                                        style={{ position: 'fixed', inset: 0, zIndex: 5 }}
                                        onClick={() => setShowDepartDropDown(false)}
                                    ></div>
                                )}
                            </div>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <div className="date-label" style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Roboto, sans-serif', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>{t[lang].rental.returnLabel}</div>
                                <input
                                    className="filter-input"
                                    type="text"
                                    placeholder={t[lang].rental.cityPlaceholder}
                                    style={{ marginBottom: 0, background: '#ffffffff', fontFamily: 'Roboto, sans-serif', borderRadius: 6, fontSize: 15, fontWeight: 500, color: '#222', marginTop: -10, marginLeft: isMobile ? '-30px' : '-30px' }}
                                    value={depotSearch}
                                    onChange={e => { setDepotSearch(e.target.value); setShowDepotDropDown(true); }}
                                    onFocus={() => setShowDepotDropDown(true)}
                                />
                                {showDepotDropDown && filteredDepots.length > 0 && (
                                    <div style={{ position: 'absolute', top: '125%', left: -23, right: 0, background: '#fff', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', maxHeight: '12rem', overflowY: 'auto', zIndex: 10, width: isMobile ? '115%' : '119%' }}>
                                        {filteredDepots.map((city, index) => (
                                            <div
                                                key={index}
                                                style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.9rem', width: '80%', height: '35px', gap: '10%', marginLeft: '10%', background: 'transparent', transition: 'background 0.15s', color: '#222', borderRadius: 9}}
                                                onMouseEnter={e => e.currentTarget.style.background = '#fffff3ff'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                onClick={() => { setSelectedDepot(city); setDepotSearch(city); setShowDepotDropDown(false); }}
                                            >
                                                {translateCity(city)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {showDepotDropDown && (
                                    <div 
                                        style={{ position: 'fixed', inset: 0, zIndex: 5 }}
                                        onClick={() => setShowDepotDropDown(false)}
                                    ></div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Promotion Filter */}
            <div className="filter-section" style={{ padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>{t[lang].sideBar.promo.title}</div>
                <label className="promotion-label" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', color: '#222',marginLeft: isMobile ? '-20px' : '-20px' }}>
                    <input 
                        type="checkbox" 
                        checked={promotion}
                        onChange={(e) => setPromotion(e.target.checked)}
                        style={{ marginRight: '0.5rem', accentColor: '#fb923c', width: 18, height: 18 }}
                    />
                    <span>{t[lang].sideBar.promo.default}</span>
                </label>
            </div>

            {/* Calendar Modal */}
            
            {/* Search and Clear Buttons */}
            <div style={{ padding: '1rem 1rem 1.5rem 1rem', display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                <button 
                    onClick={() => {
                        handleSearch();
                        if (isMobile && onClose) onClose();
                    }}
                    style={{ width: '100%', background: '#374151', color: '#fff', padding: '0.75rem 1rem', borderRadius: '8px', fontWeight: 500, fontSize: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#ff8120'}
                    onMouseLeave={e => e.currentTarget.style.background = '#374151'}
                >
                    <svg style={{ width: 16, height: 16, marginRight: 8 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {t[lang].sideBar.search}
                </button>
                
                {/* Show Clear All button only when filters are applied */}
                {filtersApplied && (
                    <button 
                        onClick={() => {
                            clearAllFilters();
                            if (isMobile && onClose) onClose();
                        }}
                        style={{ width: '100%', background: '#f3f4f6', color: '#374151', padding: '0.75rem 1rem', borderRadius: '8px', fontWeight: 500, fontSize: '1rem', border: '1px solid #d1d5db', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#e5e7eb'; e.currentTarget.style.borderColor = '#9ca3af'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.borderColor = '#d1d5db'; }}
                    >
                        <svg style={{ width: 16, height: 16, marginRight: 8 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {t[lang].rental.reset}
                    </button>
                )}
            </div>
        </aside>

        {/* Calendar Modal - Rendered outside the aside using portal */}
        {createPortal(
            <div 
                style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    background: 'rgba(0, 0, 25, 0.40)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 99999,
                    opacity: showCalendar ? 1 : 0,
                    pointerEvents: showCalendar ? 'auto' : 'none',
                    transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1)'
                }}
                onClick={() => setShowCalendar(false)}
            >
                <div style={{ 
                    background: '#fff', 
                    borderRadius: '16px', 
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)', 
                    maxWidth: isMobile ? '90vw' : '28rem', 
                    width: isMobile ? '45vw' : '100%', 
                    margin: '0 1rem', 
                    maxHeight: '90vh', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transform: showCalendar ? 'scale(1)' : 'scale(0.95)',
                    opacity: showCalendar ? 1 : 0,
                    pointerEvents: showCalendar ? 'auto' : 'none',
                    transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s cubic-bezier(0.4,0,0.2,1)'
                }}
                onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ background: '#4ade80', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 500 }}>€</div>
                            <div style={{ background: '#fb923c', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 500 }}>€€</div>
                            <div style={{ background: '#f87171', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 500 }}>€€€</div>
                        </div>
                        <button 
                            onClick={() => setShowCalendar(false)}
                            style={{ color: '#9ca3af', background: 'none', border: 'none', borderRadius: '9999px', padding: '0.5rem', cursor: 'pointer', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#000000ff'}
                            onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                        >
                            <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* Month Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1rem 0rem 1rem' }}>
                        <button 
                            onClick={() => navigateMonth(lang === "ar" ? 1 : -1)}
                            style={{ padding: '0.5rem', borderRadius: '9999px', background: 'none', border: 'none', transition: 'background 0.2s', cursor: 'pointer' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                            <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 2 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={lang === "ar" ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                            </svg>
                        </button>
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ fontSize: '1.125rem', fontWeight: 600, textTransform: 'capitalize' }}>
                                {translateMonth(currentMonth.getMonth())} {currentMonth.getFullYear()}
                            </h4>
                        </div>
                        <button 
                            onClick={() => navigateMonth(lang === "ar" ? -1 : 1)}
                            style={{ padding: '0.5rem', borderRadius: '9999px', background: 'none', border: 'none', transition: 'background 0.2s', cursor: 'pointer' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                            <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 2 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={lang === "ar" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                            </svg>
                        </button>
                    </div>
                    {/* Calendar Content */}
                    <div style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
                        {renderMonth(currentMonth)}
                    </div>
                    {/* Footer */}
                    <div style={{ borderTop: '1px solid #e5e7eb', padding: '1rem', background: '#f9fafb' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.75rem', background: '#fff' }}>

                            <div style={{ fontSize: '0.95rem', flex: 1 }}>
                                <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.25rem' }}>{t[lang].rental.startDate}</label>
                                <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>
                                    {tempStartDate ? `${formatDayName(tempStartDate)} ${formatDateForDisplay(tempStartDate)}` : '--/--'}
                                </div>
                            </div>
                            
                            { tempEndDate && (
                                <div style={{
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between', 
                                    flex: 1, 
                                    marginLeft: '1rem', 
                                    marginRight: '1rem'
                                }}>
                                    <div style={{ width: 1, height: '3rem', background: '#e5e7eb', margin: '0 1rem' }}></div>
                                    <div style={{ fontSize: '0.95rem', flex: 1 }}>
                                        <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.25rem' }}>{t[lang].rental.endDate}</label>
                                        <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>
                                            {tempEndDate ? `${formatDayName(tempEndDate)} ${formatDateForDisplay(tempEndDate)}` : '--/--'}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Time Selection Section */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.75rem', background: '#fff' }}>
                            <div style={{ fontSize: '0.95rem', flex: 1 }}>
                                <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.5rem', fontWeight: 500 }}>{t[lang].rental.startHour}</label>
                                <div 
                                    onClick={() => setShowTimePicker('start')}
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.75rem', 
                                        borderRadius: '6px', 
                                        border: '1px solid #d1d5db', 
                                        fontSize: '1rem',
                                        background: '#fff',
                                        color: startHour ? '#374151' : '#9ca3af',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: '44px',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = '#fb923c'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = '#d1d5db'}
                                >
                                    {startHour || (t[lang].rental.selectHour)}
                                </div>
                            </div>
                            <div style={{ width: 1, height: '4rem', background: '#e5e7eb', margin: '0 1rem' }}></div>
                            <div style={{ fontSize: '0.95rem', flex: 1 }}>
                                <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.5rem', fontWeight: 500 }}>{t[lang].rental.endHour}</label>
                                <div 
                                    onClick={() => setShowTimePicker('end')}
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.75rem', 
                                        borderRadius: '6px', 
                                        border: '1px solid #d1d5db', 
                                        fontSize: '1rem',
                                        background: '#fff',
                                        color: endHour ? '#374151' : '#9ca3af',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: '44px',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = '#fb923c'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = '#d1d5db'}
                                >
                                    {endHour || (t[lang].rental.selectHour)}
                                </div>
                            </div>
                        </div>
                        
                        {/* Time validation message */}
                        {tempStartDate && tempEndDate && tempStartDate.toDateString() === tempEndDate.toDateString() && startHour && endHour && endHour <= startHour && (
                            <div style={{ 
                                background: '#fef2f2', 
                                border: '1px solid #fecaca', 
                                borderRadius: '6px', 
                                padding: '0.5rem', 
                                marginBottom: '1rem',
                                fontSize: '0.875rem',
                                color: '#dc2626'
                            }}>
                                {t[lang].rental.timeValidation || 'L\'heure de fin doit être après l\'heure de début pour le même jour.'}
                            </div>
                        )}
                        <button 
                            style={{ width: '100%', background: '#fb923c', color: '#fff', padding: '0.75rem 0', borderRadius: '8px', fontWeight: 500, fontSize: '1rem', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f97316'}
                            onMouseLeave={e => e.currentTarget.style.background = '#fb923c'}
                            onClick={confirmDateSelection}
                        >
                            {t[lang].rental.selectDates}
                        </button>
                    </div>
                    
                </div>
            </div>,
            document.body
        )}
        
        {/* Scrollable Time Picker Modal */}
        {createPortal(
            <div 
                style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    background: 'rgba(0, 0, 25, 0.40)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 99999,
                    opacity: showTimePicker ? 1 : 0,
                    pointerEvents: showTimePicker ? 'auto' : 'none',
                    transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1)'
                }}
                onClick={() => setShowTimePicker(null)}
            >
                <div style={{ 
                    background: '#fff', 
                    borderRadius: '20px', 
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)', 
                    width: isMobile ? '85vw' : '320px', 
                    maxHeight: '70vh', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transform: showTimePicker ? 'scale(1)' : 'scale(0.95)',
                    opacity: showTimePicker ? 1 : 0,
                    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)'
                }}
                onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div style={{ 
                        padding: '1.5rem 1.5rem 1rem 1.5rem', 
                        borderBottom: '1px solid #f1f5f9',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ 
                            fontSize: '1.125rem', 
                            fontWeight: 600, 
                            color: '#1e293b',
                            margin: 0
                        }}>
                            {showTimePicker === 'start' ? t[lang].rental.startHour : t[lang].rental.endHour}
                        </h3>
                        <button 
                            onClick={() => setShowTimePicker(null)}
                            style={{ 
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                color: '#94a3b8', 
                                background: 'none', 
                                border: 'none', 
                                borderRadius: '50%', 
                                width: '32px',
                                height: '32px',
                                cursor: 'pointer', 
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = '#f1f5f9';
                                e.currentTarget.style.color = '#475569';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'none';
                                e.currentTarget.style.color = '#94a3b8';
                            }}
                        >
                            <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Scrollable Time List */}
                    <div style={{ 
                        flex: 1, 
                        maxHeight: '300px',
                        overflowY: 'auto',
                        padding: '0.5rem 0'
                    }}>
                        {timeSlots.filter(time => {
                            // Apply same filtering logic for end time
                            if (showTimePicker === 'end' && tempStartDate && tempEndDate && 
                                tempStartDate.toDateString() === tempEndDate.toDateString() && startHour) {
                                return time > startHour;
                            }
                            return true;
                        }).map((time, index) => {
                            const isSelected = (showTimePicker === 'start' && startHour === time) || 
                                             (showTimePicker === 'end' && endHour === time);
                            return (
                                <div
                                    key={index}
                                    style={{ 
                                        padding: '1rem 1.5rem', 
                                        cursor: 'pointer', 
                                        fontSize: '1.1rem', 
                                        fontWeight: isSelected ? 600 : 500,
                                        background: isSelected ? '#fef3c7' : 'transparent',
                                        color: isSelected ? '#f59e0b' : '#374151',
                                        borderLeft: isSelected ? '4px solid #f59e0b' : '4px solid transparent',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onMouseEnter={e => {
                                        if (!isSelected) {
                                            e.currentTarget.style.background = '#f8fafc';
                                            e.currentTarget.style.color = '#1e293b';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!isSelected) {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = '#374151';
                                        }
                                    }}
                                    onClick={() => {
                                        if (showTimePicker === 'start') {
                                            setStartHour(time);
                                        } else {
                                            setEndHour(time);
                                        }
                                        setShowTimePicker(null);
                                    }}
                                >
                                    {time}
                                    {isSelected && (
                                        <svg style={{ width: 20, height: 20, marginLeft: 8 }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>,
            document.body
        )}
        </>
    );
}