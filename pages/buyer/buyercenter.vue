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
             
<v-card
              class="mx-auto"
              max-width="900"
              height="500"
              outlined
              position="right"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-center">
                    Buyer Report Information  
                  </v-list-item-title>
                  <v-simple-table>
                    <template v-slot:default>
                      <br />
                      <tbody>
                        <tr>
                          <td>Total Order(RM)</td>
                          <td>{{totalAmount}}  </td>
<!--                         
                        <tr>
                          <td>Most Expensive Item in Shop (RM)            </td>
                          <td>{{expensive}} (RM{{maxVal}})</td>
                        </tr>
                        <tr>
                          <td>Most Cheap Item in Shop (RM)</td>
                          <td>{{cheap}} (RM{{minVal}})</td>
                        </tr>
                         <tr>
                          <td>Most Top Courier </td>
                          <td>  abx_express </td>
                        </tr>
                        <tr>
                          <td>Number of product(s) </td>
                          <td>{{result}} </td>
                        </tr> -->
                        <tr>  
                          <td>Number of ongoing shipment </td>
                          <td>{{on }}  </td>
                        </tr>
                        <tr>
                          <td>Number of shipped order </td>
                          <td> {{ship }} </td>
                        </tr>
                        <tr>
                          <td>Number of cancelled order </td>
                          <td> {{cancel }} </td>
                        </tr>
                        <tr>
                          <td>Number of completed order </td>
                          <td> {{complete }} </td>
                        </tr>
                         
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-list-item-content>
              </v-list-item>
            </v-card>


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
      my_ongoing: [],
      my_shipped: [], //
      my_cancelled: [],
      my_completed: [], //
       on:'',
       ship:'',
       cancel:'',
       complete:'',
      // totalAmount: '',
    }
  },

  mounted() {
    
 
    ///////////////////////////////////////syaf-2////
      firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection('order')
          .where('buyer_id', '==', user.uid)
          .onSnapshot((querySnapshot) => {
            // this.my_products = []
            this.my_ongoing = []
            this.my_shipped = []
            this.my_completed = []
            this.cart = []
            querySnapshot.forEach((doc) => {
              if (doc.exists) {

                

                if(doc.data().status == 'to_ship')
                this.my_ongoing.push(doc.data())

                if(doc.data().status == 'shipping')
                this.my_shipped.push(doc.data())

                if(doc.data().status == 'cancelled')
                this.my_cancelled.push(doc.data())

                if(doc.data().status == 'completed'){
                this.my_completed.push(doc.data())
                this.cart.push(doc.data().total_price)
                }
              }
            })
             
            // this.on =  this.my_shipped;
               this.on = this.my_ongoing.length;
               this.ship = this.my_shipped.length;
               this.cancel = this.my_cancelled.length;
               this.complete = this.my_completed.length;
               console.log(this.cart)
          })
      } else {
        this.$router.replace('/')
      } 
    })
    //////////////////////////////////////
  },

computed: {
    totalAmount: function () {
      var sum = 0
      this.cart.forEach((e) => {
        sum += e
      })
      return sum.toFixed(2)
    },

  },





}
</script>