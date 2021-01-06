<template>
  <div class="card is-radius">
    <div class="card-image">
      <NuxtLink
        exact="exact"
        :to="{ name: 'products-slug', params: { slug: `${slug}` } }"
      >
        <picture class="image">
          <source
            :data-srcset="`./../../products/${item.img}.webp`"
            type="image/webp"
          />
          <img
            class="lazyload"
            :data-srcset="`./../../products/${item.img}.png`"
            :alt="`Image of ${item.name}`"
          />
        </picture>
      </NuxtLink>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <NuxtLink
            exact="exact"
            :to="{ name: 'products-slug', params: { slug: `${slug}` } }"
          >
            <p class="title is-5">{{ item.name }}</p>
            <p class="item-price">{{ item.price | usdollar }}</p>
          </NuxtLink>
        </div>
        <div class="media-right">
          <p class="field">
            <button
              class="button icon is-large add"
              @click="addItem(item)"
              aria-label="Add to cart"
            >
              <span class="fa-stack"
                ><i class="fa fa-circle fa-stack-2x"></i
                ><i class="fa fa-cart-plus fa-stack-1x fa-inverse"></i
              ></span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { slug } from '@/helpers'
const { mapActions } = createNamespacedHelpers('cart')

export default {
  name: 'Card',
  filters: {
    usdollar: (value) => `$${value}`,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    slug() {
      return slug(this.item.name)
    },
  },
  methods: {
    ...mapActions(['addItem']),
  },
}
</script>

<style scoped lang="stylus">
.card
  display flex
  flex-direction column
  justify-content center
  align-items center

  .image
    img
      padding-top 1.5rem

  .card-content
    width 100%

  .title,
  .subtitle
    color inherit
  .title
    margin-bottom .5rem
  .button
    border 0
    padding 0

    .fa-circle
      transition color .5s

    .fa-cart-plus
      font-size 1.4rem

    &:hover
      .fa-circle
        color #209cee

    &.icon
      cursor pointer

  a
    color inherit

    &:hover
      color #3273dc

.lazyload,
.lazyloading
  opacity 0

.lazyloaded
  opacity 1
  transition opacity 150ms
</style>
