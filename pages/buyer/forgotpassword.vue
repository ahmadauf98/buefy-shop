<template>
  <v-app>
    <v-main class="align-center">
      <v-container class="p-0" fluid>
        <v-card width="450px" class="py-8 px-8 mx-auto" flat>
          <!-- Title -->
          <v-row>
            <v-col class="text-center">
              <h1 class="text-h4"><b>Recover</b> your account</h1>
            </v-col>
          </v-row>

          <v-card-text>
            <form @submit.prevent="passwordReset">
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

              <!-- Submit Button -->
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
                    <span v-if="isLoading == false">Recover</span>

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
                <NuxtLink to="/" class="text-decoration-none">
                  Return Home
                </NuxtLink>
              </h1>
            </div>

            <!-- Signup Button -->
            <div class="text-center mt-2">
              <h1 class="hyperlink caption">
                Don't have an account?
                <NuxtLink to="/buyer/signup" replace>Sign up.</NuxtLink>
              </h1>
            </div>
          </v-card-text>
          <!-- Email Recovery Form -->
        </v-card>
        <!-- Email Recovery Input -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  layout: 'auth',

  data() {
    return {
      // User Input Data
      email: '',

      // Refresh Page
      isLoading: false,
    }
  },

  methods: {
    // Reset User's Password
    async passwordReset() {
      this.isLoading = true
      try {
        await firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.isLoading = false
          })
      } catch (error) {
        console.log(error.message)
      }
    },
  },
}
</script>
