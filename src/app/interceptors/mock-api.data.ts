import { Category } from '../models/category.model';
import { LocalizedText } from '../models/localized-text.model';
import { Product } from '../models/product.model';

const SPEC_LABELS = {
  chipset: { de: 'Chipsatz', en: 'Chipset' },
  vram: { de: 'Grafikspeicher', en: 'Video memory' },
  interface: { de: 'Anschluss', en: 'Interface' },
  socket: { de: 'Sockel', en: 'Socket' },
  cores: { de: 'Kerne', en: 'Cores' },
  threads: { de: 'Threads', en: 'Threads' },
  baseClock: { de: 'Basistakt', en: 'Base clock' },
  formFactor: { de: 'Formfaktor', en: 'Form factor' },
  ddrType: { de: 'RAM-Typ', en: 'RAM-Typ' },
  capacity: { de: 'Kapazität', en: 'Capacity' },
  wattage: { de: 'Leistung', en: 'Wattage' },
  efficiency: { de: 'Effizienz', en: 'Efficiency rating' },
} satisfies Record<string, LocalizedText>;

function spec(key: keyof typeof SPEC_LABELS, value: string) {
  return { key, label: SPEC_LABELS[key], value };
}

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    slug: 'graphics-cards',
    name: { de: 'Grafikkarten', en: 'Graphics cards' },
    filterSpecKey: 'vram',
  },
  {
    id: 'cat-2',
    slug: 'processors',
    name: { de: 'Prozessoren', en: 'Processors' },
    filterSpecKey: 'cores',
  },
  {
    id: 'cat-3',
    slug: 'mainboards',
    name: { de: 'Mainboards', en: 'Mainboards' },
    filterSpecKey: 'formFactor',
  },
  {
    id: 'cat-4',
    slug: 'memory',
    name: { de: 'Arbeitsspeicher', en: 'Memory' },
    filterSpecKey: 'capacity',
  },
  {
    id: 'cat-5',
    slug: 'power-supplies',
    name: { de: 'Netzteile', en: 'Power supplies' },
    filterSpecKey: 'wattage',
  },
  {
    id: 'cat-6',
    slug: 'cases',
    name: { de: 'Gehäuse', en: 'Cases' },
    filterSpecKey: 'formFactor',
  },
  {
    id: 'cat-7',
    slug: 'prebuilt-pcs',
    name: { de: 'Komplett-PCs', en: 'Prebuilt PCs' },
  },
];

export const PRODUCTS: Product[] = [
  // Graphics cards
  {
    id: 'gpu-1',
    categorySlug: 'graphics-cards',
    name: { de: 'GeForce RTX 4070 SUPER 12 GB', en: 'GeForce RTX 4070 SUPER 12 GB' },
    description: {
      de: 'Starke Leistung für 1440p-Gaming mit 12 GB GDDR6X-Speicher.',
      en: 'Strong performance for 1440p gaming with 12 GB of GDDR6X memory.',
    },
    manufacturer: 'MSI',
    priceCents: 64900,
    available: true,
    specs: [spec('chipset', 'NVIDIA'), spec('vram', '12 GB'), spec('interface', 'PCIe 4.0')],
  },
  {
    id: 'gpu-2',
    categorySlug: 'graphics-cards',
    name: { de: 'Radeon RX 7700 XT 12 GB', en: 'Radeon RX 7700 XT 12 GB' },
    description: {
      de: 'Ausgewogene Karte für hohe Bildraten bei 1440p.',
      en: 'Well-balanced card for high frame rates at 1440p.',
    },
    manufacturer: 'Sapphire',
    priceCents: 42900,
    available: true,
    specs: [spec('chipset', 'AMD'), spec('vram', '12 GB'), spec('interface', 'PCIe 4.0')],
  },
  {
    id: 'gpu-3',
    categorySlug: 'graphics-cards',
    name: { de: 'GeForce RTX 4060 8 GB', en: 'GeForce RTX 4060 8 GB' },
    description: {
      de: 'Effiziente Einstiegskarte für 1080p-Gaming.',
      en: 'Efficient entry-level card for 1080p gaming.',
    },
    manufacturer: 'ASUS',
    priceCents: 29900,
    available: true,
    specs: [spec('chipset', 'NVIDIA'), spec('vram', '8 GB'), spec('interface', 'PCIe 4.0')],
  },
  {
    id: 'gpu-4',
    categorySlug: 'graphics-cards',
    name: { de: 'Radeon RX 7900 XT 20 GB', en: 'Radeon RX 7900 XT 20 GB' },
    description: {
      de: 'High-End-Karte für 4K-Gaming mit viel Speicherreserve.',
      en: 'High-end card for 4K gaming with plenty of memory headroom.',
    },
    manufacturer: 'Sapphire',
    priceCents: 74900,
    available: true,
    specs: [spec('chipset', 'AMD'), spec('vram', '20 GB'), spec('interface', 'PCIe 4.0')],
  },
  {
    id: 'gpu-5',
    categorySlug: 'graphics-cards',
    name: { de: 'GeForce RTX 4070 Ti SUPER 16 GB', en: 'GeForce RTX 4070 Ti SUPER 16 GB' },
    description: {
      de: 'Leistungsstarke Karte für 4K-Gaming und Creator-Workloads.',
      en: 'High-performance card for 4K gaming and creator workloads.',
    },
    manufacturer: 'MSI',
    priceCents: 84900,
    available: true,
    specs: [spec('chipset', 'NVIDIA'), spec('vram', '16 GB'), spec('interface', 'PCIe 4.0')],
  },

  // Processors
  {
    id: 'cpu-1',
    categorySlug: 'processors',
    name: { de: 'Ryzen 7 7800X3D', en: 'Ryzen 7 7800X3D' },
    description: {
      de: 'Gaming-Prozessor mit 3D V-Cache für maximale Bildraten.',
      en: 'Gaming processor with 3D V-Cache for maximum frame rates.',
    },
    manufacturer: 'AMD',
    priceCents: 39900,
    available: true,
    specs: [spec('socket', 'AM5'), spec('cores', '8'), spec('threads', '16'), spec('baseClock', '4.2 GHz')],
  },
  {
    id: 'cpu-2',
    categorySlug: 'processors',
    name: { de: 'Ryzen 5 7600', en: 'Ryzen 5 7600' },
    description: {
      de: 'Effizienter Allrounder für Gaming und Alltag.',
      en: 'Efficient all-rounder for gaming and everyday use.',
    },
    manufacturer: 'AMD',
    priceCents: 21900,
    available: true,
    specs: [spec('socket', 'AM5'), spec('cores', '6'), spec('threads', '12'), spec('baseClock', '3.8 GHz')],
  },
  {
    id: 'cpu-3',
    categorySlug: 'processors',
    name: { de: 'Ryzen 9 7950X3D', en: 'Ryzen 9 7950X3D' },
    description: {
      de: 'High-End-Prozessor für Gaming und produktive Workloads.',
      en: 'High-end processor for gaming and productivity workloads.',
    },
    manufacturer: 'AMD',
    priceCents: 59900,
    available: true,
    specs: [spec('socket', 'AM5'), spec('cores', '16'), spec('threads', '32'), spec('baseClock', '4.2 GHz')],
  },
  {
    id: 'cpu-4',
    categorySlug: 'processors',
    name: { de: 'Core i5-14600K', en: 'Core i5-14600K' },
    description: {
      de: 'Solide Mittelklasse mit gutem Preis-Leistungs-Verhältnis.',
      en: 'Solid mid-range chip with a good price-to-performance ratio.',
    },
    manufacturer: 'Intel',
    priceCents: 27900,
    available: true,
    specs: [spec('socket', 'LGA1700'), spec('cores', '14'), spec('threads', '20'), spec('baseClock', '3.5 GHz')],
  },
  {
    id: 'cpu-5',
    categorySlug: 'processors',
    name: { de: 'Core i7-14700K', en: 'Core i7-14700K' },
    description: {
      de: 'Vielseitiger High-End-Prozessor für Gaming und Content Creation.',
      en: 'Versatile high-end processor for gaming and content creation.',
    },
    manufacturer: 'Intel',
    priceCents: 39900,
    available: true,
    specs: [spec('socket', 'LGA1700'), spec('cores', '20'), spec('threads', '28'), spec('baseClock', '3.4 GHz')],
  },

  // Mainboards
  {
    id: 'mb-1',
    categorySlug: 'mainboards',
    name: { de: 'TUF Gaming B650-Plus ATX', en: 'TUF Gaming B650-Plus ATX' },
    description: {
      de: 'Robustes ATX-Mainboard für AM5-Prozessoren.',
      en: 'Sturdy ATX mainboard for AM5 processors.',
    },
    manufacturer: 'ASUS',
    priceCents: 17900,
    available: true,
    specs: [spec('socket', 'AM5'), spec('formFactor', 'ATX'), spec('ddrType', 'DDR5')],
  },
  {
    id: 'mb-2',
    categorySlug: 'mainboards',
    name: { de: 'ROG Strix B650E-F Gaming', en: 'ROG Strix B650E-F Gaming' },
    description: {
      de: 'Gaming-Mainboard mit schneller Konnektivität.',
      en: 'Gaming mainboard with fast connectivity.',
    },
    manufacturer: 'ASUS',
    priceCents: 24900,
    available: true,
    specs: [spec('socket', 'AM5'), spec('formFactor', 'ATX'), spec('ddrType', 'DDR5')],
  },
  {
    id: 'mb-3',
    categorySlug: 'mainboards',
    name: { de: 'MAG B760M Mortar', en: 'MAG B760M Mortar' },
    description: {
      de: 'Kompaktes Micro-ATX-Mainboard für Intel-Prozessoren.',
      en: 'Compact Micro-ATX mainboard for Intel processors.',
    },
    manufacturer: 'MSI',
    priceCents: 15900,
    available: true,
    specs: [spec('socket', 'LGA1700'), spec('formFactor', 'Micro-ATX'), spec('ddrType', 'DDR5')],
  },
  {
    id: 'mb-4',
    categorySlug: 'mainboards',
    name: { de: 'Pro B650M-A', en: 'Pro B650M-A' },
    description: {
      de: 'Preisbewusstes Micro-ATX-Mainboard für AM5.',
      en: 'Budget-friendly Micro-ATX mainboard for AM5.',
    },
    manufacturer: 'ASUS',
    priceCents: 12900,
    available: true,
    specs: [spec('socket', 'AM5'), spec('formFactor', 'Micro-ATX'), spec('ddrType', 'DDR5')],
  },
  {
    id: 'mb-5',
    categorySlug: 'mainboards',
    name: { de: 'ROG Strix Z790-E Gaming', en: 'ROG Strix Z790-E Gaming' },
    description: {
      de: 'High-End-ATX-Mainboard für Intel-Enthusiasten.',
      en: 'High-end ATX mainboard for Intel enthusiasts.',
    },
    manufacturer: 'ASUS',
    priceCents: 34900,
    available: true,
    specs: [spec('socket', 'LGA1700'), spec('formFactor', 'ATX'), spec('ddrType', 'DDR5')],
  },

  // Memory
  {
    id: 'ram-1',
    categorySlug: 'memory',
    name: { de: 'FURY Beast 32 GB (2x16 GB) DDR5-6000', en: 'FURY Beast 32 GB (2x16 GB) DDR5-6000' },
    description: {
      de: 'Zuverlässiger DDR5-Kit mit guter Übertaktbarkeit.',
      en: 'Reliable DDR5 kit with solid overclocking headroom.',
    },
    manufacturer: 'Kingston',
    priceCents: 10900,
    available: true,
    specs: [spec('capacity', '32 GB'), spec('ddrType', 'DDR5-6000')],
  },
  {
    id: 'ram-2',
    categorySlug: 'memory',
    name: { de: 'Vengeance 16 GB (2x8 GB) DDR5-6000', en: 'Vengeance 16 GB (2x8 GB) DDR5-6000' },
    description: {
      de: 'Solide Einstiegsoption für DDR5-Systeme.',
      en: 'Solid entry-level option for DDR5 systems.',
    },
    manufacturer: 'Corsair',
    priceCents: 6900,
    available: true,
    specs: [spec('capacity', '16 GB'), spec('ddrType', 'DDR5-6000')],
  },
  {
    id: 'ram-3',
    categorySlug: 'memory',
    name: { de: 'Trident Z5 32 GB (2x16 GB) DDR5-6400', en: 'Trident Z5 32 GB (2x16 GB) DDR5-6400' },
    description: {
      de: 'Schneller DDR5-Kit für Enthusiasten.',
      en: 'Fast DDR5 kit for enthusiasts.',
    },
    manufacturer: 'G.Skill',
    priceCents: 12900,
    available: true,
    specs: [spec('capacity', '32 GB'), spec('ddrType', 'DDR5-6400')],
  },
  {
    id: 'ram-4',
    categorySlug: 'memory',
    name: { de: 'FURY Beast 64 GB (2x32 GB) DDR5-5600', en: 'FURY Beast 64 GB (2x32 GB) DDR5-5600' },
    description: {
      de: 'Viel Speicher für Multitasking und Content Creation.',
      en: 'Plenty of memory for multitasking and content creation.',
    },
    manufacturer: 'Kingston',
    priceCents: 21900,
    available: true,
    specs: [spec('capacity', '64 GB'), spec('ddrType', 'DDR5-5600')],
  },
  {
    id: 'ram-5',
    categorySlug: 'memory',
    name: { de: 'Vengeance 32 GB (2x16 GB) DDR5-5200', en: 'Vengeance 32 GB (2x16 GB) DDR5-5200' },
    description: {
      de: 'Ausgewogener DDR5-Kit für die meisten Systeme.',
      en: 'Well-balanced DDR5 kit for most systems.',
    },
    manufacturer: 'Corsair',
    priceCents: 10900,
    available: true,
    specs: [spec('capacity', '32 GB'), spec('ddrType', 'DDR5-5200')],
  },

  // Power supplies
  {
    id: 'psu-1',
    categorySlug: 'power-supplies',
    name: { de: '750 W 80+ Gold Netzteil', en: '750 W 80+ Gold power supply' },
    description: {
      de: 'Leise und effizient für die meisten Gaming-PCs.',
      en: 'Quiet and efficient for most gaming PCs.',
    },
    manufacturer: 'be quiet!',
    priceCents: 8900,
    available: true,
    specs: [spec('wattage', '750 W'), spec('efficiency', '80+ Gold')],
  },
  {
    id: 'psu-2',
    categorySlug: 'power-supplies',
    name: { de: '650 W 80+ Bronze Netzteil', en: '650 W 80+ Bronze power supply' },
    description: {
      de: 'Solide Grundausstattung für kompakte Systeme.',
      en: 'Solid baseline choice for compact systems.',
    },
    manufacturer: 'Corsair',
    priceCents: 6900,
    available: true,
    specs: [spec('wattage', '650 W'), spec('efficiency', '80+ Bronze')],
  },
  {
    id: 'psu-3',
    categorySlug: 'power-supplies',
    name: { de: '850 W 80+ Gold Netzteil', en: '850 W 80+ Gold power supply' },
    description: {
      de: 'Ausreichend Reserve für High-End-Grafikkarten.',
      en: 'Plenty of headroom for high-end graphics cards.',
    },
    manufacturer: 'Corsair',
    priceCents: 11900,
    available: true,
    specs: [spec('wattage', '850 W'), spec('efficiency', '80+ Gold')],
  },
  {
    id: 'psu-4',
    categorySlug: 'power-supplies',
    name: { de: '1000 W 80+ Platin Netzteil', en: '1000 W 80+ Platinum power supply' },
    description: {
      de: 'Für High-End-Systeme mit mehreren Grafikkarten.',
      en: 'For high-end systems with multiple graphics cards.',
    },
    manufacturer: 'Seasonic',
    priceCents: 18900,
    available: true,
    specs: [spec('wattage', '1000 W'), spec('efficiency', '80+ Platinum')],
  },
  {
    id: 'psu-5',
    categorySlug: 'power-supplies',
    name: { de: '550 W 80+ Bronze Netzteil', en: '550 W 80+ Bronze power supply' },
    description: {
      de: 'Sparsame Wahl für Einsteiger-Systeme.',
      en: 'An economical choice for entry-level systems.',
    },
    manufacturer: 'EVGA',
    priceCents: 5900,
    available: true,
    specs: [spec('wattage', '550 W'), spec('efficiency', '80+ Bronze')],
  },

  // Cases
  {
    id: 'case-1',
    categorySlug: 'cases',
    name: { de: 'Midi-Tower ATX Gehäuse', en: 'Midi-tower ATX case' },
    description: {
      de: 'Klassisches ATX-Gehäuse mit gutem Airflow.',
      en: 'Classic ATX case with good airflow.',
    },
    manufacturer: 'NZXT',
    priceCents: 6900,
    available: false,
    specs: [spec('formFactor', 'ATX')],
  },
  {
    id: 'case-2',
    categorySlug: 'cases',
    name: { de: '4000D Airflow ATX', en: '4000D Airflow ATX' },
    description: {
      de: 'Beliebtes Gehäuse mit optimiertem Luftstrom.',
      en: 'Popular case with optimized airflow.',
    },
    manufacturer: 'Corsair',
    priceCents: 8900,
    available: true,
    specs: [spec('formFactor', 'ATX')],
  },
  {
    id: 'case-3',
    categorySlug: 'cases',
    name: { de: 'Mini-ITX Cube', en: 'Mini-ITX cube' },
    description: {
      de: 'Kompaktes Gehäuse für kleine, starke Systeme.',
      en: 'Compact case for small, powerful systems.',
    },
    manufacturer: 'Fractal Design',
    priceCents: 7900,
    available: true,
    specs: [spec('formFactor', 'Mini-ITX')],
  },
  {
    id: 'case-4',
    categorySlug: 'cases',
    name: { de: 'Micro-ATX Tower', en: 'Micro-ATX tower' },
    description: {
      de: 'Platzsparendes Gehäuse für Micro-ATX-Builds.',
      en: 'Space-saving case for Micro-ATX builds.',
    },
    manufacturer: 'Cooler Master',
    priceCents: 5900,
    available: true,
    specs: [spec('formFactor', 'Micro-ATX')],
  },
  {
    id: 'case-5',
    categorySlug: 'cases',
    name: { de: 'Define 7 ATX', en: 'Define 7 ATX' },
    description: {
      de: 'Gedämmtes Gehäuse für leise Systeme.',
      en: 'Sound-dampened case for quiet systems.',
    },
    manufacturer: 'Fractal Design',
    priceCents: 13900,
    available: true,
    specs: [spec('formFactor', 'ATX')],
  },

  // Prebuilt PCs
  {
    id: 'pc-1',
    categorySlug: 'prebuilt-pcs',
    name: { de: 'Gaming-PC „Starter"', en: 'Gaming PC "Starter"' },
    description: {
      de: 'Ryzen 5 7600, GeForce RTX 4060, 16 GB DDR5 — solider Einstieg ins PC-Gaming.',
      en: 'Ryzen 5 7600, GeForce RTX 4060, 16 GB DDR5 — a solid start into PC gaming.',
    },
    manufacturer: "Alex Web Coder's PC Shop",
    priceCents: 129900,
    available: true,
    specs: [
      spec('socket', 'AM5'),
      spec('cores', '6'),
      spec('vram', '8 GB'),
      spec('capacity', '16 GB'),
    ],
  },
  {
    id: 'pc-2',
    categorySlug: 'prebuilt-pcs',
    name: { de: 'Gaming-PC „Performance"', en: 'Gaming PC "Performance"' },
    description: {
      de: 'Ryzen 7 7800X3D, GeForce RTX 4070 SUPER, 32 GB DDR5 — für 1440p und hohe Bildraten.',
      en: 'Ryzen 7 7800X3D, GeForce RTX 4070 SUPER, 32 GB DDR5 — built for 1440p and high frame rates.',
    },
    manufacturer: "Alex Web Coder's PC Shop",
    priceCents: 219900,
    available: true,
    specs: [
      spec('socket', 'AM5'),
      spec('cores', '8'),
      spec('vram', '12 GB'),
      spec('capacity', '32 GB'),
    ],
  },
  {
    id: 'pc-3',
    categorySlug: 'prebuilt-pcs',
    name: { de: 'Workstation „Creator"', en: 'Workstation "Creator"' },
    description: {
      de: 'Ryzen 9 7950X3D, GeForce RTX 4070 Ti SUPER, 64 GB DDR5 — für Gaming und Content Creation.',
      en: 'Ryzen 9 7950X3D, GeForce RTX 4070 Ti SUPER, 64 GB DDR5 — for gaming and content creation.',
    },
    manufacturer: "Alex Web Coder's PC Shop",
    priceCents: 329900,
    available: true,
    specs: [
      spec('socket', 'AM5'),
      spec('cores', '16'),
      spec('vram', '16 GB'),
      spec('capacity', '64 GB'),
    ],
  },
];
