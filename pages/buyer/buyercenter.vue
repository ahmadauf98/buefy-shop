<template>
  <v-app>
    <div>
      <div class="section"><buyerWelcome /></div>

      <div>
        <!-- /////////////////////////////////////// -->
        <v-row>
          <v-col cols="3">
            <buyerSidebar />
          </v-col>

          <v-col cols="9">
            <h1>{{ cart[0] }}pap parapapapapapapappppp</h1>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-app>
</template>

<script>
import buyerSidebar from '@/components/buyerSidebar'
import buyerWelcome from '@/components/buyerWelcome'

import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  components: {
    buyerWelcome,
    buyerSidebar,
    // sellerWelcome,
  },
  data() {
    return {
      name: '',
      product_id: 'kk1jni38',
      cart: [],
    }
  },

  mounted() {
    // Calculate Total From Firebase

    firebase
      .firestore()
      .collection('products')
      // .doc(this.userUid)
      .get()
      .then((querySnapshot) => {
        this.cart = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.cart.push(doc.data().price)
        })
        console.log(this.cart[0])
      })
    // .then((doc) => {
    //   this.cart.push(doc.data().price)
    // })
  },
}
</script>