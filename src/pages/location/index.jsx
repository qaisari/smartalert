// import Header1 from "@/components/header/header-1";
// import Footer2 from "@/components/footer/footer-2";
// import MetaComponent from "@/components/common/MetaComponent";
// import MainFilterSearchBox from "@/components/car-list/car-list-v1/MainFilterSearchBox";
// import Filters from "@/components/Filters";
// import CarGrid from "@/components/CarGrid";

// const metadata = {
//   title: "Location || SmartAlert",
//   description: "SmartAlert - Location Page",
// };

// export default function Location() {
//     const [currentFilters, setCurrentFilters] = useState({});
//     const [showMobileFilters, setShowMobileFilters] = useState(false);

//     const handleFiltersChange = (filters) => {
//         setCurrentFilters(filters);
//         console.log('Applied filters:', filters);
//     };

//     // Lock body scroll when mobile filters are open
//     useEffect(() => {
//         if (showMobileFilters) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'unset';
//         }

//         return () => {
//             document.body.style.overflow = 'unset';
//         };
//     }, [showMobileFilters]);
//     return(
//         <>
//             <MetaComponent meta={metadata} />
//             <Header1/>
//                 <section 
//                     style={{
//                         display: "flex",
//                         width: "100%",
//                         paddingBottom: "4rem",
//                         paddingTop: "2rem",
//                         justifyContent: "space-around",
//                     }}>
//                     <div style={{
//                         display: "flex",
//                         gap: "40px",
//                         margin: "50px",
//                         marginTop: "50px",
//                         position: "relative",
//                         justifyContent: "space-between",
//                     }}>
//                         <Filters />
//                         <CarGrid filters={currentFilters} />
//                     </div>
//                 </section>
//             <Footer2/>
//         </>
//     );
// }
import { useState, useEffect } from "react";
import Filters from "@/components/Filters";
import CarGrid from "@/components/CarGrid";
import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";
import MetaComponent from "@/components/common/MetaComponent";
import Aos from "aos";

const metadata = {
  title: "Location || SmartAlert",
  description: "SmartAlert - Location Page",
};

export default function Location() {
    const [currentFilters, setCurrentFilters] = useState({});
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        Aos.init({
        duration: 1200,
        once: true,
        });
    }, []);

    const handleFiltersChange = (filters) => {
        setCurrentFilters(filters);
        console.log('Applied filters:', filters);
    };

    const checkMobileSize = () => {
        setIsMobile(window.innerWidth < 1200);
    };

    useEffect(() => {
        checkMobileSize();
        window.addEventListener('resize', checkMobileSize);
        return () => {
            window.removeEventListener('resize', checkMobileSize);
        };
    }, []);

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
                    {!isMobile && (<Filters onFiltersChange={handleFiltersChange} />)}
                    
                    {/* Mobile Filter Button */}
                    {isMobile && (
                        <button
                            onClick={() => setShowMobileFilters(true)}
                            className="mobile-filter-btn"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 84 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            <span style={{
                                    fontSize: '0.875rem',   // text-sm
                                    fontWeight: 500         // font-medium
                            }}>
                                Filtres
                            </span>
                        </button>
                    )}

                    {/* Mobile Filter Sidebar */}
                    {showMobileFilters && (
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
                                    zIndex: 50
                                }}
                                onClick={() => setShowMobileFilters(false)}
                            ></div>
                            
                            {/* Sidebar */}
                            <div style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                width: '420px',
                                backgroundColor: 'white',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                zIndex: 60,
                                overflowY: 'auto',
                                height: '100vh',
                                maxHeight: isMobile ? '100vh' : '85vh',
                                transform: 'translateX(0)',
                                transition: 'transform 0.3s ease-in-out'
                            }}>
                                {/* Close Button */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    borderBottom: '1px solid #e5e7eb'
                                }}>
                                    <h3 
                                        style={{
                                            fontSize: '1.125rem',
                                            fontWeight: '600',
                                            margin: 0
                                    }}>
                                        Filtres
                                    </h3>
                                    <button
                                        onClick={() => setShowMobileFilters(false)}
                                        style={{
                                            padding: '0.5rem',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            borderRadius: '0.375rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <svg 
                                            style={{ width: '1.25rem', height: '1.25rem' }}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                {/* Filter Content */}
                                <div style={{
                                    padding: '1rem'
                                }}>
                                    <Filters 
                                        onFiltersChange={handleFiltersChange} 
                                        isMobile={true}
                                        onClose={() => setShowMobileFilters(false)}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <CarGrid filters={currentFilters} />
                </div>
            </section>
            <Footer2 />
        </>
    );
}
