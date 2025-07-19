import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import ContactInfo from "./S_ContactInfo";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "@/i18n/LanguageProvider";
import { useContext } from "react";
import t from "@/i18n/t";

const MobileMenu = () => {
  const { pathname } = useLocation();
  const { lang } = useContext(LanguageContext);

  const navigate = useNavigate();

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <Link to="/">
          <img style={{ height: 39 }} src={`${import.meta.env.BASE_URL}/img/general/logo-dark.png`} alt="brand" />
        </Link>
        {/* End logo */}

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="icon icon-close"></i>
        </div>
        {/* icon close */}
      </div>
      {/* End pro-header */}

      <Sidebar width="400" backgroundColor="#fff">
        <Menu>
          <MenuItem
            onClick={() => navigate("/")}
            className={pathname === "/" ? "menu-active-link" : ""}
          >
            {t[lang].header.home}
          </MenuItem>
          {/* End  Accueil Menu */}

          <MenuItem
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => navigate("/occasion")}
            className={pathname === "/occasion" ? "menu-active-link" : ""}
          >
            {t[lang].header.usedCars}
          </MenuItem>
          {/* End  Occasion Menu */}

          <MenuItem
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => navigate("/neuve")}
            className={pathname === "/neuve" ? "menu-active-link" : ""}
          >
            {t[lang].header.newCars}
          </MenuItem>
          {/* End  Accueil Menu */}

          <MenuItem
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => navigate("/location")}
            className={pathname === "/location" ? "menu-active-link" : ""}
          >
            {t[lang].header.location}
          </MenuItem>
          {/* End  Location Menu */}

          <MenuItem
            onClick={() => navigate("/about")}
            className={pathname === "/about" ? "menu-active-link" : ""}
          >
            {t[lang].header.about}
          </MenuItem>
          {/* End  Desitinations Menu */}
          <MenuItem
            onClick={() => navigate("/terms")}
            className={pathname === "/terms" ? "menu-active-link" : ""}
          >
            {t[lang].header.terms}
          </MenuItem>
        </Menu>
      </Sidebar>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>

      <div className="pro-footer">
        <ContactInfo />

      </div>
      {/* End pro-footer */}
    </>
  );
};

export default MobileMenu;
