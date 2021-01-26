<template>
  <v-app>
    <div>
      <div class="section"><sellerAppHero /></div>

      <div>
        <v-row>
          <v-col cols="3" class="mb-8">
            <sellerSidebar />
          </v-col>

          <v-col cols="9" class="mb-8">
            <v-card class="pa-5" flat>
              <p class="text-h5 font-weight-medium text-color-black">
                <strong>Add</strong> a New Product
              </p>

              <v-divider class="mt-n1"></v-divider>

              <v-stepper v-model="step" vertical class="elevation-0">
                <!-- Set name and description of the product -->
                <v-stepper-step :complete="step > 1" step="1">
                  <span class="text-color-black">Name your product</span>
                  <small>Elaborate more in product description.</small>
                </v-stepper-step>

                <v-stepper-content step="1">
                  <v-card class="mb-12" flat height="220px">
                    <v-text-field
                      v-model="name"
                      class="mt-2"
                      label="Product Name"
                      outlined
                    >
                    </v-text-field>

                    <v-textarea
                      v-model="description"
                      outlined
                      class="mb-2"
                      label="Product Description"
                    ></v-textarea>
                  </v-card>
                  <v-btn
                    color="primary"
                    :disabled="name == '' || description == ''"
                    @click="step = 2"
                  >
                    Next
                  </v-btn>
                </v-stepper-content>

                <!-- Choose category and stock of product -->
                <v-stepper-step :complete="step > 2" step="2">
                  <span class="text-color-black"
                    >Choose category and stock</span
                  >
                </v-stepper-step>

                <v-stepper-content step="2">
                  <v-card class="mb-12" flat height="210px">
                    <v-select
                      v-model="article"
                      class="mt-2"
                      :items="productCategory"
                      label="Product Category"
                      outlined
                    ></v-select>

                    <v-select
                      v-model="category"
                      :items="genderCategory"
                      label="Gender Category"
                      outlined
                    ></v-select>

                    <v-text-field
                      v-model="stock"
                      label="Product Stock"
                      type="number"
                      min="1"
                      onKeyDown="return false"
                      outlined
                    >
                    </v-text-field>
                  </v-card>
                  <v-btn
                    color="primary"
                    :disabled="
                      article == '' ||
                      category == '' ||
                      stock != Number(stock) ||
                      stock == 0
                    "
                    @click="step = 3"
                  >
                    Next
                  </v-btn>
                  <v-btn text @click="step = 1"> Back </v-btn>
                </v-stepper-content>

                <!-- Set price and sale of the product -->
                <v-stepper-step :complete="step > 3" step="3">
                  <span class="text-color-black">Set Price and Sale</span>
                </v-stepper-step>

                <v-stepper-content step="3">
                  <v-card class="mb-12" flat height="180px">
                    <v-text-field
                      v-model="price"
                      class="mt-2"
                      label="Product Price"
                      outlined
                    >
                    </v-text-field>

                    <v-text-field
                      v-model="sale_price"
                      label="Sale Price"
                      outlined
                    >
                    </v-text-field>

                    <v-switch
                      v-model="sale"
                      class="ml-3 mt-n2"
                      :disabled="
                        sale_price == null ||
                        sale_price == '' ||
                        sale_price != Number(sale_price)
                      "
                      inset
                      label="Sale"
                    ></v-switch>
                  </v-card>
                  <v-btn
                    color="primary"
                    :disabled="
                      price == null ||
                      price != Number(price) ||
                      price == '' ||
                      sale_price == null ||
                      sale_price != Number(sale_price) ||
                      sale_price == ''
                    "
                    @click="step = 4"
                  >
                    Next
                  </v-btn>
                  <v-btn text @click="step = 2"> Back </v-btn>
                </v-stepper-content>

                <!-- Add product Image -->
                <v-stepper-step step="4">
                  <span class="text-color-black">Add Product Image</span>
                </v-stepper-step>
                <v-stepper-content step="4">
                  <v-card class="mb-12" flat height="180px">
                    <div>
                      <!-- If product image empty -->
                      <v-avatar
                        v-if="image == ''"
                        height="200px"
                        width="200px"
                        rounded
                      >
                        <v-card
                          @click="choosePhoto"
                          outlined
                          color="#53a9ff"
                          class="d-flex justify-center align-center"
                          height="200px"
                          width="200px"
                        >
                          <span
                            v-if="!isFileUploaded"
                            style="font-size: 56px; color: white"
                          >
                            <i class="far fa-plus-square"></i>
                          </span>

                          <v-progress-circular
                            v-else
                            indeterminate
                            color="white"
                          ></v-progress-circular>
                        </v-card>
                        <input
                          type="file"
                          ref="photoChoosen"
                          style="display: none"
                          @change="onFileSelected"
                          accept="image/*"
                        />
                      </v-avatar>

                      <!-- If product image !empty -->
                      <v-avatar v-else height="200px" width="200px" rounded>
                        <v-card
                          @click="choosePhoto"
                          outlined
                          class="d-flex justify-center align-center"
                          height="200px"
                          width="200px"
                        >
                          <v-img
                            v-if="!isFileUploaded"
                            :src="image"
                            aspect-ratio="1.7"
                            height="200px"
                            width="200px"
                          ></v-img>

                          <template v-else>
                            <v-overlay absolute opacity="0" value="true">
                              <v-progress-circular
                                indeterminate
                                color="white"
                              ></v-progress-circular>
                            </v-overlay>
                          </template>

                          <input
                            type="file"
                            ref="photoChoosen"
                            style="display: none"
                            @change="onFileSelected"
                            accept="image/*"
                          />
                        </v-card>
                      </v-avatar>
                    </div>
                  </v-card>
                  <v-btn
                    color="primary"
                    :disabled="image == ''"
                    @click="addProduct()"
                  >
                    Finish
                  </v-btn>
                  <v-btn text @click="step = 3"> Back </v-btn>
                </v-stepper-content>
              </v-stepper>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import sellerSidebar from '@/components/sellerSidebar'
import sellerAppHero from '@/components/sellerHero'

export default {
  components: {
    sellerAppHero,
    sellerSidebar,
  },
  data() {
    return {
      // Selection Item
      productCategory: ['All', 'Hats', 'Jacket', 'Shirt', 'Shoe', 'Sweater'],
      genderCategory: ['Men', 'Women', 'Others'],
      step: 1,

      // Add Product Input Data
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

      // Upload Product Image
      selectedFile: null,
      isFileUploaded: false,
      uploadPercentage: null,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.seller_id = user.uid
      } else {
        this.$router.replace('/')
      }
    })
  },

  methods: {
    // Choose product image from local storage
    choosePhoto() {
      this.$refs.photoChoosen.click()
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0]

      // Check Format of Picture
      if (
        this.selectedFile.type === 'image/png' ||
        this.selectedFile.type === 'image/jpg' ||
        this.selectedFile.type === 'image/jpeg' ||
        this.selectedFile.type === 'image/svg+xml' ||
        this.selectedFile.tupe === 'image/svg'
      ) {
        this.onUploadProfilePhoto()
      } else {
        console.log('Error format, please try again.')
      }
    },

    // Add product image to storage
    onUploadProfilePhoto() {
      var metadata = {
        contentType: this.selectedFile.type,
      }
      var storageRef = firebase
        .storage()
        .ref()
        .child('product_image/' + this.selectedFile.name)
      var uploadTask = storageRef.put(this.selectedFile, metadata)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + Math.round(progress) + '% done')
          this.uploadPercentage = Math.round(progress)
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          }
          this.isFileUploaded = true
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('storage/unauthorized')
              break
            case 'storage/canceled':
              console.log('storage/canceled')
              break
            case 'storage/unknown':
              console.log('storage/unknown')
              break
          }
          this.isFileUploaded = false
        },
        // Get product image link from storage
        (complete) => {
          const storageRef = firebase
            .storage()
            .ref()
            .child('product_image/' + this.selectedFile.name)
          const url = storageRef.getDownloadURL().then((url) => {
            this.image = url
          })
          console.log('Image successfully uploaded.')
          this.isFileUploaded = false
        }
      )
    },

    // Add product details to firestore
    async addProduct() {
      var uniqid = require('uniqid')
      this.product_id = uniqid()
      try {
        firebase
          .firestore()
          .collection('products')
          .doc(this.product_id)
          .set({
            product_id: this.product_id,
            seller_id: this.seller_id,
            name: this.name,
            description: this.description,
            price: Number(this.price),
            sale_price: Number(this.sale_price),
            sale: this.sale,
            category: this.category,
            article: this.article,
            image: this.image,
            sales: Number(this.sales),
            stock: Number(this.stock),
          })
          .then(() => {
            firebase
              .firestore()
              .collection('products')
              .doc(this.product_id)
              .update({
                product: firebase.firestore.FieldValue.arrayUnion(
                  this.product_id
                ),
              })
          })
          .then(() => {
            this.$router.push('myproducts')
          })
      } catch (error) {
        console.log(error.message)
      }
    },
  },
}
</script>

<style scoped>
.text-color-black {
  color: #363636;
}
</style>
