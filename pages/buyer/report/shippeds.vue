<template>
  <v-app>
    <div>
      <div class="section"><buyerWelcome /></div>

      <div>
        <v-row>
          <v-col cols="3">
            <buyerSidebar />
          </v-col>

          <v-col cols="9"></v-col>
        </v-row>
      </div>
    </div>
  </v-app>
</template>

<script>
import buyerSidebar from '@/components/buyerSidebar'
import buyerWelcome from '@/components/buyerWelcome'

export default {
  components: {
    buyerWelcome,
    buyerSidebar,
  },
  data() {
    return {}
  },
}
</script>
