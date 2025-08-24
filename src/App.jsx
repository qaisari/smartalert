import Aos from "aos";
import { useContext, useEffect } from "react";
import SrollTop from "./components/common/ScrollTop";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "aos/dist/aos.css";
import "./styles/index.scss";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";

if (typeof window !== "undefined") {
  import("bootstrap");
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import Home_2 from "./pages/homes/home_2";
import NotFoundPage from "./pages/not-found";
import About from "./pages/others/about";
import Terms from "./pages/others/terms";
import HotelSingleV1Dynamic from "./pages/hotel/hotel-single-v1";
import CarListPage2 from "./pages/car/car-list-v2";
import Location from "./pages/location";
import CarCard from "./components/CarCard";
import Reparation from "./pages/reparation";
import CarSingleV1Dynamic from "./pages/car/car-single";
import { fetchBrandCriteria } from "./features/filters/brandCriteriaSlice";
import { fetchCityCriteria } from "./features/filters/cityCriteriaSlice";
import { fetchSourceCriteria } from "./features/filters/sourceCriteriaSlice";
import { fetchChipCriteria } from "./features/filters/chipCriteriaSlice";
import { fetchSliderCriteria } from "./features/filters/sliderCriteriaSlice";
import { LanguageContext } from "./i18n/LanguageProvider";
import { fetchPromoCars } from "./features/cars/promoCarsSlice";


function App() {
  const dispatch = useDispatch();
  const {lang} = useContext(LanguageContext);
  useEffect(() => {
    dispatch(fetchBrandCriteria());
    dispatch(fetchCityCriteria());
    dispatch(fetchSourceCriteria());
    dispatch(fetchChipCriteria());
    dispatch(fetchSliderCriteria());
    dispatch(fetchPromoCars())
  }, [dispatch]);

  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <main>
      <Provider store={store}>
        <BrowserRouter basename={"/smartalert"}>
            <Routes>
              <Route path="/" index element={<Home_2 />} />

              <Route path="occasion" element={<CarListPage2 />} />
              <Route path="neuve" element={<CarListPage2 />} />
              <Route path="location" element={<Location />} />
              <Route path="reparation" element={<Reparation />} />
              <Route path="/car/:id" element={<CarCard />} />

              <Route path="neuve/:id" element={<HotelSingleV1Dynamic />} />
              <Route path="occasion/:id" element={<CarSingleV1Dynamic />} />

              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />

              <Route path="about" element={<About />} />
              <Route path="terms" element={<Terms />} />

            </Routes>
            <ScrollTopBehaviour />
        </BrowserRouter>

        <SrollTop />
      </Provider>
    </main>
  );
}

export default App;
