<template>
  <v-app>
    <div>
      <div class="section"><sellerAppHero /></div>

      <div>
        <v-row>
          <v-col cols="3">
            <sellerSidebar />
          </v-col>

          <v-col cols="9"></v-col>
        </v-row>
      </div>
    </div>
  </v-app>
</template>

<script>
import sellerSidebar from '@/components/sellerSidebar'
import sellerAppHero from '@/components/sellerHero'

export default {
  components: {
    sellerAppHero,
    sellerSidebar,
  },
  data() {
    return {}
  },
}
</script>