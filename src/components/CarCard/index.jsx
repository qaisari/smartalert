import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo, useContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { triggerValidation } from '@/features/ui/contactFormSlice';
import { store } from '@/store/store';
import { rentalCars } from '@/data/rentalCars';
import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";
import ContactForm from "./ContactForm";
import PaymentMethods from "./PaymentMethods";
import MetaComponent from "@/components/common/MetaComponent";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const metadata = {
  title: "Location || SmartAlert",
  description: "SmartAlert - Location Page",
};

// Small inline badge to represent insurance type
// type: 'plus' | 'basic' | 'none'
const InsuranceLogo = ({ type, size = 22 }) => {
    const palette = {
        plus: { bg: '#F59E0B', fg: '#ffffff' },     // amber
        basic: { bg: '#2563EB', fg: '#ffffff' },    // blue
        none: { bg: '#9CA3AF', fg: '#ffffff' }      // gray
    };
    const { bg, fg } = palette[type] || palette.none;
        return (
            <span style={{ display: 'inline-flex', width: size, height: size }} aria-hidden="true">
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Filled shield without outer circle */}
                <path d="M12 5l5 2v4c0 4-5 6.5-5 6.5S7 15 7 11V7l5-2z" fill={bg} stroke="#000" strokeOpacity="0.08" strokeWidth="0.8" strokeLinejoin="round" />
                {/* Mark (check for covered, dash for none) */}
                {type === 'none' ? (
                    <path d="M9 12h6" stroke={fg} strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                    <path d="M9 12.5l2 2 4-4.5" fill="none" stroke={fg} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                )}
            </svg>
        </span>
    );
};

export default function CarCard() {
    const dispatch = useDispatch();
    const { lang } = useContext(LanguageContext);
    const { state } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [backButtonHovered, setBackButtonHovered] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [showAllSpecs, setShowAllSpecs] = useState(false);
    const [insurancePlan, setInsurancePlan] = useState('none'); // 'plus' | 'basic' | 'none'
    const [hoveredPlan, setHoveredPlan] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageLeftButtonHovered, setImageLeftButtonHovered] = useState(false);
    const [imageRightButtonHovered, setImageRightButtonHovered] = useState(false);
    const [open, setOpen] = useState(false);
    // Responsive breakpoint: stack on tablets/phones
    const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const onResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    const isSmallScreen = viewportWidth < 1024;
    // Centered layout gutters and fixed header metrics
    const targetContentWidth = 1240;
    const maxGutter = 200;
    const minGutter = 16;
    const computedGutter = Math.max(minGutter, Math.min(maxGutter, Math.floor((viewportWidth - targetContentWidth) / 2)));
    const headerHeight = 100; // match fixed header height above
    const bottomBarHeight = 72;

    const car = useMemo(() => {
        if (state?.car && String(state.car.id) === String(id)) return state.car;
        return rentalCars.find(c => String(c.id) === String(id));
    }, [state, id]);

    const filters = state?.filters || {};

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

    const formatDate = (date) => {
        if (!date) return '';
        console.log('this is date: ',date.getDate());
        return (
            <p>{date.getDate()}</p>
        );
    }

    const formatDateForDisplay = (date) => {
        if(!date) return "";
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    };


    if (!car) {
    return (
        <div style={{ padding: 32 }}>
        <p>Car not found.</p>
        <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
    }

    const startDate = state?.filters?.startDate || null;
    const endDate = state?.filters?.endDate || null;
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysCount = startDate && endDate ? Math.max(1, Math.ceil((endDate - startDate) / msPerDay)) : 0;

    // Insurance plans (prices in local currency per day). Adjust to match your business rules.
    const insurancePlans = [
        {
            id: 'plus',
            name: t[lang]?.rental?.insurancePlans?.plus?.name || 'Assurance Plus',
            pricePerDay: 40, // e.g., 40 dh / jour
            features: [
                t[lang]?.rental?.insurancePlans?.plus?.f1 || "Couverture de tous les dommages\nSans dépôt de garantie",
                t[lang]?.rental?.insurancePlans?.plus?.f2 || "Annulation du voyage (maladie, accident, décès)",
                t[lang]?.rental?.insurancePlans?.plus?.f3 || "Services d'assistance",
            ]
        },
        {
            id: 'basic',
            name: t[lang]?.rental?.insurancePlans?.basic?.name || 'Assurance Basique',
            pricePerDay: 20, // e.g., 20 dh / jour
            features: [
                t[lang]?.rental?.insurancePlans?.basic?.f1 || "Couverture de tous les dommages au-delà de la franchise",
                `${t[lang]?.rental?.insurancePlans?.securityDeposit || 'Dépôt de garantie'}: 1000${t[lang].rentals.currency}`,
                t[lang]?.rental?.insurancePlans?.basic?.f3 || "Annulation du voyage (maladie, accident, décès)",
                t[lang]?.rental?.insurancePlans?.basic?.f4 || "Services d'assistance"
            ]
        },
        {
            id: 'none',
            name: t[lang]?.rental?.insurancePlans?.none?.name || 'Sans assurance',
            pricePerDay: 0,
            features: [
                t[lang]?.rental?.insurancePlans?.none?.f1 || "Ne couvre pas les dommages, mais couvre les dommages aux autres véhicules",
                `${t[lang]?.rental?.insurancePlans?.securityDeposit || 'Dépôt de garantie'}: 1000${t[lang].rentals.currency}`
            ]
        }
    ];
    const selectedPlan = insurancePlans.find(p => p.id === insurancePlan) || insurancePlans[2];
    const insurancePerDay = selectedPlan.pricePerDay;
    const baseTotal = daysCount ? (car?.dailyPrice || 0) * daysCount : (car?.totalPrice || 0);
    const insuranceTotal = daysCount ? insurancePerDay * daysCount : 0;
    const grandTotal = baseTotal + insuranceTotal;

    const getStringDay = (date) => {
        if (!date) return '';
        const dayNum = date.getDay();
        if (dayNum === 0) return (t[lang].weekdays.sunday);
        if (dayNum === 1) return (t[lang].weekdays.monday);
        if (dayNum === 2) return (t[lang].weekdays.tuesday);
        if (dayNum === 3) return (t[lang].weekdays.wednesday);
        if (dayNum === 4) return (t[lang].weekdays.thursday);
        if (dayNum === 5) return (t[lang].weekdays.friday);
        if (dayNum === 6) return (t[lang].weekdays.saturday);
    }

    const getStringMonth = (date) => {
        if (!date) return '';
        const monthNum = date.getMonth();
        if (monthNum === 0) return (t[lang].smallMonths.january);
        if (monthNum === 1) return (t[lang].smallMonths.february);
        if (monthNum === 2) return (t[lang].smallMonths.march);
        if (monthNum === 3) return (t[lang].smallMonths.april);
        if (monthNum === 4) return (t[lang].smallMonths.may);
        if (monthNum === 5) return (t[lang].smallMonths.june);
        if (monthNum === 6) return (t[lang].smallMonths.july);
        if (monthNum === 7) return (t[lang].smallMonths.august);
        if (monthNum === 8) return (t[lang].smallMonths.september);
        if (monthNum === 9) return (t[lang].smallMonths.october);
        if (monthNum === 10) return (t[lang].smallMonths.november);
        if (monthNum === 11) return (t[lang].smallMonths.december);
    }

    const getShortYear = (date) => {
        if (!date) return '';
        return date.getFullYear().toString().slice(-2);
    }

    const formatRange = () => {
        if (!state?.filters?.startDate || !state?.filters?.endDate) return '';
        const s = state.filters.startDate; const e = state.filters.endDate;
        const fmt = (d) => `${getStringDay(d)}, ${getStringMonth(d)} ${d.getDate()}`;
        return `${fmt(s)} – ${fmt(e)}`;
    };

    // Cross-fade current image when it changes
    useEffect(() => {
        setImageLoaded(false);
    }, [currentImage]);

    return (
    <>
        <MetaComponent meta={metadata} />
        <Header1 />
        <div style={{ marginTop: 70 }}>
            <header style={{
                position: 'fixed',
                height: 100,
                // top: 0,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                width: '100%',
                padding: '8px 12px',
                background: 'white',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                zIndex: 100,
            }}>
                <button
                    style={{ 
                        background: backButtonHovered ? '#ff7950ff' : 'white', 
                        color: backButtonHovered ? 'white' : 'black', 
                        transition: 'background 0.3s, color 0.3s',
                        padding: '8px 14px',
                        marginBottom: '10px',
                        border: 'none', 
                        borderRadius: 6,
                        marginBottom: 14,
                    }}
                    onClick={() => navigate(-1)}
                    onMouseEnter={() => setBackButtonHovered(true)}
                    onMouseLeave={() => setBackButtonHovered(false)}
                >
                    {(lang === 'ar') ? (
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d= "M5.5 12.5L10 8L5.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    ):(
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d= "M10.5 3.5L6 8L10.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                    
                </button>
                <div style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    [lang === "ar" ? "marginLeft" : "marginRight"]: 65,
                    marginBottom: 10
                }}>
                    <h5>{car.brand} {car.model}</h5>
                    {/* <div style={{
                        color: '#8d8d8dff',
                        fontSize: '0.975rem',
                        fontWeight: 500,
                        textAlign: 'center'
                    }}>{car.year} • {car.fuel} • {car.transmission}</div> */}
                    {/* {state?.filters && state.filters.startDate && state.filters.endDate && (
                                <div style={{ marginTop: 20 }}>
                                <strong>Selected period:</strong>{' '}
                                {state.filters.startDate && state.filters.endDate
                                    ? `${state.filters.startDate} → ${state.filters.endDate}`
                                    : 'N/A'}
                                </div>
                    )} */}
                    <div style={{
                        color: '#6a6969ff',
                        fontSize: '0.775rem',
                        fontWeight: 400,
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>{getStringDay(state.filters.startDate)}, {getStringMonth(state.filters.startDate)} {state.filters.startDate.getDate()} -- {getStringDay(state.filters.endDate)}, {getStringMonth(state.filters.endDate)} {state.filters.endDate.getDate()}</div>

                    {/* { (filters.depot && filters.depart) ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#8d8d8dff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: (filters.startDate || filters.depot || filters.depart) ? '0px' : -5 }}>
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
                                {translateCity(filters.depart || car.city)}
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
                                {translateCity(filters.depot || car.city)}
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
                            {translateCity(car.city)}
                        </>
                    )} */}
                </div>
                <div style={{
                    marginLeft: 0,
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    {car.promotion && (
                        <div style={{
                            position: 'absolute',
                            [lang ==='ar' ? 'left' : 'right']: '0px',
                            top: '20px',
                            background: '#F5C906',
                            zIndex: 3,
                            color: 'white',
                            padding: '4px 8px 4px 15px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            marginTop: 20,
                            [lang === 'ar' ? 'marginLeft' : 'marginRight']: 15
                        }}>
                            {t[lang].sideBar.promo.cartitle}
                        </div>
                    )}
                </div>
            </header>
            <div style={{ 
                display:'block', 
                padding: `125px ${computedGutter}px 24px`, 
                background: '#edf0f1ff' 
            }}>
                <div style={{ 
                    maxWidth: `${targetContentWidth}px`, 
                    margin: '0 auto' 
                }}>
                    <div style={{ 
                        display:'flex', 
                        gap: 10, 
                        alignItems:'flex-start', 
                        flexDirection: isSmallScreen ? 'column' : 'row' 
                    }}>
                        <div style={{ flex: '1 1 0', minWidth: 0, width: '100%', backgroun: 'red' }}>
                            { (filters.depot && filters.depart) ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', paddingBottom: '12px' }}>
                                <h1 >
                                    {translateCity(filters.depart || car.city)}
                                </h1>
                                
                                <svg width="20" transform="rotate(180)" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M1 6H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M12 1L18 6L12 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <h1>{translateCity(filters.depot || car.city)}</h1>
                                <h1>{t[lang].rental.oneway}</h1>
                            </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                                    <h1>{translateCity(car.city)}</h1>
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        {/* Top leg (left circle → right turn down) */}
                                        <path d="M9 8h8a3 3 0 0 1 3 3v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        {/* Arrow head pointing down */}
                                        <path d="M20 15l-3-3m3 3 3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        {/* Bottom leg (right circle ← left turn up) */}
                                        <path d="M19 20h-8a3 3 0 0 1-3-3v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        {/* Arrow head pointing up */}
                                        <path d="M8 13l3 3m-3-3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <h1>{t[lang].rental.roundTrip}</h1>
                                </div>
                            )}
                            <main style={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '6px',
                                marginTop: '16px',
                                border: '1px solid #e5e5e5ff',
                                background: '#ffffffff',
                                width: '100%',
                            }}>
                                <div style={{
                                    flex: 1,
                                    fontWeight: '700', 
                                    fontSize: '1.35rem', 
                                    borderBottom: '1px solid #e5e5e5ff',
                                    padding: '22px 24px',
                                }}>
                                    {t[lang].rental.rentalDetails}
                                </div>
                                <div style={{ 
                                    flex: 1,
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex', 
                                    padding: '10px 24px', 
                                    gap: '30px',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}>
                                    <div style={{ flex: 1, minWidth: '100%' }}>
                                        <h2>{car.brand} {car.model}</h2>
                                        {/* <p>{car.year} • {car.fuel} • {car.transmission}</p> */}
                                        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
                                            {/* Image Carousel */}
                                            {car.images && car.images.length > 0 && (
                                                <div style={{
                                                    position: 'relative',
                                                    // Keep the carousel centered by limiting width and auto margins
                                                    width: 'min(100%, 720px)',
                                                    margin: '0 auto',
                                                    height: 'auto',
                                                    aspectRatio: '16 / 9',
                                                    borderRadius: 12,
                                                    overflow: 'hidden',
                                                    zIndex: 1,
                                                }}>
                                                    <img
                                                        key={currentImage}
                                                        src={car.images[currentImage]}
                                                        alt={car.brand + ' ' + car.model}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            display: 'block'
                                                            // opacity: imageLoaded ? 1 : 0,
                                                            // transform: imageLoaded ? 'scale(1)' : 'scale(1.02)',
                                                            // transition: 'opacity .35s ease, transform .5s ease'
                                                        }}
                                                        onLoad={() => setImageLoaded(true)}
                                                        loading="lazy"
                                                    />
                                                    {/* Prev Button */}
                                                    {car.images.length > 1 && (
                                                        <button
                                                            onClick={() => setCurrentImage((currentImage - 1 + car.images.length) % car.images.length)}
                                                            onMouseEnter={() => setImageLeftButtonHovered(true)}
                                                            onMouseLeave={() => setImageLeftButtonHovered(false)}
                                                            aria-label="Previous image"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                left: 6,
                                                                transform: 'translateY(-50%)',
                                                                width: 34,
                                                                height: 34,
                                                                borderRadius: '50%',
                                                                border: 'none',
                                                                background: imageLeftButtonHovered ? 'rgba(255, 219, 40, 1)' : 'rgba(255,255,255,0.9)',
                                                                color: imageLeftButtonHovered ? '#fff' : '#111',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                cursor: 'pointer',
                                                                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                                                transition: 'background .2s ease, transform .2s ease'
                                                            }}
                                                        >
                                                            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d= "M10.5 3.5L6 8L10.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </button>
                                                    )}
                                                    {/* Next Button */}
                                                    {car.images.length > 1 && (
                                                        <div
                                                            onClick={() => setCurrentImage((currentImage + 1) % car.images.length)}
                                                            onMouseEnter={() => setImageRightButtonHovered(true)}
                                                            onMouseLeave={() => setImageRightButtonHovered(false)}
                                                            aria-label="Next image"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: 6,
                                                                transform: 'translateY(-50%)',
                                                                width: 34,
                                                                height: 34,
                                                                borderRadius: '50%',
                                                                border: 'none',
                                                                background: imageRightButtonHovered ? 'rgba(255, 219, 40, 1)' : 'rgba(255,255,255,0.9)',
                                                                color: imageRightButtonHovered ? '#fff' : '#111',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                cursor: 'pointer',
                                                                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                                                transition: 'background .2s ease, transform .2s ease'
                                                            }}
                                                        >
                                                            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d= "M5.5 12.5L10 8L5.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </div>
                                                    )}
                                                    {/* Location badge */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        left: 10,
                                                        bottom: 10,
                                                        background: 'rgba(0,0,0,0.55)',
                                                        color: '#fff',
                                                        fontSize: '.7rem',
                                                        fontWeight: 500,
                                                        letterSpacing: '.25px',
                                                        padding: '6px 12px 6px 30px',
                                                        borderRadius: 8,
                                                        lineHeight: 1.1,
                                                        backdropFilter: 'blur(2px)'
                                                    }}>
                                                        <span style={{
                                                            position: 'absolute',
                                                            left: 10,
                                                            top: '50%',
                                                            transform: 'translateY(-50%)'
                                                        }}>
                                                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10 2C6.686 2 4 4.686 4 8c0 4.418 5.25 9.25 5.477 9.464a1 1 0 0 0 1.046 0C10.75 17.25 16 12.418 16 8c0-3.314-2.686-6-6-6Zm0 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fill="#fff" />
                                                            </svg>
                                                        </span>
                                                        {translateCity(car.city)}
                                                    </div>
                                                    {car.images.length > 1 && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            right: 10,
                                                            bottom: 10,
                                                            background: 'rgba(0,0,0,0.45)',
                                                            color: '#fff',
                                                            fontSize: '.6rem',
                                                            padding: '4px 8px',
                                                            borderRadius: 20,
                                                            letterSpacing: '.5px'
                                                        }}>{currentImage + 1}/{car.images.length}</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {/* {state?.filters && state.filters.startDate && state.filters.endDate && (
                                            <div style={{ marginTop: 20 }}>
                                            <strong>Selected period:</strong>{' '}
                                            {state.filters.startDate && state.filters.endDate
                                                ? `${state.filters.startDate} → ${state.filters.endDate}`
                                                : 'N/A'}
                                            </div>
                                        )} */}
                                    </div>
                                    <div style={{ flex: 1, gap: 20, display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%' }}>
                                        <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
                                            <h5 style={{ borderBottom: '1px solid #eee', paddingBottom: '18px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                                <span>{t[lang].rental.character}</span>
                                                <button onClick={() => setShowAllSpecs(s => !s)} style={{ background:'none', border:'none', color:'#7b3700ff', fontSize:'.75rem', cursor:'pointer', fontWeight:600 }}>
                                                    {showAllSpecs ? (t[lang].rental.reduction) : (t[lang].rental.toutes)}
                                                </button>
                                            </h5>
                                            {(() => {
                                                const extraRef = useRef(null);
                                                const [extraH, setExtraH] = useState(0);
                                                useEffect(() => {
                                                    const measure = () => {
                                                        if (extraRef.current) {
                                                            setExtraH(extraRef.current.scrollHeight);
                                                        }
                                                    };
                                                    // measure now and on resize to accommodate wrapping
                                                    measure();
                                                    window.addEventListener('resize', measure);
                                                    return () => window.removeEventListener('resize', measure);
                                                }, []);
                                                const baseSpecs = [
                                                    { label: t[lang]?.rental?.specs?.transmission || 'Boîte de vitesses', value: car.transmission },
                                                    { label: t[lang]?.rental?.specs?.engine || 'Moteur', value: car.fuel },
                                                    { label: t[lang]?.rental?.specs?.productionYear || 'Année de production', value: car.year },
                                                    { label: t[lang]?.rental?.specs?.audio || 'Audio', value: t[lang]?.rental?.specs?.bluetooth || 'Bluetooth' }
                                                ];
                                                const extraSpecs = [
                                                    { label: t[lang]?.rental?.specs?.seats || 'Nombre de places', value: car.seats },
                                                    { label: t[lang]?.rental?.specs?.airConditioning || 'Climatisation', value: car.airConditioning ? (t[lang]?.rental?.specs?.yes || 'Oui') : (t[lang]?.rental?.specs?.no || 'Non') },
                                                    { label: t[lang]?.rental?.specs?.consumption || 'Consommation', value: car.consumption || '—' },
                                                    { label: t[lang]?.rental?.specs?.abs || 'ABS', value: car.abs ? (t[lang]?.rental?.specs?.yes || 'Oui') : (t[lang]?.rental?.specs?.no || 'Non') },
                                                    { label: t[lang]?.rental?.specs?.rearCamera || 'Caméra de recul', value: car.rearCamera ? (t[lang]?.rental?.specs?.yes || 'Oui') : (t[lang]?.rental?.specs?.no || 'Non') }
                                                ];
                                                return (
                                                    <div style={{ display:'flex', flexDirection:'column' }}>
                                                        {/* Always show base specs */}
                                                        {baseSpecs.map((r,i) => (
                                                            <div key={`b-${i}`} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom: '1px solid #eee', fontSize:'.85rem' }}>
                                                                <strong style={{ fontWeight:600 }}>{r.label}</strong>
                                                                <span style={{ color:'#555' }}>{r.value}</span>
                                                            </div>
                                                        ))}
                                                        {/* Smoothly expanding extra specs */}
                                                        <div style={{
                                                            maxHeight: showAllSpecs ? extraH : 0,
                                                            opacity: showAllSpecs ? 1 : 0,
                                                            overflow: 'hidden',
                                                            transition: 'max-height .35s ease, opacity .25s ease'
                                                        }}>
                                                            <div ref={extraRef}>
                                                                {extraSpecs.map((r,i) => (
                                                                    <div key={`e-${i}`} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom: i === extraSpecs.length-1 ? 'none':'1px solid #eee', fontSize:'.85rem' }}>
                                                                        <strong style={{ fontWeight:600 }}>{r.label}</strong>
                                                                        <span style={{ color:'#555' }}>{r.value}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {!showAllSpecs && (
                                                            <button 
                                                                aria-expanded={showAllSpecs}
                                                                onClick={() => {
                                                                    setShowAllSpecs(true);
                                                                    setOpen(o => !o);
                                                                }}
                                                                style={{
                                                                    display: 'flex',
                                                                    marginTop:12, 
                                                                    background:'none', 
                                                                    border:'none', 
                                                                    color:'#7b3700ff', 
                                                                    fontSize:'.7rem', 
                                                                    fontWeight:600, 
                                                                    cursor:'pointer', 
                                                                    letterSpacing:'.5px', 
                                                                    transition: 'color .2s ease',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}>
                                                                {t[lang]?.rental?.bigtoutes}
                                                                <svg
                                                                    className={`arrow-icon`}
                                                                    width="13"
                                                                    height="13"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                        {showAllSpecs && (
                                                            <button aria-expanded={showAllSpecs} 
                                                                onClick={() => {
                                                                    setShowAllSpecs(false);
                                                                    setOpen(o => !o);
                                                                }}
                                                                style={{ 
                                                                    display: 'flex', 
                                                                    marginTop:12, 
                                                                    background:'none', 
                                                                    color:'#7b3700ff', 
                                                                    fontSize:'.7rem', 
                                                                    fontWeight:600, 
                                                                    cursor:'pointer', 
                                                                    letterSpacing:'.5px', 
                                                                    transition: 'color .2s ease', 
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                {t[lang]?.rental?.reduction}
                                                                <svg
                                                                    className={`arrow-icon flipped`}
                                                                    width="13"
                                                                    height="13"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
                                            <h5 style={{ borderBottom: '1px solid #eee', paddingBottom: '18px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                                <span>{t[lang]?.rental?.conditions}</span>
                                                {/* <button onClick={() => setShowAllSpecs(s => !s)} style={{ background:'none', border:'none', color:'#7b3700ff', fontSize:'.75rem', cursor:'pointer', fontWeight:600 }}>
                                                    {showAllSpecs ? 'RÉDUIRE' : 'TOUTES'}
                                                </button> */}
                                            </h5>
                                            {/* {(() => {
                                                const baseSpecs = [
                                                    { label: 'Boîte de vitesses', value: car.transmission },
                                                    { label: 'Moteur', value: car.fuel },
                                                    { label: 'Année de production', value: car.year },
                                                    { label: 'Audio', value: 'Bluetooth' }
                                                ];
                                                const extraSpecs = [
                                                    { label: 'Nombre de places', value: car.seats },
                                                    { label: 'Climatisation', value: car.airConditioning ? 'Oui' : 'Non' },
                                                    { label: 'Consommation', value: car.consumption || '—' },
                                                    { label: 'ABS', value: car.abs ? 'Oui' : 'Non' },
                                                    { label: 'Caméra de recul', value: car.rearCamera ? 'Oui' : 'Non' }
                                                ];
                                                const rows = showAllSpecs ? [...baseSpecs, ...extraSpecs] : baseSpecs;
                                                return (
                                                    <div style={{ display:'flex', flexDirection:'column' }}>
                                                        {rows.map((r,i) => (
                                                            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom: i === rows.length-1 ? 'none':'1px solid #eee', fontSize:'.85rem' }}>
                                                                <strong style={{ fontWeight:600 }}>{r.label}</strong>
                                                                <span style={{ color:'#555' }}>{r.value}</span>
                                                            </div>
                                                        ))}
                                                        {!showAllSpecs && (
                                                            <button 
                                                                onClick={() => setShowAllSpecs(true)} 
                                                                style={{ marginTop:12, background:'none', border:'none', color:'#7b3700ff', fontSize:'.7rem', fontWeight:600, cursor:'pointer', letterSpacing:'.5px' }}>
                                                                TOUTES LES CARACTÉRISTIQUES ▾
                                                            </button>
                                                        )}
                                                        {showAllSpecs && (
                                                            <button onClick={() => setShowAllSpecs(false)} style={{ marginTop:12, background:'none', border:'none', color:'#7b3700ff', fontSize:'.7rem', fontWeight:600, cursor:'pointer', letterSpacing:'.5px' }}>
                                                                RÉDUIRE ▲
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })()} */}
                                            <div style={{ display:'flex', flexDirection:'column' }}>
                                                <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom: '1px solid #eee', fontSize:'.85rem' }}>
                                                    <strong style={{ fontWeight:600 }}>{t[lang]?.rental?.conditionsAgeLabel || 'Âge du locataire'}</strong>
                                                    <span style={{ color:'#555' }}>{t[lang]?.rental?.conditionsAgeValue || '22 - 65 ans'}</span>
                                                </div>
                                            </div>
                                            <div style={{ display:'flex', flexDirection:'column' }}>
                                                <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom: '1px solid #eee', fontSize:'.85rem' }}>
                                                    <strong style={{ fontWeight:600 }}>{t[lang]?.rental?.drivingExperienceLabel || 'Expérience de conduite'}</strong>
                                                    <span style={{ color:'#555' }}>{t[lang]?.rental?.drivingExperienceValue || 'à partir de 2 ans'}</span>
                                                </div>
                                            </div>
                                            <div style={{ display:'flex', flexDirection:'column' }}>
                                                <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', fontSize:'.85rem' }}>
                                                    <strong style={{ fontWeight:600 }}>{t[lang]?.rental?.mileageLimitLabel || 'Limitation de kilométrage'}</strong>
                                                    <span style={{ color:'#555' }}>{t[lang]?.rental?.mileageLimitValue || 'Non'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
                                            <h5 style={{ borderBottom: '1px solid #eee', paddingBottom: '18px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                                <span>{t[lang].rental.tripDetails}</span>
                                            </h5>
                                            <div style={{ display:'flex', flexDirection:'column' }}>
                                                <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom: '1px solid #eee', fontSize:'.85rem' }}>
                                                    <strong style={{ fontWeight:600 }}>{t[lang].rental.startDate}:</strong>
                                                    <span style={{ color:'#555' }}>{formatDateForDisplay(filters.startDate)} {t[lang].rental.to} {car.startHour}</span>
                                                </div>
                                            </div>
                                            <div style={{ display:'flex', flexDirection:'column' }}>
                                                <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom: '1px solid #eee', fontSize:'.85rem' }}>
                                                    <strong style={{ fontWeight:600 }}>{t[lang].rental.endDate}:</strong>
                                                    <span style={{ color:'#555' }}>{formatDateForDisplay(filters.endDate) || formatDateForDisplay(filters.startDate)} {t[lang].rental.to} {car.endHour}</span>
                                                </div>
                                            </div>
                                            <div style={{ display:'flex', flexDirection:'column' }}>
                                                <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom: '1px solid #eee', fontSize:'.85rem' }}>
                                                    <strong style={{ fontWeight:600 }}>{t[lang].rental.Telephone}</strong>
                                                    <span style={{ color:'#555' }}>{car.telephone}</span>
                                                </div>
                                            </div>
                                            <div style={{ display:'flex', flexDirection:'column' }}>
                                                <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', fontSize:'.85rem' }}>
                                                    <strong style={{ fontWeight:600 }}>{t[lang].rental.Address}</strong>
                                                    <span style={{ color:'#555' }}>{car.address}</span>
                                                </div>
                                            </div>
                                            <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'center' }}>
                                                { (filters.depot && filters.depart) ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: (filters.startDate || filters.depot || filters.depart) ? '0px' : -5 }}>
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
                                                            {translateCity(filters.depart || car.city)}
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
                                                            {translateCity(filters.depot || car.city)}
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
                                                        {translateCity(car.city)}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                            {/* Contact info form below Assurance */}
                            <main style={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '6px',
                                marginTop: '16px',
                                border: '1px solid #e5e5e5ff',
                                background: '#ffffffff',
                                width: '100%',
                            }}>
                                <div style={{
                                    flex: 1,
                                    fontWeight: '700',
                                    fontSize: '1.2rem',
                                    borderBottom: '1px solid #e5e5e5ff',
                                    padding: '18px 24px',
                                }}>
                                    {t[lang]?.rental?.yourContact || 'Vos coordonnées'}
                                </div>
                                <div style={{ padding: '16px 24px' }} data-contact-form>
                                    <ContactForm />
                                </div>
                            </main>
                            
                            <main style={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '6px',
                                marginTop: '16px',
                                border: '1px solid #e5e5e5ff',
                                background: '#ffffffff',
                                width: '100%',
                            }}>
                                <div style={{
                                    flex: 1,
                                    fontWeight: '700', 
                                    fontSize: '1.35rem', 
                                    borderBottom: '1px solid #e5e5e5ff',
                                    padding: '22px 24px',
                                }}>
                                    {t[lang]?.rental?.assuranceTitle || 'Assurance'}
                                </div>
                                <div style={{ 
                                    flex: 1,
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex', 
                                    padding: '10px 24px', 
                                    gap: '16px',
                                    alignItems: 'flex-start',
                                }}>
                                    <div style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', gap: 16, width: '100%' }}>
                                        {insurancePlans.map(plan => (
                                            <label key={plan.id}
                                                onMouseEnter={() => setHoveredPlan(plan.id)}
                                                onMouseLeave={() => setHoveredPlan(null)}
                                                style={{
                                                    flex: 1,
                                                    minWidth: isSmallScreen ? 'calc(50% - 8px)' : 0,
                                                    border: plan.id === insurancePlan ? '2px solid #eb8f25ff' : '1px solid #e5e7eb',
                                                    boxShadow: plan.id === insurancePlan ? '0px 0px 15px rgba(241, 126, 45, 0.4)' : (hoveredPlan === plan.id ? '0px 4px 18px rgba(241, 126, 45, 0.4)' : 'none'),
                                                    transform: hoveredPlan === plan.id ? 'translateY(-2px)' : 'translateY(0)',
                                                    borderRadius: 10,
                                                    padding: 16,
                                                    cursor: 'pointer',
                                                    background: '#fff',
                                                    transition: 'box-shadow .25s ease, transform .2s ease, border-color .2s ease'
                                                }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                        <input type="radio" name="insurance" checked={insurancePlan === plan.id} onChange={() => setInsurancePlan(plan.id)} aria-label={plan.name} />
                                                        <InsuranceLogo type={plan.id} size={48} />
                                                        <p style={{ fontWeight: 500 }}>{plan.name}</p>
                                                    </div>
                                                    <div style={{ color: plan.pricePerDay > 0 ? '#d78418ff' : '#6b7280', fontWeight: 700 }}>
                                                        {plan.pricePerDay > 0 ? `+ ${plan.pricePerDay}${t[lang].rentals.currency}${t[lang].rentals.perDayShort}` : '—'}
                                                    </div>
                                                </div>
                                                {plan.features.length > 0 ? (
                                                    <ul style={{ marginTop: 10, paddingLeft: 18 }}>
                                                        {plan.features.map((f, i) => (
                                                            <li key={i} style={{ color: '#1f2937', marginBottom: 6, transition: 'color .2s ease' }}>
                                                                {f}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div style={{ marginTop: 10, color: '#6b7280' }}>{t[lang]?.rental?.noExtraCoverage || 'Aucune couverture supplémentaire'}</div>
                                                )}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </main>
                            {/* Payment methods under Assurance */}
                            <main style={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '6px',
                                marginTop: '16px',
                                border: '1px solid #e5e5e5ff',
                                background: '#ffffffff',
                                width: '100%',
                            }}>
                                <div style={{
                                    flex: 1,
                                    fontWeight: '700', 
                                    fontSize: '1.2rem', 
                                    borderBottom: '1px solid #e5e5e5ff',
                                    padding: '18px 24px',
                                }}>
                                    {t[lang]?.rental?.payment?.title || 'Paiement'}
                                </div>
                                <div style={{ padding: '16px 24px' }}>
                                    <PaymentMethods />
                                </div>
                            </main>
                        </div>
                        <aside style={{ width: isSmallScreen ? '100%' : 300, position: 'relative', alignSelf: 'flex-start' }}>
                            <div style={{ 
                                padding: '70px 20px', 
                                border: '1px solid #eee', 
                                borderRadius: 8,
                                position: isSmallScreen ? 'static' : 'fixed',
                                // top: isSmallScreen ? undefined : headerHeight + 16,
                                // right: isSmallScreen ? undefined : computedGutter,
                                width: isSmallScreen ? 'auto' : 300,
                                zIndex: 2
                            }}>
                                {/* <h5 style={{ marginBottom: 12 }}>Informations supplémentaires</h5> */}
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <p style={{ fontSize: '.9rem', color: '#555', margin: 0 }}>{t[lang]?.rental?.pricePerDayLabel || 'Prix par jour:'}</p>
                                    <p style={{ fontSize: '.9rem', color: '#555', margin: 0 }}>
                                        {car.dailyPrice}{t[lang].rentals.currency}{t[lang].rentals.perDayShort}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                                    <p style={{ fontSize: '.9rem', color: '#555', margin: 0 }}>{t[lang]?.rental?.rentalDurationLabel || 'Durée de location:'}</p>
                                    <p style={{ fontSize: '.9rem', color: '#555', margin: 0 }}>
                                        {daysCount} {daysCount === 1 ? t[lang].rental.day : t[lang].rental.days}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                                    <p style={{ fontSize: '.9rem', color: '#555', margin: 0, display:'flex', alignItems:'center', gap:6 }}>
                                        <InsuranceLogo type={insurancePlan} size={28} />
                                        {t[lang]?.rental?.assuranceLabel || 'Assurance:'}
                                    </p>
                                    <p style={{ fontSize: '.9rem', color: '#555', margin: 0 }}>
                                        {insurancePerDay > 0 ? `+ ${insurancePerDay}${t[lang].rentals.currency}${t[lang].rentals.perDayShort}` : '—'}
                                    </p>
                                </div>
                                {daysCount > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, color:'#6b7280', fontSize:'.85rem' }}>
                                        <span>({daysCount} × {insurancePerDay}{t[lang].rentals.currency})</span>
                                        <span>{insuranceTotal}{t[lang].rentals.currency}</span>
                                    </div>
                                )}
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid #212121ff', paddingTop: 8, marginTop: 30}}>
                                    <h6>{t[lang]?.rental?.totalLabel || 'Total:'}</h6><h5>{grandTotal}{t[lang].rentals.currency}</h5>
                                </div>
                                <div style={{ marginTop: 12 }}>
                                    <button
                    onClick={() => {
                                            // trigger form validation
                                            dispatch(triggerValidation());
                                            // if errors exist, scroll to form
                                            setTimeout(() => {
                                                const { contactForm } = store.getState();
                                                const hasErrors = !contactForm.fullName || !contactForm.birthDate || !contactForm.email || !contactForm.phoneNumber;
                                                if (hasErrors) {
                                                    const el = document.querySelector('[data-contact-form]');
                                                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                } else {
                                                    // proceed to payment flow placeholder
                                                    // e.g., navigate('/checkout') or open modal
                                                }
                                            }, 0);
                                        }}
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: 'none', background: '#eb8f25', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                                    >
                                        {t[lang]?.rental?.payment?.pay || 'Payer'}
                                    </button>
                                </div>
                                
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
        <Footer2 />
    </>
    );
}