<template>
  <v-app>
    <v-main class="d-none d-sm-flex align-center">
      <v-container class="p-0" fluid>
        <v-card width="450px" class="py-8 px-8 mx-auto" flat>
          <!-- Title -->
          <v-row>
            <v-col class="text-center">
              <h1 class="text-h4"><b>Sign up</b> your account</h1>
            </v-col>
          </v-row>

          <v-card-text>
            <form @submit.prevent="emailSignup()">
              <!-- Name Input -->
              <v-text-field
                v-model="name"
                type="text"
                label="Name"
                prepend-icon="mdi-account"
                dense
                outlined
              ></v-text-field>

              <!-- Email Input -->
              <v-text-field
                v-model="email"
                type="email"
                label="Email"
                prepend-icon="mdi-email"
                required
                dense
                outlined
              >
              </v-text-field>

              <!-- Password Input -->
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                label="Password"
                prepend-icon="mdi-lock"
                dense
                outlined
              ></v-text-field>

              <!-- Confirm Password Input -->
              <v-text-field
                v-model="confirmPassword"
                type="password"
                label="Confirm Password"
                prepend-icon="mdi-lock"
                dense
                outlined
              ></v-text-field>

              <!-- Signup Button -->
              <v-card-actions>
                <v-row>
                  <v-btn
                    type="submit"
                    class="h6 font-weight-bold"
                    color="primary"
                    depressed
                    large
                    block
                  >
                    <span v-if="isLoading == false">Create an account</span>

                    <v-progress-circular
                      v-else
                      :size="20"
                      indeterminate
                      color="white"
                    ></v-progress-circular>
                  </v-btn>
                </v-row>
              </v-card-actions>
            </form>

            <!-- Login Button -->
            <div class="text-center mt-2">
              <h1 class="hyperlink caption">
                Already have an account?
                <NuxtLink to="/buyer/login" replace> Log in. </NuxtLink>
              </h1>
            </div>

            <!-- Term of Use -->
            <div class="mt-5 mb-n1 px-6 text-center">
              <span class="text-caption text-center">
                By signing up, you agree to our
                <a href="#">Terms of Service</a> and
                <a href="#">Privacy Policy</a>
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  layout: 'auth',

  data() {
    return {
      // Password Toggle Button
      showPassword: false,

      // User Input Data
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      checkbox: false,

      // Loading State
      isLoading: false,
    }
  },

  methods: {
    // Sign Up With Email Provider
    async emailSignup() {
      this.isLoading = true
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            // User Info
            firebase.firestore().collection('users').doc(data.user.uid).set({
              user_id: data.user.uid,
              name: this.name,
              date_of_birth: null,
              email_address: this.email,
              phone_number: null,
              shop_name: null,
              gender: null,
              profile_photo:
                'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FLogo.jpg?alt=media&token=921893c3-3134-494b-8f8c-332b10666623',
            })
            data.user.updateProfile({
              displayName: this.name,
            })

            // Buyer Info
            firebase.firestore().collection('buyer').doc(data.user.uid).set({
              buyer_id: data.user.uid,
              shipping: [],
              shopping_cart: [],
            })

            // Seller Info
            firebase.firestore().collection('seller').doc(data.user.uid).set({
              seller_id: data.user.uid,
              product: [],
              order: [],
              report: [], // TBC
            })
          })
          .then(() => {
            this.$router.replace('/')
            this.isLoading = false
          })
      } catch (error) {
        this.isLoading = false
        console.log(error.message)
      }
    },
  },
}
</script>
