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
import { Card } from 'vue-stripe-elements-plus'

const STRIPE_URL = process.env.STRIPE_URL

export default {
  name: 'Checkout',
  components: {
    Card,
  },
  computed: {
    stripePublishableKey: () => process.env.STRIPE_PUBLISHABLE_KEY,
  },
  props: {
    total: {
      type: [Number, String],
      required: true,
    },
  },
  methods: {
    async beforePay() {
      await this.pay({
        url: STRIPE_URL,
        userData: this.shippingInformation,
        total: this.total,
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
