import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/produto',
      name: 'produto',
      component: () => import('./views/Produto.vue')
    },
    {
      path: '/produtoAtivacaoEmMassa',
      name: 'produtoAtivacaoEmMassa',
      component: () => import('./views/ProdutoAtivacaoEmMassa.vue')
    }
  ]
})
