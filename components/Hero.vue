<template>
  <div class="mt-15 pt-5 px-1 mb-10 d-flex">
    <!-- Title & Subtitle -->
    <div>
      <p class="title text-h4 font-weight-medium">
        <strong class="font-title">Welcome</strong> to our awesome market
      </p>
      <p class="subtitle">Below you will find your latests products</p>
    </div>

    <!-- Search Bar -->
    <div class="col-4 ml-auto pt-0 pr-0">
      <v-card flat>
        <v-autocomplete
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          append-icon="mdi-magnify"
          item-text="name"
          label="Search"
          width="300px"
          clearable
          hide-details
          hide-selected
          dense
          outlined
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Search for your
                <strong>Product</strong>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item :to="`products/${item.product_id}`">
              <!-- Product Image -->
              <v-list-item-avatar>
                <v-img :src="item.image"></v-img>
              </v-list-item-avatar>
              <!-- Product Name -->
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  name: 'AppHeader',

  data() {
    return {
      // User Authentication
      isLogged: false,

      // Data fetch from firebase
      firebase_data: '',

      // Loading Overlay
      loadingOverlay: false,
      loadingOpacity: 1,

      // Search Data
      isLoading: false,
      items: [],
      search: null,
    }
  },

  watch: {
    loadingOverlay(val) {
      val &&
        setTimeout(() => {
          this.loadingOverlay = false
        }, 1000)
    },

    // Search Bar
    search() {
      if (this.items.length > 0) return

      this.isLoading = true

      firebase
        .firestore()
        .collection('products')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.items.push(doc.data())
          })
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
.font-title {
  color: #1976d2;
}
</style>
