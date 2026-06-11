// Emergency Call App - i18n System
// Auto-detects user language and applies translations

const SUPPORTED_LANGUAGES = ['en','pt','es','fr','de','it','ja','zh','ru','ar','ko','hi','tr','nl','pl','sv','no','da','fi','cs','el','he','th','vi','id','ms','tl','uk','ro','hu','sk','bg','hr','sr','sl','lt','lv','et','mt','ga','cy','is','mk','sq','bs','ka','hy','az','uz','kk','mn'];

const LANGUAGE_NAMES = {
  en: 'English', pt: 'Português', es: 'Español', fr: 'Français', de: 'Deutsch',
  it: 'Italiano', ja: '日本語', zh: '中文', ru: 'Русский', ar: 'العربية',
  ko: '한국어', hi: 'हिन्दी', tr: 'Türkçe', nl: 'Nederlands', pl: 'Polski',
  sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', cs: 'Čeština',
  el: 'Ελληνικά', he: 'עברית', th: 'ไทย', vi: 'Tiếng Việt', id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu', tl: 'Filipino', uk: 'Українська', ro: 'Română', hu: 'Magyar',
  sk: 'Slovenčina', bg: 'Български', hr: 'Hrvatski', sr: 'Српски', sl: 'Slovenščina',
  lt: 'Lietuvių', lv: 'Latviešu', et: 'Eesti', mt: 'Malti', ga: 'Gaeilge',
  cy: 'Cymraeg', is: 'Íslenska', mk: 'Македонски', sq: 'Shqip', bs: 'Bosanski',
  ka: 'ქართული', hy: 'Հայերեն', az: 'Azərbaycan', uz: 'Oʻzbek', kk: 'Қазақ', mn: 'Монгол'
};

function detectUserLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang)) return urlLang;
  
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) return savedLang;
  
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  if (SUPPORTED_LANGUAGES.includes(langCode)) return langCode;
  if (browserLang.toLowerCase().startsWith('pt')) return 'pt';
  
  return 'en';
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGUAGES.includes(lang)) lang = 'en';
  localStorage.setItem('preferredLanguage', lang);
  window.location.search = '?lang=' + lang;
}

function getCurrentLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('lang') || detectUserLanguage();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { detectUserLanguage, setLanguage, getCurrentLanguage, SUPPORTED_LANGUAGES, LANGUAGE_NAMES };
}
