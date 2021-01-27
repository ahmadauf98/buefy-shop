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
            <v-card class="pa-5 mb-10" flat>
              <p class="text-h5 font-weight-medium text-color-black">
                My Seller Report
              </p>

              <v-divider class="mt-n1"></v-divider>

              <v-card outlined>
                <v-list-item three-line class="pa-0">
                  <v-list-item-content class="pa-0">
                    <v-simple-table>
                      <tbody>
                        <tr>
                          <td class="pa-5 font-weight-bold">
                            Seller Income(RM)
                          </td>
                          <td class="pa-5">{{ totalAmount }}</td>
                        </tr>
                        <tr>
                          <td class="pa-5 font-weight-bold">
                            Most Expensive Item in Shop (RM)
                          </td>
                          <td class="pa-5">{{ expensive }} (RM{{ maxVal }})</td>
                        </tr>
                        <tr>
                          <td class="pa-5 font-weight-bold">
                            Most Cheap Item in Shop (RM)
                          </td>
                          <td class="pa-5">{{ cheap }} (RM{{ minVal }})</td>
                        </tr>
                        <tr>
                          <td class="pa-5 font-weight-bold">
                            Most Top Courier
                          </td>
                          <td class="pa-5">abx_express</td>
                        </tr>
                        <tr>
                          <td class="pa-5 font-weight-bold">
                            Number of product(s)
                          </td>
                          <td class="pa-5">{{ result }}</td>
                        </tr>
                        <tr>
                          <td class="pa-5 font-weight-bold">
                            Number of ongoing shipment
                          </td>
                          <td class="pa-5">{{ on }}</td>
                        </tr>
                        <tr>
                          <td class="pa-5 font-weight-bold">
                            Number of shipped order
                          </td>
                          <td class="pa-5">{{ ship }}</td>
                        </tr>
                        <tr>
                          <td class="pa-5 font-weight-bold">
                            Number of cancelled order
                          </td>
                          <td class="pa-5">{{ cancel }}</td>
                        </tr>
                        <tr>
                          <td class="pa-5 font-weight-bold">
                            Number of completed order
                          </td>
                          <td class="pa-5">{{ complete }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>

    <v-overlay :opacity="opacity" :value="setShopName">
      <v-card
        class="mx-auto py-5 px-10 black--text d-block align-center"
        height="360"
        width="700"
        color="white"
        light
        outlined
      >
        <v-btn disabled class="mt-n3 ml-n8" dark icon>
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
        <!-- Title -->
        <div class="text-center">
          <v-icon class="mb-3 mt-n2" color="primary" size="60"
            >mdi-store</v-icon
          >
          <h1 class="text-center text-h5 font-weight-medium">
            Please add your shop name
          </h1>
        </div>

        <!-- Shop Name Field -->
        <div class="d-flex justify-center mt-3 mb-n10">
          <v-col cols="9">
            <v-text-field
              v-model="shop_name"
              label="Shop Name"
              outlined
              width="200px"
            ></v-text-field>
          </v-col>
        </div>

        <!-- Action Button -->
        <div class="d-flex justify-center mt-8 mb-n8">
          <v-btn
            @click="onCancelShopName()"
            class="px-10 mx-3 text-capitalize"
            color="grey darken-1"
            height="40"
            depressed
            dark
          >
            Cancel</v-btn
          >
          <v-btn
            @click="onSubmitShopName()"
            class="px-10 mx-3 text-capitalize"
            color="green darken-1"
            height="40"
            depressed
            dark
          >
            Submit</v-btn
          >
        </div>
      </v-card>
    </v-overlay>
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
      // User Authentication
      userID: '',

      // Shop Name
      shop_name: '',

      // Add Shop Name Overlay
      opacity: 1,
      setShopName: false,

      // Report Data
      cart: [],
      my_products: [],
      my_namem: [],
      prod_count: [],
      result: '',
      on: '',
      ship: '',
      cancel: '',
      complete: '',
      name: '',
      maxVal: '',
      minVal: '',
      my_ongoing: [],
      my_shipped: [],
      my_cancelled: [],
      my_completed: [],
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userID = user.uid

        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.data().shop_name == null) {
              this.setShopName = true
            }
          })

        firebase
          .firestore()
          .collection('products')
          .where('seller_id', '==', user.uid)
          .onSnapshot((querySnapshot) => {
            this.my_products = []
            this.cart = []
            querySnapshot.forEach((doc) => {
              if (doc.exists) {
                this.my_products.push(doc.data())
                this.my_namem.push(doc.data().name)
                this.cart.push(doc.data().price)
              }
            })
            this.maxVal = Math.max.apply(Math, this.cart)
            this.minVal = Math.min.apply(Math, this.cart)
            this.result = this.my_namem.length
          })

        firebase
          .firestore()
          .collection('order')
          .where('seller_id', '==', user.uid)
          .onSnapshot((querySnapshot) => {
            // this.my_products = []
            this.my_ongoing = []
            this.my_shipped = []
            this.my_completed = []
            querySnapshot.forEach((doc) => {
              if (doc.exists) {
                if (doc.data().status == 'to_ship')
                  this.my_ongoing.push(doc.data())

                if (doc.data().status == 'shipping')
                  this.my_shipped.push(doc.data())

                if (doc.data().status == 'cancelled')
                  this.my_cancelled.push(doc.data())

                if (doc.data().status == 'completed')
                  this.my_completed.push(doc.data())
              }
            })

            this.on = this.my_ongoing.length
            this.ship = this.my_shipped.length
            this.cancel = this.my_cancelled.length
            this.complete = this.my_completed.length
          })
      } else {
        this.$router.replace('/')
      }
    })
  },

  methods: {
    // when user click cancel button
    onCancelShopName() {
      this.$router.go(-1)
    },

    // when user click submit button
    onSubmitShopName() {
      firebase
        .firestore()
        .collection('users')
        .doc(this.userID)
        .update({
          shop_name: this.shop_name,
        })
        .then((this.setShopName = false))
    },
  },

  computed: {
    totalAmount: function () {
      var sum = 0
      this.cart.forEach((e) => {
        sum += e
      })
      return sum.toFixed(2)
    },

    expensive: function () {
      var sum = ''
      this.my_products
        .filter((i) => i.price == this.maxVal)
        .forEach((e) => {
          sum = e.name
        })
      return sum
    },

    cheap: function () {
      var sum = ''
      this.my_products
        .filter((i) => i.price == this.minVal)
        .forEach((e) => {
          sum = e.name
        })
      return sum
    },

    ongoing: function () {
      var sum = ''
      this.my_products
        .filter((i) => i.price == this.minVal)
        .forEach((e) => {
          sum = e.name
        })
      return sum
    },
  },
}
</script>
