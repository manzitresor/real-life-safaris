/*
 * Real Life Safaris — content data
 * ------------------------------------------------------------
 * Every tour fact, price and contact detail below was taken from
 * the current website (reallifesafaris.com, read 1 Nov 2026).
 * Anything that is NOT from the current site is flagged with
 * `sample: true` or a `note` so it can be confirmed with the company.
 *
 * Images are the company's own photos, loaded from its live site.
 * Swap IMG values for local, optimised files before launch.
 */
(function () {
  var BASE = "https://www.reallifesafaris.com/assets/img/";

  var IMG = {
    savannah: { src: BASE + "home/home1.jpeg", alt: "Golden savannah landscape in Rwanda" },
    gorilla: { src: BASE + "home/home2.jpeg", alt: "Mountain gorilla in the rainforest" },
    kivu: { src: BASE + "home/home3.jpeg", alt: "A boat on Lake Kivu at sunset" },
    safari: { src: BASE + "home/home.jpeg", alt: "Safari landscape in Rwanda" },
    team: { src: BASE + "home/ingagi1.jpg", alt: "Real Life Safaris guides with guests on safari" },
    hike: { src: BASE + "uploads/img_6a9191a3ee2290.78428070.jpeg", alt: "A group hiking in the hills around Kigali" },
    musanze: { src: BASE + "uploads/img_6ab6b7c81fad80.86053391.jpg", alt: "Nature and village walk near Musanze" },
    bees: { src: BASE + "uploads/img_6a6879fd7b71e0.14536479.jpg", alt: "Beekeepers checking hives in protective suits" },
    birds: { src: BASE + "uploads/img_6a6622f29e6dc2.30569372.webp", alt: "Bird watching in Rwanda" },
    akagera: { src: BASE + "uploads/img_6a662d1474b107.62010622.jpeg", alt: "Game drive in Akagera National Park" },
    cycling: { src: BASE + "uploads/img_6a662b69b6caa4.84033017.jpeg", alt: "Cyclists on a trail in Rwanda" }
  };

  var CONTACT = {
    phone: "+250 789 248 756",
    phoneHref: "+250789248756",
    whatsapp: "250789248756",
    email: "reallifesafaris2022@gmail.com",
    address: "11 KG 4 Ave, Kigali, Rwanda",
    instagram: "https://www.instagram.com/reallifesafaris/",
    facebook: "https://www.facebook.com/people/Real-life-Safari/100084378417995/",
    x: "https://x.com/reallifesafaris"
  };

  var CATEGORIES = [
    { id: "wildlife", label: "Wildlife safari" },
    { id: "birding", label: "Birding" },
    { id: "hiking", label: "Hiking & walks" },
    { id: "culture", label: "Culture & community" },
    { id: "cycling", label: "Cycling" }
  ];

  var TOURS = [
    {
      id: "akagera-2-days",
      title: "2 Days in Akagera National Park",
      kicker: "Savannah safari",
      short: "Game drives across the south and north of Rwanda's savannah park, a boat trip and a night game drive, with an overnight at Salt of Akagera.",
      categories: ["wildlife", "birding"],
      duration: "2 days",
      durationType: "multi",
      location: "Akagera National Park, Eastern Province",
      departs: "Kigali (airport pickup available)",
      hours: "06:00 day 1 to about 19:00 day 2",
      group: "1 to 7 travellers",
      image: IMG.akagera,
      gallery: [IMG.akagera, IMG.savannah, IMG.safari, IMG.birds],
      price: {
        from: 750,
        unit: "per person",
        display: "From $750",
        table: [
          { label: "1 traveller", value: "$1,300" },
          { label: "2 to 3 travellers", value: "$850" },
          { label: "4 to 7 travellers", value: "$750" }
        ],
        note: "Prices as listed on the current website. Confirm whether they are per person or per group before launch."
      },
      overview: [
        "Akagera is Rwanda's savannah: open plains, papyrus-fringed lakes and the only place in the country to look for the Big Five. This two-day trip covers both the southern and northern sections of the park, so you see more than a single game drive allows.",
        "You travel in an open-roof Toyota Land Cruiser with your guide, add a boat trip and a night game drive, and spend the night at Salt of Akagera (formerly Akagera Mantis Game Lodge) before heading back to Kigali."
      ],
      highlights: [
        "Game drives in south and north Akagera",
        "Boat trip for hippos, crocodiles and water birds",
        "Night game drive",
        "Overnight at Salt of Akagera",
        "Big Five, giraffes, zebras and 11 antelope species",
        "450+ bird species recorded in the park"
      ],
      itinerary: {
        note: "Sample day plan built from the current tour listing. Exact timings and the order of activities are to be confirmed with Real Life Safaris.",
        steps: [
          { label: "Day 1", time: "06:00", title: "Kigali to southern Akagera", text: "Pickup in Kigali or at the airport and drive east to the park. First game drive through the southern section, followed by a boat trip." },
          { label: "Day 1", time: "Evening", title: "Night game drive and Salt of Akagera", text: "After dinner, a night game drive to look for the animals that move after dark. Overnight at Salt of Akagera." },
          { label: "Day 2", time: "Morning", title: "South and north Akagera", text: "An early start for a full day of game drives across the south and up into the northern plains." },
          { label: "Day 2", time: "About 19:00", title: "Return to Kigali", text: "Drive back to Kigali, with drop-off at your hotel or the airport." }
        ]
      },
      included: ["Game drives", "Boat trip", "Night game drive", "Overnight at Salt of Akagera", "Kigali or airport pickup and drop-off"],
      excluded: ["Inclusions such as park fees, meals and drinks are not stated on the current site and need confirming"],
      bring: ["Binoculars", "Camera with a zoom lens", "Light layers for early mornings", "Hat and sunscreen"],
      stats: [
        { k: "Duration", v: "2 days" },
        { k: "Starts", v: "06:00, Kigali" },
        { k: "Ends", v: "≈ 19:00, Kigali" },
        { k: "Wildlife", v: "Big Five" }
      ]
    },
    {
      id: "musanze-day",
      title: "Nature Walk, Village Walk, Birding and Easy Hiking",
      kicker: "Full day from Musanze",
      short: "A full day on foot around Musanze: birds, village life, history and the landscape of Rwanda's volcano country, with lunch in town.",
      categories: ["hiking", "birding", "culture"],
      duration: "1 day",
      durationType: "day",
      location: "Musanze, Northern Province",
      departs: "Musanze town",
      hours: "08:30 to about 15:30",
      group: "Private or group (group discount)",
      image: IMG.musanze,
      gallery: [IMG.musanze, IMG.hike, IMG.birds],
      price: {
        from: 300,
        unit: "per person",
        display: "$300",
        table: [{ label: "Full package", value: "$300 per person" }],
        note: "A discount applies for larger groups."
      },
      overview: [
        "One full day, four ways of seeing the north. You start in Musanze town and walk out through farmland, forest edges and villages, stopping for birds, for stories about the area's history and culture, and for the views across the hills.",
        "The route is about 18 km over six hours, including an hour for lunch in Musanze town. It stays between 1,640 m and 2,000 m, so the pace is easy and the climbs are gentle."
      ],
      highlights: [
        "Birding along the route, binoculars provided",
        "Village walk with local history and heritage",
        "Easy hiking between 1,640 m and 2,000 m",
        "Lunch in Musanze town",
        "Transport and guiding fees included"
      ],
      itinerary: {
        note: "Timings from the current tour listing. The order of stops is a sample to be confirmed.",
        steps: [
          { label: "Start", time: "08:30", title: "Meet in Musanze town", text: "Meet your guide, collect your walking stick and binoculars, and set off." },
          { label: "Morning", time: "", title: "Nature walk and birding", text: "Walk through the countryside around town looking for birds, with your guide explaining the geography of the area." },
          { label: "Midday", time: "1 hour", title: "Lunch in Musanze town", text: "A sit-down lunch in town, included in the package." },
          { label: "Afternoon", time: "", title: "Village walk and easy hike", text: "Visit a village and continue on an easy hike, with stories of local culture and heritage." },
          { label: "Finish", time: "≈ 15:30", title: "Back in Musanze", text: "The day ends back in town." }
        ]
      },
      included: ["Transport", "Lunch in Musanze town", "Guiding fees", "Unlimited mineral water", "Walking or hiking stick", "Binoculars"],
      excluded: ["Gaiters", "Rain coat", "Souvenir fee", "Porter", "Tips"],
      bring: ["Comfortable walking shoes", "Light rain layer", "Hat", "Camera"],
      stats: [
        { k: "Distance", v: "≈ 18 km" },
        { k: "Walking", v: "6 hrs incl. lunch" },
        { k: "Elevation", v: "1,640–2,000 m" },
        { k: "Hours", v: "08:30–15:30" }
      ]
    },
    {
      id: "kigali-weekend-hike",
      title: "Weekend Group Hike, Birding and Nature Walk",
      kicker: "Every weekend in Kigali",
      short: "Guided group hikes, birding and nature walks in the mountains around Kigali, every Saturday and Sunday morning. Open to any fitness level.",
      categories: ["hiking", "birding"],
      duration: "Half day",
      durationType: "half",
      location: "Mountains around Kigali",
      departs: "Kigali",
      hours: "Saturday and Sunday mornings",
      group: "Open group, any fitness level",
      image: IMG.hike,
      gallery: [IMG.hike, IMG.birds, IMG.musanze],
      price: {
        from: 5,
        unit: "per person",
        display: "From $5",
        table: [
          { label: "Rwandan residents", value: "$5 per person" },
          { label: "International visitors", value: "$10 per person" }
        ],
        note: "Covers the guiding fee and a hiking or walking stick. Booking early is advised."
      },
      overview: [
        "The easiest way to get outside in Kigali. Every Saturday and Sunday morning, Real Life Safaris guides lead a group hike, a birding walk and a nature walk on the trails in the hills around the city, including Mount Jali at 2,080 m.",
        "It is a relaxed half day with scenic trails, local guides and stories along the way. Any fitness level is welcome, and it is a good first outing before a longer trip."
      ],
      highlights: [
        "Every Saturday and Sunday morning",
        "Choose a hike, a birding walk or a nature walk",
        "Trails in the hills around Kigali, including Mount Jali",
        "Guiding fee and walking stick included",
        "Any fitness level"
      ],
      itinerary: {
        note: "Meeting point and start time are not listed on the current site. Add them before launch.",
        steps: [
          { label: "Morning", time: "Sat & Sun", title: "Meet the group", text: "Meet your guide and the group in Kigali. Meeting point to be confirmed when you book." },
          { label: "On the trail", time: "", title: "Hike, birding or nature walk", text: "Walk scenic trails in the hills above the city with a local guide, with stops for birds, views and stories." },
          { label: "Finish", time: "Half day", title: "Back in the city", text: "Return to Kigali by late morning or midday." }
        ]
      },
      included: ["Guiding fee", "Hiking or walking stick"],
      excluded: ["Transport to the meeting point (to be confirmed)"],
      bring: ["Comfortable walking or hiking shoes", "Breathable sportswear", "Hat", "Camera"],
      stats: [
        { k: "When", v: "Sat & Sun mornings" },
        { k: "Duration", v: "Half day" },
        { k: "Fitness", v: "Any level" },
        { k: "Mount Jali", v: "2,080 m" }
      ]
    },
    {
      id: "beekeeping",
      title: "Beekeeping Experience",
      kicker: "Culture & community",
      short: "Meet a cooperative of local beekeepers, suit up to see the hives up close and taste honey straight from the comb.",
      categories: ["culture"],
      duration: "Half day",
      durationType: "half",
      location: "Hills around Kigali or rural Rwanda",
      departs: "Kigali",
      hours: "Half day",
      group: "Private or small group",
      image: IMG.bees,
      gallery: [IMG.bees, IMG.hike],
      price: { from: null, display: "Price on request", table: [], note: "No price is listed on the current site." },
      overview: [
        "Spend a morning with a cooperative of local beekeepers who still use traditional methods. They show you how their hives support the forest around them and the families who depend on it.",
        "Your guide explains the safety rules first, then you put on full protective clothing to see the hives up close. The visit ends the best way possible: honey tasted straight from the comb."
      ],
      highlights: [
        "Meet a local beekeeping cooperative",
        "Learn how hives support forest conservation and families",
        "See the hives up close in full protective gear",
        "Taste honey straight from the comb"
      ],
      itinerary: {
        note: "Order of activities from the tour description. Timings to be confirmed.",
        steps: [
          { label: "Arrive", time: "", title: "Meet the cooperative", text: "Meet the beekeepers and hear how their traditional methods work." },
          { label: "Briefing", time: "", title: "Safety and suiting up", text: "Your guide explains the safety rules and you put on full protective clothing." },
          { label: "Hives", time: "", title: "At the hives", text: "See the hives up close and learn how honey is harvested." },
          { label: "Taste", time: "", title: "Honey from the comb", text: "Finish with a tasting of fresh honey." }
        ]
      },
      included: ["Full protective clothing", "Safety briefing", "Honey tasting"],
      excluded: ["Transport and fees to be confirmed"],
      bring: ["Long trousers", "Closed shoes", "Camera"],
      stats: [
        { k: "Duration", v: "Half day" },
        { k: "Gear", v: "Provided" },
        { k: "Group", v: "Small" },
        { k: "Price", v: "On request" }
      ]
    },
    {
      id: "bird-watching",
      title: "Bird Watching in Rwanda",
      kicker: "Birding day trips",
      short: "Choose a day in Akagera, Nyungwe or Kigali's wetlands with a birding guide, from Shoebills to Albertine Rift endemics.",
      categories: ["birding", "wildlife"],
      duration: "1 day",
      durationType: "day",
      location: "Akagera · Nyungwe · Kigali",
      departs: "Kigali",
      hours: "Full day",
      group: "Private or small group",
      image: IMG.birds,
      gallery: [IMG.birds, IMG.akagera, IMG.savannah],
      price: { from: null, display: "Price on request", table: [], note: "No price is listed on the current site." },
      overview: [
        "Rwanda is one of the best places in Africa for montane birding, with more than 700 species recorded and dozens of Albertine Rift endemics. Many of the best sites are within a short drive of each other.",
        "Pick one of three routes for your day. You travel in a modified Toyota Land Cruiser with a pop-up roof for clear 360° views, and birding is good all year round."
      ],
      highlights: [
        "Akagera: 500+ species including the Shoebill, Papyrus Gonolek and Saddle-billed Stork",
        "Nyungwe: 310+ species, including 30+ Albertine Rift endemics such as the Ruwenzori Turaco",
        "Kigali: Lake Nyarutarama, Nyandungu Eco-Park, Umusambi Village, Nyabarongo wetlands and Gashora",
        "Pop-up roof Land Cruiser for 360° views",
        "Good birding all year"
      ],
      itinerary: {
        note: "Three route options from the current tour listing. Day timings to be confirmed.",
        steps: [
          { label: "Route A", time: "East", title: "Akagera National Park", text: "Savannah, lakes and papyrus swamps. Look for the Shoebill, Papyrus Gonolek, African Fish Eagle and Saddle-billed Stork." },
          { label: "Route B", time: "South-west", title: "Nyungwe National Park", text: "Ancient montane rainforest with Albertine Rift endemics such as the Ruwenzori Turaco and Red-collared Mountain Babbler." },
          { label: "Route C", time: "City", title: "Kigali wetlands and lakes", text: "Lake Nyarutarama, Nyandungu Eco-Park, Umusambi Village, the Nyabarongo river and swamp, and Gashora wetland." }
        ]
      },
      included: ["Birding guide", "Modified Land Cruiser with pop-up roof"],
      excluded: ["Park fees, meals and binocular hire to be confirmed"],
      bring: ["Binoculars", "Telephoto lens", "Waterproof hiking boots", "Insect repellent for the wetlands"],
      stats: [
        { k: "Duration", v: "1 day" },
        { k: "Species", v: "700+ in Rwanda" },
        { k: "Season", v: "Year-round" },
        { k: "Price", v: "On request" }
      ]
    },
    {
      id: "cycling",
      title: "Cycling Rwanda",
      kicker: "Multi-day by bike",
      short: "Six days on two wheels along the Congo Nile Trail, around the Twin Lakes and Lake Muhazi, and across Kigali, with a support vehicle behind you.",
      categories: ["cycling", "culture"],
      duration: "6 days",
      durationType: "multi",
      location: "Congo Nile Trail, Twin Lakes, Lake Muhazi, Kigali",
      departs: "Kigali",
      hours: "Several hours of riding a day",
      group: "Private or small group",
      image: IMG.cycling,
      gallery: [IMG.cycling, IMG.kivu, IMG.hike],
      price: { from: null, display: "Price on request", table: [], note: "No price is listed on the current site." },
      overview: [
        "See Rwanda at the speed of a bike. Routes include the Congo Nile Trail along Lake Kivu, loops around the Twin Lakes and Lake Muhazi, and rides across Kigali.",
        "The pace is moderate and recreational, usually 15 to 25 km/h for a few hours a day. Most trips include a support vehicle, mechanical help, a lead and a tail guide, and an e-bike if you want one."
      ],
      highlights: [
        "Congo Nile Trail along Lake Kivu",
        "Twin Lakes and Lake Muhazi loops",
        "Cycling across Kigali",
        "Support vehicle and mechanical assistance",
        "Lead and tail guides, optional e-bike"
      ],
      itinerary: {
        note: "Day-by-day plan is not on the current site. Routes listed below; the full itinerary is to be supplied.",
        steps: [
          { label: "Route", time: "West", title: "Congo Nile Trail", text: "Rolling lakeshore roads and hill tracks along Lake Kivu." },
          { label: "Route", time: "North", title: "The Twin Lakes", text: "Loops around Lakes Burera and Ruhondo below the volcanoes." },
          { label: "Route", time: "East", title: "Lake Muhazi", text: "A quieter lakeside ride an hour or so east of Kigali." },
          { label: "Route", time: "City", title: "Kigali", text: "A ride across Rwanda's capital and its hills." }
        ]
      },
      included: ["Support vehicle (most trips)", "Mechanical assistance", "Lead and tail guides"],
      excluded: ["Optional e-bike (ask for details)", "Accommodation and meals to be confirmed"],
      bring: ["Padded cycling shorts", "Gloves", "Sunglasses", "Rain layer"],
      stats: [
        { k: "Duration", v: "6 days" },
        { k: "Pace", v: "15–25 km/h" },
        { k: "Support", v: "Vehicle + guides" },
        { k: "E-bike", v: "Optional" }
      ]
    }
  ];

  // Destinations from the current Destinations page.
  // elev = representative elevation in metres (approximate, for the
  // "Rwanda from east to west" profile on the homepage).
  var DESTINATIONS = [
    { id: "akagera", name: "Akagera National Park", region: "East", elev: 1300, elevLabel: "≈ 1,300 m", image: IMG.savannah, text: "Rwanda's savannah park, with the Big Five and over 400 bird species. Camping, night game drives and boat trips.", activities: ["Big Five", "Boat trips", "Night drives", "Camping"], tour: "akagera-2-days", cat: "wildlife" },
    { id: "muhazi", name: "Lake Muhazi", region: "East", elev: 1450, elevLabel: "≈ 1,450 m", image: null, text: "A lakeside escape 1 to 1.5 hours east of Kigali. Boat cruises, kayaking, fishing with villagers, traditional cooking and a banana beer brewery.", activities: ["Kayaking", "Boat cruise", "Cooking", "Banana beer"], tour: "cycling", cat: "culture" },
    { id: "jali", name: "Mount Jali, Kigali", region: "Centre", elev: 2080, elevLabel: "2,080 m", image: IMG.hike, text: "Guided hiking in the mountains around Kigali. Mount Jali is the high point of the city.", activities: ["Hiking", "Birding", "City views"], tour: "kigali-weekend-hike", cat: "hiking" },
    { id: "volcanoes", name: "Volcanoes National Park", region: "North-west", elev: 4507, elevLabel: "up to 4,507 m", image: IMG.gorilla, text: "Home to mountain gorillas and golden monkeys, with hiking on the slopes of the Virunga volcanoes.", activities: ["Gorilla trekking", "Golden monkeys", "Hiking"], tour: "musanze-day", cat: "hiking" },
    { id: "karongi", name: "Karongi, Lake Kivu", region: "West", elev: 1460, elevLabel: "≈ 1,460 m", image: IMG.kivu, text: "Boat trips, natural hot springs, the cow-swimming experience, coffee and tea visits, camping and cycling.", activities: ["Boat trips", "Hot springs", "Coffee & tea"], tour: "cycling", cat: "cycling" },
    { id: "congo-nile", name: "Congo Nile Trail", region: "West", elev: 1700, elevLabel: "≈ 1,500–2,000 m", image: IMG.cycling, text: "Hiking, cycling and camping along Lake Kivu, with coffee and tea trips and boat rides on the way.", activities: ["Cycling", "Hiking", "Camping"], tour: "cycling", cat: "cycling" },
    { id: "nyungwe", name: "Nyungwe National Park", region: "South-west", elev: 2950, elevLabel: "up to ≈ 2,950 m", image: null, text: "Ancient rainforest with 13 primate species and chimpanzee trekking, a canopy walkway, waterfalls and about 300 bird species.", activities: ["Chimpanzees", "Canopy walk", "Waterfalls", "Birding"], tour: "bird-watching", cat: "birding" }
  ];

  window.RLS = { IMG: IMG, CONTACT: CONTACT, CATEGORIES: CATEGORIES, TOURS: TOURS, DESTINATIONS: DESTINATIONS };
})();
