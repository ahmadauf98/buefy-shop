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
import notifications from '~/components/notifications'
import moment from 'moment'


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


    //To validate email
    validEmail:function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },

    //To validate the password
    validPass:function(password) {
      // console.log('test function');
      var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      return re.test(password);
    },

    // Sign Up With Email Provider
    async emailSignup() {
      this.isLoading = true
      try {

        //validate whether name is empty or not
        if (!this.name) {

          this.isLoading = false
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Please insert your name.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,})

        //validate whether email is empty or not
        }else if (!this.email) {
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
        
        //validate whether password is in valid template
        }else if (!this.validPass(this.password)) {
        this.isLoading = false
        this.$store.commit('SET_NOTIFICATION', {
          alert: 'Password is invalid. Your password must be 8 characters long and contain atleast 1 Uppercase and 1 Lowercase.',
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,})

        //validate whether password is the same or not
        }else if (this.password != this.confirmPassword) {
        this.isLoading = false
              this.$store.commit('SET_NOTIFICATION', {
                alert: 'Your password must be the same.',
                alertIcon: 'mdi-alert-circle',
                alertIconStyle: 'mr-2 align-self-top',
                colorIcon: 'red darken-1',
                snackbar: true,})
        
        }else {

          //fill in data in database
          await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((data) => {

            // User Info
            firebase
              .firestore()
              .collection('users')
              .doc(data.user.uid)
              .set({
                user_id: data.user.uid,
                name: this.name,
                date_of_birth: null,
                email_address: this.email,
                phone_number: null,
                shop_name: null,
                gender: null,
                date_joined: moment().format('DD MMM YYYY'),
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

            // Shipment Settings Info
            const courier = [
              { courier_id: 'abx_express' },
              { courier_id: 'citylink_express' },
              { courier_id: 'gd_express' },
              { courier_id: 'ninja_van' },
              { courier_id: 'pos_laju' },
            ]

            courier.forEach((doc) => {
              if (doc.courier_id == 'pos_laju') {
                firebase
                  .firestore()
                  .collection('seller')
                  .doc(data.user.uid)
                  .collection('shipmentsettings')
                  .doc(doc.courier_id)
                  .set({
                    courier_id: doc.courier_id,
                    status: true,
                    rate: 0,
                  })
              } else {
                firebase
                  .firestore()
                  .collection('seller')
                  .doc(data.user.uid)
                  .collection('shipmentsettings')
                  .doc(doc.courier_id)
                  .set({
                    courier_id: doc.courier_id,
                    status: false,
                    rate: 0,
                  })
              }
            })
          })
          .then(() => {
            this.$router.replace('/')
            this.isLoading = false
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
