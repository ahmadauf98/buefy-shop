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
            <v-card class="pa-5 mb-15" flat>
              <p class="text-h5 font-weight-medium text-color-black mb-0">
                Shipment Settings
              </p>

              <p class="text-caption text-color-grey">
                Toggle on the Courier Supported Logistics (CSL) shipping options
                to start selling now!
              </p>

              <v-divider class="mt-n1"></v-divider>

              <div class="d-flex align-center mb-n2">
                <v-icon class="mr-3" color="grey lighten-1" size="40"
                  >mdi-truck</v-icon
                >
                <div class="d-block">
                  <h1 class="text-h6 font-weight-medium ml-1">
                    Shipping Courier
                  </h1>
                  <h1 class="text-caption text-color-grey ml-1">
                    Enable your desired shipping courier below.
                  </h1>
                </div>
              </div>

              <v-divider class="mb-6 ml-14"></v-divider>

              <!-- Poslaju Courier Settings -->
              <v-card class="pa-5 ml-14 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">Pos Laju</h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    hide-details
                    inset
                    readonly
                    v-model="isPoslaju"
                    @change="setCourierStatus('pos_laju', isPoslaju)"
                  ></v-switch>
                </div>

                <div v-show="isPoslaju == true">
                  <v-divider class="mb-6"></v-divider>

                  <div class="d-flex align-center">
                    <h1 class="text-subtitle-2 font-weight-regular mr-10">
                      Postage Fee Rate (RM)
                    </h1>
                    <div class="ml-auto">
                      <v-text-field
                        v-model="poslaju_rate"
                        @change="setCourierRate('pos_laju', poslaju_rate)"
                        class="mb-n5"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </div>
                </div>
              </v-card>

              <!-- ABX Express Courier Settings -->
              <v-card class="pa-5 ml-14 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">
                    ABX Express
                  </h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    hide-details
                    inset
                    v-model="isABX"
                    @change="setCourierStatus('abx_express', isABX)"
                  ></v-switch>
                </div>

                <div v-show="isABX == true">
                  <v-divider class="mb-6"></v-divider>

                  <div class="d-flex align-center">
                    <h1 class="text-subtitle-2 font-weight-regular mr-10">
                      Postage Fee Rate (RM)
                    </h1>
                    <div class="ml-auto">
                      <v-text-field
                        v-model="abx_rate"
                        @change="setCourierRate('abx_express', abx_rate)"
                        class="mb-n5"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </div>
                </div>
              </v-card>

              <!-- City-Link Express Courier Settings -->
              <v-card class="pa-5 ml-14 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">
                    City-Link Express
                  </h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    hide-details
                    inset
                    v-model="isCitylink"
                    @change="setCourierStatus('citylink_express', isCitylink)"
                  ></v-switch>
                </div>

                <div v-show="isCitylink == true">
                  <v-divider class="mb-6"></v-divider>

                  <div class="d-flex align-center">
                    <h1 class="text-subtitle-2 font-weight-regular mr-10">
                      Postage Fee Rate (RM)
                    </h1>
                    <div class="ml-auto">
                      <v-text-field
                        v-model="citylink_rate"
                        @change="
                          setCourierRate('citylink_express', citylink_rate)
                        "
                        class="mb-n5"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </div>
                </div>
              </v-card>

              <!-- GDex Courier Settings -->
              <v-card class="pa-5 ml-14 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">GDex</h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    hide-details
                    inset
                    v-model="isGDex"
                    @change="setCourierStatus('gd_express', isGDex)"
                  ></v-switch>
                </div>

                <div v-show="isGDex == true">
                  <v-divider class="mb-6"></v-divider>

                  <div class="d-flex align-center">
                    <h1 class="text-subtitle-2 font-weight-regular mr-10">
                      Postage Fee Rate (RM)
                    </h1>
                    <div class="ml-auto">
                      <v-text-field
                        v-model="gdex_rate"
                        @change="setCourierRate('gd_express', gdex_rate)"
                        class="mb-n5"
                        type="number"
                        placeholder="0"
                        min="0"
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </div>
                </div>
              </v-card>

              <!-- Ninja Van Courier Settings -->
              <v-card class="pa-5 ml-14 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">Ninja Van</h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    hide-details
                    inset
                    v-model="isNinjavan"
                    @change="setCourierStatus('ninja_van', isNinjavan)"
                  ></v-switch>
                </div>

                <div v-show="isNinjavan == true">
                  <v-divider class="mb-6"></v-divider>

                  <div class="d-flex align-center">
                    <h1 class="text-subtitle-2 font-weight-regular mr-10">
                      Postage Fee Rate (RM)
                    </h1>
                    <div class="ml-auto">
                      <v-text-field
                        v-model="ninjavan_rate"
                        @change="setCourierRate('ninja_van', ninjavan_rate)"
                        class="mb-n5"
                        type="number"
                        placeholder="0"
                        min="0"
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </div>
                </div>
              </v-card>
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
import sellerSidebar from '@/components/sellerSidebar'
import sellerAppHero from '@/components/sellerHero'

export default {
  components: {
    sellerAppHero,
    sellerSidebar,
  },

  data() {
    return {
      // Courier Toggle Button
      isPoslaju: false,
      isABX: false,
      isCitylink: false,
      isGDex: false,
      isNinjavan: false,

      // Courier Fee Rates
      poslaju_rate: null,
      abx_rate: null,
      citylink_rate: null,
      gdex_rate: null,
      ninjavan_rate: null,

      // User Authentication
      user_uid: '',
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user_uid = user.uid

        // Get Poslaju Shipment Setting Info
        firebase
          .firestore()
          .collection('seller')
          .doc(this.user_uid)
          .collection('shipmentsettings')
          .doc('pos_laju')
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.isPoslaju = doc.data().status
              this.poslaju_rate = doc.data().rate.toFixed(2)
            }
          })

        // Get ABX Express Shipment Setting Info
        firebase
          .firestore()
          .collection('seller')
          .doc(this.user_uid)
          .collection('shipmentsettings')
          .doc('abx_express')
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.isABX = doc.data().status
              this.abx_rate = doc.data().rate.toFixed(2)
            }
          })

        // Get Citylink Express Shipment Setting Info
        firebase
          .firestore()
          .collection('seller')
          .doc(this.user_uid)
          .collection('shipmentsettings')
          .doc('citylink_express')
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.isCitylink = doc.data().status
              this.citylink_rate = doc.data().rate.toFixed(2)
            }
          })

        // Get GDex Shipment Setting Info
        firebase
          .firestore()
          .collection('seller')
          .doc(this.user_uid)
          .collection('shipmentsettings')
          .doc('gd_express')
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.isGDex = doc.data().status
              this.gdex_rate = doc.data().rate.toFixed(2)
            }
          })

        // Get Ninja Van Shipment Setting Info
        firebase
          .firestore()
          .collection('seller')
          .doc(this.user_uid)
          .collection('shipmentsettings')
          .doc('ninja_van')
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.isNinjavan = doc.data().status
              this.ninjavan_rate = doc.data().rate.toFixed(2)
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    setCourierStatus(courier_id, status) {
      firebase
        .firestore()
        .collection('seller')
        .doc(this.user_uid)
        .collection('shipmentsettings')
        .doc(courier_id)
        .set(
          {
            courier_id: courier_id,
            status: status,
            rate: 0,
          },
          { merge: true }
        )
    },

    setCourierRate(courier_id, rate) {
      firebase
        .firestore()
        .collection('seller')
        .doc(this.user_uid)
        .collection('shipmentsettings')
        .doc(courier_id)
        .update({
          rate: Number(rate),
        })
    },
  },
}
</script>

<style scoped>
.text-color-black {
  color: #363636;
}

.text-color-grey {
  color: #808080;
}
</style>
