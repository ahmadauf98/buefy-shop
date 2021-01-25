<template>
  <v-app>
    <v-main class="d-none d-sm-flex align-center">
      <v-container class="p-0" fluid>

        <!-- notification -->
        <notifications/>

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
                type="text"
                label="Email"
                prepend-icon="mdi-email"
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
import notifications from '~/components/notifications'

export default {
  layout: 'auth',

  components:{
    notifications,
  },

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

    // To validate email
    validEmail:function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },

    // To validate the password
    validPass:function(password) {
      // console.log('test function');
      var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      return re.test(password);
    },

    // Sign In With Email Provider
    async emailLogin() {
      this.isLoading = true

      try {

        //validate whether email is empty or not
        if (!this.email) {
        this.isLoading = false
              this.$store.commit('SET_NOTIFICATION', {
                alert: 'Please insert an email.',
                alertIcon: 'mdi-alert-circle',
                alertIconStyle: 'mr-2 align-self-top',
                colorIcon: 'red darken-1',
                snackbar: true,})
        
        //validate whether email is in valid template
        }else if (!this.validEmail(this.email)) {
        this.isLoading = false
        this.$store.commit('SET_NOTIFICATION', {
          alert: 'Please insert a valid email.',
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,})

        //validate whether password is empty or not
        }else if (!this.password) {
        this.isLoading = false
              this.$store.commit('SET_NOTIFICATION', {
                alert: 'Please insert a password.',
                alertIcon: 'mdi-alert-circle',
                alertIconStyle: 'mr-2 align-self-top',
                colorIcon: 'red darken-1',
                snackbar: true,})
        
        }else {
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
        }
        
      } catch (error) {
        this.isLoading = false
        console.log(error.message)
        this.$store.commit('SET_NOTIFICATION', {
            alert: error.message,
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,})
      }
    },
  },
}
</script>
