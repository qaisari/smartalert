import Address from "@/components/block/Address";
import { testimonial } from "@/data/S_testimonialData";

const fr = {
  home: {
    sources: {
      title: "Explorer les sites d'auto disponibles",
    },
    hero: {
      text_1: "L'application incontournable",
      text_2: "pour dénicher votre voiture au Maroc!",
      text_3: "Ne manquez plus jamais l'occasion parfaite. Annonces récentes de tous les sites d'auto du Maroc en temps réel sur SmartAlert.",
    },
    guide: {
      _1: {
        title: "Portail unique",
        text: "Accès regroupé aux principaux sites de vente au Maroc tels qu'Avito, Wandaloo, etc.",
      },
      _2: {
        title: "Interface conviviale",
        text: "Interface utilisateur intuitive et facile à utiliser pour une expérience facile et agréable.",
      },
      _3: {
        title: "Mises à jour régulières",
        text: "Mises à jour fréquentes pour enrichir en continu l'application.",
      },
    },
    rating: {
      title: {
        _1: "Découvrez ce que disent",
        _2: "nos clients.",
      },
      satisfaction: {
        _1: "20k+",
        _2: "Utilisateurs Satisfaits !",
      },
      note: {
        _1: "4.88",
        _2: "Note générale",
      },
    },
    usedCars: {
      title: "Dernières voitures d'occasion",
      description: "Découvrez notre sélection de voitures d'occasion",
      tag: "Vendu",
    },
    newCars: {
      title: "Voitures neuves en promotion",
      description: "Bénéficiez d'une remise sur une sélection de voitures neuves",
      tag: "Promo",
    },
  },
  about: {
    banner: {
      text_1: "Vous cherchez une voiture ?",
      text_2: "Votre partenaire de confiance",
    },
    whyUs: {
      title: "Pourquoi Nous",
      bloc_1: {
        title: "Meilleur prix",
        text: `Accès groupé aux principaux sites de vente au Maroc, pour vous assurer de trouver la bonne voiture au meilleur prix.`,
      },
      bloc_2: {
        title: "Interface conviviale",
        text: `Interface utilisateur intuitive et facile à utiliser pour une expérience facile et agréable.`,
      },
      bloc_3: {
        title: "Personnalisation des Alertes",
        text: `Paramétrage des notifications en fonction vos critères les plus spécifiques.`,
      },
    },
    description: {
      title: "À propos de SmartAlert",
      sub: "Le portail exclusif qui révolutionne les annonces de voiture au Maroc !",
      text: "Smart Alert est la solution la plus complète et la plus pratique pour acheter votre voiture au Maroc.\
          Ce service permet d'accéder en un seul endroit à tous les sites d'annonces de voiture au Maroc,\
          en plus, elle envoi des notifications en temps réel de chaque nouvelle annonce publiée sur l'ensemble de ces sites."
    },
    counter: {
      bloc_1: {
        meta: "Installations Actives",
      },
      bloc_2: {
        meta: "Avis clients",
      },
      bloc_3: {
        meta: "Note Play Store",
      },
      bloc_4: {
        meta: "Nombre d'Annonces",
      },
    },
    testimonial: {
      title: "Ce que nos clients disent",
      sub: "Votre partenaire de confiance",
    },
    counter2: {
      satisfaction: {
        _1: "20k+",
        _2: "utilisateurs satisfaits",
      },
      note: {
        _1: "4.88",
        _2: "Note globale",
      },
    },
  },
  terms: [
    {
      tab_title: "Conditions générales",
      title: "Conditions générales et responsabilités",
      content: [{
        title: "1. Acceptation des conditions",
        body: `En utilisant cette application mobile d'e-commerce, vous acceptez
                pleinement et sans réserve les présentes conditions d'utilisation.
                Si vous n'acceptez pas ces conditions, veuillez cesser d'utiliser
                l'application immédiatement.`,
      },
      {
        title: "2. Modifications des conditions",
        body: `Nous nous réservons le droit de modifier ces conditions d'utilisation
                à tout moment. Les modifications seront effectives dès leur
                publication dans l'application. Il vous est conseillé de consulter
                régulièrement les conditions d'utilisation pour prendre connaissance
                des éventuelles mises à jour.`,
      },
      {
        title: "3. Responsabilité",
        body: `L'application est fournie "telle quelle" et nous ne garantissons pas
                son fonctionnement ininterrompu, sans erreur ou exempt de virus.
                Nous déclinons toute responsabilité en cas de dommages directs,
                indirects ou consécutifs résultant de l'utilisation de l'application.`,
      }
      ],
    },
    {
      tab_title: "Utilisation de l'application",
      title: "Utilisation de l'application, propriété intellectuelle et produits",
      content: [
        {
          title: "1. Utilisation de l'application",
          body: `Vous êtes autorisé à utiliser cette application uniquement à des fins
                personnelles et non commerciales. Vous ne pouvez pas reproduire,
                distribuer, modifier ou exploiter le contenu de cette application sans
                autorisation préalable.`
        },
        {
          title: "2. Produits et transactions",
          body: `Les produits affichés dans l'application sont soumis à disponibilité.
                Les prix, les descriptions et les images des produits sont fournis
                à titre indicatif et peuvent être sujets à des modifications sans préavis.
                Les transactions effectuées via l'application sont régies par les
                politiques de paiement, de livraison et de retour spécifiées.`,
        },
        {
          title: "3. Propriété intellectuelle",
          body: `Tous les droits de propriété intellectuelle liés à l'application,
                y compris les logos, les marques commerciales et le contenu,
                sont la propriété de la société ou de ses concédants de licence.
                Vous n'êtes pas autorisé à utiliser, reproduire ou distribuer ces
                éléments sans autorisation préalable.`
        }
      ],
    },
    {
      tab_title: "Gestion des données",
      title: "Compte utilisateur et gestion des données personnelles",
      content: [
        {
          title: "1. Compte utilisateur",
          body: `Lors de la création d'un compte utilisateur, vous devez fournir
                des informations exactes, complètes et à jour. Vous êtes responsable
                de la confidentialité de vos identifiants de connexion et de toutes
                les activités effectuées sur votre compte.`
        },
        {
          title: "2. Collecte et utilisation des données personnelles",
          body: `L’application peut collecter et traiter certaines données personnelles
                afin de fournir ses services, améliorer l’expérience utilisateur
                et assurer la sécurité des comptes. Les données collectées sont utilisées
                uniquement dans le cadre du bon fonctionnement de l’application et
                ne sont ni revendues ni partagées avec des tiers non autorisés.
                <br />
                En utilisant l’application, vous consentez à cette collecte et à son
                utilisation conformément aux lois en vigueur sur la protection
                des données personnelles.`
        },
        {
          title: "3. Suppression des données personnelles",
          body: `Vous pouvez supprimer votre compte et toutes vos données personnelles 
              en accédant à l’option "Supprimer le compte" dans les réglages 
              de l’application. Cette action est définitive et entraînera 
              la suppression immédiate de vos informations de nos serveurs.`,
        },
      ],
    }
  ],
  notFound:  {
    title: "Oups ! On dirait que vous êtes perdu.",
    description: "La page que vous recherchez n'est pas disponible. Essayez d'effectuer une nouvelle recherche ou utilisez la fonction « aller à ».",
    buttonLabel: "Retourner à la page d'accueil",
  },
  cars: {
    filterTitle: "Filtre",
    null: "Non renseigné",
    sold: "Vendu",
    promo: "Promo",
    others: "Autres",
  },
  usedCars: {
    details : "Plus de details",
    essential: "Points essentiels",
    specification: "Spécifications",
    brand: "Marque",
    model: "Modèle",
    year: "Année",
    mileage: "Kilométrage",
    mileageMin: "Kilométrage Min",
    mileageMax: "Kilométrage Max",
    transmission: "Boite à vitesse",
    doors: "Nombre de portes",
    condition: "Condition",
    origin: "Origine",
  },
  newCars: {
    versions: "Versions",
    versionName: "Nom de la version",
    fuel: "Carburant",
    power: "Puissance",
    price: "Prix",
    promo: "Promo",
    priceFrom: "À partir",
    moreDetails: "Plus de details",
  },
  header: {
    home: "Accueil",
    usedCars: "Occasion",
    newCars: "Neuve",
    location: "Location",
    reparation: "Réparation",
    about: "À propos",
    terms: "Termes & Conditions",
    selectLanguage: "Choisir la langue"
  },
  sideBar: {
    source: {
      title: "Source",
      placeHolder: "Ex: SmartAlert",
    },
    city: {
      title: "Ville",
      placeHolder: "Ex: Rabat",
    },
    brand: {
      title: "Marque",
      placeHolder: "Ex: Dacia",
      placeholder: "Ex: Dacia",
    },
    model: {
      title: "Modèle",
      placeHolder: "Ex: Duster",
      placeholder: "Ex: A3",
    },
    price: {
      title: "Prix",
    },
    year: {
      title: "Année",
    },
    promo: {
      cartitle: "PROMO",
      title: "Promotion",
      default: "Oui"
    },
    mileage: {
      title: "Kilométrage",
    },
    origin: {
      title: "Origine",
    },
    fuel: {
      title: "Carburant",
    },
    doors: {
      title: "Nombre de portes",
    },
    firstHand: {
      title: "Première main",
    },
    transmission: {
      title: "Boite à vitesse",
    },
    search: "Rechercher"
  },
  rental: {
    Address: "Address:",
    Telephone: "Téléphone:",
    period: "Période",
    pickupLocation: "Lieu de départ",
    dropoffLocation: "Lieu de dépôt",
    sameLocation: "Même lieu",
    differentLocation: "Lieu différent",
    startDate: "Début",
    startHour: "Heure de Départ",
    endDate: "Fin",
    from: "De",
    to: "à",
    tripDetails: "Détails du voyage:",
    carDetails: "Détails de la voiture:",
    endHour: "Heure de Retour",
    selectHour: "Sélectionner l'heure",
    departureLabel: "Lieu de Départ",
    returnLabel: "Lieu de Retour",
    cityPlaceholder: "Ex: Rabat",
    selectPlaceholder: "Sélectionner...",
    selectDates: "Sélectionner ces dates",
    reset: "Effacer Tous",
  },
  months: {
    january: "Janvier",
    february: "Février",
    march: "Mars",
    april: "Avril",
    may: "Mai",
    june: "Juin",
    july: "Juillet",
    august: "Août",
    september: "Septembre",
    october: "Octobre",
    november: "Novembre",
    december: "Décembre"
  },
  days: {
    sunday: "D",
    monday: "L",
    tuesday: "M",
    wednesday: "M",
    thursday: "J",
    friday: "V",
    saturday: "S"
  },
  carSpecs: {
    essence: "Essence",
    diesel: "Diesel",
    electric: "Électrique",
    hybrid: "Hybride",
    manual: "Manuelle",
    automatic: "Automatique"
  },
  cities: {
    casablanca: "Casablanca",
    rabat: "Rabat",
    marrakech: "Marrakech",
    agadir: "Agadir",
    fes: "Fès",
    tanger: "Tanger"
  },
  rentals: {
    title: "Location de Voitures",
    filterTitle: "Filtrer les locations",
    searchTitle: "Recherche de voitures de location",
    properties: "propriétés",
    inLocation: "dans",
    checkInOut: "Arrivée - Départ",
    guests: "invités",
    guest: "invité",
    bedroom: "chambre",
    bed: "lit",
    search: "Rechercher",
    sort: "Trier",
    filter: "Filtrer",
    from: "À partir de",
    perAdult: "par adulte",
    perDay: "par jour",
    viewDetail: "Voir les détails",
    reviews: "avis",
    exceptional: "Exceptionnel",
    typeOfPlace: "Type de lieu",
    price: "Prix",
    guestRating: "Note des clients",
    amenities: "Équipements",
    breakfastIncluded: "Petit-déjeuner inclus",
    romantic: "Romantique",
    airportTransfer: "Transfert aéroport",
    wifi: "WiFi",
    parking: "Parking",
    spa: "Spa",
    breakfast: "Petit-déjeuner",
    bar: "Bar",
    pool: "Piscine",
    gym: "Salle de sport",
    roomService: "Service en chambre",
    entirePlace: "Lieu entier",
    privateRoom: "Chambre privée",
    sharedRoom: "Chambre partagée",
    excellent: "Excellent",
    veryGood: "Très bien",
    good: "Bien",
    pleasant: "Agréable",
    noPreference: "Aucune préférence",
    findOnMap: "Trouver sur la carte",
    showOnMap: "Afficher sur la carte",
    closeMap: "Fermer la carte",
    overview: "Aperçu",
    highlights: "Points forts",
    location: "Emplacement",
    availability: "Disponibilité",
    policies: "Politiques",
    houseRules: "Règles de la maison",
    helpfulFacts: "Informations utiles",
    guestReviews: "Avis des clients",
    writeReview: "Écrire un avis",
    submitReview: "Soumettre l'avis",
    bookNow: "Réserver maintenant",
    checkAvailability: "Vérifier la disponibilité",
    instantBook: "Réservation instantanée",
    contactHost: "Contacter l'hôte",
    reportListing: "Signaler cette annonce",
    saveListing: "Sauvegarder",
    shareListing: "Partager",
    cancellationPolicy: "Politique d'annulation",
    checkInTime: "Heure d'arrivée",
    checkOutTime: "Heure de départ",
    minimumStay: "Séjour minimum",
    maximumStay: "Séjour maximum",
    hostLanguages: "Langues de l'hôte",
    responseTime: "Temps de réponse",
    responseRate: "Taux de réponse",
    superhost: "Super hôte",
    identityVerified: "Identité vérifiée",
    cleanlinessRating: "Note de propreté",
    accuracyRating: "Note de précision",
    communicationRating: "Note de communication",
    locationRating: "Note de l'emplacement",
    checkinRating: "Note d'arrivée",
    valueRating: "Note du rapport qualité-prix",
    totalRating: "Note globale",
    basedOnReviews: "basé sur {count} avis",
    showMore: "Voir plus",
    showLess: "Voir moins",
    readMore: "Lire la suite",
    readLess: "Lire moins",
    allAmenities: "Tous les équipements",
    popularAmenities: "Équipements populaires",
    safetyAmenities: "Équipements de sécurité",
    internetAmenities: "Internet et bureau",
    kitchenAmenities: "Cuisine et salle à manger",
    bedroomAmenities: "Chambre et linge",
    bathroomAmenities: "Salle de bain",
    entertainmentAmenities: "Divertissement",
    familyAmenities: "Famille",
    accessibilityAmenities: "Accessibilité",
    outdoorAmenities: "Extérieur",
    parkingAmenities: "Parking et installations",
    servicesAmenities: "Services",
    notIncluded: "Non inclus",
    smoking: "Fumeur",
    noSmoking: "Non-fumeur",
    petsAllowed: "Animaux autorisés",
    noPets: "Animaux non autorisés",
    partiesAllowed: "Fêtes autorisées",
    noParties: "Fêtes non autorisées",
    quietHours: "Heures de silence",
    maximumGuests: "Nombre maximum d'invités",
    additionalRules: "Règles supplémentaires",
    // Car rental specific translations
    carsAvailable: "voiture(s) disponible(s)",
    forDays: "Pour {count} jour(s)",
    reserve: "Réserver",
    moreDetails: "Plus de details",
    currency: "dh",
    perDayShort: "/jour",
    carsFound: "voitures trouvées",
    noCarsFound: "Aucune voiture trouvée avec ces critères",
    tryModifyFilters: "Essayez de modifier vos filtres"
  },
  footer: {
    contactInfo: {
      title: "Contactez Nous",
      clientService: "Service client",
      supportService: "Besoin de support?",
    },
    mobile: {
      title: "Mobile",
      downloadOn: "Télécharger sur",
      findOn: "Disponible",
    },
    rights: "Tous droits réservés.",
  }
}

export default fr;