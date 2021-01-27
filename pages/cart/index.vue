<template>
  <div class="mt-15">
    <div class="section">
      <div class="capsule cart content">
        <StepMenu :actualStep="actualStep" :menu="stepMenuContent"></StepMenu>
        <div v-if="cart_num &gt; 0">
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
            
            <!-- notification -->
            <notifications/>

            <!-- Shipping Information Form Here --> 
            <v-row class="d-flex justify-center">
              <v-col cols="6">
                <v-card class="pa-10" flat>
                  <p class="text-h5 mt-n3 font-weight-medium text-color-black">
                    <strong>Shipping</strong> Information
                  </p>

                  <p
                    class="text-subtitle-2 font-weight-regular mt-n5 text-color-grey"
                  >
                    Please fill in all information.
                  </p>

                  <v-divider class="mt-n1 mb-10"></v-divider>

                  <!-- FullName Field -->
                  <v-text-field
                    label="Full Name"
                    placeholder="Enter your full name"
                    outlined
                    ref="name"
                    v-model="name"
                    :rules="[() => !!name || 'This field is required']"
                    required
                  ></v-text-field>

                  <!-- Phone Number Field -->
                  <v-text-field
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    outlined
                    ref="phone"
                    v-model="phone"
                    :rules="[() => !!phone || 'This field is required']"
                    required
                  ></v-text-field>

                  <!-- Adress Field -->
                  <v-text-field
                    label="Address"
                    placeholder="Enter your address"
                    outlined
                    ref="address"
                    v-model="address"
                    :rules="[() => !!address || 'This field is required']"
                    required
                  ></v-text-field>

                  <!-- Zip Code Field -->
                  <v-text-field
                    label="Zip"
                    placeholder="Enter your zip"
                    outlined
                    ref="zip"
                    v-model="zip"
                    :rules="[() => !!zip || 'This field is required']"
                    required
                  ></v-text-field>

                  <!-- City/State Field -->
                  <v-text-field
                    label="City/State"
                    placeholder="Enter your city/state"
                    outlined
                    ref="city"
                    v-model="city"
                    :rules="[() => !!city || 'This field is required']"
                    required
                  ></v-text-field>

                  <!-- Country Field -->
                  <v-text-field
                    label="Country"
                    placeholder="Enter your country"
                    outlined
                    ref="country"
                    v-model="country"
                    :rules="[() => !!country || 'This field is required']"
                    required
                  ></v-text-field>

                  <!-- Buyer Message -->
                  <v-text-field
                    label="Message"
                    placeholder="Enter your message"
                    outlined
                    ref="message"
                    v-model="message"
                  ></v-text-field>

                  <v-divider class="mt-6"></v-divider>

                  <!-- Button Action -->
                  <v-card-actions>
                    <v-btn text @click="setActualStep(0)"> Back </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="emailLogin()"
                      color="primary"
                      text
                      :disabled="
                        name == '' ||
                        phone == '' ||
                        address == '' ||
                        zip == '' ||
                        city == '' ||
                        country == ''
                      "
                    >
                      Next
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
        <v-card
          class="d-flex align-center justify-center"
          v-else-if="cart_num == 0 && !success"
          height="500px"
          flat
        >
          <div class="text-center">
            <span style="font-size: 100px; color: #b5b5b5">
              <i class="fas fa-cart-arrow-down"></i>
            </span>

            <h1
              class="mt-n2 text-subtitle-1 font-weight-medium text-color-grey"
            >
              Your shopping cart is empty
            </h1>

            <v-btn to="/" class="mt-1" color="primary" depressed tile>
              Go Shopping Now
            </v-btn>
          </div>
        </v-card>
        <div class="has-text-centered" v-else>
          <v-card
            class="d-flex align-center justify-center"
            height="500px"
            flat
          >
            <div class="text-center">
              <h2>Success!</h2>
              <p>
                Your order has been processed, it will be delivered shortly.
              </p>
              <v-btn to="/" class="mt-1" color="primary" depressed tile>
                Go Shopping Again
              </v-btn>
            </div>
          </v-card>
        </div>
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
import { mapState } from 'vuex'
import notifications from '~/components/notifications'

export default {
  data() {
    return {
      cart: [],
      userUid: '',
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
    }
  },
  head: {
    script: [{ src: 'https://js.stripe.com/v3/' }],
  },
  components: {
    CartProductListItem,
    StepMenu,
    Checkout,
    notifications,
  },

  computed: {
    ...mapState(['success', 'actualStep', 'cart_num']),
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

            this.$store.commit('SET_CART_NUM', this.cart.length)

            this.amount = 0
            // Calculate Total From Firebase
            this.cart.forEach((item) => {
              firebase
                .firestore()
                .collection('products')
                .doc(item.product_id)
                .onSnapshot((i) => {
                  // Get courier fee
                  firebase
                    .firestore()
                    .collection('seller')
                    .doc(i.data().seller_id)
                    .collection('shipmentsettings')
                    .doc(item.courier_id)
                    .onSnapshot((courier) => {
                      if (i.data().sale == true) {
                        this.amount +=
                          item.count * i.data().sale_price + courier.data().rate
                      } else {
                        this.amount +=
                          item.count * i.data().price + courier.data().rate
                      }
                    })
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
      this.$store.commit('SET_ACTUAL_STEP', num)
    },

    // To validate the phone number
    validPhone:function(phone) {
      console.log('test function');
      var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      return re.test(phone);
    },
    
    // To validate the phone number
    validZip:function(zip) {
      console.log('test function');
      var re = /^\d{5}$/;
      return re.test(zip);
    },

    async emailLogin() {
      console.log("fyp xsoap lagi")
      try {

        //validate whether phone number is valid or not
        if (!this.validPhone(this.phone)) {
        this.$store.commit('SET_NOTIFICATION', {
          alert: 'Please insert a valid phone number.',
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,})

        //validate whether zip is valid or not
        }else if (!this.validZip(this.zip)) {
        this.$store.commit('SET_NOTIFICATION', {
          alert: 'Please insert a valid zip code containing only 5 number.',
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,})

        }else {
          this.next()
        }
        
      } catch (error) {
        console.log(error.message)
        this.$store.commit('SET_NOTIFICATION', {
            alert: error.message,
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,})
      }
    },

    next: function () {
      this.$store.commit('SET_SHIPPING_INFO', {
        name: this.name,
        phone: this.phone,
        address: this.address,
        zip: this.zip,
        city: this.city,
        country: this.country,
        message: this.message,
      })

      this.$store.commit('SET_CART', this.cart)

      this.setActualStep(2)
    },
  },
  beforeDestroy() {
    this.$store.commit('SET_SUCCESS', false)
    this.$store.commit('SET_ACTUAL_STEP', 0)
  },
}
</script>

<style scoped>
.text-color-grey {
  color: #b5b5b5;
}
</style>
