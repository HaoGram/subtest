import React, { useCallback, useEffect } from 'react';
import { IntlProvider, MissingTranslationError } from 'react-intl';
import { log } from '@/utils';
import { ConfigProvider } from '@douyinfe/semi-ui';

import {StyleSheetManager, ThemeProvider} from 'styled-components';
import rtlPlugin from "stylis-plugin-rtl";
import { Locale, RTLLocales, useLocaleStore } from '@/store/locale';
import { GlobalStyle } from './GlobalStyles';

import enWords from '@/assets/translates/en.json';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';

import arWords from '@/assets/translates/ar.json';
import { OnErrorFn } from '@formatjs/intl/src/types';
import { IntlErrorCode } from '@formatjs/intl/src/error';
import {Theme, useThemeStore} from '@/store/theme';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import {Locale as SemiLocale} from "@douyinfe/semi-ui/lib/es/locale/interface";


const vocabulary: Record<Locale, Record<string, string> | Record<string, MessageFormatElement[]>> = {
  // @ts-ignore
  [Locale.EN]: enWords,
  // @ts-ignore
  [Locale.ZH]: arWords
};

const semiVocabulary: any = {
  [Locale.EN]: en_GB,
  [Locale.ZH]: zh_CN
}

const direction = (locale: Locale) => RTLLocales.includes(locale) ? 'rtl' : 'ltr';

interface Props {

}

export const Providers: React.FC<Props> = ({ children }: React.PropsWithChildren<Props>) => {
  const locale = useLocaleStore(s => s.locale);
  const currentTheme = useThemeStore(v => v.theme);

  const errorHandler = useCallback<OnErrorFn>((data) => {
    const { code } = data;
    if (code === IntlErrorCode.MISSING_TRANSLATION) {
      log(`Cannot find translate "${(data as MissingTranslationError).descriptor?.id}" in "${locale}"`);
    } else {
      log(data);
    }
  }, [locale]);

  useEffect(() => {
    document.documentElement.dir = direction(locale);
  }, [locale]);

  useEffect(() => {
    console.log('currentTheme', currentTheme)
    if (currentTheme === Theme.Dark) {
      document.body.setAttribute('theme-mode', 'dark');
    } else if (document.body.hasAttribute('theme-mode')) {
      document.body.removeAttribute('theme-mode');
    }
  }, [currentTheme])

  return (
    <StyleSheetManager
      {...(direction(locale) === 'rtl' ? { stylisPlugins: [rtlPlugin] } : {})}
    >
      <ThemeProvider theme={{currentTheme}}>
        <>
          <GlobalStyle />
            <ConfigProvider
              locale={semiVocabulary[locale]}
              direction={direction(locale)}
            >
              <IntlProvider locale={locale} messages={vocabulary[locale]} onError={errorHandler}>
                {children}
              </IntlProvider>
            </ConfigProvider>
        </>
      </ThemeProvider>
    </StyleSheetManager>
  );
};
