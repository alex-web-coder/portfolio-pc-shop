import { Language } from '../models/language.model';

/**
 * UI chrome text only. Product/category names still come from the fake
 * catalog data in German only — they get a localized-content shape once
 * the real catalog models land (step 4), not here.
 */
export const TRANSLATIONS = {
  'nav.components': { de: 'Komponenten', en: 'Components' },
  'nav.prebuiltPcs': { de: 'Komplett-PCs', en: 'Prebuilt PCs' },
  'nav.configurator': { de: 'PC-Konfigurator', en: 'PC Configurator' },

  'header.searchPlaceholder': { de: 'Produkte suchen', en: 'Search products' },
  'header.account': { de: 'Konto', en: 'Account' },
  'header.cart': { de: 'Warenkorb', en: 'Cart' },

  'pages.components.title': { de: 'Komponenten', en: 'Components' },
  'pages.prebuiltPcs.title': { de: 'Komplett-PCs', en: 'Prebuilt PCs' },
  'pages.configurator.title': { de: 'PC-Konfigurator', en: 'PC Configurator' },
  'pages.cart.title': { de: 'Warenkorb', en: 'Cart' },
  'pages.checkout.title': { de: 'Kasse', en: 'Checkout' },
  'pages.profile.title': { de: 'Profil', en: 'Profile' },

  'demoBanner.text': { de: 'Demo-Shop – keine echten Bestellungen', en: 'Demo shop – no real orders' },

  'footer.tagline': {
    de: 'Dein Partner für PC-Hardware. Zum Zocken. Zum Arbeiten. Für deine Ideen.',
    en: 'Your partner for PC hardware. For gaming. For work. For your ideas.',
  },
  'footer.shopHeading': { de: 'Shop', en: 'Shop' },
  'footer.legalHeading': { de: 'Rechtliches', en: 'Legal' },
  'footer.legal.imprint': { de: 'Impressum', en: 'Imprint' },
  'footer.legal.terms': { de: 'AGB', en: 'Terms' },
  'footer.legal.privacy': { de: 'Datenschutz', en: 'Privacy' },
  'footer.legal.contact': { de: 'Kontakt', en: 'Contact' },
  'footer.demoNotice': { de: 'Demo-Shop – keine echten Bestellungen', en: 'Demo shop – no real orders' },

  'home.hero.eyebrow': { de: 'Hardware für echte Möglichkeiten', en: 'Hardware for real possibilities' },
  'home.hero.title': { de: 'Dein PC. Deine Leistung.', en: 'Your PC. Your performance.' },
  'home.hero.lead': {
    de: 'Hochwertige Komponenten, faire Preise und alles, was du für deinen perfekten PC brauchst. Zum Zocken. Zum Arbeiten. Für deine Ideen.',
    en: 'High-quality components, fair prices, and everything you need for your perfect PC. For gaming. For work. For your ideas.',
  },
  'home.hero.configure': { de: 'PC konfigurieren', en: 'Configure PC' },
  'home.hero.discover': { de: 'Komponenten entdecken', en: 'Discover components' },
  'home.categoriesHeading': { de: 'Kategorien', en: 'Categories' },
  'home.productsHeading': { de: 'Ausgewählte Produkte', en: 'Featured products' },

  'product.inStock': { de: 'Auf Lager', en: 'In stock' },
  'product.unavailable': { de: 'Nicht verfügbar', en: 'Unavailable' },
  'product.addToCart': { de: 'In den Warenkorb', en: 'Add to cart' },

  'carousel.previous': { de: 'Zurück', en: 'Previous' },
  'carousel.next': { de: 'Weiter', en: 'Next' },
  'carousel.defaultLabel': { de: 'Karussell', en: 'Carousel' },

  'comingSoon.eyebrow': { de: 'Demnächst verfügbar', en: 'Coming soon' },
  'comingSoon.lead': {
    de: 'Dieser Bereich ist Teil der Demo, aber noch nicht gebaut. Er kommt in einem der nächsten Arbeitsschritte.',
    en: 'This section is part of the demo but not built yet. It is coming in one of the next steps.',
  },
  'comingSoon.homeLink': { de: 'Zur Startseite', en: 'Back to homepage' },

  'notFound.code': { de: '404', en: '404' },
  'notFound.title': { de: 'Seite nicht gefunden', en: 'Page not found' },
  'notFound.lead': {
    de: 'Diese Seite gibt es nicht oder ist nicht mehr verfügbar.',
    en: 'This page does not exist or is no longer available.',
  },
  'notFound.homeLink': { de: 'Zur Startseite', en: 'Back to homepage' },

  'language.switchToDe': { de: 'Zu Deutsch wechseln', en: 'Switch to German' },
  'language.switchToEn': { de: 'Zu Englisch wechseln', en: 'Switch to English' },

  'catalog.loading': { de: 'Wird geladen …', en: 'Loading …' },
  'catalog.error': { de: 'Die Daten konnten nicht geladen werden.', en: 'The data could not be loaded.' },
  'catalog.empty': { de: 'Keine Produkte gefunden.', en: 'No products found.' },
  'catalog.filtersHeading': { de: 'Filter', en: 'Filters' },
  'catalog.resetFilters': { de: 'Filter zurücksetzen', en: 'Reset filters' },
  'catalog.priceRange': { de: 'Preisbereich (€)', en: 'Price range (€)' },
  'catalog.minPrice': { de: 'Mindestpreis in Euro', en: 'Minimum price in euros' },
  'catalog.maxPrice': { de: 'Höchstpreis in Euro', en: 'Maximum price in euros' },
  'catalog.manufacturer': { de: 'Hersteller', en: 'Manufacturer' },
  'catalog.availableOnly': { de: 'Nur verfügbare Produkte', en: 'Only available products' },
  'catalog.sortBy': { de: 'Sortieren nach', en: 'Sort by' },
  'catalog.sort.nameAsc': { de: 'Name (A–Z)', en: 'Name (A–Z)' },
  'catalog.sort.nameDesc': { de: 'Name (Z–A)', en: 'Name (Z–A)' },
  'catalog.sort.priceAsc': { de: 'Preis aufsteigend', en: 'Price ascending' },
  'catalog.sort.priceDesc': { de: 'Preis absteigend', en: 'Price descending' },

  'product.specsHeading': { de: 'Technische Daten', en: 'Specifications' },
  'product.notFound.title': { de: 'Produkt nicht gefunden', en: 'Product not found' },
  'product.notFound.lead': {
    de: 'Dieses Produkt existiert nicht oder ist nicht mehr verfügbar.',
    en: 'This product does not exist or is no longer available.',
  },
  'product.backToCategory': { de: 'Zurück zur Übersicht', en: 'Back to overview' },

  'cart.empty': { de: 'Dein Warenkorb ist leer.', en: 'Your cart is empty.' },
  'cart.browseProducts': { de: 'Produkte entdecken', en: 'Browse products' },
  'cart.quantity': { de: 'Menge', en: 'Quantity' },
  'cart.remove': { de: 'Entfernen', en: 'Remove' },
  'cart.subtotal': { de: 'Zwischensumme', en: 'Subtotal' },
  'cart.proceedToCheckout': { de: 'Zur Kasse', en: 'Proceed to checkout' },
  'cart.unavailableNotice': {
    de: 'Nicht mehr verfügbar — wird beim Bestellen nicht berücksichtigt.',
    en: 'No longer available — excluded from the order.',
  },

  'checkout.step1.heading': { de: 'Kontaktdaten & Lieferadresse', en: 'Contact details & shipping address' },
  'checkout.step2.heading': { de: 'Versand & Zahlung', en: 'Shipping & payment' },
  'checkout.step3.heading': { de: 'Bestellübersicht', en: 'Order overview' },
  'checkout.fullName': { de: 'Vollständiger Name', en: 'Full name' },
  'checkout.email': { de: 'E-Mail-Adresse', en: 'Email address' },
  'checkout.street': { de: 'Straße & Hausnummer', en: 'Street & house number' },
  'checkout.postalCode': { de: 'Postleitzahl', en: 'Postal code' },
  'checkout.city': { de: 'Stadt', en: 'City' },
  'checkout.country': { de: 'Land', en: 'Country' },
  'checkout.country.de': { de: 'Deutschland', en: 'Germany' },
  'checkout.country.at': { de: 'Österreich', en: 'Austria' },
  'checkout.country.ch': { de: 'Schweiz', en: 'Switzerland' },
  'checkout.fillSampleData': { de: 'Beispieldaten einsetzen', en: 'Fill sample data' },
  'checkout.continue': { de: 'Weiter', en: 'Continue' },
  'checkout.back': { de: 'Zurück', en: 'Back' },
  'checkout.placeOrder': { de: 'Bestellung abschließen', en: 'Place order' },
  'checkout.shippingCostLabel': { de: 'Versandkosten', en: 'Shipping cost' },
  'checkout.freeShippingFrom': { de: 'kostenlos ab', en: 'free from' },
  'checkout.paymentMethod': { de: 'Zahlungsart', en: 'Payment method' },
  'checkout.payment.card': { de: 'Kreditkarte (Demo)', en: 'Credit card (demo)' },
  'checkout.payment.paypal': { de: 'PayPal (Demo)', en: 'PayPal (demo)' },
  'checkout.payment.invoice': { de: 'Rechnung (Demo)', en: 'Invoice (demo)' },
  'checkout.review.contact': { de: 'Kontakt', en: 'Contact' },
  'checkout.review.address': { de: 'Lieferadresse', en: 'Shipping address' },
  'checkout.review.items': { de: 'Positionen', en: 'Items' },
  'checkout.subtotal': { de: 'Zwischensumme', en: 'Subtotal' },
  'checkout.shipping': { de: 'Versand', en: 'Shipping' },
  'checkout.total': { de: 'Gesamtsumme', en: 'Total' },
  'checkout.submitError': {
    de: 'Die Bestellung konnte nicht abgeschlossen werden. Bitte versuche es erneut.',
    en: 'The order could not be completed. Please try again.',
  },
  'checkout.noOrderableItems': {
    de: 'Keine bestellbaren Artikel im Warenkorb.',
    en: 'No orderable items in the cart.',
  },
  'checkout.error.required': { de: 'Dieses Feld ist erforderlich.', en: 'This field is required.' },
  'checkout.error.email': {
    de: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    en: 'Please enter a valid email address.',
  },
  'checkout.error.postalCode': {
    de: 'Bitte gib eine gültige Postleitzahl ein.',
    en: 'Please enter a valid postal code.',
  },
  'checkout.confirmation.title': {
    de: 'Vielen Dank für deine Demo-Bestellung!',
    en: 'Thank you for your demo order!',
  },
  'checkout.confirmation.notice': {
    de: 'Dies ist eine Simulation — es wurde keine echte Bestellung ausgelöst und keine Zahlung vorgenommen.',
    en: 'This is a simulation — no real order was placed and no payment was taken.',
  },
  'checkout.confirmation.orderNumber': { de: 'Bestellnummer', en: 'Order number' },
} as const satisfies Record<string, Record<Language, string>>;

export type TranslationKey = keyof typeof TRANSLATIONS;
