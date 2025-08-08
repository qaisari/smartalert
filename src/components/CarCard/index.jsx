import { Link } from "react-router-dom";

export default function CarCard({ key, name, uri, image, brand, model, priceRange}) {

   return (
    <Link to={uri} className="block hover-inside-slider">
        <div 
            className="w-[300px] h-[350px] bg-white rounded-lg shadow-lg overflow-hidden" 
            data-aos="fade" 
            data-aos-delay="30"
        >
            <img 
                src={image} 
                alt={name} 
                className="w-full h-44 object-cover" 
            />
            <div className="p-4">
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-sm text-gray-600 mt-15">{brand} • {model}</p>
                <p className="text-blue-700 mt-2 font-semibold">{priceRange}</p>
            </div>
        </div>
    </Link>
   );
}