import { LANGUAGE, ScreensNS } from "@i18n/constants";
import { getTranslation, setTranslationBundle } from "@i18n/registry";
import en from "./en.json";
import id from "./id.json";
import my from "./my.json";

setTranslationBundle(
  ScreensNS.SETTINGS,
  { lang: LANGUAGE.EN, bundle: en },
  { lang: LANGUAGE.ID, bundle: id },
  { lang: LANGUAGE.MY, bundle: my }
);

const t = getTranslation<typeof en>(ScreensNS.SETTINGS);
export default t;
