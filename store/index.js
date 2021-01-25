export const strict = false

export const state = () => ({
  // Notifications
  notification: {
    alert: '',
    alertIcon: '',
    alertIconStyle: '',
    colorIcon: '',
    snackbar: false,
    timeout: 1800,
  },

  // List of Products
  products: '',

  // Checkout
  isStripeCardCompleted: false,
  status: undefined,
  isLoading: false,
  success: false,
  actualStep: 0,
  cart_num: 0,

  // Shipping Information
  shippingInformation: [],
  cart: [],
})

export const mutations = {
  SET_NOTIFICATION(
    state,
    { alert, alertIcon, alertIconStyle, colorIcon, snackbar }
  ) {
    state.notification.alert = alert
    state.notification.alertIcon = alertIcon
    state.notification.alertIconStyle = alertIconStyle
    state.notification.colorIcon = colorIcon
    state.notification.snackbar = snackbar
  },

  SET_PRODUCTS(state, products) {
    state.products = products
  },

  // Checkout
  SET_IS_STRIPE_CARD_COMPLETED: (state, bool) => {
    state.isStripeCardCompleted = bool
  },

  SET_IS_LOADING: (state, bool) => {
    state.isLoading = bool
  },

  SET_STATUS: (state, payload) => {
    state.status = payload
  },

  SET_SUCCESS: (state, bool) => {
    state.success = bool
  },

  SET_ACTUAL_STEP: (state, num) => {
    state.actualStep = num
  },

  SET_CART_NUM: (state, num) => {
    state.cart_num = num
  },

  SET_SHIPPING_INFO: (state, info) => {
    state.shippingInformation = info
  },
  
  SET_CART: (state, info) => {
    state.cart = info
  },
}
