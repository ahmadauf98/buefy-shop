<template>
  <div class="sidearea">
    <div class="can-toggle demo-rebrand-2 field">
      <input
        class="switch is-rtl"
        id="e"
        type="checkbox"
        name="e"
        v-model="trigger"
      /><label for="e">Only Sale</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSwitch',
  computed: {
    trigger: {
      get() {
        return this.$store.state.product.sale
      },
      set() {
        return this.$store.dispatch('product/switchSale')
      },
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '../../node_modules/bulma-switch/dist/css/bulma-switch.min.css'
</style>
