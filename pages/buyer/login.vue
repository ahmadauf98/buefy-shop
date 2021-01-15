<template>
  <v-app>
    <v-main class="d-none d-sm-flex align-center">
      <v-container class="p-0" fluid>
        <v-card width="450px" class="py-8 px-8 mx-auto" flat>
          <!-- Title -->
          <v-row>
            <v-col class="text-center">
              <h1 class="text-h4"><b>Log In</b> to account</h1>
            </v-col>
          </v-row>

          <v-card-text>
            <form @submit.prevent="emailLogin()">
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

              <!-- Forgot Password -->
              <div class="text-right mt-n3 mb-3">
                <NuxtLink
                  to="/buyer/forgotpassword"
                  replace
                  class="relative hyperlink caption"
                >
                  Forgot Password?
                </NuxtLink>
              </div>

              <!-- Signin Button -->
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
                    <span v-if="isLoading == false">Login</span>

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

            <!-- Signup Button -->
            <div class="text-center mt-2">
              <h1 class="hyperlink caption">
                Don't have an account?
                <NuxtLink to="/buyer/signup" replace> Sign up. </NuxtLink>
              </h1>
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
      email: '',
      password: '',

      // Loading State
      isLoading: false,
    }
  },

  methods: {
    // Sign In With Email Provider
    async emailLogin() {
      this.isLoading = true
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            firebase
              .firestore()
              .collection('users')
              .doc(data.user.uid)
              .update({
                emailVerified: data.user.emailVerified,
              })
              .then(() => {
                this.$router.replace('/')
                this.isLoading = false
              })
          })
      } catch (error) {
        this.isLoading = false
        console.log(error.message)
      }
    },
  },
}
</script>
