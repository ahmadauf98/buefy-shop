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
        <NuxtLink :to="`/products/${product.product_id}`">
          <v-hover v-slot="{ hover }">
            <v-card
              class="pa-5 text-center"
              :elevation="hover ? 5 : 0"
              :class="{ 'on-hover': hover }"
              flat
              min-height="350"
            >
              <!-- Product Image -->
              <v-img
                class="mx-auto mb-1"
                aspect-ratio="1.7"
                height="200"
                width="200"
                :src="product.image"
                alt="..."
              ></v-img>

              <v-row>
                <v-col cols="12">
                  <h1
                    class="text-h6 text-left font-weight-medium text-color-black text-truncate"
                  >
                    {{ product.name }}
                  </h1>
                </v-col>

                <v-col
                  v-show="product.sale == true"
                  cols="12"
                  class="text-left py-0"
                >
                  <v-chip color="green" label text-color="white" small>
                    Sale
                  </v-chip>
                </v-col>

                <v-col cols="12">
                  <v-row class="ma-0 pa-0">
                    <!-- Product Price -->
                    <v-col cols="9" class="ma-0 pa-0">
                      <h1
                        v-if="product.sale == false"
                        class="text-subtitle-1 text-left font-weight-bold text-color-blue"
                      >
                        RM{{ product.price.toFixed(2) }}
                      </h1>

                      <h1
                        v-else
                        class="text-subtitle-1 text-left font-weight-bold text-color-blue"
                      >
                        RM{{ product.sale_price.toFixed(2) }}
                        <span
                          class="text-caption text-decoration-line-through font-weight-regular text-color-grey"
                          >RM {{ product.price.toFixed(2) }}</span
                        >
                      </h1>
                    </v-col>

                    <!-- Product Sales -->
                    <v-col
                      cols="3"
                      class="ma-0 pa-0 d-flex align-center justify-end"
                    >
                      <h1
                        class="text-subtitle-2 text-left text-color-grey text-right"
                      >
                        {{ product.sales }} Sold
                      </h1>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </NuxtLink>
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
  color: #1976d2;
}

.text-color-grey {
  color: #808080;
}
</style>
