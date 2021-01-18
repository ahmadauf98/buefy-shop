<template>
  <v-app>
    <div>
      <div class="section">
        <AppHero />
      </div>
      <div>
        <v-row>
          <v-col cols="3" class="mb-8"><AppSidebar /></v-col>
          <v-col cols="9" class="mb-8"><AppProductListItem /></v-col>
        </v-row>
      </div>
    </div>
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Hero from '@/components/Hero'
import ProductListItem from '@/components/ProductListItem'
import Sidebar from '@/components/Sidebar'

export default {
  components: {
    AppHero: Hero,
    AppProductListItem: ProductListItem,
    AppSidebar: Sidebar,
  },
  computed: {},
  watch: {
    products: {
      handler(products) {
        console.log('products: ', products) //Debug
      },
      deep: true,
    },
  },
  created() {},
}
</script>

<style scoped>
.text-color-black {
  color: #363636;
}

.text {
  text-decoration: none;
}

.text-capitalize {
  text-transform: capitalize;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .contain {
    padding: 0px 20px;
  }
}

/* Medium devices (landscape tablets, 960px and up) */
@media only screen and (min-width: 960px) {
  .contain {
    padding: 0px 5px;
  }
}

/* Large devices (laptops/desktops, 1264px and up) */
@media only screen and (min-width: 1264px) {
  .contain {
    padding: 0px 50px;
  }
}

/* Extra large devices (large laptops and desktops, 1904px and up) */
@media only screen and (min-width: 1904px) {
  .contain {
    padding: 0px 275px;
  }
}
</style>
