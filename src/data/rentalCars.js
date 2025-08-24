// Centralized rental cars data extracted from CarGrid for reuse in CarCard and elsewhere.
// Keep ids stable. Extend with extra fields (features, pricing logic meta) as needed.
export const rentalCars = [
  {
    id: 1,
    brand: "Audi",
    model: "A3",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop"
    ],
    basePrice: 450,
    promotion: false,
    year: 2023,
    fuel: "Essence",
    transmission: "Automatique",
    city: "Casablanca",
    address: "123 Rue Mohammed V",
    telephone: "+212 522 123 456"
  },
  {
    id: 2,
    brand: "BMW",
    model: "X3",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=300&h=200&fit=crop"
    ],
    basePrice: 650,
    promotion: true,
    promotionDiscount: 15,
    year: 2022,
    fuel: "Diesel",
    transmission: "Automatique",
    city: "Rabat",
    address: "45 Avenue Hassan II",
    telephone: "+212 537 234 567"
  },
  // ... (Truncated for brevity: replicate remaining objects from previous inline array) ...
];

// TODO: complete the list with the rest of the 28 cars from CarGrid if needed.
