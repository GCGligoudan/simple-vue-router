class HistoryRoute {
  constructor(){
    this.current = null; // 默认路径是不是应该为 '/' ?
  }
}
class VueRouter {
  constructor(options = {}) {
    this.mode = options.mode || 'hash';
    this.routes = options.routes || [];

    this.routesMap = {}; // {'/home': Home}
    this.routesMap = this.createMap(this.routes);

    this.history = new HistoryRoute();

    this.init();
  }
  createMap(routes){
    return routes.reduce((routeMap, cur) => {
      routeMap[cur.path] = cur.component;
      return routeMap;
    }, {})
  }
  init() { // 初始化
    if (this.mode === 'hash') { // hash 
      location.hash ? '' : (location.hash = '/');
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1);
      });
    } else { // history
      location.pathname ? '' : (location.pathname = '/'); 
      window.addEventListener('load', () => {
        this.history.current = location.pathname;
      });
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname;
      });
    }
  }
  back(){

  }
  go(){

  }
  push(){

  }
}
VueRouter.install = (Vue) => {
  Vue.mixin({
    beforeCreate(){
      if (this.$options && this.$options.router){ // 根节点
        this._router = this.$options.router;
      } else {
        this._router = this.$parent && this.$parent._router;
      }

      Vue.util.defineReactive(this,'_history', this._router.history);

      Object.defineProperty(this, '$router', { // router实例
        get() {
          return this._router;
        }
      });
      Object.defineProperty(this, '$route', {
        get() {
          return {
            current: this._router.history.current,
          };
        }
      });
    }
  });
  Vue.component('router-link', {
    props: {
      to: String
    },
    render() {
      const mode = this._self._router.mode;

      return <a href={mode === 'hash' ? `#${this.to}` : `${this.to}`}>{this.$slots.default}</a>
    }
  });
  Vue.component('router-view', {
    render(h) {
      const routesMap = this._self._router.routesMap;
      const current = this._self._router.history.current;
      return h(routesMap[current]);
    }
  })
}

export default VueRouter;
