<template>
  <v-card color="white" class="pa-5" flat>
    <!-- Price Range-->
    <div class="mb-5">
      <h1 class="text-h6 font-weight-regular text-color-black">
        Highest Price: RM{{ addedVal }}
      </h1>
    </div>

    <input
      class="slider"
      id="priceValue"
      type="range"
      :min="0"
      :max="addedVal"
      step="1"
      v-model="priceValue"
      @change="onGetFilter()"
    />

    <div class="d-flex mt-0 mb-5">
      <span class="text-caption font-weight-regular"> RM0</span>
      <span class="text-caption font-weight-regular ml-auto">RM{{ addedVal }}</span>
    </div>

    <v-divider class="my-5"></v-divider>

    <v-switch
      v-model="sale"
      @change="onGetFilter()"
      inset
      label="Only Sale"
    ></v-switch>

    <v-divider class="mt-1 mb-5"></v-divider>

    <h1 class="text-h6 font-weight-regular mb-2 text-color-black">
      Categories
    </h1>

    <v-select
      :items="categories"
      v-model="getCategory"
      @change="onGetFilter()"
      color="white"
      dense
      outlined
    ></v-select>

    <v-divider class="mt-1 mb-5"></v-divider>

    <h1 class="text-h6 font-weight-regular mb-2 text-color-black">
      Special Sale!
    </h1>

    <h1 class="text-subtitle-1 font-weight-regular">
      Shop now because half our items are greatly reduced
    </h1>

    <v-divider class="my-5"></v-divider>

    <h1 class="text-h6 font-weight-regular mb-2 text-color-black">
      Contact Us
    </h1>

    <h1 class="text-subtitle-1 font-weight-regular">
      Questions? Call us at 1-888-555-SHOP, we're happy to be of service.
    </h1>
  </v-card>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  data() {
    return {
      // Product Category
      categories: ['All', 'Hats', 'Jacket', 'Shirt', 'Shoe', 'Sweater'],
      products: [],
      max: [],
      maxVal: '',
      addedVal:'',
     
      

      // User Input
      priceValue: 300,
      getCategory: 'All',
      sale: false,
    }
  },

  mounted() {
    firebase
      .firestore()
      .collection('products')
      .get()
      .then((querySnapshot) => {
        this.max = []
        querySnapshot.forEach((doc) => {
          this.products.push(doc.data())
          this.max.push(doc.data().price)
        })
        this.maxVal = Math.max.apply(Math, this.max)
        this.addedVal= this.maxVal +10;
        console.log(this.addedVal)
        this.$store.commit('SET_PRODUCTS', this.products)
      })
  },

  methods: {
    onGetFilter() {
      this.productsTrans = []

      // Get Products From Firestore
      firebase
        .firestore()
        .collection('products')
        .where('price', '<=', Number(this.priceValue))
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.productsTrans.push(doc.data())
          })

          // If Product is on Sale
          if (this.sale == true) {
            let productSale = this.productsTrans.filter(
              (product) => product.sale == true
            )
            // If Category of Product is not 'All'
            if (this.getCategory != 'All') {
              let productCategory = productSale.filter(
                (product) => product.article == this.getCategory
              )
              this.products = productCategory
              this.$store.commit('SET_PRODUCTS', this.products)
            } else {
              this.products = productSale
              this.$store.commit('SET_PRODUCTS', this.products)
            }
          } else {
            // If Category of Product is not 'All'
            if (this.getCategory != 'All') {
              let productCategory = this.productsTrans.filter(
                (product) => product.article == this.getCategory
              )
              this.products = productCategory
              this.$store.commit('SET_PRODUCTS', this.products)
            } else {
              this.products = this.productsTrans
              this.$store.commit('SET_PRODUCTS', this.products)
            }
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
