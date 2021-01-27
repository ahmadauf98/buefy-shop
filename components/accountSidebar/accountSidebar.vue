<template>
  <v-card class="mx-auto" width="auto" flat>
    <v-list>
      <!-- My Account -->
      <v-list-group :value="true">
        <template v-slot:activator>
          <v-list-item-icon>
            <span style="font-size: 24px; color: #1976d2">
              <i class="fas fa-user"></i>
            </span>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-medium"
            >My Account</v-list-item-title
          >
        </template>

        <v-list-item
          v-for="([title, link], i) in accounts"
          :key="i"
          link
          class="px-15"
          :to="link"
        >
          <v-list-item-title
            v-text="title"
            class="px-3 text-subtitle-2 font-weight-regular text-color-black"
          ></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      accounts: [
        ['Profile', '/account/profile'],
        ['Change Password', '/account/changepassword'],
      ],
    }
  },
}
</script>

<style scoped>
.text-color-black {
  color: #363636;
}

.font-title {
  color: #1976d2;
}

.text-color-grey {
  color: grey;
}
</style>
