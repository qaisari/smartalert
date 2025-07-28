import Map from "../sidebar/Map";
import TypePlace from "../sidebar/TypePlace";
import AminitesFilter from "../sidebar/AminitesFilter";
import GuestRatingFilters from "../sidebar/GuestRatingFilters";
import PirceSlider from "../sidebar/PirceSlider";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const Sidebar = () => {
  const { lang } = useContext(LanguageContext);
  
  return (
    <>
      <div className="sidebar__item -no-border position-relative">
        <Map />
      </div>
      {/* End find map */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">{t[lang].rentals.typeOfPlace}</h5>
        <div className="sidebar-checkbox">
          <div className="row y-gap-5 items-center">
            <TypePlace />
          </div>
        </div>
      </div>
      {/* End deals filter */}

      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">{t[lang].rentals.price}</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider />
          </div>
        </div>
      </div>
      {/* End Nightly priceslider */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">{t[lang].rentals.guestRating}</h5>
        <div className="sidebar-checkbox">
          <GuestRatingFilters />
        </div>
      </div>
      {/* End Guest Rating */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">{t[lang].rentals.amenities}</h5>
        <div className="sidebar-checkbox">
          <AminitesFilter />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End Aminities filter */}
    </>
  );
};

export default Sidebar;
