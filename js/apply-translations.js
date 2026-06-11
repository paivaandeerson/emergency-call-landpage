// Apply translations dynamically to the page
async function loadTranslations(lang) {
  try {
    const response = await fetch(`lang/translations.json`);
    const translations = await response.json();
    return translations[lang] || translations['en'];
  } catch (error) {
    console.error('Error loading translations:', error);
    return null;
  }
}

function applyTranslations(t) {
  if (!t) return;
  
  // Update document title and meta tags
  document.title = t.title;
  document.documentElement.lang = t.lang || 'en';
  
  // Update meta tags
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t.metaDescription) metaDesc.content = t.metaDescription;
  
  // Update text content using data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key];
      }
    }
  });
  
  // Update specific elements by ID
  const updates = {
    'page-title': t.title,
    'badge-text': t.badge,
    'hero-title': t.heroTitle,
    'hero-desc': t.heroDesc,
    'quote-text': t.quote,
    'btn-download': t.downloadNow,
    'available-on': t.availableOn,
    'google-play-text': t.googlePlay,
    'coming-soon': t.comingSoon,
    'app-store-text': t.appStore,
    'countries-number': '93',
    'countries-label': t.countriesCovered,
    'countries-sub': t.aroundWorld,
    'contacts-number': '948',
    'contacts-label': t.verifiedContacts,
    'contacts-sub': t.constantlyUpdated,
    'languages-number': '50+',
    'languages-label': t.languagesSupported,
    'languages-sub': t.smartTranslation,
    'section-title-features': t.whatYouFind,
    'section-desc-features': t.quickAccess,
    'feature-1-title': t.essentialServices,
    'feature-1-desc': t.essentialServicesDesc,
    'feature-2-title': t.womenProtection,
    'feature-2-desc': t.womenProtectionDesc,
    'feature-3-title': t.childDefense,
    'feature-3-desc': t.childDefenseDesc,
    'feature-4-title': t.travelerSupport,
    'feature-4-desc': t.travelerSupportDesc,
    'feature-5-title': t.mentalHealth,
    'feature-5-desc': t.mentalHealthDesc,
    'feature-6-title': t.whatsappIntegration,
    'feature-6-desc': t.whatsappIntegrationDesc,
    'capability-1-title': t.smartLocation,
    'capability-1-desc': t.smartLocationDesc,
    'capability-2-title': t.worksOffline,
    'capability-2-desc': t.worksOfflineDesc,
    'capability-3-title': t.countryChange,
    'capability-3-desc': t.countryChangeDesc,
    'pro-badge': t.lifetimeAccess,
    'pro-title': t.elevateYourSafety,
    'pro-desc': t.proDesc,
    'pro-feature-1': t.zeroAds,
    'pro-feature-2': t.exclusiveWidget,
    'pro-feature-3': t.favoriteContacts,
    'pro-feature-4': t.oneTimePayment,
    'pricing-title': t.lifetimePlan,
    'pricing-price': t.price,
    'pricing-sub': t.noSubscriptions,
    'pricing-btn': t.upgradeInApp,
    'privacy-title': t.privacyFirst,
    'privacy-desc': t.privacyDesc,
    'footer-nav-title': t.navigation,
    'footer-link-features': t.mainFeatures,
    'footer-link-pro': t.proVersion,
    'footer-link-privacy': t.privacyPolicies,
    'footer-downloads-title': t.downloads,
    'footer-rights': `© 2026 Emergency Call App. ${t.allRightsReserved}`,
    'footer-dev': t.developedWith,
    'nav-resources': t.resources,
    'nav-pro': t.proVersion,
    'nav-privacy': t.privacy
  };
  
  Object.keys(updates).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = updates[id];
  });
}

// Initialize translations on page load
document.addEventListener('DOMContentLoaded', async () => {
  const lang = getCurrentLanguage();
  const translations = await loadTranslations(lang);
  if (translations) {
    applyTranslations(translations);
    console.log(`✓ Translations applied: ${lang}`);
  }
});
