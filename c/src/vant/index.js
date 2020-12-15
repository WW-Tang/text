import Vue from 'vue';
// import Vant from 'vant';
import 'vant/lib/index.css';

import { NavBar } from 'vant';
Vue.use(NavBar);

import { Icon } from 'vant';
Vue.use(Icon);

import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);

import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);

import { Sidebar, SidebarItem } from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);

// 评分
import { Rate } from 'vant';
Vue.use(Rate);

// 上拉刷新列表
import { List } from 'vant';

Vue.use(List);

// Vue.use(Vant);

import { Loading } from 'vant';

Vue.use(Loading);

import { Search } from 'vant';

Vue.use(Search);