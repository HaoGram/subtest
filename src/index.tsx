import {mount} from '@/utils/mount';
import {Router} from "@/Router";
import './style/global.css';

import 'virtual:uno.css'

(() => {
  const el = document.createElement('div');
  mount(el, <Router />);
  document.body.append(el);
})();
