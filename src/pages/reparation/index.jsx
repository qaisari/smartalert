import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";
import Filters from "@/components/reparationFilters";
import MecanicGrid from "@/components/mecanicGrid";
import MetaComponent from "@/components/common/MetaComponent";
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import Aos from "aos";

const metadata = {
  title: "Réparation || SmartAlert",
  description: "SmartAlert - Page Réparation",
};

export default function Reparation() {
    const { lang } = useContext(LanguageContext);
    const [currentFilters, setCurrentFilters] = useState({});
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(()=> {
        Aos.init({
            duration: 400,
            once: true,
        });
    }, []);

    const handleFiltersChange = (filters) => {
        setCurrentFilters(filters);
    }

    useEffect(() => {
        const checkMobileSize = () => {
            setIsMobile(window.innerWidth < 1200);
        }

        checkMobileSize();
        window.addEventListener('resize', checkMobileSize);
        return () => {
            window.removeEventListener('resize', checkMobileSize);
        }
    }, []);

    useEffect(() => {
        if(showMobileFilters) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        }
    })

    return (
        <>
            <MetaComponent meta={metadata} />
            <Header1 />
            <section style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                alignItems: "center",
                padding: "4.5rem 2rem 1rem 4.5rem",
                borderBottom: "1px solid #e5e7eb",
            }}>
                <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        maxWidth: '1400px',
                        gap: '24px',
                        marginTop: '20px',
                        position: 'relative'
                }}>
                    {/* Desktop Filters */}
                    {!isMobile && <Filters onFiltersChange={handleFiltersChange} />}

                    {/* Mobile Filter Button */}
                    {isMobile && (
                        <button
                            onClick={() => setShowMobileFilters(true)}
                            className="mobile-filter-btn"
                        >
                            <span style={{
                                    fontSize: (lang === "ar") ? '0.975rem' : '0.875rem',
                                    fontWeight: 600
                            }}>
                                {t[lang].cars.filterTitle}
                            </span>
                        </button>
                    )}

                    {/* Mobile Filter Sidebar */}
                    {
                        <>
                            {/* Overlay */}
                            <div 
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                    zIndex: 9999,
                                    opacity: showMobileFilters ? 1 : 0,
                                    pointerEvents: showMobileFilters ? 'auto' : 'none',
                                    transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1)'
                                }}
                                onClick={() => setShowMobileFilters(false)}
                            ></div>

                            {/* Sidebar */}
                            <div
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    width: '395px',
                                    backgroundColor: 'white',
                                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                    zIndex: 99999,
                                    overflowY: 'auto',
                                    height: '100vh',
                                    maxHeight: isMobile ? '100vh' : '85vh',
                                    transform: showMobileFilters ? 'translateX(0)' : 'translateX(-100%)',
                                    opacity: showMobileFilters ? 1 : 0,
                                    pointerEvents: showMobileFilters ? 'auto' : 'none',
                                    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.4s cubic-bezier(0.4,0,0.2,1)'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem'
                                }}>
                                    <h3 style={{
                                            fontSize: '1.325rem',
                                            fontWeight: '600',
                                            margin: 0
                                    }}>
                                        {t[lang].cars.filterTitle}
                                    </h3>
                                    <button
                                        onClick={() => setShowMobileFilters(false)}
                                        className="close-filters"
                                        onMouseEnter={e => e.currentTarget.style.color = '#000000ff'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                                    >
                                        {/* <i className="icon icon-close"></i> */}
                                        <svg style={{ width: 24, height: 24, }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Filter Content */}
                                <div style={{
                                    padding: '0 1rem'
                                }}>
                                    <Filters
                                        onFiltersChange={handleFiltersChange}
                                        isMobile={true}
                                        onClose={() => setShowMobileFilters(false)}
                                    />
                                </div>
                            </div>
                        </>
                    }
                    <MecanicGrid filters={currentFilters} />
                </div>
            </section>
            <Footer2 />
        </>
    )
}