import { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
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
    
    // Service types for mechanics
    const ServiceTypeList = [
        "Vidange", "Freinage", "Carrosserie", "Climatisation", 
        "Électricité", "Diagnostic", "Embrayage", "Transmission",
        "Suspension", "Peinture", "Échappement", "Amortisseurs"
    ];

    // Specialties for different service types
    const ServiceSpecialties = {
        "Vidange": ["Mécanique générale", "Vidange", "Filtres"],
        "Freinage": ["Freinage", "Mécanique générale"],
        "Carrosserie": ["Carrosserie", "Peinture"],
        "Climatisation": ["Climatisation", "Diagnostic électronique"],
        "Électricité": ["Électricité auto", "Diagnostic électronique"],
        "Diagnostic": ["Diagnostic électronique", "Électricité auto"],
        "Embrayage": ["Transmission", "Mécanique générale"],
        "Transmission": ["Transmission", "Suspensions", "Direction"],
        "Suspension": ["Suspensions", "Amortisseurs", "Direction"],
        "Peinture": ["Peinture", "Vitrage", "Carrosserie"],
        "Échappement": ["Échappement", "Mécanique générale"],
        "Amortisseurs": ["Amortisseurs", "Suspensions"]
    };

    const [showDropDown, setShowDropDown] = useState(false);
    const [showSpecialtyDropDown, setShowSpecialtyDropDown] = useState(false);
    const [showCityDropDown, setShowCityDropDown] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [specialtySearch, setSpecialtySearch] = useState("");
    const [citySearch, setCitySearch] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [urgentOnly, setUrgentOnly] = useState(false);
    const [availableToday, setAvailableToday] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [promotion, setPromotion] = useState(false);
    const [filtersApplied, setFiltersApplied] = useState(false);

    const handleChange = (e) => {
        setSearch(e.target.value);
        setShowDropDown(true);
    }

    const handleSpecialtyChange = (e) => {
        const value = e.target.value;
        setSpecialtySearch(value);
        setShowSpecialtyDropDown(value.trim().length > 0);
        
        // Clear selected specialty if input is empty
        if (value.trim() === "") {
            // Specialty search is already being cleared above
        }
    }

    const handleOptionSelect = (option) => {
        setSearch(option);
        setSelectedService(option);
        setShowDropDown(false);
        // Clear specialty selection when service changes
        setSpecialtySearch("");
    }

    const handleSpecialtySelect = (option) => {
        setSpecialtySearch(option);
        setShowSpecialtyDropDown(false);
    }


    // List of cities from car data (hardcoded for now, should match car data)
    const CityList = [
        "Casablanca", "Rabat", "Marrakech", "Agadir", "Fès", "Tanger"
    ];

    const filteredOptions = ServiceTypeList.filter(service => 
        service.toLowerCase().includes(search.toLowerCase())
    );

    const filteredCities = CityList.filter(city =>
        city.toLowerCase().includes(citySearch.toLowerCase())
    );

    // Get specialties for selected service
    const availableSpecialties = selectedService && ServiceSpecialties[selectedService] ? ServiceSpecialties[selectedService] : [];
    
    const filteredSpecialties = availableSpecialties.filter(specialty => 
        specialty.toLowerCase().includes(specialtySearch.toLowerCase())
    );

    const formatDate = (date) => {
        if (!date) return "";
        const locale = lang === 'ar' ? 'ar-SA' : 'fr-FR';
        return new Intl.DateTimeFormat(locale, {
            weekday: 'short',
            day: 'numeric',
            month: 'numeric'
        }).format(date);
    };

    const formatDateForDisplay = (date) => {
        if (!date) return "";
        const locale = lang === 'ar' ? 'ar-SA' : 'fr-FR';
        return new Intl.DateTimeFormat(locale, {
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
                        const isSelected = (startDate && date.toDateString() === startDate.toDateString()) || 
                                         (endDate && date.toDateString() === endDate.toDateString());
                        const isInRange = startDate && endDate && date > startDate && date < endDate;
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
                        } else {
                            bg = '#fef3c7'; color = '#f59e42';
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
            service: selectedService || "",
            specialty: specialtySearch || "",
            city: selectedCity || "",
            priceRange: priceRange,
            startDate: startDate,
            endDate: endDate,
            urgentOnly: urgentOnly,
            availableToday: availableToday,
            promotion: promotion
        };
        // Check if any filters are active
        const hasActiveFilters = selectedService || specialtySearch || selectedCity || startDate || endDate || urgentOnly || availableToday || promotion || priceRange[0] > 0 || priceRange[1] < 1000;
        setFiltersApplied(hasActiveFilters);
        onFiltersChange(filters);
    };

    const clearAllFilters = () => {
        setSearch("");
        setSelectedService("");
        setSpecialtySearch("");
        setCitySearch("");
        setSelectedCity("");
        setPriceRange([0, 1000]);
        setUrgentOnly(false);
        setAvailableToday(false);
        setStartDate(null);
        setEndDate(null);
        setPromotion(false);
        setShowDropDown(false);
        setShowSpecialtyDropDown(false);
        setShowCityDropDown(false);
        setFiltersApplied(false);
        // Apply empty filters immediately
        onFiltersChange({
            service: "",
            specialty: "",
            city: "",
            priceRange: [0, 1000],
            startDate: null,
            endDate: null,
            urgentOnly: false,
            availableToday: false,
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
            {/* {isMobile && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#fff',
                    borderBottom: '1px solid #e5e7eb',
                }}>
                    <h2 style={{ fontSize: '1.325rem', fontWeight: 600 }}>Filtrer les voitures</h2>
                    <button 
                        onClick={onClose}
                        style={{ color: '#9ca3af', background: 'none', border: 'none', borderRadius: '9999px', padding: '0.5rem', cursor: 'pointer', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fb923c'}
                        onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                    >
                        <svg style={{ width: 24, height: 24, }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )} */}

            {/* Service Type Filter */}
            <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e',  marginLeft: isMobile ? '-20px' : '-20px' }}>Type de service</div>
                <div style={{ position: 'relative' }}>
                    <input 
                        className="filter-input"
                        type="text"
                        placeholder="Choisir un service..."
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
                            {filteredOptions.map((service, index) => (
                                <div
                                    key={index}
                                    style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500, width: isMobile ? '85%' : '80%', height: '34px', gap: '10%', marginLeft: '10%', background: 'transparent', transition: 'background 0.15s', color: '#222', borderRadius: 9}}
                                    onMouseEnter={e => e.currentTarget.style.background = '#fffff3ff'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    onClick={() => handleOptionSelect(service)}
                                >
                                    {service}
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

            {/* Specialty Filter - Only show when service is selected */}
            {selectedService && availableSpecialties.length > 0 && (
                <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                    <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>Spécialité</div>
                    <div style={{ position: 'relative' }}>
                        <input 
                            type="text"
                            placeholder="Choisir une spécialité..."
                            style={{ width: '100%', height: '48px', background: '#ffffffff', borderRadius: 6, padding: (lang === "ar") ? '0.75rem 0rem' : '0.75rem 1rem', fontSize: '1rem', outline: 'none', marginBottom: 0, fontWeight: 500, color: '#222',  marginLeft: isMobile ? '-35px' : '-35px', fontFamily: 'Roboto, sans-serif' }}
                            value={specialtySearch}
                            onChange={handleSpecialtyChange}
                            onFocus={() => setShowSpecialtyDropDown(true)}
                        />
                        {showSpecialtyDropDown && filteredSpecialties.length > 0 && (
                            <div style={{ position: 'absolute', top: '140%', left: -23, right: (lang === "ar") ? -25 : 0, background: '#fff', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', maxHeight: '12rem', overflowY: 'auto', zIndex: 10, width: isMobile ? '350px' : '289px' }}>
                                {filteredSpecialties.map((specialty, index) => (
                                    <div
                                        key={index}
                                        style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.9rem', width: '80%', height: '35px', gap: '10%', marginLeft: '10%', background: 'transparent', transition: 'background 0.15s', color: '#222', borderRadius: 9}}
                                        onMouseEnter={e => e.currentTarget.style.background = '#fffff3ff'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        onClick={() => handleSpecialtySelect(specialty)}
                                    >
                                        {specialty}
                                    </div>
                                ))}
                            </div>
                        )}
                        {showSpecialtyDropDown && (
                            <div 
                                style={{ position: 'fixed', inset: 0, zIndex: 5 }}
                                onClick={() => setShowSpecialtyDropDown(false)}
                            ></div>
                        )}
                    </div>
                </div>
            )}

            {/* Date Range Filter (for appointment scheduling) */}
            <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', position: 'relative', background: '#fff' }}>
            <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>Disponibilité</div>
                <div 
                    className="filter-date"
                    style={{ background: '#ffffffff', borderRadius: '6px', padding: '0.75rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 58, boxShadow: '0px 0px 8px rgba(0,0,0,0.09)', marginTop: '14px', marginLeft: isMobile ? '-20px' : '-20px', position: 'relative' }}
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center', color: '#16213e' }}>
                        <div style={{ flex: 1, minWidth: 60 }}>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>{startDate ? formatDayName(startDate) : "Date début"}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>{startDate ? formatDateForDisplay(startDate) : '--/--'}</div>
                        </div>
                        <div style={{ margin: '0 0.5rem', color: '#9ca3af', fontWeight: 700, fontSize: 18 }}>-</div>
                        <div style={{ flex: 1, minWidth: 60 }}>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>{endDate ? formatDayName(endDate) : "Date fin"}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>{endDate ? formatDateForDisplay(endDate) : '--/--'}</div>
                        </div>
                        <svg style={{ width: 20, height: 20, color: '#9ca3af', marginLeft: 12 }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Location Filter */}
            <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>Localisation</div>
                <div style={{ position: 'relative' }}>
                    <input
                        className="filter-input"
                        type="text"
                        placeholder="Choisir une ville..."
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
            </div>

            {/* Price Range Filter */}
            <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>Budget (MAD)</div>
                <div style={{ marginLeft: isMobile ? '-20px' : '-20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        <span>{priceRange[0]} MAD</span>
                        <span>{priceRange[1]} MAD</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        style={{ width: '100%', accentColor: '#fb923c' }}
                    />
                </div>
            </div>

            {/* Quick Filters */}
            <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>Filtres rapides</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: isMobile ? '-20px' : '-20px' }}>
                    <label className="filter-checkbox" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', color: '#222' }}>
                        <input 
                            type="checkbox" 
                            checked={urgentOnly}
                            onChange={(e) => setUrgentOnly(e.target.checked)}
                            style={{ marginRight: '0.5rem', accentColor: '#fb923c', width: 18, height: 18 }}
                        />
                        <span>Interventions urgentes uniquement</span>
                    </label>
                    <label className="filter-checkbox" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', color: '#222' }}>
                        <input 
                            type="checkbox" 
                            checked={availableToday}
                            onChange={(e) => setAvailableToday(e.target.checked)}
                            style={{ marginRight: '0.5rem', accentColor: '#fb923c', width: 18, height: 18 }}
                        />
                        <span>Disponible aujourd'hui</span>
                    </label>
                </div>
            </div>

            {/* Promotion Filter */}
            <div className="filter-section" style={{ padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '-20px' : '-20px' }}>Promotions</div>
                <label className="promotion-label" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', color: '#222',marginLeft: isMobile ? '-20px' : '-20px' }}>
                    <input 
                        type="checkbox" 
                        checked={promotion}
                        onChange={(e) => setPromotion(e.target.checked)}
                        style={{ marginRight: '0.5rem', accentColor: '#fb923c', width: 18, height: 18 }}
                    />
                    <span>Offres promotionnelles uniquement</span>
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
                    Rechercher
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
                        Effacer tout
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
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0.5rem 1rem' }}>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2rem 1rem' }}>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.75rem', background: '#fff' }}>
                            <div style={{ fontSize: '0.95rem', flex: 1 }}>
                                <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.25rem' }}>Date début</label>
                                <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>
                                    {startDate ? `${formatDayName(startDate)} ${formatDateForDisplay(startDate)}` : '--/--'}
                                </div>
                            </div>
                            <div style={{ width: 1, height: '3rem', background: '#e5e7eb', margin: '0 1rem' }}></div>
                            <div style={{ fontSize: '0.95rem', flex: 1 }}>
                                <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.25rem' }}>Date fin</label>
                                <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>
                                    {endDate ? `${formatDayName(endDate)} ${formatDateForDisplay(endDate)}` : '--/--'}
                                </div>
                            </div>
                        </div>
                        <button 
                            style={{ width: '100%', background: '#fb923c', color: '#fff', padding: '0.75rem 0', borderRadius: '8px', fontWeight: 500, fontSize: '1rem', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f97316'}
                            onMouseLeave={e => e.currentTarget.style.background = '#fb923c'}
                            onClick={() => setShowCalendar(false)}
                        >
                            Sélectionner les dates
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        )}
        </>
    );
}