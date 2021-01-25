<template>
  <div class="mt-15">
    <div class="section">
      <div class="capsule cart content">
        <StepMenu :actualStep="actualStep" :menu="stepMenuContent"></StepMenu>
        <div v-if="cart.length &gt; 0">
          <div v-if="actualStep === 0">
            <transition-group class="content" name="items" tag="div">
              <CartProductListItem
                v-for="item in cart"
                :key="item.product_id"
                :item="item"
              ></CartProductListItem>
            </transition-group>
            <div class="is-clearfix">
              <h3 class="total is-pulled-left">
                Total: {{ amount.toFixed(2) | ringgit }}
              </h3>
              <button
                class="button is-success is-pulled-right"
                @click="setActualStep(1)"
              >
                Checkout
              </button>
            </div>
          </div>
          <div v-if="actualStep === 1">
            <!-- Form Here -->
            <v-row class="d-flex justify-center">
              <v-col cols="6">
                <v-card class="pa-10" flat>
                  <v-text-field
                    label="Full Name"
                    placeholder="Enter your full name"
                    outlined
                    ref="name"
                    v-model="name"
                    :rules="[() => !!name || 'This field is required']"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    outlined
                    ref="phone"
                    v-model="phone"
                    :rules="[() => !!phone || 'This field is required']"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Address"
                    placeholder="Enter your address"
                    outlined
                    ref="address"
                    v-model="address"
                    :rules="[() => !!address || 'This field is required']"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Zip"
                    placeholder="Enter your zip"
                    outlined
                    ref="zip"
                    v-model="zip"
                    :rules="[() => !!zip || 'This field is required']"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="City"
                    placeholder="Enter your city"
                    outlined
                    ref="city"
                    v-model="city"
                    :rules="[() => !!city || 'This field is required']"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Country"
                    placeholder="Enter your country"
                    outlined
                    ref="country"
                    v-model="country"
                    :rules="[() => !!country || 'This field is required']"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Message"
                    placeholder="Enter your message"
                    outlined
                    ref="message"
                    v-model="message"
                  ></v-text-field>
                  <v-divider class="mt-6"></v-divider>
                  <v-card-actions>
                    <v-btn text @click="setActualStep(0)"> Back </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="submit()"
                      :disabled="
                        name == '' ||
                        phone == '' ||
                        address == '' ||
                        zip == '' ||
                        city == '' ||
                        country == ''
                      "
                    >
                      Place Order
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div v-if="actualStep === 2">
            <Checkout :total="amount"></Checkout>
          </div>
        </div>
        <div class="empty has-text-centered" v-else-if="cart.length == 0">
          <h3>Your cart is empty.</h3>
          <nuxt-link exact="exact" to="/"
            ><button class="button">Fill er up!</button></nuxt-link
          >
        </div>
        <!-- <div class="has-text-centered" v-else>
          <h2>Success!</h2>
          <p>Your order has been processed, it will be delivered shortly.</p>
          <nuxt-link exact="exact" to="/"
            ><button class="button">Fill again your cart</button></nuxt-link
          >
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import CartProductListItem from '@/components/CartProductListItem'
import StepMenu from '@/components/StepMenu'
import stepMenuContent from '@/components/StepMenu/stepMenuContent.json'
import 'vue-form-json/dist/vue-form-json.css'
import Checkout from '@/components/Checkout'
export default {
  data() {
    return {
      cart: [],
      userUid: '',
      actualStep: 0,
      temp: [],
      amount: 0,
      //form variable
      name: '',
      phone: '',
      address: '',
      zip: '',
      city: '',
      country: '',
      message: '',
      order_id: '',
    }
  },
  head: {
    script: [{ src: 'https://js.stripe.com/v3/' }],
  },
  components: {
    CartProductListItem,
    StepMenu,
    Checkout,
  },
  computed: {
    stepMenuContent: () => stepMenuContent,
  },
  filters: {
    ringgit: function (value) {
      return `RM${value}`
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userUid = user.uid
        // Get Cart Data From Firebase
        firebase
          .firestore()
          .collection('users')
          .doc(this.userUid)
          .collection('cart')
          .onSnapshot((doc) => {
            this.cart = []
            doc.forEach((product) => {
              this.cart.push(product.data())
            })
            console.log(this.cart)
            this.amount = 0
            // Calculate Total From Firebase
            this.cart.forEach((item) => {
              firebase
                .firestore()
                .collection('products')
                .doc(item.product_id)
                .onSnapshot((i) => {
                  if (i.data().sale == true) {
                    this.amount += item.count * i.data().sale_price
                    console.log('sale price: ', i.data().sale_price)
                  } else {
                    this.amount += item.count * i.data().price
                    console.log('normal price: ', i.data().price)
                  }
                })
            })
          })
      } else {
        this.$router.push('/')
      }
    })
  },
  methods: {
    setActualStep: function (num) {
      this.actualStep = num
    },
    submit() {
      // for each item in cart
      this.cart.forEach((item) => {
        firebase
          .firestore()
          .collection('products')
          .doc(item.product_id)
          .onSnapshot((i) => {
            // initialise order_id
            var uniqid = require('uniqid')
            this.order_id = uniqid()
            firebase.firestore().collection('shipping').doc(this.order_id).set({
              buyer_id: this.userUid,
              seller_id: i.data().seller_id,
              product_id: item.product_id,
              count: item.count,
              order_id: this.order_id,
              status: 'to_pay',
              courier_id: item.courier_id,
              name: this.name,
              phone_number: this.phone,
              address: this.address,
              zip: this.zip,
              city: this.city,
              country: this.country,
              message: this.message,
            })
          })
      })
      this.setActualStep(2)
    },
  },
}
</script>

<style scoped></style>
