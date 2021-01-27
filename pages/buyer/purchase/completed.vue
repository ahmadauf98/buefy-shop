<template>
  <v-app>
    <div>
      <div class="section"><buyerWelcome /></div>

      <div>
        <v-row>
          <v-col cols="3">
            <buyerSidebar />
          </v-col>

          <v-col cols="9">
            <v-card class="pa-5 mb-15" flat>
              <buyerTab />

              <v-divider></v-divider>

              <v-card class="py-3 px-3 mb-6" color="grey lighten-4" outlined>
                <v-row>
                  <v-col class="text-color-grey" cols="4">Product(s)</v-col>
                  <v-col class="text-color-grey" cols="2">Total Price</v-col>
                  <v-col class="text-color-grey" cols="2">Status</v-col>
                  <v-col class="text-color-grey" cols="2">Courier</v-col>
                  <v-col class="text-color-grey" cols="2">Actions</v-col>
                </v-row>
              </v-card>

              <v-card
                v-if="orders.length == 0"
                class="py-3 mt-3 mb-6 d-flex align-center justify-center"
                height="293"
                flat
              >
                <div>
                  <i class="text-center">
                    <svg
                      width="100"
                      height="100"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 94 93"
                    >
                      <g
                        fill="none"
                        fill-rule="evenodd"
                        transform="translate(-2)"
                      >
                        <rect width="96" height="96"></rect>
                        <ellipse
                          cx="47"
                          cy="87"
                          fill="#F2F2F2"
                          rx="45"
                          ry="6"
                        ></ellipse>
                        <path
                          fill="#FFF"
                          stroke="#D8D8D8"
                          d="M79,55.5384191 L79,84.1647059 C79,85.1783108 78.1452709,86 77.0909091,86 L17.9090909,86 C16.8547291,86 16,85.1783108 16,84.1647059 L16,9.83529412 C16,8.82168917 16.8547291,8 17.9090909,8 L77.0909091,8 C78.1452709,8 79,8.82168917 79,9.83529412 L79,43.6504538 L79,55.5384191 Z"
                        ></path>
                        <path
                          fill="#FAFAFA"
                          stroke="#D8D8D8"
                          d="M64.32,4.0026087 L56.62,4.0026087 L56.62,3.5026087 C56.62,2.92262436 56.214985,2.5 55.68,2.5 L40.32,2.5 C39.785015,2.5 39.38,2.92262436 39.38,3.5026087 L39.38,4.0026087 L31.68,4.0026087 C31.433015,4.0026087 31.22,4.22488523 31.22,4.50434783 L31.22,12.5182609 C31.22,12.7977235 31.433015,13.02 31.68,13.02 L64.32,13.02 C64.566985,13.02 64.78,12.7977235 64.78,12.5182609 L64.78,4.50434783 C64.78,4.22488523 64.566985,4.0026087 64.32,4.0026087 Z"
                        ></path>
                        <g fill="#D8D8D8" transform="translate(83)">
                          <circle cx="10" cy="13" r="3" opacity=".5"></circle>
                          <circle cx="2" cy="9" r="2" opacity=".3"></circle>
                          <path
                            d="M8.5,1 C7.67157288,1 7,1.67157288 7,2.5 C7,3.32842712 7.67157288,4 8.5,4 C9.32842712,4 10,3.32842712 10,2.5 C10,1.67157288 9.32842712,1 8.5,1 Z M8.5,7.10542736e-15 C9.88071187,7.10542736e-15 11,1.11928813 11,2.5 C11,3.88071187 9.88071187,5 8.5,5 C7.11928813,5 6,3.88071187 6,2.5 C6,1.11928813 7.11928813,7.10542736e-15 8.5,7.10542736e-15 Z"
                            opacity=".3"
                          ></path>
                        </g>
                        <path
                          fill="#D8D8D8"
                          d="M48.5,43 C48.7761424,43 49,43.2238576 49,43.5 C49,43.7761424 48.7761424,44 48.5,44 L26.5,44 C26.2238576,44 26,43.7761424 26,43.5 C26,43.2238576 26.2238576,43 26.5,43 L48.5,43 Z M68.5,34 C68.7761424,34 69,34.2238576 69,34.5 C69,34.7761424 68.7761424,35 68.5,35 L26.5,35 C26.2238576,35 26,34.7761424 26,34.5 C26,34.2238576 26.2238576,34 26.5,34 L68.5,34 Z M68.5,25 C68.7761424,25 69,25.2238576 69,25.5 C69,25.7761424 68.7761424,26 68.5,26 L26.5,26 C26.2238576,26 26,25.7761424 26,25.5 C26,25.2238576 26.2238576,25 26.5,25 L68.5,25 Z"
                        ></path>
                      </g>
                    </svg>
                  </i>

                  <h1
                    class="text-center text-subtitle-2 font-weight-regular text-color-grey"
                  >
                    No Orders
                  </h1>
                </div>
              </v-card>

              <v-card
                v-else
                v-for="(order, index) in orders"
                :key="index"
                class="py-3 mt-3 mb-6"
                outlined
              >
                <div class="px-3 d-flex align-center">
                  <v-avatar class="mr-2" size="28">
                    <img :src="order.seller_profile_photo" alt="..." />
                  </v-avatar>
                  <h1 class="text-subtitle-2 font-weight-regular">
                    {{ order.seller_name }} ({{ order.seller_shop_name }} Shop)
                  </h1>

                  <h1
                    class="text-subtitle-2 font-weight-regular ml-auto text-color-grey"
                  >
                    Order ID {{ order.order_id }}
                  </h1>
                </div>

                <v-divider class="my-2"></v-divider>
                <v-row class="px-3">
                  <!-- Product Item -->
                  <v-col class="text-color-grey" cols="4">
                    <v-card class="mx-2 my-4" flat>
                      <v-row>
                        <v-col cols="4" class="pa-2 ma-0">
                          <v-img :src="order.product_image"></v-img>
                        </v-col>
                        <v-col class="pa-2 ma-0 my-auto">
                          <h1 class="text-subtitle-2 font-weight-regular">
                            {{ order.product_name }}
                          </h1>
                          <h1 class="text-subtitle-2 font-weight-regular">
                            x{{ order.order_count }}
                          </h1>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>

                  <!-- Total Price -->
                  <v-col class="text-color-grey" cols="2">
                    <v-card class="mx-2 my-4" flat>
                      <v-row class="my-auto">
                        <v-col cols="12" class="px-2">
                          <h1 class="text-subtitle-2 font-weight-regular">
                            RM{{ order.order_total_price }}
                          </h1>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>

                  <!-- Status -->
                  <v-col class="text-color-grey" cols="2">
                    <v-card class="mx-2 my-4" flat>
                      <v-row class="my-auto">
                        <v-col cols="12" class="px-0">
                          <h1
                            v-if="order.order_status == 'completed'"
                            class="text-subtitle-2"
                          >
                            Completed
                          </h1>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>

                  <!-- Courier -->
                  <v-col class="text-color-grey" cols="2">
                    <v-card class="mx-2 my-4" flat>
                      <v-row class="my-auto">
                        <v-col cols="12" class="px-1">
                          <h1 class="text-subtitle-2 font-weight-regular">
                            {{ order.courier_name }}
                          </h1>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>

                  <!-- Actions -->
                  <v-col class="text-color-grey" cols="2">
                    <v-card class="mx-2 mb-4 mt-2" flat>
                      <v-row class="my-auto">
                        <v-col cols="12" class="px-0">
                          <v-btn
                            @click="
                              onDetails(
                                order.order_id,
                                order.order_name,
                                order.order_address,
                                order.order_phone_number,
                                order.courier_name,
                                order.order_tracking_number
                              )
                            "
                            class="text-subtitle-2 px-0 text-capitalize text-color-green font-weight-regular"
                            text
                          >
                            <v-icon class="mr-1" size="18"
                              >mdi-truck-check</v-icon
                            >
                            Check Details
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Ship Details Overlay -->
    <v-overlay :opacity="opacity" :value="shippingDetails">
      <v-card
        class="mx-auto pa-10 black--text d-block align-center"
        min-height="300"
        width="700"
        color="white"
        light
        outlined
      >
        <!-- Order ID -->
        <div class="mb-4">
          <h1 class="text-subtitle-1 font-weight-medium mb-1">
            <v-icon class="mr-1" color="primary">mdi-barcode-scan</v-icon>
            Order ID
          </h1>
          <h1 class="text-subtitle-2 font-weight-regular ml-9 text-color-grey">
            {{ selectedOrder.order_id }}
          </h1>
        </div>

        <!-- Delivery Address -->
        <div class="mb-4">
          <h1 class="text-subtitle-1 font-weight-medium mb-1">
            <v-icon class="mr-1" color="primary"
              >mdi-office-building-marker-outline</v-icon
            >
            Delivery Address
          </h1>
          <h1 class="text-subtitle-2 font-weight-regular ml-9 text-color-grey">
            {{ selectedOrder.order_name }},
            {{ selectedOrder.order_phone_number }}
          </h1>
          <h1 class="text-subtitle-2 font-weight-regular ml-9 text-color-grey">
            {{ selectedOrder.order_address }}
          </h1>
        </div>

        <!-- Courier Tracking Number -->
        <div>
          <h1 class="text-subtitle-1 font-weight-medium mb-2">
            <v-icon class="mr-1" color="primary">mdi-truck-fast</v-icon>
            Logistic Information - {{ selectedOrder.order_courier_name }}
          </h1>
          <v-chip class="ml-9" color="green" dark label>
            <v-icon left size="18"> mdi-pound </v-icon>
            {{ selectedOrder.order_tracking_number }}
          </v-chip>
        </div>

        <!-- Action Button -->
        <div class="d-flex justify-end">
          <v-btn
            @click="shippingDetails = false"
            class="px-10 mr-3 text-capitalize"
            color="grey lighten-1"
            height="40"
            width="150"
            depressed
            dark
          >
            Close</v-btn
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
import buyerSidebar from '@/components/buyerSidebar'
import buyerWelcome from '@/components/buyerWelcome'
import buyerTab from '@/components/buyerTab'

export default {
  components: {
    buyerWelcome,
    buyerSidebar,
    buyerTab,
  },
  data() {
    return {
      // Order Data
      orders: [],
      selectedOrder: '',

      // Ship Product Overlay
      shippingDetails: false,
      opacity: 1,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Get Order Info From Firebase
        firebase
          .firestore()
          .collection('order')
          .where('buyer_id', '==', user.uid)
          .where('status', '==', 'completed')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((orderRef) => {
              // Create Order List
              const order_list = {
                // Order Data
                order_id: orderRef.data().order_id,
                order_total_price: orderRef.data().total_price.toFixed(2),
                order_phone_number: orderRef.data().phone_number,
                order_address:
                  orderRef.data().address +
                  ', ' +
                  orderRef.data().zip +
                  ', ' +
                  orderRef.data().city +
                  ', ' +
                  orderRef.data().country,
                order_message: orderRef.data().message,
                order_status: orderRef.data().status,
                order_name: orderRef.data().name,
                order_count: orderRef.data().count,
                order_tracking_number: orderRef.data().tracking_id,

                // Courier Data
                courier_name: '',

                // Product Data
                product_name: '',
                product_image: '',

                // Buyer Data
                seller_name: '',
                seller_profile_photo: '',
              }

              // Get Product Info From Firebase
              firebase
                .firestore()
                .collection('courier')
                .doc(orderRef.data().courier_id)
                .get()
                .then((courierRef) => {
                  order_list.courier_name = courierRef.data().brand_name
                })

              // Get Product Info From Firebase
              firebase
                .firestore()
                .collection('products')
                .doc(orderRef.data().product_id)
                .get()
                .then((productRef) => {
                  order_list.product_name = productRef.data().name
                  order_list.product_image = productRef.data().image
                })

              // Get Buyer Info From Firebase
              firebase
                .firestore()
                .collection('users')
                .doc(orderRef.data().seller_id)
                .get()
                .then((sellerRef) => {
                  order_list.seller_name = sellerRef.data().name
                  order_list.seller_profile_photo = sellerRef.data().profile_photo
                })

              // Push into array
              this.orders.push(order_list)
            })
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    onDetails(
      order_id,
      order_name,
      order_address,
      order_phone_number,
      order_courier_name,
      order_tracking_number
    ) {
      this.shippingDetails = true
      this.selectedOrder = {
        order_id: order_id,
        order_name: order_name,
        order_address: order_address,
        order_phone_number: order_phone_number,
        order_courier_name: order_courier_name,
        order_tracking_number: order_tracking_number,
      }
    },
  },
}
</script>

<style scoped>
.text-color-grey {
  color: #808080;
}

.text-color-blue {
  color: #1976d2;
}

.text-color-green {
  color: #41b883;
}
</style>
