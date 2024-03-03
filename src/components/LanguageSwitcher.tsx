import {Locale, useLocaleStore} from '@/store/locale';
import styled from 'styled-components';
import {IconLanguage, IconMoon, IconSun} from '@douyinfe/semi-icons'
import {Button} from "@douyinfe/semi-ui";
import {Theme} from "@/store/theme";
const Wrapper = styled(Button)`
  padding: 0 8px;
  cursor: pointer;
  font-size: 22px;
  color: var(--semi-color-text-2);
`;

export const LanguageSwitcher = () => {
  const locale = useLocaleStore(store => store.locale);
  const setLocale = useLocaleStore(store => store.setLocale);

  return (
    <Button
      style={{color: 'var(--semi-color-text-2)'}}
      theme='borderless'
      icon={<IconLanguage />}
      onClick={() => setLocale(locale === Locale.EN ? Locale.ZH : Locale.EN)} />
  );
};
