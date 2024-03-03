import styled from 'styled-components';
import {Button, Switch} from '@douyinfe/semi-ui';

import {Theme, useThemeStore} from '@/store/theme';
import {useSelector} from '@/utils';
import {IconMoon, IconSun} from '@douyinfe/semi-icons';

const Wrapper = styled.div`
  float: right;
  padding: 0 8px;
  font-size: 16px;
  cursor: pointer;
`;


export const ThemeSwitcher = () => {
  const {theme, setTheme} = useThemeStore(useSelector(['theme', 'setTheme']));

  const changeHandler = () => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  };

  return (
    <Wrapper>
      <Button
        style={{color: 'var(--semi-color-text-2)'}}
        theme='borderless'
        onClick={changeHandler}
        icon={theme === Theme.Dark ? <IconMoon /> : <IconSun />}
      >
      </Button>
    </Wrapper>
  );
};
