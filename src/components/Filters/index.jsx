// import { useState, useEffect } from "react";
// import CustomDropdown from "../customDropDown";

// export default function Filters({ onFiltersChange, isMobile = false, onClose }) {
//     const [brand, setBrand] = useState("");
//     const [model, setModel] = useState("");
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [promotion, setPromotion] = useState(false);
//     const [localisation, setLocalisation] = useState("same");
//     const [selectFocused, setSelectFocused] = useState(false);

//     // Update parent whenever filters change
//     useEffect(() => {
//         const filters = {
//             brand,
//             model,
//             startDate: startDate ? new Date(startDate) : null,
//             endDate: endDate ? new Date(endDate) : null,
//             promotion
//         };
//         onFiltersChange && onFiltersChange(filters);
//     }, [brand, model, startDate, endDate, promotion, onFiltersChange]);

//     const handleSearch = () => {
//         // Trigger search - filters are already being sent via useEffect
//         if (isMobile && onClose) {
//             onClose();
//         }
//     };

//     return (
//         <aside 
//             className="mainFilters" 
//             style={{
//                 width: isMobile ? '100%' : 'fit-content',
//                 height: isMobile ? 'fit-content' : 'fit-content',
//                 minWidth: isMobile ? 'auto' : '350px',
//                 maxHeight: isMobile ? '100vh' : '85vh',
//                 boxShadow: isMobile ? 'none' : '0px 0px 10px rgba(5, 5, 0, 0.124)',
//                 marginBottom: isMobile ? '50px' : '20px',
//                 backgroundColor: isMobile ? '#fff' : '#f9f9f9',

//             }}
//         >
//             {isMobile && (
//                 <div style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     marginBottom: '1.5rem',    // mb-6 = 24px = 1.5rem
//                     paddingBottom: '1rem',     // pb-4 = 16px = 1rem
//                     borderBottom: '1px solid #e5e7eb', // border-b (Tailwind gray-200)
//                 }}>
//                     <h2 style={{
//                         fontSize: '1.85rem',   // text-xl
//                         fontWeight: 600        // font-semibold
//                     }}>Filtres</h2>
//                     <button
//                         onClick={onClose}
//                         className="filter-close-btn"
//                         style={{ color: 'black' }}
//                     >
//                         <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>
//             )}

//             {/* Brand Filter */}
//             <div className="filter-section">
//                 <h5 className="filter-label">Marque</h5>
//                 <input 
//                     className="filter-input" 
//                     type="text" 
//                     placeholder="Ex: Dacia" 
//                     value={brand}
//                     onChange={(e) => setBrand(e.target.value)}
//                 />
//             </div>

//             {/* Model Filter */}
//             {brand !== "" && (
//                 <div className="filter-section">
//                     <h5 className="filter-label">Modèle</h5>
//                     <input 
//                         className="filter-input" 
//                         type="text" 
//                         placeholder="Ex: Golf" 
//                         value={model}
//                         onChange={(e) => setModel(e.target.value)}
//                     />
//                 </div>
//             )}
            

//             {/* Date Filter */}
//             <div className="filter-section">
//                 <div className="filter-label">Période</div>
//                 <div className="filter-date">
//                     <div className="date-label">Début</div>
//                     <input 
//                         className="date-picker" 
//                         type="date" 
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         min={new Date().toISOString().split('T')[0]}
//                     />
//                     <div className="date-label">Fin</div>
//                     <input 
//                         className="date-picker" 
//                         type="date" 
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                         min={startDate || new Date().toISOString().split('T')[0]}
//                     />
//                 </div>
//             </div>

//             {/* Location Dropoff */}
//             <div className="filter-section">
//                 <div className="filter-label">Pickup / Drop-off</div>
//                 <div className="filter-date">
//                     <CustomDropdown value={localisation} onChange={setLocalisation} options={[
//                         { value: "same", label: "Same drop-off" },
//                         { value: "different", label: "Different drop-off" }
//                     ]} />
//                     {localisation === "same" && (
//                         <>
//                             <input className="filter-input" type="text" placeholder="Ex: Rabat"/>
//                         </>
//                     )}
//                     {localisation === "different" && (
//                         <>
//                             <div className="date-label">Départ</div>
//                             <input className="filter-input" type="text" placeholder="Ex: Rabat"/>
//                             <div className="date-label">Lieu de dépôt</div>
//                             <input className="filter-input" type="text" placeholder="Ex: Casablanca"/>
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* Promotion Checkbox */}
//             <div className="filter-section">
//                 <div className="filter-label">Promotion</div>
//                 <label className="promotion-label">
//                     <input 
//                         type="checkbox"
//                         checked={promotion}
//                         onChange={(e) => setPromotion(e.target.checked)}
//                         style={{ marginRight: "0.5rem"}}
//                     />
//                     <span>Oui</span>
//                 </label>
//             </div>

//             {/* Search Button */}
//             <button 
//                 className="filter-button" 
//                 onClick={() => {
//                     handleSearch();
//                     if (isMobile && onClose) onClose();
//             }}>
//                 <i className="icon-search" style={{ marginRight: 10 }} />
//                 Rechercher
//             </button>
//         </aside>
//     );
// }
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import CustomDropdown from "../customDropDown";

export default function Filters({ onFiltersChange, isMobile = false, onClose }) {
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
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Current date instead of fixed July 2025
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

    // --- Fix Calendar Grid Rendering ---
    const renderMonth = (monthDate) => {
        const monthName = monthDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        const days = getDaysInMonth(monthDate);
        const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        return (
            <div key={monthDate.getTime()} style={{ marginBottom: 24 }}>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', margin: '1.5rem 0 1rem 0', color: '#16213e', letterSpacing: 0 }}>{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h4>
                <div style={{ display: 'grid',  gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, textAlign: 'center', marginBottom: 8 }}>
                    {weekDays.map(day => (
                        <div key={day} style={{ fontWeight: 600, color: '#16213e', fontSize: 16, padding: '6px 0' }}>{day}</div>
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
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showCalendar]);

    const handleSearch = () => {
        const filters = {
            brand: selectedBrand || "",
            model: modelSearch || "",
            startDate: startDate,
            endDate: endDate,
            promotion: promotion
        };
        
        // Check if any filters are active
        const hasActiveFilters = selectedBrand || modelSearch || startDate || endDate || promotion;
        setFiltersApplied(hasActiveFilters);
        
        onFiltersChange(filters);
    };

    const clearAllFilters = () => {
        setSearch("");
        setSelectedBrand("");
        setModelSearch("");
        setStartDate(null);
        setEndDate(null);
        setPromotion(false);
        setShowDropDown(false);
        setShowModelDropDown(false);
        setFiltersApplied(false);
        
        // Apply empty filters immediately
        onFiltersChange({
            brand: "",
            model: "",
            startDate: null,
            endDate: null,
            promotion: false
        });
    };

    return (
        <>
            <aside style={{
                width: isMobile ? '100%' : '35px',
                minWidth: isMobile ? 'auto' : '280px',
                maxWidth: isMobile ? '100%' : '320px',
                height: isMobile ? 'fit-content' : 'fit-content',
                overflowY: isMobile ? 'auto' : 'visible',
                display: 'flex',
                flexDirection: 'column',
                background: '#fff',
                marginTop: isMobile ? '0' : '47px',
                marginLeft: isMobile ? '0' : '20px',
                padding: '0',
            }}>
            {isMobile && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#fff',
                    borderBottom: '1px solid #e5e7eb',
                }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Filtrer les voitures</h2>
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
            )}

            {/* Marque Filter */}
            <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', borderTop: isMobile ? 'none' : '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e',  marginLeft: isMobile ? '0' : '-20px' }}>Marque</div>
                <div style={{ position: 'relative' }}>
                    <input 
                        className="filter-input"
                        type="text"
                        placeholder="Ex: Dacia"
                        style={{ width: '100%', height: '48px', background: '#ffffffff', fontFamily: 'Roboto, sans-serif', borderRadius: 6, fontSize: '1rem', outline: 'none', marginBottom: -10, fontWeight: 500, color: '#222', marginTop: -10, marginLeft: isMobile ? '0' : '-30px' }}
                        value={search}
                        onChange={handleChange}
                        onFocus={() => setShowDropDown(true)}
                    />
                    {showDropDown && filteredOptions.length > 0 && (
                        <div style={{ position: 'absolute', top: '160%', left: -23, right: 0, background: '#fff', borderRadius: '0 0 8px 8px', overflowY: 'auto', zIndex: 10, width: '279px', maxHeight: '385px', padding: '0.7rem 0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)'}}>
                            {filteredOptions.map((car, index) => (
                                <div
                                    key={index}
                                    style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.9rem', width: '80%', height: '35px', gap: '10%', marginLeft: '10%', background: 'transparent', transition: 'background 0.15s', color: '#222', borderRadius: 9}}
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
                    <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', color: '#16213e', marginLeft: isMobile ? '0' : '-20px' }}>Modèle</div>
                    <div style={{ position: 'relative' }}>
                        <input 
                            // className="filter-input"
                            type="text"
                            placeholder="Ex: A3"
                            style={{ width: '100%', height: '48px', background: '#ffffffff', borderRadius: 6, padding: '0.75rem 1rem', fontSize: '1rem', outline: 'none', marginBottom: 0, fontWeight: 500, color: '#222',  marginLeft: isMobile ? '0' : '-35px', fontFamily: 'Roboto, sans-serif' }}
                            value={modelSearch}
                            onChange={handleModelChange}
                            onFocus={() => setShowModelDropDown(true)}
                        />
                        {showModelDropDown && filteredModels.length > 0 && (
                            <div style={{ position: 'absolute', top: '140%', left: -23, right: 0, background: '#fff', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', maxHeight: '12rem', overflowY: 'auto', zIndex: 10, width: '279px' }}>
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
            <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '0' : '-20px' }}>Période</div>
                <div 
                    className="filter-date"
                    style={{ background: '#ffffffff', borderRadius: '6px', padding: '0.75rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 58, boxShadow: '0px 0px 8px rgba(0,0,0,0.09)', marginTop: '14px', marginLeft: isMobile ? '0' : '-20px' }}
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center', color: '#16213e' }}>
                        <div style={{ flex: 1, minWidth: 60 }}>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>{startDate ? formatDayName(startDate) : 'Début'}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>{startDate ? formatDateForDisplay(startDate) : '--/--'}</div>
                        </div>
                        <div style={{ margin: '0 0.5rem', color: '#9ca3af', fontWeight: 700, fontSize: 18 }}>-</div>
                        <div style={{ flex: 1, minWidth: 60 }}>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>{endDate ? formatDayName(endDate) : 'Fin'}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>{endDate ? formatDateForDisplay(endDate) : '--/--'}</div>
                        </div>
                        <svg style={{ width: 20, height: 20, color: '#9ca3af', marginLeft: 12 }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Pickup / Drop-off Section */}
            <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '0' : '-20px' }}>Lieu de dépôt</div>
                <div className="filter-date" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ width: '100%', maxWidth: 240, marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '0' : '-20px' }}>
                        <CustomDropdown
                            value={localisation}
                            onChange={setLocalisation}
                            options={[
                                { value: 'same', label: 'Même lieu' },
                                { value: 'different', label: 'Lieu différent' }
                            ]}
                        />
                    </div>
                    {localisation === 'same' && (
                        <input
                            className="filter-input"
                            type="text"
                            placeholder="Ex: Rabat"
                            style={{ marginBottom: 0, background: '#ffffffff', fontFamily: 'Roboto, sans-serif', borderRadius: 6, fontSize: 15, fontWeight: 500, color: '#222', marginLeft: isMobile ? '0' : '-30px' }}
                        />
                    )}
                    {localisation === 'different' && (
                        <div style={{ display: 'flex', gap: 12 }}>
                            <div style={{ flex: 1 }}>
                                <div className="date-label" style={{ fontSize: 14, fontWeight: 500, fontFamily: 'Roboto, sans-serif', color: '#16213e', marginLeft: isMobile ? '0' : '-20px' }}>Départ</div>
                                <input
                                    className="filter-input"
                                    type="text"
                                    placeholder="Ex: Rabat"
                                    style={{ marginBottom: 0, background: '#ffffffff', fontFamily: 'Roboto, sans-serif', borderRadius: 6, fontSize: 15, fontWeight: 500, color: '#222', marginTop: -10, marginLeft: isMobile ? '0' : '-30px' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="date-label" style={{ fontSize: 14, fontWeight: 500, fontFamily: 'Roboto, sans-serif', color: '#16213e', marginLeft: isMobile ? '0' : '-20px' }}>Dépôt</div>
                                <input
                                    className="filter-input"
                                    type="text"
                                    placeholder="Ex: Tanger"
                                    style={{ marginBottom: 0, background: '#ffffffff', fontFamily: 'Roboto, sans-serif', borderRadius: 6, fontSize: 15, fontWeight: 500, color: '#222', marginTop: -10, marginLeft: isMobile ? '0' : '-30px' }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Promotion Filter */}
            <div className="filter-section" style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem 1.5rem 1rem 1.5rem', background: '#fff' }}>
                <div className="filter-label" style={{ fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: '1.1rem', marginBottom: '5px', marginTop: '-3px', color: '#16213e', marginLeft: isMobile ? '0' : '-20px' }}>Promotion</div>
                <label className="promotion-label" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', color: '#222' }}>
                    <input 
                        type="checkbox" 
                        checked={promotion}
                        onChange={(e) => setPromotion(e.target.checked)}
                        style={{ marginRight: '0.5rem', accentColor: '#fb923c', width: 18, height: 18 }}
                    />
                    <span>Oui</span>
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
                    zIndex: 9999,
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
                    width: isMobile ? '42vw' : '100%', 
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
                            onMouseEnter={e => e.currentTarget.style.color = '#fb923c'}
                            onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                        >
                            <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* Month Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <button 
                            onClick={() => navigateMonth(-1)}
                            style={{ padding: '0.5rem', borderRadius: '9999px', background: 'none', border: 'none', transition: 'background 0.2s', cursor: 'pointer' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                            <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 2 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ fontSize: '1.125rem', fontWeight: 600, textTransform: 'capitalize' }}>
                                {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                            </h4>
                        </div>
                        <button 
                            onClick={() => navigateMonth(1)}
                            style={{ padding: '0.5rem', borderRadius: '9999px', background: 'none', border: 'none', transition: 'background 0.2s', cursor: 'pointer' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                            <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 2 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                                <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.25rem' }}>Début</label>
                                <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>
                                    {startDate ? `${formatDayName(startDate)} ${formatDateForDisplay(startDate)}` : '--/--'}
                                </div>
                            </div>
                            <div style={{ width: 1, height: '3rem', background: '#e5e7eb', margin: '0 1rem' }}></div>
                            <div style={{ fontSize: '0.95rem', flex: 1 }}>
                                <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.25rem' }}>Fin</label>
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
                            Sélectionner ces dates
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        )}
        </>
    );
}