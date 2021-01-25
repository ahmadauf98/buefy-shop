<template>
  <div class="content">
    <transition name="fade">
      <form
        class="payment"
        v-if="status !== 'failure'"
        @submit.prevent="beforePay"
      >
        <h3>Please enter your payment details:</h3>
        <div class="field">
          <label class="label" for="card">Credit Card</label>
          <p class="help">
            Test using this credit card:&nbsp;<strong
              >4242 4242 4242 4242,<br /></strong
            >and enter any 5 digits for the zip code
          </p>
        </div>
        <div class="field">
          <Card
            class="stripe-card input"
            id="card"
            :class="{ complete: isStripeCardCompleted }"
            :stripe="stripePublishableKey"
            @change="setIsStripeCardCompleted($event.complete)"
          ></Card>
        </div>
        <div class="field">
          <button
            class="button is-success pay-with-stripe"
            :disabled="!isStripeCardCompleted"
            :class="{ 'is-loading': isLoading }"
          >
            Pay with credit card
          </button>
        </div>
      </form>
      <div class="statusFailure has-text-centered" v-if="status === 'failure'">
        <h3>Oh No!</h3>
        <p>Something went wrong!</p>
        <button class="button" @click="clearCheckout">Please try again</button>
      </div>
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Card } from 'vue-stripe-elements-plus'
import { mapState } from 'vuex'

const STRIPE_URL = process.env.STRIPE_URL

export default {
  data() {
    return {
      userUid: '',
      order_id: '',
    }
  },
  name: 'Checkout',
  components: {
    Card,
  },
  computed: {
    ...mapState([
      'isStripeCardCompleted',
      'status',
      'isLoading',
      'shippingInformation',
      'cart',
      'success',
    ]),
    stripePublishableKey: () => process.env.STRIPE_PUBLISHABLE_KEY,
  },
  props: {
    total: {
      type: [Number, String],
      required: true,
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userUid = user.uid
      } else {
        this.$router.push('/')
      }
    })
  },
  methods: {
    async beforePay() {
      await this.pay({
        url: STRIPE_URL,
      })
    },

    setIsStripeCardCompleted: function (bool) {
      this.$store.commit('SET_IS_STRIPE_CARD_COMPLETED', bool)
    },

    pay: function (url) {
      // Submit data to firebase
      this.submit()

      this.$store.commit('SET_STATUS', 'success')
      this.$store.commit('SET_SUCCESS', true)
      this.$store.commit('SET_ACTUAL_STEP', 3)
      this.$store.commit('SET_CART_NUM', 0)

      if (this.success == true) {
        this.cart.forEach((item) => {
          firebase
            .firestore()
            .collection('users')
            .doc(this.userUid)
            .collection('cart')
            .doc(item.product_id)
            .delete()
        })
      }
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

            if (i.data().sale == true) {
              firebase
                .firestore()
                .collection('order')
                .doc(this.order_id)
                .set({
                  buyer_id: this.userUid,
                  seller_id: i.data().seller_id,
                  product_id: item.product_id,
                  count: item.count,
                  order_id: this.order_id,
                  status: 'to_ship',
                  courier_id: item.courier_id,
                  name: this.shippingInformation.name,
                  phone_number: this.shippingInformation.phone,
                  address: this.shippingInformation.address,
                  zip: this.shippingInformation.zip,
                  city: this.shippingInformation.city,
                  country: this.shippingInformation.country,
                  message: this.shippingInformation.message,
                  total_price: item.count * i.data().sale_price,
                  tracking_id: null,
                })
            } else {
              firebase
                .firestore()
                .collection('order')
                .doc(this.order_id)
                .set({
                  buyer_id: this.userUid,
                  seller_id: i.data().seller_id,
                  product_id: item.product_id,
                  count: item.count,
                  order_id: this.order_id,
                  status: 'to_ship',
                  courier_id: item.courier_id,
                  name: this.shippingInformation.name,
                  phone_number: this.shippingInformation.phone,
                  address: this.shippingInformation.address,
                  zip: this.shippingInformation.zip,
                  city: this.shippingInformation.city,
                  country: this.shippingInformation.country,
                  message: this.shippingInformation.message,
                  total_price: item.count * i.data().price,
                  tracking_id: null,
                })
            }
          })
      })
    },
  },
}
</script>

<style scoped lang="stylus">
.payment
  border 0.1rem solid #ccc
  max-width 50rem
  padding 5rem
  display flex
  flex-direction column
  margin 0 auto

.stripe-card
  margin-bottom 1rem

  &.input
    display block

/* -- transition --*/
.fade-enter-active,
.fade-leave-active
  transition opacity 0.25s ease-out

.fade-enter,
.fade-leave-to
  opacity 0
</style>
