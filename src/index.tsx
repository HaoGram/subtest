import {App} from './App.tsx';
import {mount} from '@/utils/mount';
import {Router} from "@/Router";

(() => {
  const el = document.createElement('div');
  mount(el, <Router />);
  document.body.append(el);
})();
