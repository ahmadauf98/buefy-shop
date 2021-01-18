<template>
  <div>
    <v-row>
      <v-col
        v-for="(product, index) in products"
        :key="index"
        cols="6"
        md="5"
        lg="4"
      >
        <v-card class="pa-5 text-center" flat min-height="350">
          <!-- Product Image -->
          <img :src="product.img" alt="..." />

          <v-row class="text-left d-flex">
            <!-- Product Name & Price -->
            <v-col cols="9">
              <NuxtLink :to="`/products/${product.product_id}`" class="text">
                <h1 class="text-h6 font-weight-medium mb-2 text-color-black">
                  {{ product.name }} <br />

                  <span
                    class="text-subtitle-1 font-weight-regular text-color-black"
                  >
                    ${{ product.price }}</span
                  >
                </h1>
              </NuxtLink>
            </v-col>

            <!-- Add to Card Button -->
            <v-col cols="3" class="px-0 mx-0">
              <v-btn color="#363636" fab dark depressed>
                <i class="fa fa-cart-plus fa-2x" aria-hidden="true"></i>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },

  // Fetch Products Data from Vuex
  computed: {
    ...mapState(['products']),
  },
}
</script>

<style scoped>
.text-color-black {
  color: #363636;
}

.text-color-blue {
  color: #3298dd;
}

.text {
  text-decoration: none;
}

.text:hover h1 {
  color: #3298dd;
}

.text:hover span {
  color: #3298dd;
}
</style>
