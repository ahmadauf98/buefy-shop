<template>
  <div>
    <!-- Navigation Bar -->
    <v-app-bar
      class="d-none d-sm-inline contain"
      color="white"
      elevation="2"
      app
    >
      <!-- Brand Logo -->
      <div class="navbar-brand">
        <NuxtLink class="navbar-item" exact="exact" :to="{ name: 'index' }"
          ><strong><i>PlusGrosLeLogo</i></strong></NuxtLink
        >
      </div>
      <v-spacer></v-spacer>

      <!-- If user login => Cart|User Btn, If user not auth => Sign Up|Login Btn -->

      <!-- Cart Btn -->
      <v-btn
        v-show="isLogged == true"
        to="/cart"
        color="#1A202C"
        class="text-body-1 text-capitalize font-weight-light text-color-black px-3 py-5 mr-1"
        text
      >
        <v-badge
          v-if="product_data_length != 0"
          left
          overlap
          color="primary"
          :content="product_data_length"
        >
          <v-icon size="20" class="mr-1" color="#494949">mdi-cart</v-icon>
        </v-badge>
        <v-icon v-else size="20" class="mr-1" color="#494949">mdi-cart</v-icon>
        Cart
      </v-btn>

      <!-- Username Dropdown -->
      <v-menu open-on-hover offset-y left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="isLogged == true"
            text
            color="#1A202C"
            class="px-3 py-5"
            v-bind="attrs"
            v-on="on"
          >
            <!-- Profile Photo -->
            <v-avatar class="mr-1 py-5" size="35">
              <img :src="firebase_data.profile_photo" alt="..." />
            </v-avatar>
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list dense width="300px">
          <!-- Account Header -->
          <v-list-item class="text-center mb-n5">
            <v-list-item-title class="text-body-2">Account</v-list-item-title>
          </v-list-item>

          <v-divider class="mx-3"></v-divider>

          <!-- Profile Overview -->
          <v-list-item class="mt-n3 mb-n3">
            <v-row class="d-flex">
              <v-col cols="2">
                <!-- Profile Photo -->
                <v-avatar class="mr-1" size="40">
                  <img :src="firebase_data.profile_photo" alt="..." />
                </v-avatar>
              </v-col>
              <v-col cols="10">
                <h1 class="text-body-2 font-weight-bold">
                  {{ firebase_data.name }}
                </h1>
                <h1 class="caption font-weight-regular">
                  {{ firebase_data.email_address }}
                </h1>
              </v-col>
            </v-row>
          </v-list-item>

          <v-divider class="mx-3"></v-divider>
          <!-- Seller Dashboard -->
          <v-list-item to="/seller" class="mt-n5 mb-n1">
            <v-list-item-title class="d-flex align-center">
              <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c"
                >mdi-store-outline</v-icon
              >
              Seller Center</v-list-item-title
            >
          </v-list-item>

          <br />
          <!-- Seller Dashboard -->
          <v-list-item to="/buyer/purchase/toship" class="mt-n5 mb-n1">
            <v-list-item-title class="d-flex align-center">
              <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c"
                >mdi-shopping-outline</v-icon
              >
              My Purchase</v-list-item-title
            >
          </v-list-item>

          <!-- Account Button -->
          <v-list-item to="/buyer/account/profile" class="mb-n5">
            <v-list-item-title class="d-flex align-center">
              <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c"
                >mdi-account-circle-outline</v-icon
              >
              My Account</v-list-item-title
            >
          </v-list-item>

          <v-divider class="mx-3"></v-divider>

          <!-- Logout Button -->
          <v-list-item @click.prevent="logout()" class="mt-n5">
            <v-list-item-title class="d-flex align-center">
              <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c"
                >mdi-logout</v-icon
              >
              Log out</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Sign Up Btn -->
      <v-btn
        v-show="isLogged == false"
        to="/buyer/signup"
        color="#1A202C"
        class="text-body-1 text-capitalize font-weight-light text-color-black px-3 py-5 mr-1"
        text
      >
        <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c"
          >mdi-account-plus</v-icon
        >
        Sign Up
      </v-btn>

      <!-- Login Btn -->
      <v-btn
        v-show="isLogged == false"
        to="/buyer/login"
        color="#1A202C"
        class="text-body-1 text-capitalize font-weight-light text-color-black px-3 py-5 mr-1"
        text
      >
        <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c">mdi-login</v-icon>
        Login
      </v-btn>
    </v-app-bar>

    <v-overlay :value="loadingOverlay" :opacity="loadingOpacity" color="white">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
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
      user_id: '',

      // Data fetch from firebase
      firebase_data: '',
      product_data: [],
      product_data_length: 0,

      // Loading Overlay
      loadingOverlay: false,
      loadingOpacity: 1,

      // Search Data
      isLoading: false,
      items: [],
      search: null,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLogged = true

        this.user_id = user.uid

        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .onSnapshot((doc) => {
            this.firebase_data = doc.data()
          })

        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .collection('cart')
          .onSnapshot((docRef) => {
            this.product_data = []
            docRef.forEach((doc) => {
              this.product_data.push(doc.data())
            })
            this.product_data_length = this.product_data.length
          })
      } else {
        this.isLogged = false
      }
    })
  },

  watch: {
    loadingOverlay(val) {
      val &&
        setTimeout(() => {
          this.loadingOverlay = false
        }, 1000)
    },
    //search
    search(val) {
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

  methods: {
    async logout() {
      this.loadingOverlay = true
      try {
        await firebase.auth().signOut()
        this.$router.push('/')
      } catch (error) {
        this.loadingOverlay = false
        console.log(error.message)
      }
    },
    itemChange(e) {
      this.selected = e
      this.$nextTick(() => {
        // this.searchString = '';
        this.search = null
      })
    },
  },
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
    padding: 0px 270px;
  }
}
</style>
