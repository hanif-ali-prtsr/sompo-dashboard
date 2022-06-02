import i18n from "i18next";
import { initReactI18next } from "react-i18next";
 
import TRANSLATIONS_JA from "./ja/translations";
import TRANSLATIONS_EN from "./en/translations";
 
i18n
 .use(initReactI18next)
 .init({
   resources: {
     ja: {
       translation: TRANSLATIONS_JA
     },
     en: {
       translation: TRANSLATIONS_EN
     }
   }
 });
 
i18n.changeLanguage("ja");