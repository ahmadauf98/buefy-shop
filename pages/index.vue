<template>
  <div class="container">
    <div class="section">
      <AppHero />
    </div>
    <div class="section capsule is-clearfix">
      <AppSidebar :pricerange.sync="highprice" />
      <transition-group class="content is-pulled-right" name="items" tag="div">
        <AppProductListItem
          v-for="product in products"
          :key="product['.key']"
          :item="product"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Hero from '@/components/Hero'
import ProductListItem from '@/components/ProductListItem'
import Sidebar from '@/components/Sidebar'

const { mapGetters } = createNamespacedHelpers('product')

export default {
  components: {
    AppHero: Hero,
    AppProductListItem: ProductListItem,
    AppSidebar: Sidebar,
  },
  computed: {
    ...mapGetters(['products', 'highprice']),
  },
  watch: {
    products: {
      handler(products) {
        console.log('products: ', products) //Debug
      },
      deep: true,
    },
  },
  created() {
    this.$store.dispatch('product/setProductsRef')
  },
}
</script>

<style lang="stylus" scoped>
.content
  /*no grid support*/
  width 79.7872%
  /* grid */
  display grid
  grid-template-columns repeat(3, 1fr)
  grid-gap 1rem
  padding 0
</style>
