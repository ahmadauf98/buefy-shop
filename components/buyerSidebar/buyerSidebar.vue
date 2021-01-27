<template>
  <v-card class="mx-auto" width="auto" flat>
    <v-list>
<!-- //////////////////////////////////////////////////////////////////////// -->
      <!-- To Be Shipped -->
      <v-list-group :value="true">
        <template v-slot:activator>
          <v-list-item-icon>
            <span style="font-size: 24px; color: #1976d2">
              <i class="fas fa-shopping-basket"></i>
            </span>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-medium"
            >Order To Ship</v-list-item-title
          >
        </template>

        <v-list-item
          v-for="([title, link], i) in to_ships"
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
 <!-- ////////////////////////////////////////////////////////////////////////      -->
   <!-- To Be Shipped -->
      <v-list-group :value="true">
        <template v-slot:activator>
          <v-list-item-icon>
            <span style="font-size: 24px; color: #1976d2">
              <i class="fas fa-shopping-basket"></i>
            </span>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-medium"
            >Order Shipped</v-list-item-title
          >
        </template>

        <v-list-item
          v-for="([title, link], i) in shippings"
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
<!-- /////////////////////////////////////////////////////////////////////////// -->
      <!-- To Received -->
      <v-list-group :value="true">

          <template v-slot:activator>
           <v-list-item-icon>
            <span style="font-size: 24px; color: #1976d2">
              <i class="fas fa-list-alt"></i>
            </span>
           </v-list-item-icon>
           <v-list-item-title class="font-weight-medium"
            >Order Cancelled</v-list-item-title
           >
          </template>

        <v-list-item
          v-for="([title, link], i) in cancelleds"
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
<!-- ///////////////////////////////////////////////////////////// -->
      <!-- Shipment -->
      <v-list-group :value="true">
        <template v-slot:activator>
          <v-list-item-icon>
            <span style="font-size: 24px; color: #1976d2">
              <i class="fas fa-archive"></i>
            </span>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-medium"
            >Order Completed</v-list-item-title
          >
        </template>

        <v-list-item
          v-for="([title, link], i) in  completeds"
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
<!-- //////////////////////////////////////////////////////// -->
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {

       to_ships: [
        ['To Ship', '/buyer/report/toship'],
        
      ],

      shippings: [
        ['Shipping', '/buyer/report/shipping'],
         
      ],
      cancelleds: [
        ['Cancelled', '/buyer/report/cancelled'],
       
      ],
      completeds: [
        ['Completed', '/buyer/report/completedbuyer'],
        
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
