<template>
  <div>
    <v-snackbar
      v-show="notification.alert != '' || notification.alert != null"
      v-model="notification.snackbar"
      :timeout="notification.timeout"
      class="mt-5"
      :color="notification.colorIcon"
      dark
      top
    >
      <div class="d-flex justify-center align-center">
        <v-icon :class="notification.alertIconStyle" color="white">{{
          notification.alertIcon
        }}</v-icon>
        <span class="font-weight-medium text-color-white">{{
          notification.alert
        }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // Fetch Notification Data from Vuex
  computed: {
    ...mapState(['notification']),
  },
}
</script>

<style scoped>
.text-color-white {
  color: white;
}
</style>
