<template>
  <v-app>
    <div>
      <div class="section"></div>
    </div>

    <div>
      <v-row>
        <!-- Brand Courier Total Rating -->
        <v-col cols="12" class="mt-15 pt-5">
          <v-card class="pa-10" min-height="200" flat>
            <v-row>
              <!-- Brand Courier Image -->
              <v-col cols="2">
                <v-img
                  class="ml-auto mb-1"
                  aspect-ratio="1.7"
                  height="150"
                  width="150"
                  :src="courier_img"
                  alt="..."
                ></v-img>
              </v-col>

              <!-- Brand Courier Rating Info -->
              <v-col cols="7">
                <div class="pl-5">
                  <h1 class="text-h4 font-weight-bold text-color-black">
                    {{ brand_name }} Reviews
                  </h1>

                  <h1 class="text-h5 font-weight-bold text-color-black">
                    <span class="text-h4 font-weight-bold text-color-blue">{{
                      overall_rating
                    }}</span>
                    out of 10
                  </h1>

                  <v-rating
                    v-model="courierRating"
                    background-color="grey"
                    color="yellow darken-2"
                    dense
                    half-increments
                    readonly
                    length="5"
                    size="32"
                  ></v-rating>

                  <h1 class="text-h5 font-weight-medium text-color-black mt-1">
                    {{ courierPerformance }}
                  </h1>
                </div>
              </v-col>

              <!-- Button Review -->
              <v-col cols="3" class="d-flex justify-end">
                <v-btn
                  class="text-subtitle-1 text-capitalize"
                  color="primary"
                  depressed
                  @click="onRoute()"
                  >Review Courier</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" class="mt-1 pt-5 mb-10">
          <v-card class="px-15 py-10" min-height="200" flat>
            <h1 class="text-h5 font-weight-medium text-color-black mb-5">
              Customer Feedback
            </h1>

            <v-row>
              <v-col
                v-for="(feedback, index) in courier_feedback"
                :key="index"
                cols="12"
              >
                <v-card class="px-10 py-5" min-height="150" outlined>
                  <!-- Customer Name and Date -->
                  <div class="d-flex align-center">
                    <h1
                      v-if="feedback.post_name != ''"
                      class="text-subtitle-1 font-weight-bold text-color-black"
                    >
                      {{ feedback.post_name }}
                    </h1>

                    <h1
                      v-else
                      class="text-subtitle-1 font-weight-bold text-color-black"
                    >
                      Unknown Name
                    </h1>

                    <h1
                      class="text-subtitle-2 font-weight-regular text-color-grey ml-auto"
                    >
                      {{ feedback.post_date }}
                    </h1>
                  </div>

                  <!-- Customer Feedback -->
                  <h1 class="text-subtitle-1 mt-2">
                    {{ feedback.post_feedback }}
                  </h1>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  data() {
    return {
      // Courier Data
      courier_id: '',
      brand_name: '',
      courier_feedback: [],
      courier_img: '',
      overall_rating: null,
    }
  },

  computed: {
    courierRating: function () {
      const rating = this.overall_rating / 2
      return Number(rating.toFixed(1))
    },

    courierPerformance: function () {
      if (this.overall_rating <= 3) {
        return 'Poor Performance'
      } else if (this.overall_rating > 3 || this.overall_rating <= 7) {
        return 'Average Perfomance'
      } else {
        return 'Good Perfomance'
      }
    },
  },

  mounted() {
    // Get Courier Data From Firebase
    firebase
      .firestore()
      .collection('courier')
      .doc(this.$route.params.courier_id)
      .onSnapshot((doc) => {
        this.courier_id = doc.data().courier_id
        this.brand_name = doc.data().brand_name
        this.courier_feedback = doc.data().courier_feedback
        this.courier_img = doc.data().courier_img
        this.overall_rating = Number(doc.data().overall_rating)
      })
  },

  methods: {
    onRoute() {
      switch (this.courier_id) {
        case 'abx_express':
          location.href = 'https://www.trackingmore.com/evaluate-abx-my.html'
          break
        case 'citylink_express':
          location.href =
            'https://www.trackingmore.com/evaluate-citylink-my.html'
          break
        case 'gd_express':
          'https://www.trackingmore.com/evaluate-gdex-my.html'
          break
        case 'ninja_van':
          location.href =
            'https://www.trackingmore.com/evaluate-ninjavan-my.html'
          break
        case 'pos_laju':
          location.href =
            'https://www.trackingmore.com/evaluate-poslaju-my.html'
          break
      }
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

.text-color-blue {
  color: #1976d2;
}

.text {
  text-decoration: none;
}

.text-capitalize {
  text-transform: capitalize;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .contain {
    padding: 0px 20px;
  }
}

/* Medium devices (landscape tablets, 960px and up) */
@media only screen and (min-width: 960px) {
  .contain {
    padding: 0px 5px;
  }
}

/* Large devices (laptops/desktops, 1264px and up) */
@media only screen and (min-width: 1264px) {
  .contain {
    padding: 0px 50px;
  }
}

/* Extra large devices (large laptops and desktops, 1904px and up) */
@media only screen and (min-width: 1904px) {
  .contain {
    padding: 0px 275px;
  }
}
</style>
