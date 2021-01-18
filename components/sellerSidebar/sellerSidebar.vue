<template>
  <v-card class="mx-auto" width="auto" flat>
    <v-list>
      <!-- Product -->
      <v-list-group :value="true">
        <template v-slot:activator>
          <v-list-item-icon>
            <span style="font-size: 24px; color: #1976d2">
              <i class="fas fa-shopping-basket"></i>
            </span>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-medium"
            >Product</v-list-item-title
          >
        </template>

        <v-list-item
          v-for="([title, link], i) in products"
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

      <!-- Order -->
      <v-list-group :value="true">
        <template v-slot:activator>
          <v-list-item-icon>
            <span style="font-size: 24px; color: #1976d2">
              <i class="fas fa-list-alt"></i>
            </span>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-medium"
            >Order</v-list-item-title
          >
        </template>

        <v-list-item
          v-for="([title, link], i) in orders"
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

      <!-- Shipment -->
      <v-list-group :value="true">
        <template v-slot:activator>
          <v-list-item-icon>
            <span style="font-size: 24px; color: #1976d2">
              <i class="fas fa-archive"></i>
            </span>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-medium"
            >Shipment</v-list-item-title
          >
        </template>

        <v-list-item
          v-for="([title, link], i) in shipments"
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
      products: [
        ['My Products', '/seller/product/myproducts'],
        ['Add Product', '/seller/product/addproduct'],
      ],
      orders: [
        ['My Orders', '/seller/order/myorders'],
        ['Cancellation', '/seller/order/ordercancellation'],
      ],
      shipments: [
        ['My Shipment', '/seller/shipment/myshipment'],
        ['Shipment Settings', '/seller/shipment/shipmentsettings'],
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
