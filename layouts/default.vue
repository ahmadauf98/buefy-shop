<template>
  <v-app class="hero">
    <div class="hero-head">
      <AppHeader></AppHeader>
    </div>
    <div class="hero-body contain background">
      <nuxt class="background" />
    </div>
    <div class="hero-footer">
      <div class="container">
        <p>&copy; Group 2.5 (Software Maintenace & Evolution)</p>
      </div>
    </div>
  </v-app>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: { AppHeader: Header },
}
</script>

<style scoped>
.background {
  background-color: #f5f5f5;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .contain {
    padding: 0px 20px;
  }
}

/* Medium devices (landscape tablets, 960px and up) */
@media only screen and (min-width: 960px) {
  .contain {
    padding: 0px 5px;
  }
}

/* Large devices (laptops/desktops, 1264px and up) */
@media only screen and (min-width: 1264px) {
  .contain {
    padding: 0px 50px;
  }
}

/* Extra large devices (large laptops and desktops, 1904px and up) */
@media only screen and (min-width: 1904px) {
  .contain {
    padding: 0px 300px;
  }
}
</style>

<style lang="stylus">
@require '../node_modules/bulma/css/bulma.min.css'
@require '../node_modules/@fortawesome/fontawesome-free/css/all.css'
@require './css/_transition'
@require './css/_slider'

html
  overflow-y auto

.section
  padding 3rem 0 1.5rem

.hero
  min-height 100vh

  .hero-body
    flex 1

  .hero-footer
    margin-bottom 0.5rem

.is-light
  background-color #f5f5f5
  color #363636

$card-radius = 5px
.is-radius
  border-radius $card-radius

@media (max-width: 600px)
  aside
    width 100% !important
    margin-bottom 10px !important

  .content
    width 100% !important
    grid-template-columns 1fr !important

@media (min-width: 601px) and (max-width: 900px)
  .content
    grid-template-columns repeat(2, 1fr) !important
</style>
