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
  'footer.infoHeading': { de: 'Info', en: 'Info' },
  'footer.legalHeading': { de: 'Rechtliches', en: 'Legal' },
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

  'common.backToHome': { de: 'Zur Startseite', en: 'Back to homepage' },

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

  'configurator.slot.cpu': { de: 'Prozessor', en: 'Processor' },
  'configurator.slot.mainboard': { de: 'Mainboard', en: 'Mainboard' },
  'configurator.slot.ram': { de: 'Arbeitsspeicher', en: 'Memory' },
  'configurator.slot.gpu': { de: 'Grafikkarte', en: 'Graphics card' },
  'configurator.slot.storage': { de: 'Speicher', en: 'Storage' },
  'configurator.slot.psu': { de: 'Netzteil', en: 'Power supply' },
  'configurator.slot.case': { de: 'Gehäuse', en: 'Case' },
  'configurator.slot.cooler': { de: 'CPU-Kühler', en: 'CPU cooler' },
  'configurator.selectPlaceholder': { de: 'Bitte auswählen', en: 'Please select' },
  'configurator.totalPrice': { de: 'Gesamtpreis', en: 'Total price' },
  'configurator.simplifiedNotice': {
    de: 'Vereinfachte Kompatibilitätsprüfung — deckt nicht jede reale Kombination ab.',
    en: 'Simplified compatibility check — does not cover every real-world combination.',
  },
  'configurator.missingComponents': {
    de: 'Bitte wähle noch fehlende Komponenten aus.',
    en: 'Please select the remaining components.',
  },
  'configurator.addToCart': { de: 'Konfiguration in den Warenkorb', en: 'Add configuration to cart' },
  'configurator.addedToCart': { de: 'Konfiguration wurde in den Warenkorb gelegt.', en: 'Configuration added to cart.' },
  'configurator.issue.socketMismatch': {
    de: 'Prozessor und Mainboard haben unterschiedliche Sockel.',
    en: 'The processor and mainboard use different sockets.',
  },
  'configurator.issue.ramMismatch': {
    de: 'Arbeitsspeicher und Mainboard unterstützen unterschiedliche RAM-Typen.',
    en: 'The memory and mainboard support different RAM types.',
  },
  'configurator.issue.formFactorMismatch': {
    de: 'Das Mainboard passt nicht in das gewählte Gehäuse.',
    en: 'The mainboard does not fit the selected case.',
  },
  'configurator.issue.coolerSocketMismatch': {
    de: 'Der CPU-Kühler unterstützt den gewählten Sockel nicht.',
    en: 'The CPU cooler does not support the selected socket.',
  },
  'configurator.issue.coolerHeightExceeded': {
    de: 'Der CPU-Kühler ist zu hoch für das gewählte Gehäuse.',
    en: 'The CPU cooler is too tall for the selected case.',
  },
  'configurator.issue.gpuLengthExceeded': {
    de: 'Die Grafikkarte ist zu lang für das gewählte Gehäuse.',
    en: 'The graphics card is too long for the selected case.',
  },
  'configurator.issue.psuInsufficient': {
    de: 'Das Netzteil liefert nicht genug Leistung für diese Komponenten.',
    en: 'The power supply does not provide enough wattage for these components.',
  },

  'profile.save': { de: 'Speichern', en: 'Save' },
  'profile.saved': { de: 'Gespeichert.', en: 'Saved.' },
  'profile.reset': { de: 'Demodaten zurücksetzen', en: 'Reset demo data' },
  'profile.resetConfirm': {
    de: 'Warenkorb, Bestellhistorie und Profil werden auf die Demo-Ausgangswerte zurückgesetzt. Fortfahren?',
    en: 'Cart, order history, and profile will be reset to their demo defaults. Continue?',
  },
  'profile.resetDone': { de: 'Demodaten wurden zurückgesetzt.', en: 'Demo data has been reset.' },
  'profile.orderHistoryHeading': { de: 'Bestellhistorie', en: 'Order history' },
  'profile.noOrders': { de: 'Noch keine Demo-Bestellungen.', en: 'No demo orders yet.' },
  'profile.items': { de: 'Positionen', en: 'items' },

  'faq.title': { de: 'Häufige Fragen', en: 'Frequently asked questions' },
  'about.title': { de: 'Über uns', en: 'About us' },
  'shipping.title': { de: 'Versand & Zahlung', en: 'Shipping & payment' },
  'imprint.title': { de: 'Impressum', en: 'Imprint' },
  'terms.title': { de: 'AGB', en: 'Terms & conditions' },
  'privacy.title': { de: 'Datenschutz', en: 'Privacy policy' },

  'faq.q1.question': { de: 'Ist das ein echter Shop?', en: 'Is this a real shop?' },
  'faq.q1.answer': {
    de: 'Nein. Diese Seite ist eine Portfolio-Demo. Es werden keine echten Bestellungen oder Zahlungen verarbeitet.',
    en: 'No. This site is a portfolio demo. No real orders or payments are ever processed.',
  },
  'faq.q2.question': { de: 'Wie funktioniert der PC-Konfigurator?', en: 'How does the PC configurator work?' },
  'faq.q2.answer': {
    de: 'Er prüft eine vereinfachte Auswahl an Kompatibilitätsregeln (Sockel, RAM-Typ, Formfaktor, Kühlerhöhe, Grafikkartenlänge, Netzteilleistung) anhand eines kleinen Beispieldatensatzes.',
    en: 'It checks a simplified set of compatibility rules (socket, RAM type, form factor, cooler height, graphics card length, PSU wattage) against a small sample dataset.',
  },
  'faq.q3.question': { de: 'Werden meine Daten gespeichert?', en: 'Is my data stored anywhere?' },
  'faq.q3.answer': {
    de: 'Nur lokal in deinem Browser (Warenkorb, Demoprofil, Demo-Bestellhistorie). Es gibt kein echtes Backend und keine Übertragung an einen Server.',
    en: 'Only locally in your browser (cart, demo profile, demo order history). There is no real backend and nothing is sent to a server.',
  },
  'faq.q4.question': { de: 'Kann ich eine echte Bestellung aufgeben?', en: 'Can I place a real order?' },
  'faq.q4.answer': {
    de: 'Nein, der gesamte Bestellvorgang ist simuliert und dient nur der Demonstration.',
    en: 'No, the entire checkout flow is simulated and exists purely for demonstration.',
  },
  'faq.q5.question': { de: 'Wie kann ich alle Demodaten löschen?', en: 'How do I delete all demo data?' },
  'faq.q5.answer': {
    de: 'Im Demoprofil gibt es eine Schaltfläche, um alle lokal gespeicherten Demodaten zurückzusetzen.',
    en: 'The demo profile page has a button to reset all locally stored demo data.',
  },

  'shipping.shippingHeading': { de: 'Versand', en: 'Shipping' },
  'shipping.shippingIntro': {
    de: 'Demo-Versandregel — es handelt sich um eine Simulation, es findet kein echter Versand statt:',
    en: 'Demo shipping rule — this is a simulation, nothing is actually shipped:',
  },
  'shipping.flatRateLabel': { de: 'Pauschale Versandkosten', en: 'Flat shipping rate' },
  'shipping.freeFromLabel': { de: 'Kostenlos ab einem Bestellwert von', en: 'Free from an order value of' },
  'shipping.paymentHeading': { de: 'Zahlung', en: 'Payment' },
  'shipping.paymentText': {
    de: 'Beim simulierten Checkout stehen drei Demo-Zahlungsarten zur Auswahl: Kreditkarte, PayPal und Rechnung. Es werden zu keinem Zeitpunkt echte Zahlungsdaten abgefragt oder Zahlungen ausgelöst.',
    en: 'The simulated checkout offers three demo payment methods: credit card, PayPal, and invoice. No real payment details are ever collected and no payment is ever taken.',
  },

  'about.shopHeading': { de: 'Über unseren (fiktiven) Shop', en: 'About our (fictional) shop' },
  'about.shopText': {
    de: 'Alex Web Coder\'s PC Shop ist ein erfundener Computer-Shop für Komponenten, Komplett-PCs und individuell konfigurierte PCs. Alle Produkte, Preise und Bestellungen sind Beispieldaten für diese Demo.',
    en: 'Alex Web Coder\'s PC Shop is a fictional computer shop for components, prebuilt PCs, and custom-configured PCs. All products, prices, and orders are sample data for this demo.',
  },
  'about.portfolioHeading': { de: 'Über dieses Portfolio-Projekt', en: 'About this portfolio project' },
  'about.portfolioText': {
    de: 'Diese Website ist ein Portfolio-Projekt, das den Aufbau eines Angular-Shops von Grund auf demonstriert — inklusive Produktkatalog, Warenkorb, Checkout und PC-Konfigurator.',
    en: 'This website is a portfolio project demonstrating an Angular shop built from scratch — including product catalog, cart, checkout, and PC configurator.',
  },

  'legal.placeholderNotice': {
    de: 'Platzhalter — dieser Abschnitt wird vor einer echten Veröffentlichung noch mit den tatsächlichen Angaben ergänzt.',
    en: 'Placeholder — this section will be filled in with real details before any real publication.',
  },
  'terms.body': {
    de: 'Da dieser Shop ausschließlich zu Demonstrationszwecken dient, kommen keine Kaufverträge zustande und es gelten keine echten Geschäftsbedingungen. Alle Interaktionen sind simuliert.',
    en: 'Since this shop exists purely for demonstration purposes, no purchase contracts are ever formed and no real terms and conditions apply. All interactions are simulated.',
  },
} as const satisfies Record<string, Record<Language, string>>;

export type TranslationKey = keyof typeof TRANSLATIONS;
