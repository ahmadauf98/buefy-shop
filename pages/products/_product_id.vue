<template>
  <v-app>
    <div>
      <div class="section"></div>
    </div>

    <div>
      <v-row>
        <!-- Product Basic Details -->
        <v-col cols="12" class="mt-15 pt-5">
          <v-card class="pa-10" min-height="200" flat>
            <v-row>
              <!-- Product Image -->
              <v-col cols="5">
                <v-card tile outlined>
                  <v-img
                    class="mx-auto mb-1"
                    aspect-ratio="1.7"
                    height="450"
                    width="450"
                    :src="image"
                    alt="..."
                  ></v-img>
                </v-card>
              </v-col>

              <!-- Product Information -->
              <v-col cols="7">
                <h1 class="text-h5 font-weight-medium text-color-black">
                  {{ name }}
                </h1>

                <!-- Product Price -->
                <div>
                  <div v-if="sale != true">
                    <h1
                      class="text-h4 font-weight-medium text-color-blue mt-3 py-5 px-4 pricetag"
                    >
                      RM{{ price }}
                    </h1>
                  </div>

                  <div v-else class="d-flex mt-3 py-5 px-4 pricetag">
                    <h1 class="text-h4 font-weight-medium text-color-blue mr-3">
                      <v-badge
                        :content="salePercentage"
                        :value="salePercentage"
                      >
                        RM{{ sale_price }}
                      </v-badge>
                    </h1>

                    <h1
                      class="text-h6 font-weight-regular text-decoration-line-through text-color-grey mt-3"
                    >
                      RM{{ price }}
                    </h1>
                  </div>
                </div>

                <!-- Product Description -->
                <v-card class="d-flex pa-3 mt-n1 align-center" flat>
                  <h1 class="text-subtitle-1 text-color-grey">
                    For
                    <span class="text-decoration-underline text-color-black">
                      {{ category }}
                    </span>
                  </h1>

                  <v-divider vertical class="mx-4 my-0"></v-divider>

                  <h1 class="text-subtitle-1 text-color-grey">
                    Type
                    <span class="text-decoration-underline text-color-black">{{
                      article
                    }}</span>
                  </h1>

                  <v-divider vertical class="mx-4 my-0"></v-divider>

                  <h1 class="text-subtitle-1 text-color-grey">
                    <span class="text-decoration-underline text-color-black">{{
                      sales
                    }}</span>
                    Sold
                  </h1>
                </v-card>

                <!-- Courier Selection -->
                <v-card flat>
                  <h1
                    class="text-subtitle-2 font-weight-regular text-color-grey mb-1"
                  >
                    <v-icon color="grey" class="mr-1">mdi-truck-fast</v-icon>
                    Pick Courier:
                  </h1>

                  <v-row class="ma-0 pa-0">
                    <v-col
                      cols="4"
                      v-for="(courier, index) in courierList"
                      :key="index"
                      class="ma-0 pa-0"
                      v-show="courier.status == true"
                    >
                      <label>
                        <input
                          type="radio"
                          name="product"
                          class="card-input-element"
                          @click="onSelectCourier(courier.courier_id)"
                        />

                        <div class="panel panel-default card-input">
                          <div class="panel-body">
                            <v-card
                              class="pa-2"
                              :ripple="{ class: 'primary--text' }"
                              tile
                              flat
                            >
                              <v-row>
                                <!-- Courier Brand Image -->
                                <v-col cols="4">
                                  <v-img
                                    class="mx-auto"
                                    aspect-ratio="1.7"
                                    width="40"
                                    height="40"
                                    :src="courier.courier_img"
                                    alt="..."
                                  ></v-img>
                                </v-col>

                                <!-- Courier Rating -->
                                <v-col class="ml-n2 my-auto">
                                  <div class="d-flex align-center">
                                    <h1
                                      class="text-subtitle-2 font-weight-regular text-color-black"
                                    >
                                      {{ courier.brand_name }}
                                    </h1>
                                  </div>

                                  <div class="d-flex align-center">
                                    <span
                                      class="text-color-grey text--lighten-2 caption mr-1"
                                    >
                                      ({{ courier.overall_rating }})
                                    </span>

                                    <NuxtLink
                                      :to="`/courier/${courier.courier_id}`"
                                    >
                                      <h1 class="text-caption text-hover">
                                        See Review
                                      </h1>
                                    </NuxtLink>
                                  </div>

                                  <div class="d-flex align-center">
                                    <span
                                      class="text-color-grey text--lighten-2 caption mr-1"
                                    >
                                      Fee: RM {{ courier.rate.toFixed(2) }}
                                    </span>
                                  </div>
                                </v-col>
                              </v-row>
                            </v-card>
                          </div>
                        </div>
                      </label>
                    </v-col>
                  </v-row>
                </v-card>

                <!-- Quantity Button -->
                <v-row class="my-3 mx-0 d-flex align-center">
                  <v-card
                    tile
                    outlined
                    height="35"
                    width="35"
                    class="d-flex justify-center align-center"
                    @click="minusQuantity()"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-card>
                  <v-card
                    tile
                    outlined
                    height="35"
                    width="60"
                    class="d-flex align-center justify-center"
                    >{{ product_quantity }}</v-card
                  >
                  <v-card
                    tile
                    outlined
                    height="35"
                    width="35"
                    class="d-flex justify-center align-center"
                    @click="addQuantity()"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-card>

                  <h1
                    class="text-subtitle-2 font-weight-regular ml-4 text-color-grey"
                  >
                    {{ stock }} item left
                  </h1>
                </v-row>

                <!-- Add to Cart Button -->
                <v-row>
                  <v-col>
                    <v-btn
                      class="text-subtitle-2 font-weight-regular text-capitalize mt-2"
                      color="primary"
                      tile
                      outlined
                      large
                      @click="addToCart()"
                    >
                      <v-icon class="mr-1" size="20">mdi-cart-plus</v-icon>
                      Add To Cart
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- Seller Info -->
        <v-col cols="12" class="my-1">
          <v-card class="py-6 px-10" flat>
            <v-row>
              <v-col cols="4" class="d-flex align-center">
                <v-avatar size="70" class="mr-4">
                  <img :src="seller.profile_photo" alt="..." />
                </v-avatar>

                <div>
                  <h1
                    class="text-subtitle-1 font-weight-medium text-color-black"
                  >
                    {{ seller.shop_name }} Shop
                  </h1>
                  <h1
                    class="text-subtitle-2 font-weight-regular text-color-grey"
                  >
                    By {{ seller.name }}
                  </h1>
                </div>
              </v-col>

              <v-divider vertical class="ma-0 mx-5"></v-divider>

              <v-col cols="4">
                <v-row class="ma-0 pa-0">
                  <!-- Total Products -->
                  <v-col cols="6" class="text-center">
                    <h1 class="text-subtitle-1 font-weight-medium">
                      Total Products
                    </h1>
                    <h1 class="text-subtitle-2 font-weight-regular">
                      {{ productLength }}
                    </h1>
                  </v-col>

                  <!-- Date Joined -->
                  <v-col cols="6" class="text-center">
                    <h1 class="text-subtitle-1 font-weight-medium">
                      Date Joined
                    </h1>
                    <h1 class="text-subtitle-2 font-weight-regular">
                      {{ seller.date_joined }}
                    </h1>
                  </v-col>
                </v-row>
              </v-col>

              <v-divider vertical class="ma-0 mx-5"></v-divider>

              <v-col cols="3" class="ml-auto my-auto">
                <div class="d-flex justify-center">
                  <v-btn
                    class="text-subtitle-1 text-capitalize"
                    color="primary"
                    outlined
                    tile
                    large
                    to="/seller"
                  >
                    <v-icon class="mr-1" size="20">mdi-store</v-icon>
                    Become a seller</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- Product Description -->
        <v-col cols="12" class="mt-1 pt-5 mb-11">
          <v-card class="pa-10" min-height="200" flat>
            <h1 class="text-h5 font-weight-medium text-color-black mb-3">
              Product Descriptions
            </h1>

            <h1 class="text-subtitle-1 text-justify text-color-black">
              {{ description }}
            </h1>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  data() {
    return {
      //  User Data
      userUid: '',
      seller: '',
      productLength: '',

      // Product Data
      product_id: '',
      seller_id: '',
      name: '',
      description: '',
      price: null,
      sale_price: null,
      sale: false,
      category: '',
      article: '',
      image: '',
      sales: 0,
      stock: 0,

      // Courier Data
      courierList: [],

      // User Input
      selectedCourier: '',
      product_quantity: 1,
    }
  },

  computed: {
    salePercentage: function () {
      const percentage = ((this.price - this.sale_price) / this.price) * 100
      return percentage.toFixed() + '% OFF'
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userUid = user.uid
      }
    })

    // Get Product Data From Firebase
    firebase
      .firestore()
      .collection('products')
      .doc(this.$route.params.product_id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.product_id = doc.data().product_id
          this.seller_id = doc.data().seller_id
          this.name = doc.data().name
          this.description = doc.data().description
          this.price = doc.data().price.toFixed(2)
          this.sale_price = doc.data().sale_price.toFixed(2)
          this.sale = doc.data().sale
          this.category = doc.data().category
          this.article = doc.data().article
          this.image = doc.data().image
          this.sales = doc.data().sales
          this.stock = doc.data().stock
        }

        // Get User Info From Firebase
        firebase
          .firestore()
          .collection('users')
          .doc(this.seller_id)
          .get()
          .then((doc) => {
            this.seller = doc.data()
          })

        // Get Seller Info From Firebase
        firebase
          .firestore()
          .collection('seller')
          .doc(this.seller_id)
          .get()
          .then((doc) => {
            this.productLength = doc.data().product.length
          })

        // Get Courier Shipment Settings Info from Firebase
        firebase
          .firestore()
          .collection('seller')
          .doc(this.seller_id)
          .collection('shipmentsettings')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc_ss) => {
              // Get Courier Data From Firebase
              firebase
                .firestore()
                .collection('courier')
                .doc(doc_ss.data().courier_id)
                .get()
                .then((doc_c) => {
                  const list = {
                    courier_id: doc_ss.data().courier_id,
                    rate: doc_ss.data().rate,
                    status: doc_ss.data().status,
                    brand_name: doc_c.data().brand_name,
                    courier_feedback: doc_c.data().courier_feedback,
                    courier_img: doc_c.data().courier_img,
                    overall_rating: doc_c.data().overall_rating,
                    rate: doc_ss.data().rate,
                  }
                  this.courierList.push(list)
                })
            })
          })
      })
  },

  methods: {
    onSelectCourier(courier_id) {
      this.selectedCourier = courier_id
    },

    minusQuantity() {
      if (this.product_quantity <= 1) {
        return (this.product_quantity = 1)
      } else {
        return (this.product_quantity -= 1)
      }
    },

    addQuantity() {
      if (this.product_quantity >= this.stock) {
        return (this.product_quantity = this.stock)
      } else {
        return (this.product_quantity += 1)
      }
    },

    addToCart() {
      // Get Courier Data From Firebase
      firebase
        .firestore()
        .collection('users')
        .doc(this.userUid)
        .collection('cart')
        .doc(this.product_id)
        .set({
          count: this.product_quantity,
          courier_id: this.selectedCourier,
          product_id: this.product_id,
        })
    },
  },
}
</script>

<style scoped>
.text-color-black {
  color: #363636;
}

.text-color-blue {
  color: #1976d2;
}

.text-color-grey {
  color: #808080;
}

.pricetag {
  background-color: #d3d3d31c;
}

.text-hover :hover {
  color: #1976d2;
}

label {
  width: 100%;
}

.card-input-element {
  display: none;
}

.card-input {
  margin: 10px;
  margin-left: 0px;
  margin-top: 1px;
  padding: 00px;
  overflow: hidden;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  box-shadow: none;
}

.card-input:hover {
  cursor: pointer;
  border: 1px solid #1976d2;
}

.card-input-element:checked + .card-input {
  border: 1px solid #1976d2;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .nav-padding {
    padding: 0px 20px;
  }
}

/* Medium devices (landscape tablets, 960px and up) */
@media only screen and (min-width: 960px) {
  .nav-padding {
    padding: 0px 60px;
  }
}

/* Large devices (laptops/desktops, 1264px and up) */
@media only screen and (min-width: 1264px) {
  .nav-padding {
    padding: 0px 180px;
  }
}

/* Extra large devices (large laptops and desktops, 1904px and up) */
@media only screen and (min-width: 1904px) {
  .nav-padding {
    padding: 0px 300px;
  }
}
</style>
