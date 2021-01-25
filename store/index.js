export const strict = false

export const state = () => ({
  // Notifications
  notification: {
    alert: '',
    alertIcon: '',
    alertIconStyle: '',
    colorIcon: '',
    snackbar: false,
    multiLine: true,
    timeout: 3500,
  },

  // List of Products
  products: '',
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
}
