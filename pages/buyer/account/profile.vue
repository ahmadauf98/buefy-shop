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
              <p class="text-h5 font-weight-medium text-color-black">
                My Profile
              </p>

              <p
                class="text-subtitle-2 font-weight-regular mt-n4 text-color-grey"
              >
                Manage and protect your account
              </p>

              <v-divider class="mt-n1"></v-divider>

              <div class="mb-5">
                <v-row>
                  <!-- User Information -->
                  <v-col cols="7">
                    <!-- Account Verified -->
                    <v-row class="d-flex align-center">
                      <v-col
                        class="text-right text-subtitle-2 font-weight-regular text-color-grey"
                        cols="4"
                        >Account Status</v-col
                      >
                      <v-col cols="8">
                        <div class="d-flex align-center">
                          <h1 class="text-subtitle-2 text-color-red">
                            Not Verified
                          </h1>
                          <v-btn
                            class="ml-3 px-0 text-caption text-decoration-underline font-weight-regular text-capitalize"
                            text
                            color="blue darken-3"
                          >
                            Verify Now</v-btn
                          >
                        </div>
                      </v-col>
                    </v-row>

                    <!-- Name -->
                    <v-row class="d-flex align-center">
                      <v-col
                        class="text-right mt-n2 text-subtitle-2 font-weight-regular text-color-grey"
                        cols="4"
                        >Name
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          dense
                          outlined
                          class="mb-n4"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Email -->
                    <v-row class="d-flex align-center mt-n1">
                      <v-col
                        class="text-right text-subtitle-2 font-weight-regular text-color-grey"
                        cols="4"
                        >Email</v-col
                      >
                      <v-col cols="8">
                        <div class="d-flex align-center">
                          <h1 class="text-subtitle-2 font-weight-regular">
                            ahmadauf98@gmail.com
                          </h1>
                        </div>
                      </v-col>
                    </v-row>

                    <!-- Phone Number -->
                    <v-row class="d-flex align-center">
                      <v-col
                        class="text-right mt-n2 text-subtitle-2 font-weight-regular text-color-grey"
                        cols="4"
                        >Phone Number
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          dense
                          outlined
                          class="mb-n4"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Date of Birth -->
                    <v-row class="d-flex align-center">
                      <v-col
                        class="text-right mt-n2 text-subtitle-2 font-weight-regular text-color-grey"
                        cols="4"
                        >Date of Birth
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          dense
                          outlined
                          class="mb-n4"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Gender -->
                    <v-row class="d-flex align-center">
                      <v-col
                        class="text-right text-subtitle-2 font-weight-regular text-color-grey"
                        cols="4"
                        >Gender</v-col
                      >
                      <v-col cols="8" class="py-0">
                        <div class="d-flex align-center">
                          <v-radio-group
                            class="text-subtitle-2 font-weight-regular py-0"
                            row
                          >
                            <v-radio label="Male" value="Male"></v-radio>
                            <v-radio label="Female" value="Female"></v-radio>
                          </v-radio-group>
                        </div>
                      </v-col>
                    </v-row>

                    <!-- Shopname -->
                    <v-row class="d-flex align-center">
                      <v-col
                        class="text-right mt-n2 text-subtitle-2 font-weight-regular text-color-grey"
                        cols="4"
                        >Shop Name
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          dense
                          outlined
                          class="mb-n4"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Action Button -->
                    <v-row class="d-flex align-center">
                      <v-col cols="4"> </v-col>
                      <v-col cols="8">
                        <v-btn
                          color="primary text-subtitle-1 text-capitalize"
                          depressed
                          >Save</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-divider vertical class="pa-0 ma-0 mx-4"></v-divider>

                  <!-- Profile Photo -->
                  <v-col>
                    <!-- Photo Avatar -->
                    <div class="d-flex justify-center mt-10">
                      <v-avatar size="100">
                        <img
                          src="https://cdn.vuetifyjs.com/images/john.jpg"
                          alt="John"
                        />
                      </v-avatar>
                    </div>

                    <!-- Select Image Button -->
                    <div class="d-flex justify-center">
                      <v-btn
                        class="text-subtitle-2 font-weight-regular text-capitalize mt-4"
                        color="primary"
                        outlined
                        tile
                        >Select Image</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </div>
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
import buyerSidebar from '@/components/buyerSidebar'
import buyerWelcome from '@/components/buyerWelcome'

export default {
  components: {
    buyerWelcome,
    buyerSidebar,
  },

  data() {
    return {
      // User Authentication
      userID: '',
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userID = user.uid
      } else {
        this.$router.replace('/')
      }
    })
  },
}
</script>

<style scoped>
.text-color-grey {
  color: #808080;
}

.text-color-red {
  color: #ff4742;
}

.text-color-green {
  color: #41b883;
}
</style>
