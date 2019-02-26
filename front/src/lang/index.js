import Vue from 'vue'

// 多语言配置，使用 vuex-i18n
import VuexI18n from 'vuex-i18n'

export default function (store) {
  Vue.use(VuexI18n.plugin, store)

  const langs = require('./global')
  console.log('js多语种包：', langs)

  for (let a in langs) {
    if (langs.hasOwnProperty(a)) {
      Vue.i18n.add(a, langs[a])
    }
  }

  // 设置默认语言
  Vue.i18n.set('zh_CN')
}

// const langs = ['zh-CN', 'en']; // 支持哪些语言
// const defaultLang = 'en'; // 默认语言，暂时并没有对外抛出
//
// function getLang() {
//   let queries = getQueryObj();
//   let storeLang = getItem('lang');
//   let rawLang;
//   let flag = false;
//
//   if (queries && queries['lang']) {
//     rawLang = queries['lang'];
//     setItem('lang', rawLang);
//   } else {
//     rawLang = storeLang || navigator.language;
//   }
//
//   langs.map(item => {
//     if (item === rawLang) {
//       flag = true;
//     }
//   });
//   return flag ? rawLang : defaultLang;
// }
//
// const lang = getLang(langs, defaultLang);
