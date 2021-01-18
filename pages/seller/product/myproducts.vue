<template>
  <v-app>
    <div>
      <div class="section"><sellerAppHero /></div>

      <div>
        <v-row>
          <v-col cols="3">
            <sellerSidebar />
          </v-col>

          <v-col cols="9">
            <v-card class="pa-5" flat>
              <p class="text-h5 font-weight-medium text-color-black">
                My Products
              </p>

              <v-divider class="mt-n1"></v-divider>

              <v-row>
                <!-- Products List -->
                <v-col
                  v-for="(product, index) in my_products"
                  :key="index"
                  cols="3"
                >
                  <v-card
                    class="pa-3 text-center"
                    flat
                    min-height="390"
                    outlined
                  >
                    <!-- Product Image -->
                    <v-img
                      height="200"
                      width="200"
                      :src="product.image"
                      alt="..."
                    ></v-img>

                    <!-- Product Name -->
                    <v-card-title
                      class="px-0 py-1 text-subtitle-1 font-weight-medium text-left text-color-black text-truncate"
                      >{{ product.name }}</v-card-title
                    >

                    <!-- Product Price & Stock -->
                    <v-row>
                      <v-col cols="6">
                        <h1 class="text-subtitle-2 text-left text-color-blue">
                          ${{ product.price }}
                        </h1>
                      </v-col>
                      <v-col cols="6">
                        <h1 class="text-subtitle-2 text-right text-color-black">
                          Stock {{ product.stock }}
                        </h1>
                      </v-col>
                    </v-row>

                    <!-- Product Sales & Status -->
                    <v-row>
                      <v-col cols="6">
                        <h1 class="text-caption text-left text-color-grey">
                          Sales {{ product.sales }}
                        </h1>
                      </v-col>
                      <v-col cols="6" class="text-right mt-n1 d-flex">
                        <span class="text-caption mt-1 ml-2 text-color-grey"
                          >Sale</span
                        >
                        <v-switch
                          v-model="product.sale"
                          @click="onSale(product)"
                          class="ma-0 pa-0 ml-2 mt-1 mb-n6"
                        >
                        </v-switch>
                      </v-col>
                    </v-row>

                    <v-divider class="my-3"></v-divider>

                    <!-- Button -->
                    <v-row class="my-n2">
                      <v-col cols="6" class="mr-n1 ml-1">
                        <v-btn
                          @click="onRoute(`editproduct/${product.product_id}`)"
                          class="text-capitalize"
                          color="primary"
                          block
                          outlined
                        >
                          <i class="far fa-edit mr-1"></i> Edit
                        </v-btn>
                      </v-col>

                      <v-col cols="6" class="ml-n1 mr-1">
                        <v-menu>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="text-capitalize"
                              color="grey darken-1"
                              v-bind="attrs"
                              v-on="on"
                              block
                              outlined
                            >
                              <i class="fas fa-ellipsis-v mr-1"></i> More</v-btn
                            >
                          </template>
                          <v-list>
                            <v-list-item @click="onDelete(product.product_id)">
                              <v-list-item-title class="text-color-red">
                                <i class="far fa-trash-alt mr-1"></i>
                                Delete Product
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>

                <!-- Add Product -->
                <v-col cols="3" class="card-hover">
                  <v-card
                    class="pa-3 d-flex align-center"
                    flat
                    min-height="390"
                    outlined
                    @click="onRoute('addproduct')"
                  >
                    <v-row min-height="350">
                      <v-col cols="12" class="ma-0 pa-0 text-center">
                        <span style="font-size: 56px; color: #363636">
                          <i class="far fa-plus-square"></i>
                        </span>
                      </v-col>

                      <v-col cols="12" class="ma-0 pa-0 text-center">
                        <h1 class="text-h6 font-weight-bold text-color-black">
                          Add Product
                        </h1>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import sellerSidebar from '@/components/sellerSidebar'
import sellerAppHero from '@/components/sellerHero'

export default {
  components: {
    sellerAppHero,
    sellerSidebar,
  },
  data() {
    return {
      my_products: [],
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection('products')
          .where('seller_id', '==', user.uid)
          .onSnapshot((querySnapshot) => {
            this.my_products = []
            querySnapshot.forEach((doc) => {
              if (doc.exists) {
                this.my_products.push(doc.data())
              }
            })
          })
      } else {
        this.$router.replace('/')
      }
    })
  },

  methods: {
    // Route to Add Product
    onRoute(link) {
      this.$router.push(link)
    },

    // Change sale status of product
    async onSale(product) {
      try {
        await firebase
          .firestore()
          .collection('products')
          .doc(product.product_id)
          .update(product)
      } catch (error) {
        console.log(error.message)
      }
    },

    // Delete product from the list
    async onDelete(product_id) {
      try {
        await firebase
          .firestore()
          .collection('products')
          .doc(product_id)
          .delete()
          .then(() => {
            console.log('Successfully delete.')
          })
      } catch (error) {
        console.log(error.message)
      }
    },
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

.text-color-red {
  color: #ff4742;
}

.text-color-grey {
  color: #808080;
}

.card-hover :hover {
  background-color: #53a9ff;
}
</style>
>
