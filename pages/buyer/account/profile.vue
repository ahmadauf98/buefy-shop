<template>
  <v-app>
    <div>
      <!-- Notifications -->
      <notifications />

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
                          <h1
                            v-if="emailVerified === true"
                            class="text-subtitle-2 text-color-green"
                          >
                            Verified
                          </h1>
                          <h1
                            v-if="emailVerified === false"
                            class="text-subtitle-2 text-color-red"
                          >
                            Not Verified
                          </h1>
                          <v-btn
                            v-if="emailVerified === false"
                            class="ml-3 px-0 text-caption text-decoration-underline font-weight-regular text-capitalize"
                            text
                            color="blue darken-3"
                            @click="emailVerification()"
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
                          v-model="name"
                          placeholder="Please insert fullname"
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
                            {{ email }}
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
                          v-model="phoneNumber"
                          placeholder="Please insert your phone number"
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
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="birthday_Format"
                              class="mb-n4"
                              placeholder="Select D.O.B"
                              v-bind="attrs"
                              v-on="on"
                              dense
                              outlined
                              readonly
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            v-model="dob"
                            :max="new Date().toISOString().substr(0, 10)"
                            no-title
                            min="1950-01-01"
                            @change="save"
                          ></v-date-picker>
                        </v-menu>
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
                            v-model="gender"
                            class="text-subtitle-2 font-weight-regular py-0"
                            row
                          >
                            <v-radio label="Male" value="male"></v-radio>
                            <v-radio label="Female" value="female"></v-radio>
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
                          v-model="shopName"
                          placeholder="Please insert shop name"
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
                          @click="validData()"
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
                          v-if="!isFileUploaded"
                          :src="profile_photo"
                          alt="..."
                        />

                        <template v-else>
                          <v-overlay absolute opacity="0" value="true">
                            <v-progress-circular
                              indeterminate
                              color="primary"
                            ></v-progress-circular>
                          </v-overlay>
                        </template>
                      </v-avatar>
                    </div>

                    <!-- Select Image Button -->
                    <div class="d-flex justify-center">
                      <v-btn
                        class="text-subtitle-2 font-weight-regular text-capitalize mt-4"
                        color="primary"
                        @click="choosePhoto()"
                        :disabled="isFileUploaded"
                        outlined
                        tile
                        >Select Image</v-btn
                      >

                      <input
                        type="file"
                        ref="photoChoosen"
                        style="display: none"
                        @change="onFileSelected"
                        accept="image/*"
                      />
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
import 'firebase/storage'
import buyerSidebar from '@/components/buyerSidebar'
import buyerWelcome from '@/components/buyerWelcome'
import notifications from '~/components/notifications'
import moment from 'moment'

export default {
  components: {
    buyerWelcome,
    buyerSidebar,
    notifications,
  },

  data() {
    return {
      // User Authentication
      userID: '',

      // User Data
      emailVerified: '',
      name: '',
      email: '',
      phoneNumber: '',
      dob: null,
      dob_d: null,
      gender: null,
      shopName: '',
      profile_photo: '',

      // Profile Picture
      selectedFile: '',
      isFileUploaded: false,
      uploadPercentage: null,

      // Calendar
      menu: false,
    }
  },

  computed: {
    // Formating Date (YYYY-MM-DD) to (DD MMMM YYYY)
    birthday_Format: function () {
      if (this.dob == null) {
        return null
      } else {
        return moment(this.dob, 'YYYY-MM-DD').format('DD MMMM YYYY')
      }
    },

    // Formating Date (DD MMMM YYYY) to (YYYY-MM-DD)
    birthday_Format_D: function () {
      if (this.dob_d == null) {
        return null
      } else {
        return moment(this.dob_d, 'DD MMMM YYYY').format('YYYY-MM-DD')
      }
    },
  },

  // Calendar Data
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userID = user.uid

        firebase
          .firestore()
          .collection('users')
          .doc(this.userID)
          .get()
          .then((doc) => {
            this.emailVerified = doc.data().emailVerified
            this.name = doc.data().name
            this.email = doc.data().email_address
            this.phoneNumber = doc.data().phone_number
            this.dob_d = doc.data().date_of_birth
            this.dob = this.birthday_Format_D
            this.gender = doc.data().gender
            this.shopName = doc.data().shop_name
            this.profile_photo = doc.data().profile_photo
          })
      } else {
        this.$router.replace('/')
      }
    })
  },

  methods: {
    // Birthday Selection
    save(date) {
      this.$refs.menu.save(date)
    },

    // Send Email Verification to User's Email
    async emailVerification() {
      try {
        await firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            this.$store.commit('SET_NOTIFICATION', {
              alert:
                'Email verification sent! Please verify your email and login again.',
              alertIcon: 'mdi-email',
              alertIconStyle: 'mr-2 align-self-top',
              colorIcon: 'green darken-1',
              snackbar: true,
            })
          })
      } catch (error) {
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },

    // To validate the phone number
    validPhone:function(phoneNumber) {
      console.log('test function');
      var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      return re.test(phoneNumber);
    },

    async validData() {
      console.log("fyp xsoap lagi")
      try {

        //validate whether phone number is valid or not
        if (!this.validPhone(this.phoneNumber)) {
        this.$store.commit('SET_NOTIFICATION', {
          alert: 'Please insert a valid phone number.',
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,})

        
        }else {
          this.update()
        }
        
      } catch (error) {
        console.log(error.message)
        this.$store.commit('SET_NOTIFICATION', {
            alert: error.message,
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,})
      }
    },

    // Upload Profile Photo
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
        this.$store.commit('SET_NOTIFICATION', {
          alert: 'Error format, please try again.',
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },

    onUploadProfilePhoto() {
      var metadata = {
        contentType: this.selectedFile.type,
      }

      var storageRef = firebase
        .storage()
        .ref()
        .child('profilePhotos/' + this.selectedFile.name)

      var uploadTask = storageRef.put(this.selectedFile, metadata)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + Math.round(progress) + '% done')
          this.uploadPercentage = Math.round(progress)
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              // console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              // console.log('Upload is running')
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

        () => {
          const storageRef = firebase
            .storage()
            .ref()
            .child('profilePhotos/' + this.selectedFile.name)

          storageRef.getDownloadURL().then((url) => {
            this.profile_photo = url
          })

          console.log('File successfully uploaded.')
          this.isFileUploaded = false
        }
      )
    },

    // Update User's Profile Information
    async update() {
      try {
        // Update User Token
        await firebase.auth().currentUser.updateProfile({
          displayName: this.name,
          email: this.email,
          photoURL: this.profile_photo,
          emailVerified: this.emailVerified,
        })

        // Update User Realtime Database
        await firebase
          .firestore()
          .collection('users')
          .doc(this.userID)
          .update({
            emailVerified: this.emailVerified,
            name: this.name,
            email_address: this.email,
            phone_number: this.phoneNumber,
            date_of_birth: this.birthday_Format,
            gender: this.gender,
            shop_name: this.shopName,
            profile_photo: this.profile_photo,
          })
          .then(() => {
            this.$store.commit('SET_NOTIFICATION', {
              alert: 'All your information has been updated.',
              alertIcon: 'mdi-cloud-check',
              alertIconStyle: 'mr-2 align-self-top',
              colorIcon: 'green darken-1',
              snackbar: true,
            })
          })
      } catch (error) {
        if (error.code == 'invalid-argument') {
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Please complete all form.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else {
          this.$store.commit('SET_NOTIFICATION', {
            alert: error.message,
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        }
      }
    },
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
