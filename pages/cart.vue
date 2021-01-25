<template>
  <div class="container">
    <div class="section">
      <div class="capsule cart content">
        <StepMenu :actualStep="actualStep" :menu="stepMenuContent"></StepMenu>
        <div v-if="total &gt; 0">
          <div v-if="actualStep === 0">
            <transition-group class="content" name="items" tag="div">
              <CartProductListItem
                v-for="item in cart"
                :key="item.name"
                :item="item"
              ></CartProductListItem>
            </transition-group>
            <div class="is-clearfix">
              <h3 class="total is-pulled-left">
                Total: {{ amount | usdollar }}
              </h3>
              <button
                class="button is-success is-pulled-right"
                @click="setActualStep(1)"
              >
                > Next
              </button>
            </div>
          </div>
          <div v-if="actualStep === 1">
            <FormJson
              class="container shippingForm"
              :formFields="shippingFields"
              :camelizePayloadKeys="true"
              formName="shippingData"
              :btnSubmit="{ value: 'Submit' }"
              :btnReset="{ value: 'Reset' }"
            ></FormJson>
          </div>
          <div v-if="actualStep === 2">
            <Checkout :total="amount"></Checkout>
          </div>
        </div>
        <div
          class="empty has-text-centered"
          v-else-if="!total &amp;&amp; !success"
        >
          <h3>Your cart is empty.</h3>
          <nuxt-link exact="exact" to="/"
            ><button class="button">Fill er up!</button></nuxt-link
          >
        </div>
        <div class="has-text-centered" v-else>
          <h2>Success!</h2>
          <p>Your order has been processed, it will be delivered shortly.</p>
          <nuxt-link exact="exact" to="/"
            ><button class="button">Fill again your cart</button></nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import FormJson from 'vue-form-json'
import Checkout from '@/components/Checkout'
import CartProductListItem from '@/components/CartProductListItem'
import StepMenu from '@/components/StepMenu'
import stepMenuContent from '@/components/StepMenu/stepMenuContent.json'
import shippingFields from './shippingFields'
import 'vue-form-json/dist/vue-form-json.css'

export default {
  head: {
    script: [{ src: 'https://js.stripe.com/v3/' }],
  },
  components: {
    CartProductListItem,
    Checkout,
    FormJson,
    StepMenu,
  },
  filters: {
    usdollar: (value) => `$${value}`,
  },
  data: () => ({
    shippingFields,
  }),
  computed: {
    stepMenuContent: () => stepMenuContent,
  },
  mounted() {
    this.$root.$on('formSubmitted', ({ values }) => {
      const {
        address: line1,
        city,
        country: state,
        email,
        firstName,
        lastName,
        message: shipping,
        phoneNumber: phone,
        zip: postal_code,
      } = values

      const address = {
        line1,
        city,
        state,
        postal_code,
      }

      const name = `${firstName} ${lastName}`

      this.setShippingInformation({
        address,
        email,
        name,
        phone,
        shipping: {
          address,
          name,
          phone,
        },
      })
      this.setActualStep(2)
    })
  },
  methods: {
    ...mapActions(['setSuccess', 'setActualStep', 'setShippingInformation']),
  },
  beforeDestroy() {
    this.success && this.setSuccess(false)
    this.setActualStep(0)
  },
}
</script>

<style lang="stylus" scoped>
.shippingForm.shippingForm
  max-width 28rem
</style>
