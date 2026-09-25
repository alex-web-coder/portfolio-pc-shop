import { Category } from '../models/category.model';
import { LocalizedText } from '../models/localized-text.model';
import { Product } from '../models/product.model';
import { categoryImagePath, productImagePath } from '../utils/image-paths';

/**
 * The configurator-relevant fields here (socket, ddrType, formFactor, tdp,
 * length, coolerHeight, maxGpuLength, maxCoolerHeight, wattage) are curated
 * so every rule in pc-compatibility.ts has both a reachable valid pairing and
 * a reachable invalid one:
 * - Valid build #1: cpu-2 + mb-4 + ram-2 + gpu-3 + cooler-3 + case-4 + psu-2 + any storage
 * - Valid build #2: cpu-5 + mb-5 + ram-3 + gpu-5 + cooler-4 + case-5 + psu-4 + any storage
 * - Socket mismatch: cpu-4 (LGA1700) + mb-1 (AM5)
 * - RAM/board DDR mismatch: mb-6 (DDR4) + ram-1 (DDR5), same socket (LGA1700)
 * - Board/case form-factor mismatch: mb-1 (ATX) + case-3 (Mini-ITX)
 * - Cooler/socket mismatch: cooler-3 (AM5-only) + cpu-5 (LGA1700)
 * - Cooler height exceeded: case-3 (60 mm max) + cooler-4 (158 mm)
 * - GPU length exceeded: case-3 (260 mm max) + gpu-1/2/4/5 (280-305 mm)
 * - PSU headroom exceeded: psu-5 (550 W) + cpu-3 + gpu-4 (140 W + 320 W + 100 W reserve = 560 W)
 */

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
  tdp: { de: 'TDP', en: 'TDP' },
  length: { de: 'Länge', en: 'Length' },
  maxGpuLength: { de: 'Max. Grafikkartenlänge', en: 'Max. graphics card length' },
  maxCoolerHeight: { de: 'Max. Kühlerhöhe', en: 'Max. cooler height' },
  coolerHeight: { de: 'Kühlerhöhe', en: 'Cooler height' },
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
    imageUrl: categoryImagePath('graphics-cards'),
  },
  {
    id: 'cat-2',
    slug: 'processors',
    name: { de: 'Prozessoren', en: 'Processors' },
    filterSpecKey: 'cores',
    imageUrl: categoryImagePath('processors'),
  },
  {
    id: 'cat-3',
    slug: 'mainboards',
    name: { de: 'Mainboards', en: 'Mainboards' },
    filterSpecKey: 'formFactor',
    imageUrl: categoryImagePath('mainboards'),
  },
  {
    id: 'cat-4',
    slug: 'memory',
    name: { de: 'Arbeitsspeicher', en: 'Memory' },
    filterSpecKey: 'capacity',
    imageUrl: categoryImagePath('memory'),
  },
  {
    id: 'cat-5',
    slug: 'power-supplies',
    name: { de: 'Netzteile', en: 'Power supplies' },
    filterSpecKey: 'wattage',
    imageUrl: categoryImagePath('power-supplies'),
  },
  {
    id: 'cat-6',
    slug: 'cases',
    name: { de: 'Gehäuse', en: 'Cases' },
    filterSpecKey: 'formFactor',
    imageUrl: categoryImagePath('cases'),
  },
  {
    id: 'cat-7',
    slug: 'storage',
    name: { de: 'Speicher', en: 'Storage' },
    filterSpecKey: 'capacity',
    imageUrl: categoryImagePath('storage'),
  },
  {
    id: 'cat-8',
    slug: 'coolers',
    name: { de: 'CPU-Kühler', en: 'CPU coolers' },
    imageUrl: categoryImagePath('coolers'),
  },
  {
    id: 'cat-9',
    slug: 'prebuilt-pcs',
    name: { de: 'Komplett-PCs', en: 'Prebuilt PCs' },
    imageUrl: categoryImagePath('prebuilt-pcs'),
  },
];

const RAW_PRODUCTS: Product[] = [
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
    priceCents: 79900,
    available: true,
    specs: [
      spec('chipset', 'NVIDIA'),
      spec('vram', '12 GB'),
      spec('interface', 'PCIe 4.0'),
      spec('length', '305 mm'),
      spec('tdp', '220 W'),
    ],
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
    priceCents: 52900,
    available: true,
    specs: [
      spec('chipset', 'AMD'),
      spec('vram', '12 GB'),
      spec('interface', 'PCIe 4.0'),
      spec('length', '280 mm'),
      spec('tdp', '245 W'),
    ],
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
    priceCents: 49900,
    available: true,
    specs: [
      spec('chipset', 'NVIDIA'),
      spec('vram', '8 GB'),
      spec('interface', 'PCIe 4.0'),
      spec('length', '200 mm'),
      spec('tdp', '115 W'),
    ],
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
    priceCents: 84900,
    available: true,
    specs: [
      spec('chipset', 'AMD'),
      spec('vram', '20 GB'),
      spec('interface', 'PCIe 4.0'),
      spec('length', '305 mm'),
      spec('tdp', '320 W'),
    ],
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
    priceCents: 124900,
    available: true,
    specs: [
      spec('chipset', 'NVIDIA'),
      spec('vram', '16 GB'),
      spec('interface', 'PCIe 4.0'),
      spec('length', '305 mm'),
      spec('tdp', '285 W'),
    ],
  },
  {
    id: 'gpu-6',
    categorySlug: 'graphics-cards',
    name: { de: 'GeForce RTX 5060 8 GB', en: 'GeForce RTX 5060 8 GB' },
    description: {
      de: 'Aktuelle Einstiegskarte der neuen Generation für 1080p-Gaming.',
      en: 'Current-generation entry card for 1080p gaming.',
    },
    manufacturer: 'ASUS',
    priceCents: 48900,
    available: true,
    specs: [
      spec('chipset', 'NVIDIA'),
      spec('vram', '8 GB'),
      spec('interface', 'PCIe 5.0'),
      spec('length', '230 mm'),
      spec('tdp', '145 W'),
    ],
  },
  {
    id: 'gpu-7',
    categorySlug: 'graphics-cards',
    name: { de: 'GeForce RTX 5070 12 GB', en: 'GeForce RTX 5070 12 GB' },
    description: {
      de: 'Neue Mittelklasse mit GDDR7-Speicher für 1440p-Gaming.',
      en: 'New-generation mid-range card with GDDR7 memory for 1440p gaming.',
    },
    manufacturer: 'MSI',
    priceCents: 94900,
    available: true,
    specs: [
      spec('chipset', 'NVIDIA'),
      spec('vram', '12 GB'),
      spec('interface', 'PCIe 5.0'),
      spec('length', '280 mm'),
      spec('tdp', '250 W'),
    ],
  },
  {
    id: 'gpu-8',
    categorySlug: 'graphics-cards',
    name: { de: 'GeForce RTX 5070 Ti 16 GB', en: 'GeForce RTX 5070 Ti 16 GB' },
    description: {
      de: 'Schnelle Karte der neuen Generation für 1440p und 4K.',
      en: 'Fast current-generation card for 1440p and 4K.',
    },
    manufacturer: 'ASUS',
    priceCents: 117900,
    available: true,
    specs: [
      spec('chipset', 'NVIDIA'),
      spec('vram', '16 GB'),
      spec('interface', 'PCIe 5.0'),
      spec('length', '300 mm'),
      spec('tdp', '300 W'),
    ],
  },
  {
    id: 'gpu-9',
    categorySlug: 'graphics-cards',
    name: { de: 'GeForce RTX 5080 16 GB', en: 'GeForce RTX 5080 16 GB' },
    description: {
      de: 'High-End-Karte der neuen Generation für 4K-Gaming.',
      en: 'High-end current-generation card for 4K gaming.',
    },
    manufacturer: 'MSI',
    priceCents: 164900,
    available: true,
    specs: [
      spec('chipset', 'NVIDIA'),
      spec('vram', '16 GB'),
      spec('interface', 'PCIe 5.0'),
      spec('length', '310 mm'),
      spec('tdp', '360 W'),
    ],
  },
  {
    id: 'gpu-10',
    categorySlug: 'graphics-cards',
    name: { de: 'Radeon RX 9060 XT 16 GB', en: 'Radeon RX 9060 XT 16 GB' },
    description: {
      de: 'Aktuelle Einstiegskarte der neuen RDNA-4-Generation.',
      en: 'Current-generation RDNA 4 entry card.',
    },
    manufacturer: 'Sapphire',
    priceCents: 47900,
    available: true,
    specs: [
      spec('chipset', 'AMD'),
      spec('vram', '16 GB'),
      spec('interface', 'PCIe 4.0'),
      spec('length', '250 mm'),
      spec('tdp', '150 W'),
    ],
  },
  {
    id: 'gpu-11',
    categorySlug: 'graphics-cards',
    name: { de: 'Radeon RX 9070 16 GB', en: 'Radeon RX 9070 16 GB' },
    description: {
      de: 'Ausgewogene RDNA-4-Karte für 1440p-Gaming.',
      en: 'Well-balanced RDNA 4 card for 1440p gaming.',
    },
    manufacturer: 'ASRock',
    priceCents: 72900,
    available: true,
    specs: [
      spec('chipset', 'AMD'),
      spec('vram', '16 GB'),
      spec('interface', 'PCIe 4.0'),
      spec('length', '270 mm'),
      spec('tdp', '220 W'),
    ],
  },
  {
    id: 'gpu-12',
    categorySlug: 'graphics-cards',
    name: { de: 'Radeon RX 9070 XT 16 GB', en: 'Radeon RX 9070 XT 16 GB' },
    description: {
      de: 'Schnellste RDNA-4-Karte für 1440p und 4K.',
      en: 'The fastest RDNA 4 card, for 1440p and 4K.',
    },
    manufacturer: 'Sapphire',
    priceCents: 82900,
    available: true,
    specs: [
      spec('chipset', 'AMD'),
      spec('vram', '16 GB'),
      spec('interface', 'PCIe 4.0'),
      spec('length', '300 mm'),
      spec('tdp', '304 W'),
    ],
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
    priceCents: 34900,
    available: true,
    specs: [
      spec('socket', 'AM5'),
      spec('cores', '8'),
      spec('threads', '16'),
      spec('baseClock', '4.2 GHz'),
      spec('tdp', '120 W'),
    ],
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
    priceCents: 18900,
    available: true,
    specs: [
      spec('socket', 'AM5'),
      spec('cores', '6'),
      spec('threads', '12'),
      spec('baseClock', '3.8 GHz'),
      spec('tdp', '65 W'),
    ],
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
    priceCents: 69900,
    available: true,
    specs: [
      spec('socket', 'AM5'),
      spec('cores', '16'),
      spec('threads', '32'),
      spec('baseClock', '4.2 GHz'),
      spec('tdp', '140 W'),
    ],
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
    priceCents: 28900,
    available: true,
    specs: [
      spec('socket', 'LGA1700'),
      spec('cores', '14'),
      spec('threads', '20'),
      spec('baseClock', '3.5 GHz'),
      spec('tdp', '125 W'),
    ],
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
    priceCents: 40900,
    available: true,
    specs: [
      spec('socket', 'LGA1700'),
      spec('cores', '20'),
      spec('threads', '28'),
      spec('baseClock', '3.4 GHz'),
      spec('tdp', '125 W'),
    ],
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
  {
    id: 'mb-6',
    categorySlug: 'mainboards',
    name: { de: 'PRO B760M-P DDR4', en: 'PRO B760M-P DDR4' },
    description: {
      de: 'Preisbewusstes Micro-ATX-Mainboard mit DDR4-Unterstützung für Intel-Prozessoren.',
      en: 'Budget-friendly Micro-ATX mainboard with DDR4 support for Intel processors.',
    },
    manufacturer: 'MSI',
    priceCents: 12900,
    available: true,
    specs: [spec('socket', 'LGA1700'), spec('formFactor', 'Micro-ATX'), spec('ddrType', 'DDR4')],
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
    priceCents: 42900,
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
    priceCents: 22900,
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
    priceCents: 45900,
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
    priceCents: 79900,
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
    priceCents: 39900,
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
    specs: [spec('formFactor', 'ATX'), spec('maxGpuLength', '350 mm'), spec('maxCoolerHeight', '165 mm')],
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
    specs: [spec('formFactor', 'ATX'), spec('maxGpuLength', '360 mm'), spec('maxCoolerHeight', '170 mm')],
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
    specs: [spec('formFactor', 'Mini-ITX'), spec('maxGpuLength', '260 mm'), spec('maxCoolerHeight', '60 mm')],
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
    specs: [spec('formFactor', 'Micro-ATX'), spec('maxGpuLength', '320 mm'), spec('maxCoolerHeight', '160 mm')],
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
    specs: [spec('formFactor', 'ATX'), spec('maxGpuLength', '370 mm'), spec('maxCoolerHeight', '185 mm')],
  },

  // Storage
  {
    id: 'ssd-1',
    categorySlug: 'storage',
    name: { de: 'NVMe SSD 1 TB (990 Pro)', en: 'NVMe SSD 1 TB (990 Pro)' },
    description: {
      de: 'Schnelle PCIe-4.0-SSD für Betriebssystem und Spiele.',
      en: 'Fast PCIe 4.0 SSD for the OS and games.',
    },
    manufacturer: 'Samsung',
    priceCents: 21900,
    available: true,
    specs: [spec('capacity', '1 TB'), spec('interface', 'PCIe 4.0')],
  },
  {
    id: 'ssd-2',
    categorySlug: 'storage',
    name: { de: 'NVMe SSD 2 TB (990 Pro)', en: 'NVMe SSD 2 TB (990 Pro)' },
    description: {
      de: 'Viel Platz für eine große Spielebibliothek.',
      en: 'Plenty of room for a large game library.',
    },
    manufacturer: 'Samsung',
    priceCents: 39900,
    available: true,
    specs: [spec('capacity', '2 TB'), spec('interface', 'PCIe 4.0')],
  },
  {
    id: 'ssd-3',
    categorySlug: 'storage',
    name: { de: 'NVMe SSD 500 GB (P3)', en: 'NVMe SSD 500 GB (P3)' },
    description: {
      de: 'Preisbewusste Einstiegs-SSD.',
      en: 'Budget-friendly entry-level SSD.',
    },
    manufacturer: 'Crucial',
    priceCents: 8900,
    available: true,
    specs: [spec('capacity', '500 GB'), spec('interface', 'PCIe 3.0')],
  },
  {
    id: 'ssd-4',
    categorySlug: 'storage',
    name: { de: 'NVMe SSD 1 TB (SN850X)', en: 'NVMe SSD 1 TB (SN850X)' },
    description: {
      de: 'Sehr schnelle SSD für kurze Ladezeiten.',
      en: 'Very fast SSD for short load times.',
    },
    manufacturer: 'WD Black',
    priceCents: 20900,
    available: true,
    specs: [spec('capacity', '1 TB'), spec('interface', 'PCIe 4.0')],
  },

  // CPU coolers
  {
    id: 'cooler-1',
    categorySlug: 'coolers',
    name: { de: 'Dark Rock Pro 5', en: 'Dark Rock Pro 5' },
    description: {
      de: 'Großer Luftkühler für AM5 und LGA1700.',
      en: 'Large air cooler for AM5 and LGA1700.',
    },
    manufacturer: 'be quiet!',
    priceCents: 9900,
    available: true,
    specs: [spec('socket', 'AM5, LGA1700'), spec('coolerHeight', '162 mm')],
  },
  {
    id: 'cooler-2',
    categorySlug: 'coolers',
    name: { de: 'Pure Rock 2', en: 'Pure Rock 2' },
    description: {
      de: 'Kompakter Luftkühler für AM5 und LGA1700.',
      en: 'Compact air cooler for AM5 and LGA1700.',
    },
    manufacturer: 'be quiet!',
    priceCents: 4900,
    available: true,
    specs: [spec('socket', 'AM5, LGA1700'), spec('coolerHeight', '155 mm')],
  },
  {
    id: 'cooler-3',
    categorySlug: 'coolers',
    name: { de: 'Low-Profile Kühler (AM5)', en: 'Low-profile cooler (AM5)' },
    description: {
      de: 'Flacher Kühler für kompakte AM5-Gehäuse.',
      en: 'Flat cooler for compact AM5 cases.',
    },
    manufacturer: 'AMD',
    priceCents: 3900,
    available: true,
    specs: [spec('socket', 'AM5'), spec('coolerHeight', '58 mm')],
  },
  {
    id: 'cooler-4',
    categorySlug: 'coolers',
    name: { de: 'NH-U12A', en: 'NH-U12A' },
    description: {
      de: 'Premium-Luftkühler für AM5 und LGA1700.',
      en: 'Premium air cooler for AM5 and LGA1700.',
    },
    manufacturer: 'Noctua',
    priceCents: 11900,
    available: true,
    specs: [spec('socket', 'AM5, LGA1700'), spec('coolerHeight', '158 mm')],
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
    priceCents: 165900,
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
    priceCents: 261900,
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
    priceCents: 437900,
    available: true,
    specs: [
      spec('socket', 'AM5'),
      spec('cores', '16'),
      spec('vram', '16 GB'),
      spec('capacity', '64 GB'),
    ],
  },
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((product) => ({
  ...product,
  imageUrl: productImagePath(product.id),
}));
