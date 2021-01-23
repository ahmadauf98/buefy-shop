<template>
  <v-card class="pa-5 mb-8" flat>
    <article class="media">
      <div class="media-left">
        <!-- Product Image -->
        <v-img
          :src="product.image"
          :alt="`Image of ${product.name}`"
          width="200"
          height="200"
        ></v-img>
      </div>
      <div class="media-content">
        <div class="content">
          <p v-if="product.sale &amp;&amp; 'true'">
            <strong>{{ product.name }}</strong
            ><br />
            <v-chip color="green" label text-color="white" small> Sale </v-chip>
            <br /><span class="itemCount">{{ product_quantity }}</span> x
            {{ product.sale_price | ringgit }} = RM{{
              (product_quantity * product.sale_price).toFixed(2)
            }}
          </p>
          <p v-else>
            <strong>{{ product.name }}</strong
            ><br /><span class="itemCount">{{ product_quantity }}</span> x
            {{ product.price | ringgit }} = RM{{
              (product_quantity * product.price).toFixed(2)
            }}
          </p>

          <h1 class="text-subtitle-2 font-weight-regular text-color-grey mb-1">
            <v-icon color="grey" class="mr-1">mdi-truck-fast</v-icon>
            Selected Courier:
          </h1>

          <div class="panel panel-default card-input box-width">
            <div class="panel-body">
              <v-card class="pa-2" tile flat>
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
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </div>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
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
            </v-row>
            <a
              class="level-item removeItem pl-4"
              @click="deleteProduct = true"
              title="Remove"
              ><span class="icon is-small"><i class="fa fa-trash-alt"></i></span
            ></a>
          </div>
        </nav>
      </div>
    </article>
    <v-overlay :opacity="opacity" :value="deleteProduct">
      <v-card
        class="mx-auto py-5 px-10 black--text d-block align-center"
        height="300"
        width="700"
        color="white"
        light
        outlined
      >
        <v-btn
          @click="deleteProduct = false"
          disabled
          class="mt-n3 ml-n8"
          dark
          icon
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
        <!-- Title -->
        <div class="text-center">
          <v-icon class="mb-3" color="grey darken-1" size="60"
            >mdi-delete</v-icon
          >
          <h1 class="text-center text-h5 font-weight-medium">
            Are you sure want to delete this product?
          </h1>
        </div>

        <div class="d-flex justify-center mt-8 mb-n8">
          <v-btn
            @click="deleteProduct = false"
            class="px-10 mx-3 text-capitalize"
            color="grey lighten-1"
            height="40"
            depressed
            dark
          >
            Cancel</v-btn
          >
          <v-btn
            class="px-10 mx-3 text-capitalize"
            color="red darken-1"
            @click="onDeleteProduct"
            height="40"
            depressed
            dark
          >
            Delete</v-btn
          >
        </div>
      </v-card>
    </v-overlay>
  </v-card>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  data() {
    return {
      product: [],
      product_quantity: this.item.count,
      userUid: firebase.auth().currentUser.uid,
      courier: [],
      deleteProduct: false,
      opacity: 1,
    }
  },
  name: 'CartProductListItem',
  filters: {
    ringgit: function (value) {
      return `RM${value}`
    },
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    // Get Product Data From Firebase
    firebase
      .firestore()
      .collection('products')
      .doc(this.item.product_id)
      .onSnapshot((item) => {
        this.product = item.data()
      })

    // Get Courier Data From Firebase
    firebase
      .firestore()
      .collection('courier')
      .doc(this.item.courier_id)
      .onSnapshot((item) => {
        this.courier = item.data()
      })

    console.log(this.item.product_id)
  },
  methods: {
    minusQuantity() {
      if (this.product_quantity <= 1) {
        this.deleteProduct = true
      } else {
        firebase
          .firestore()
          .collection('users')
          .doc(this.userUid)
          .collection('cart')
          .doc(this.item.product_id)
          .update({ count: this.product_quantity - 1 })
        return (this.product_quantity -= 1)
      }
    },

    addQuantity() {
      if (this.product_quantity >= this.product.stock) {
        firebase
          .firestore()
          .collection('users')
          .doc(this.userUid)
          .collection('cart')
          .doc(this.item.product_id)
          .update({ count: this.product_quantity })
        return (this.product_quantity = this.product.stock)
      } else {
        firebase
          .firestore()
          .collection('users')
          .doc(this.userUid)
          .collection('cart')
          .doc(this.item.product_id)
          .update({ count: this.product_quantity + 1 })
        return (this.product_quantity += 1)
      }
    },

    onDeleteProduct() {
      firebase
        .firestore()
        .collection('users')
        .doc(this.userUid)
        .collection('cart')
        .doc(this.item.product_id)
        .delete()
    },
  },
}
</script>

<style scoped>
.box-width {
  width: 200px;
}

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
