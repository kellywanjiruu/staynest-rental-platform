const propertiesGrid = document.getElementById("propertiesGrid");
const statusText = document.getElementById("statusText");
const searchInput = document.getElementById("searchInput");
const guestFilterSelect = document.getElementById("guestFilterSelect");
const sortSelect = document.getElementById("sortSelect");
const hostPropertyForm = document.getElementById("hostPropertyForm");
const hostFormMessage = document.getElementById("hostFormMessage");
const hostPropertiesList = document.getElementById("hostPropertiesList");
const guestBookingsList = document.getElementById("guestBookingsList");
const hostBookingsList = document.getElementById("hostBookingsList");
const insightListings = document.getElementById("insightListings");
const insightGuestBookings = document.getElementById("insightGuestBookings");
const insightHostBookings = document.getElementById("insightHostBookings");
const insightRevenue = document.getElementById("insightRevenue");
const authStatus = document.getElementById("authStatus");
const openLoginBtn = document.getElementById("openLoginBtn");
const openRegisterBtn = document.getElementById("openRegisterBtn");
const logoutBtn = document.getElementById("logoutBtn");

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

const closeLoginModalBtn = document.getElementById("closeLoginModalBtn");
const closeRegisterModalBtn = document.getElementById("closeRegisterModalBtn");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const switchToRegisterLink = document.getElementById("switchToRegisterLink");
const switchToLoginLink = document.getElementById("switchToLoginLink");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");
const propertyModal = document.getElementById("propertyModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalAmenitiesContainer = document.getElementById("modalAmenitiesContainer");
const modalAttractionsContainer = document.getElementById("modalAttractionsContainer");

const fallbackImage =
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80";

const DEMO_HOST_ID = 1;

// Premium Vector SVGs
const bedSvg = `<svg class="svg-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; opacity: 0.85;"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>`;
const bathSvg = `<svg class="svg-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; opacity: 0.85;"><path d="M9 6a3 3 0 1 1-6 0M21 12H3M12 12V6M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>`;
const areaSvg = `<svg class="svg-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; opacity: 0.85;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>`;
const verifiedSvg = `<svg class="svg-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px; margin-right: 2px;"><polyline points="20 6 9 17 4 12"/></svg>`;
const heartSvg = `<svg class="svg-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

const fallbackProperties = [
  {
    id: 9001,
    title: "Modern Apartment in Kilimani",
    city: "Nairobi",
    country: "Kenya",
    price_per_night: 6500,
    max_guests: 2,
    cover_image_url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    description: "A polished city apartment with clean finishes, fast Wi-Fi, and excellent security.",
  },
  {
    id: 9002,
    title: "Spacious House in Karen",
    city: "Nairobi",
    country: "Kenya",
    price_per_night: 12500,
    max_guests: 6,
    cover_image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    description: "Family-ready home with private compound, parking, and quiet neighborhood access.",
  },
  {
    id: 9003,
    title: "Cozy Studio in Westlands",
    city: "Nairobi",
    country: "Kenya",
    price_per_night: 3800,
    max_guests: 2,
    cover_image_url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    description: "Affordable studio stay close to business hubs, restaurants, and nightlife.",
  },
  {
    id: 9004,
    title: "Beachfront Apartment in Nyali",
    city: "Mombasa",
    country: "Kenya",
    price_per_night: 9200,
    max_guests: 4,
    cover_image_url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    description: "Relaxed coastal apartment with bright spaces and convenient beach access.",
  },
];

const formatKes = (value) => {
  const amount = Number(value || 0);
  return `KSh ${amount.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
};

// Favorites Ledger
let favorites = JSON.parse(localStorage.getItem("staynest_favorites") || "[]");

const toggleFavorite = (propertyId) => {
  const pid = Number(propertyId);
  const index = favorites.indexOf(pid);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(pid);
  }
  localStorage.setItem("staynest_favorites", JSON.stringify(favorites));
  applyPropertyFilters();
};

const propertyCard = (property) => {
  const isFav = favorites.includes(Number(property.id)) ? "is-active" : "";
  const beds = Number(property.max_guests) > 2 ? Math.ceil(Number(property.max_guests) / 2) : 1;
  const baths = Math.max(1, beds - 1);
  const sqft = Number(property.max_guests) * 200 + 150;

  return `
    <article class="property-card">
      <div class="card-media-wrapper">
        <img
          class="property-image"
          src="${property.cover_image_url || fallbackImage}"
          alt="${property.title}"
          loading="lazy"
        />
        <div class="verified-pill-overlay">
          ${verifiedSvg} Verified
        </div>
        <div class="price-tag-overlay">
          ${formatKes(property.price_per_night)} <span>/ night</span>
        </div>
        <button type="button" class="favorite-btn-overlay ${isFav}" data-property-id="${property.id}" aria-label="Add to favorites">
          ${heartSvg}
        </button>
      </div>
      <div class="property-content">
        <h4>${property.title}</h4>
        <p class="property-meta" style="font-size: 0.85rem; font-weight: 500; color: var(--muted); margin-bottom: 0.25rem;">
          ${property.city}, ${property.country}
        </p>
        
        <div class="property-details-row">
          <span class="detail-item">${bedSvg} ${beds} Bed${beds > 1 ? 's' : ''}</span>
          <span class="detail-item">${bathSvg} ${baths} Bath${baths > 1 ? 's' : ''}</span>
          <span class="detail-item">${areaSvg} ${sqft} sqft</span>
        </div>

        <div class="booking-controls">
          <button type="button" class="ghost-btn view-details-btn" data-property-id="${property.id}">View details</button>
          
          <div class="booking-dates-grid">
            <label>
              Check-in
              <input type="date" class="check-in" data-property-id="${property.id}" />
            </label>
            <label>
              Check-out
              <input type="date" class="check-out" data-property-id="${property.id}" />
            </label>
          </div>
          
          <div class="price-breakdown-card hidden" id="price-display-${property.id}"></div>

          <button type="button" class="book-btn book-now-btn" data-property-id="${property.id}">Book now</button>
          <p class="booking-message" id="booking-message-${property.id}"></p>
        </div>
      </div>
    </article>
  `;
};

const today = new Date().toISOString().split("T")[0];

const hostPropertyItem = (property) => `
  <article class="host-property-item">
    <h4>${property.title}</h4>
    <p class="property-meta">${property.city}, ${property.country} · ${formatKes(property.price_per_night)}/night</p>
    <div class="host-block-row">
      <input type="date" class="block-start" data-property-id="${property.id}" min="${today}" />
      <input type="date" class="block-end" data-property-id="${property.id}" min="${today}" />
      <button type="button" class="book-btn block-dates-btn" data-property-id="${property.id}">Block dates</button>
    </div>
    <p class="booking-message" id="host-block-message-${property.id}"></p>
  </article>
`;

const guestBookingItem = (booking) => `
  <article class="host-property-item">
    <h4>${booking.property_title}</h4>
    <p class="property-meta">${booking.city}, ${booking.country}</p>
    <p class="property-meta">${booking.check_in} to ${booking.check_out} · ${formatKes(booking.total_price)}</p>
    <p class="property-meta">Status: <span style="font-weight: 700; color: ${booking.status === 'confirmed' ? '#10b981' : booking.status === 'cancelled' ? '#ef4444' : '#f59e0b'}">${booking.status}</span></p>
  </article>
`;

const hostBookingItem = (booking) => `
  <article class="host-property-item">
    <h4>${booking.property_title}</h4>
    <p class="property-meta">Guest: ${booking.guest_name || "Unknown"}</p>
    <p class="property-meta">${booking.check_in} to ${booking.check_out} · ${formatKes(booking.total_price)}</p>
    <p class="property-meta">Status: <span id="host-booking-status-${booking.id}" style="font-weight: 700; color: ${booking.status === 'confirmed' ? '#10b981' : booking.status === 'cancelled' ? '#ef4444' : '#f59e0b'}">${booking.status}</span></p>
    <div class="host-booking-actions">
      <button type="button" class="ghost-btn host-booking-update-btn" data-booking-id="${booking.id}" data-status="confirmed">Confirm</button>
      <button type="button" class="ghost-btn host-booking-update-btn" data-booking-id="${booking.id}" data-status="cancelled">Cancel</button>
    </div>
    <p class="booking-message" id="host-booking-message-${booking.id}"></p>
  </article>
`;

let currentProperties = [];
let allProperties = [];
let authToken = localStorage.getItem("staynest_token") || "";
let currentUser = null;
let guestBookingsCache = [];
let hostBookingsCache = [];

const setAuthState = (token, user) => {
  authToken = token || "";
  currentUser = user || null;

  if (authToken) {
    localStorage.setItem("staynest_token", authToken);
  } else {
    localStorage.removeItem("staynest_token");
  }

  if (currentUser) {
    authStatus.textContent = `${currentUser.full_name} (${currentUser.role})`;
    logoutBtn.style.display = "inline-block";
    openLoginBtn.style.display = "none";
    openRegisterBtn.style.display = "none";
  } else {
    authStatus.textContent = "Not signed in";
    logoutBtn.style.display = "none";
    openLoginBtn.style.display = "inline-block";
    openRegisterBtn.style.display = "inline-block";
  }

  if (window.updateDashboardVisibility) {
    window.updateDashboardVisibility();
  }
};

const authHeaders = () => (authToken ? { Authorization: `Bearer ${authToken}` } : {});

const loadCurrentUser = async () => {
  if (!authToken) {
    setAuthState("", null);
    return;
  }

  try {
    const response = await fetch("/api/auth/me", { headers: { ...authHeaders() } });
    const data = await response.json();
    if (!response.ok || !data.user) {
      setAuthState("", null);
      return;
    }
    setAuthState(authToken, data.user);
  } catch (error) {
    setAuthState("", null);
  }
};

const propertyMetadata = {
  1: {
    description: "Experience the pinnacle of urban luxury in this stunning double-story penthouse. Offering floor-to-ceiling windows with panoramic city views, high-end bespoke finishes, and a private rooftop terrace perfect for sunset viewing. Complete with premium chef's appliances and high-speed enterprise Wi-Fi.",
    amenities: ["🏊 Private Pool", "📶 Gigabit Wi-Fi", "🔒 Gated Security", "🏋️ Home Gym", "☕ Espresso Machine", "🍳 Private Chef"],
    attractions: [
      { name: "Nairobi National Park", distance: "15 mins drive" },
      { name: "Karura Forest Nature Trails", distance: "12 mins drive" },
      { name: "Westlands Shopping Mall", distance: "5 mins walk" }
    ]
  },
  2: {
    description: "A gorgeous luxury villa directly overlooking the white sands of Watamu Beach. Enjoy pristine ocean views, a private tropical infinity pool, and a fully furnished outdoor lounge designed to capture the perfect marine breeze. Ideal for large family getaways and intimate coastal retreats.",
    amenities: ["🌊 Ocean Front", "🏊 Infinity Pool", "❄️ Air Conditioning", "📶 Free Wi-Fi", "🧹 Daily Housekeeping", "🌴 Tropical Garden"],
    attractions: [
      { name: "Watamu Marine National Park", distance: "5 mins walk" },
      { name: "Gede Ruins Historical Site", distance: "10 mins drive" },
      { name: "Lida Island Reef Tours", distance: "8 mins drive" }
    ]
  },
  3: {
    description: "Nestled in the tranquil, rolling hills of Naivasha, this rustic countryside chalet blends old-world charm with modern convenience. Features an open stone fireplace, high vaulted pine ceilings, and a beautiful wrap-around veranda looking out over pristine grasslands populated by local wildlife.",
    amenities: ["🔥 Cozy Fireplace", "📶 Free Wi-Fi", "🚗 Private Garage", "🌳 Private Acreage", "🪵 BBQ Grill Station", "🚲 Guided Bikes"],
    attractions: [
      { name: "Hell's Gate National Park", distance: "20 mins drive" },
      { name: "Lake Naivasha Boat Safaris", distance: "10 mins drive" },
      { name: "Mount Longonot Hike Route", distance: "25 mins drive" }
    ]
  },
  4: {
    description: "Welcome to paradise in this ultra-modern, sun-drenched sanctuary at Diani Beach. Features an expansive open-concept living pavilion, private lap pool, direct private beach access pathway, and curated contemporary African artwork. Includes full concierge and private butler options.",
    amenities: ["🏖️ Direct Beach Access", "🏊 Private Lap Pool", "❄️ Air Conditioning", "📶 Gigabit Wi-Fi", "🍹 Cocktail Bar", "🤵 Butler Services"],
    attractions: [
      { name: "Kongo Mosque Historic Beach", distance: "8 mins drive" },
      { name: "Colobus Conservation Reserve", distance: "12 mins drive" },
      { name: "Shimba Hills Forest Reserve", distance: "35 mins drive" }
    ]
  },
  5: {
    description: "An elegant, colonial-style homestead situated in the prestigious Karen neighborhood. Surrounded by lush, sprawling century-old gardens, this premium home offers classic rich timber panels, a vintage libraries study, private tennis court, and absolute peace and quiet away from the city hustle.",
    amenities: ["🎾 Tennis Court", "🌳 Sprawling Gardens", "📶 High-Speed Wi-Fi", "🔒 Secure Gates", "📚 Private Study", "☕ Tea Veranda"],
    attractions: [
      { name: "Karen Blixen Museum", distance: "6 mins drive" },
      { name: "David Sheldrick Elephant Trust", distance: "12 mins drive" },
      { name: "Giraffe Centre Sanctuary", distance: "10 mins drive" }
    ]
  },
  6: {
    description: "Step back in time inside this beautifully restored 18th-century Swahili manor in Mombasa Old Town. Showcases intricate hand-carved mahogany doors, traditional plaster alcoves, a fresh open-air central courtyard, and premium authentic Swahili coast antique furniture.",
    amenities: ["🏺 Antique Furniture", "🌿 Central Courtyard", "❄️ Ceiling Fans", "📶 Free Wi-Fi", "🍽️ Swahili Dinner Options", "🧹 Housekeeper"],
    attractions: [
      { name: "Fort Jesus World Heritage Site", distance: "3 mins walk" },
      { name: "Mombasa Old Port Harbor", distance: "5 mins walk" },
      { name: "Spice Market Bazaar", distance: "8 mins walk" }
    ]
  },
  7: {
    description: "A private, luxurious coastal escape nestled next to the marine turtle sanctuary in Watamu. Features elegant limestone floors, open breeze design, a private salt-water dipping pool, and premium sunset views over the creek mangrove forests.",
    amenities: ["🌊 Creek & Ocean Views", "🏊 Dipping Pool", "❄️ Air Conditioning", "📶 Free Wi-Fi", "🐢 Eco-Friendly Power", "🍹 Mangrove Deck"],
    attractions: [
      { name: "Mida Creek Mangrove Boardwalk", distance: "8 mins drive" },
      { name: "Turtle Watch Protection Center", distance: "4 mins drive" },
      { name: "Bio-Ken Snake Farm Safari", distance: "6 mins drive" }
    ]
  },
  8: {
    description: "Located high in the peaceful hills of Eldoret, this modern highland lodge offers fresh pine breezes, an open timber deck, organic garden access, and stunning panoramic views of the Great Rift Valley. Perfect for nature lovers and high-altitude athletes.",
    amenities: ["🏔️ Valley Views", "🔥 Wood Stove", "📶 Free Wi-Fi", "🥬 Organic Farm Access", "🚗 Secure Parking", "🚲 Mountain Bikes"],
    attractions: [
      { name: "Kapolet Forest Scenic Reserve", distance: "30 mins drive" },
      { name: "Eldoret Athletic Training Track", distance: "15 mins drive" },
      { name: "Rupa's Mall Complex", distance: "10 mins drive" }
    ]
  },
  9: {
    description: "An spectacular glass-walled luxury eco-cabin situated in Nanyuki, directly facing the snow-capped peaks of Mount Kenya. Completely solar-powered, featuring an outdoor wood-fired cedar hot tub, a fire pit, and direct views of wandering zebras and impalas.",
    amenities: ["🏔️ Mount Kenya Views", "🪵 Wood Hot Tub", "☀️ 100% Solar Powered", "🔥 Outdoor Fire Pit", "📶 Free Wi-Fi", "🔭 Wildlife Telescope"],
    attractions: [
      { name: "Ol Pejeta Conservancy", distance: "20 mins drive" },
      { name: "Mount Kenya National Park", distance: "15 mins drive" },
      { name: "Ngare Ndare Forest Canopy Walk", distance: "35 mins drive" }
    ]
  },
  10: {
    description: "A premium lakeside villa in Kisumu boasting direct access to the shores of Lake Victoria. Features wrap-around floor-to-ceiling glass walls, a private jetty, a stunning lake-facing pool, and arguably the finest sunset views in East Africa. Includes optional private boat captain services.",
    amenities: ["🌅 Lake Victoria Shore", "🏊 Lakefront Pool", "❄️ Air Conditioning", "📶 High-speed Wi-Fi", "⛵ Private Jetty", "🐠 Fresh Fish Dinners"],
    attractions: [
      { name: "Kisumu Impala Sanctuary", distance: "8 mins drive" },
      { name: "Dunga Hill Camp Sunset Point", distance: "5 mins drive" },
      { name: "Kiboko Bay Boat Rides", distance: "6 mins drive" }
    ]
  }
};

const openPropertyModal = (propertyId) => {
  const property = currentProperties.find((item) => String(item.id) === String(propertyId));
  if (!property) {
    return;
  }

  modalImage.src = property.cover_image_url || fallbackImage;
  modalTitle.textContent = property.title;
  modalLocation.textContent = `${property.city}, ${property.country}`;
  modalPrice.textContent = `${formatKes(property.price_per_night)} / night · up to ${property.max_guests} guests`;
  
  // Load rich descriptions and metadata
  const meta = propertyMetadata[propertyId] || {
    description: property.description || "Comfortable stay with curated amenities and professional hosting.",
    amenities: ["📶 Free Wi-Fi", "🚗 Free Parking", "🍳 Kitchen"],
    attractions: [{ name: "Local Town Centre", distance: "10 mins walk" }]
  };

  modalDescription.textContent = meta.description;

  // Build Amenities list
  modalAmenitiesContainer.innerHTML = `
    <h4 class="modal-section-title">✨ Premium Amenities</h4>
    <div class="modal-amenities-grid">
      ${meta.amenities.map(amenity => `
        <div class="modal-amenity-badge">
          <span>${amenity}</span>
        </div>
      `).join("")}
    </div>
  `;

  // Build Attractions list
  modalAttractionsContainer.innerHTML = `
    <h4 class="modal-section-title">📍 Nearby Attractions Guide</h4>
    <div class="modal-attractions-list">
      ${meta.attractions.map(attr => `
        <div class="modal-attraction-item">
          <div class="modal-attraction-label">
            <span>🚶 ${attr.name}</span>
          </div>
          <span class="modal-attraction-distance">${attr.distance}</span>
        </div>
      `).join("")}
    </div>
  `;

  propertyModal.classList.remove("hidden");
};

const wirePropertyDetails = () => {
  const buttons = document.querySelectorAll(".view-details-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      openPropertyModal(button.dataset.propertyId);
    });
  });
};

const updateInsights = () => {
  insightListings.textContent = String(currentProperties.length);
  insightGuestBookings.textContent = String(guestBookingsCache.length);
  insightHostBookings.textContent = String(hostBookingsCache.length);
  const revenue = hostBookingsCache
    .filter((booking) => booking.status === "confirmed")
    .reduce((sum, booking) => sum + Number(booking.total_price || 0), 0);
  insightRevenue.textContent = formatKes(revenue);
};

const applyPropertyFilters = () => {
  const term = String(searchInput.value || "").trim().toLowerCase();
  const guestMin = Number(guestFilterSelect.value || 0);
  const sortBy = sortSelect.value;

  const filtered = allProperties
    .filter((property) => {
      const haystack = `${property.title} ${property.city} ${property.country}`.toLowerCase();
      return term ? haystack.includes(term) : true;
    })
    .filter((property) => {
      return guestMin ? Number(property.max_guests) >= guestMin : true;
    });

  if (sortBy === "priceAsc") {
    filtered.sort((a, b) => Number(a.price_per_night) - Number(b.price_per_night));
  } else if (sortBy === "priceDesc") {
    filtered.sort((a, b) => Number(b.price_per_night) - Number(a.price_per_night));
  }

  currentProperties = filtered;
  if (filtered.length === 0) {
    propertiesGrid.innerHTML = '<div class="empty-state">No listings match your filters.</div>';
    statusText.textContent = "0 listings";
    updateInsights();
    return;
  }

  propertiesGrid.innerHTML = filtered.map(propertyCard).join("");
  statusText.textContent = `${filtered.length} listings`;
  wirePropertyDetails();
  wireBookingButtons();
  wireFavoriteButtons();
  setupPriceCalculators();
  updateInsights();
};

// Wire dynamic calculations on card date changes
const setupPriceCalculators = () => {
  const checkInInputs = document.querySelectorAll(".check-in");
  checkInInputs.forEach((inInput) => {
    const pid = inInput.dataset.propertyId;
    const outInput = document.querySelector(`.check-out[data-property-id="${pid}"]`);
    const breakdown = document.getElementById(`price-display-${pid}`);

    const calculate = () => {
      const checkIn = inInput.value;
      const checkOut = outInput.value;
      if (checkIn && checkOut) {
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        const nights = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
        const prop = allProperties.find((p) => String(p.id) === String(pid));

        if (prop && nights > 0) {
          const rate = Number(prop.price_per_night);
          const basePrice = nights * rate;
          const cleaningFee = 1500;
          const serviceFee = Math.round(basePrice * 0.08);
          const taxPrice = Math.round((basePrice + cleaningFee + serviceFee) * 0.16);
          const grandTotal = basePrice + cleaningFee + serviceFee + taxPrice;

          breakdown.innerHTML = `
            <div class="price-breakdown-row">
              <span>${formatKes(rate)} x ${nights} night${nights > 1 ? 's' : ''}</span>
              <span>${formatKes(basePrice)}</span>
            </div>
            <div class="price-breakdown-row">
              <span>Cleaning fee</span>
              <span>${formatKes(cleaningFee)}</span>
            </div>
            <div class="price-breakdown-row">
              <span>StayNest service fee (8%)</span>
              <span>${formatKes(serviceFee)}</span>
            </div>
            <div class="price-breakdown-row">
              <span>Tourism VAT Levy (16%)</span>
              <span>${formatKes(taxPrice)}</span>
            </div>
            <div class="price-breakdown-divider"></div>
            <div class="price-breakdown-row total-row">
              <span>Total price</span>
              <span>${formatKes(grandTotal)}</span>
            </div>
          `;
          breakdown.style.display = "flex";
          breakdown.classList.remove("hidden");
        } else {
          breakdown.style.display = "none";
          breakdown.classList.add("hidden");
        }
      } else {
        breakdown.style.display = "none";
        breakdown.classList.add("hidden");
      }
    };

    inInput.addEventListener("change", calculate);
    outInput.addEventListener("change", calculate);
  });
};

const wireFavoriteButtons = () => {
  const buttons = document.querySelectorAll(".favorite-btn-overlay");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const pid = button.dataset.propertyId;
      toggleFavorite(pid);
    });
  });
};

const wireBookingButtons = () => {
  const buttons = document.querySelectorAll(".book-now-btn");
  const checkInInputs = document.querySelectorAll(".check-in");
  const checkOutInputs = document.querySelectorAll(".check-out");

  checkInInputs.forEach((input) => {
    input.min = today;
  });

  checkOutInputs.forEach((input) => {
    input.min = today;
  });

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const propertyId = button.dataset.propertyId;
      const checkInInput = document.querySelector(`.check-in[data-property-id="${propertyId}"]`);
      const checkOutInput = document.querySelector(`.check-out[data-property-id="${propertyId}"]`);
      const message = document.getElementById(`booking-message-${propertyId}`);

      const checkIn = checkInInput.value;
      const checkOut = checkOutInput.value;

      if (!checkIn || !checkOut) {
        message.className = "booking-message error-text";
        message.textContent = "Please select check-in and check-out dates.";
        return;
      }

      try {
        message.className = "booking-message";
        message.textContent = "Checking availability...";
        const availabilityResponse = await fetch(
          `/api/properties/${propertyId}/availability?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`
        );
        const availabilityData = await availabilityResponse.json();

        if (!availabilityResponse.ok) {
          throw new Error(availabilityData.message || "Availability check failed.");
        }

        if (!availabilityData.isAvailable) {
          message.className = "booking-message error-text";
          message.textContent = availabilityData.reason || "Selected dates are unavailable.";
          return;
        }

        message.textContent = "Creating booking...";
        if (!currentUser) {
          throw new Error("Please sign in first.");
        }
        const bookingResponse = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify({
            propertyId: Number(propertyId),
            checkIn,
            checkOut,
          }),
        });

        const bookingData = await bookingResponse.json();
        if (!bookingResponse.ok) {
          throw new Error(bookingData.message || "Booking failed.");
        }

        message.className = "booking-message success-text";
        message.textContent = `Booked stay successfully! (ID: #${bookingData.booking.id})`;
        await Promise.all([loadGuestBookings(), loadHostBookings()]);
      } catch (error) {
        message.className = "booking-message error-text";
        message.textContent = error.message;
      }
    });
  });
};

const wireBlockDatesButtons = () => {
  const buttons = document.querySelectorAll(".block-dates-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const propertyId = button.dataset.propertyId;
      const startInput = document.querySelector(`.block-start[data-property-id="${propertyId}"]`);
      const endInput = document.querySelector(`.block-end[data-property-id="${propertyId}"]`);
      const message = document.getElementById(`host-block-message-${propertyId}`);
      const startDate = startInput.value;
      const endDate = endInput.value;

      if (!startDate || !endDate) {
        message.textContent = "Select start and end dates.";
        return;
      }

      try {
        const response = await fetch(`/api/properties/${propertyId}/block-dates`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify({ startDate, endDate }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to block dates.");
        }
        message.textContent = "Dates blocked successfully.";
      } catch (error) {
        message.textContent = error.message;
      }
    });
  });
};

const wireHostBookingUpdateButtons = () => {
  const buttons = document.querySelectorAll(".host-booking-update-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const bookingId = button.dataset.bookingId;
      const status = button.dataset.status;
      const message = document.getElementById(`host-booking-message-${bookingId}`);
      const statusNode = document.getElementById(`host-booking-status-${bookingId}`);

      try {
        const response = await fetch(`/api/bookings/${bookingId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify({ status }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to update booking.");
        }
        statusNode.textContent = data.booking.status;
        statusNode.style.color = data.booking.status === "confirmed" ? "#10b981" : "#ef4444";
        message.textContent = `Booking marked as ${data.booking.status}.`;
        await Promise.all([loadGuestBookings(), loadHostBookings()]);
      } catch (error) {
        message.textContent = error.message;
      }
    });
  });
};

const loadGuestBookings = async () => {
  if (!currentUser) {
    guestBookingsList.innerHTML = '<div class="empty-state">Sign in to view your bookings.</div>';
    return;
  }

  try {
    const response = await fetch("/api/bookings/my", { headers: { ...authHeaders() } });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to load bookings.");
    }

    const bookings = data.bookings || [];
    if (bookings.length === 0) {
      guestBookingsCache = [];
      guestBookingsList.innerHTML = '<div class="empty-state">No bookings yet.</div>';
      updateInsights();
      return;
    }
    guestBookingsCache = bookings;
    guestBookingsList.innerHTML = bookings.map(guestBookingItem).join("");
    updateInsights();
  } catch (error) {
    guestBookingsCache = [];
    guestBookingsList.innerHTML = `<div class="empty-state">${error.message}</div>`;
    updateInsights();
  }
};

const loadHostBookings = async () => {
  if (!currentUser || currentUser.role !== "host") {
    hostBookingsList.innerHTML = '<div class="empty-state">Sign in as host to manage bookings.</div>';
    return;
  }

  try {
    const response = await fetch("/api/bookings/host", { headers: { ...authHeaders() } });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to load host bookings.");
    }

    const bookings = data.bookings || [];
    if (bookings.length === 0) {
      hostBookingsCache = [];
      hostBookingsList.innerHTML = '<div class="empty-state">No booking requests yet.</div>';
      updateInsights();
      return;
    }

    hostBookingsCache = bookings;
    hostBookingsList.innerHTML = bookings.map(hostBookingItem).join("");
    wireHostBookingUpdateButtons();
    updateInsights();
  } catch (error) {
    hostBookingsCache = [];
    hostBookingsList.innerHTML = `<div class="empty-state">${error.message}</div>`;
    updateInsights();
  }
};

const loadHostProperties = async () => {
  try {
    const hostId = currentUser?.role === "host" ? currentUser.id : DEMO_HOST_ID;
    const response = await fetch(`/api/properties/host/${hostId}`);
    if (!response.ok) {
      throw new Error("Failed to load host properties.");
    }
    const data = await response.json();
    const properties = data.properties || [];

    if (properties.length === 0) {
      hostPropertiesList.innerHTML = '<div class="empty-state">No host properties yet.</div>';
      return;
    }

    hostPropertiesList.innerHTML = properties.map(hostPropertyItem).join("");
    wireBlockDatesButtons();
  } catch (error) {
    hostPropertiesList.innerHTML = '<div class="empty-state">Host data unavailable. Connect database to enable host actions.</div>';
  }
};

const wireHostForm = () => {
  hostPropertyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(hostPropertyForm);
    const payload = {
      title: String(formData.get("title") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      country: String(formData.get("country") || "").trim(),
      pricePerNight: Number(formData.get("pricePerNight")),
      maxGuests: Number(formData.get("maxGuests")),
      coverImageUrl: String(formData.get("coverImageUrl") || "").trim(),
      description: String(formData.get("description") || "").trim(),
    };

    try {
      if (!currentUser || currentUser.role !== "host") {
        throw new Error("Sign in as host to create listings.");
      }
      hostFormMessage.textContent = "Creating property...";
      const response = await fetch(`/api/properties/host/${currentUser.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create property.");
      }

      hostFormMessage.textContent = `Property created: ${data.property.title}`;
      hostPropertyForm.reset();
      await Promise.all([loadProperties(), loadHostProperties()]);
    } catch (error) {
      hostFormMessage.textContent = error.message;
    }
  });
};

const loadProperties = async () => {
  try {
    const response = await fetch("/api/properties");
    if (!response.ok) {
      throw new Error("Failed to load listings.");
    }

    const data = await response.json();
    const properties = data.properties || [];
    allProperties = properties;
    currentProperties = properties;

    if (properties.length === 0) {
      propertiesGrid.innerHTML = '<div class="empty-state">No listings yet. Add seed data and refresh.</div>';
      statusText.textContent = "0 listings";
      updateInsights();
      return;
    }

    applyPropertyFilters();
  } catch (error) {
    allProperties = fallbackProperties;
    currentProperties = fallbackProperties;
    applyPropertyFilters();
    statusText.textContent = "Demo mode";
  }
};

const wireListingToolbar = () => {
  searchInput.addEventListener("input", applyPropertyFilters);
  guestFilterSelect.addEventListener("change", applyPropertyFilters);
  sortSelect.addEventListener("change", applyPropertyFilters);
};

const wireAuthModal = () => {
  openLoginBtn.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
    loginMessage.textContent = "";
  });

  openRegisterBtn.addEventListener("click", () => {
    registerModal.classList.remove("hidden");
    registerMessage.textContent = "";
  });

  closeLoginModalBtn.addEventListener("click", () => {
    loginModal.classList.add("hidden");
  });

  closeRegisterModalBtn.addEventListener("click", () => {
    registerModal.classList.add("hidden");
  });

  switchToRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.classList.add("hidden");
    registerModal.classList.remove("hidden");
    registerMessage.textContent = "";
  });

  switchToLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.classList.add("hidden");
    loginModal.classList.remove("hidden");
    loginMessage.textContent = "";
  });

  loginModal.addEventListener("click", (event) => {
    if (event.target === loginModal) {
      loginModal.classList.add("hidden");
    }
  });

  registerModal.addEventListener("click", (event) => {
    if (event.target === registerModal) {
      registerModal.classList.add("hidden");
    }
  });
};

const wireAuthForms = () => {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(formData.get("email") || "").trim(),
          password: String(formData.get("password") || ""),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }
      setAuthState(data.token, data.user);
      loginMessage.textContent = `Welcome ${data.user.full_name}`;
      setTimeout(() => {
        loginModal.classList.add("hidden");
      }, 1000);
      await Promise.all([loadHostProperties(), loadGuestBookings(), loadHostBookings()]);
    } catch (error) {
      loginMessage.textContent = error.message;
    }
  });

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(formData.get("fullName") || "").trim(),
          email: String(formData.get("email") || "").trim(),
          password: String(formData.get("password") || ""),
          role: String(formData.get("role") || "guest"),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }
      registerMessage.textContent = `Account created! Please sign in.`;
      registerForm.reset();
      setTimeout(() => {
        registerModal.classList.add("hidden");
        loginModal.classList.remove("hidden");
        loginMessage.textContent = "Please sign in with your new credentials.";
      }, 1500);
    } catch (error) {
      registerMessage.textContent = error.message;
    }
  });

  logoutBtn.addEventListener("click", async () => {
    try {
      if (authToken) {
        await fetch("/api/auth/logout", { method: "POST", headers: { ...authHeaders() } });
      }
    } finally {
      setAuthState("", null);
      loadHostProperties();
      loadGuestBookings();
      loadHostBookings();
    }
  });
};

closeModalBtn.addEventListener("click", () => {
  propertyModal.classList.add("hidden");
});

propertyModal.addEventListener("click", (event) => {
  if (event.target === propertyModal) {
    propertyModal.classList.add("hidden");
  }
});

// Setup tab routing and toggle visibility dynamically
const setupDashboardHub = () => {
  const dashboardHub = document.getElementById("dashboardHub");
  const tabOverview = document.getElementById("tabOverview");
  const tabGuestStays = document.getElementById("tabGuestStays");
  const tabHostListings = document.getElementById("tabHostListings");
  const tabHostBookings = document.getElementById("tabHostBookings");

  const panelOverview = document.getElementById("panelOverview");
  const panelGuestStays = document.getElementById("panelGuestStays");
  const panelHostListings = document.getElementById("panelHostListings");
  const panelHostBookings = document.getElementById("panelHostBookings");

  const cardTotalListings = document.getElementById("cardTotalListings");
  const cardGuestBookings = document.getElementById("cardGuestBookings");
  const cardHostBookings = document.getElementById("cardHostBookings");
  const cardHostRevenue = document.getElementById("cardHostRevenue");

  const tabs = [
    { button: tabOverview, panel: panelOverview },
    { button: tabGuestStays, panel: panelGuestStays },
    { button: tabHostListings, panel: panelHostListings },
    { button: tabHostBookings, panel: panelHostBookings }
  ];

  tabs.forEach(({ button, panel }) => {
    button.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.button.classList.remove("active-tab");
        t.panel.classList.remove("active-panel");
      });
      button.classList.add("active-tab");
      panel.classList.add("active-panel");
    });
  });

  window.updateDashboardVisibility = () => {
    if (!currentUser) {
      dashboardHub.classList.add("hidden");
      return;
    }

    dashboardHub.classList.remove("hidden");

    if (currentUser.role === "host") {
      tabOverview.classList.remove("hidden-tab");
      tabGuestStays.classList.remove("hidden-tab");
      tabHostListings.classList.remove("hidden-tab");
      tabHostBookings.classList.remove("hidden-tab");

      cardTotalListings.style.display = "block";
      cardGuestBookings.style.display = "block";
      cardHostBookings.style.display = "block";
      cardHostRevenue.style.display = "block";

      tabOverview.click();
    } else {
      tabOverview.classList.remove("hidden-tab");
      tabGuestStays.classList.remove("hidden-tab");
      tabHostListings.classList.add("hidden-tab");
      tabHostBookings.classList.add("hidden-tab");

      cardTotalListings.style.display = "none";
      cardGuestBookings.style.display = "block";
      cardHostBookings.style.display = "none";
      cardHostRevenue.style.display = "none";

      tabGuestStays.click();
    }
  };

  window.updateDashboardVisibility();
};

wireHostForm();
wireAuthModal();
wireAuthForms();
wireListingToolbar();
setupDashboardHub();

// Fetch properties and user sessions concurrently without blocking the main UI thread
(async () => {
  loadProperties();
  await loadCurrentUser();
  await Promise.all([
    loadHostProperties(),
    loadGuestBookings(),
    loadHostBookings()
  ]);
})();
