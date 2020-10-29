<template>
  <div class="vuestic-widget" :class="{'no-header': !headerText}">
    <div class="vuestic-widget-header" v-if="headerText">
      <button
        class="btn btn-micro btn-primary btn-with-icon close-btn rounded-icon backIcon"
        v-if="showBack"
        v-on:click="backPressed()">
        <i class="fa fa-arrow-left"></i>
      </button>
      <span class="spanTitle">{{headerText}}</span>
      <button
        class="btn btn-micro btn-primary btn-with-icon close-btn rounded-icon deleteIcon"
        v-if="showDelete"
        v-on:click="backPressed()">
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
    </div>
    <div class="vuestic-widget-body" v-if="hasSlotData">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vuestic-widget',
  props: ['headerText', 'showBack', 'showDelete', 'routeName', 'routeParams'],
  computed: {
    hasSlotData () {
      return this.$slots.default
    }
  },
  methods: {
    backPressed () {
      if (this.routeName) { return this.$router.push({ name: this.routeName, params: this.routeParams }) } else { return this.$router.go(-1) }
    }
  }
}
</script>

<style lang="scss">
.vuestic-widget {
  background: $widget-bg;
  margin-bottom: 1.2rem;
  padding: 0;

  @media (min-width: 300px) and (max-width: 930px) {
    margin-bottom: $widget-mb-mobile;
  }

  .btnBack {
    margin-right: 8px;
    cursor: pointer;
  }

  &.no-header {
    .vuestic-widget-body {
    }
  }

  &.larger-padding {
    .vuestic-widget-body {
      padding: $widget-larger-padding;
    }
  }

  &.no-v-padding {
    .vuestic-widget-body {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  &.brand-info {
    background-color: $brand-info;
    color: $white;
    box-shadow: $widget-info-shadow;
  }

  &.brand-danger {
    background-color: $brand-danger;
    color: $white;
    box-shadow: $widget-danger-shadow;
  }

  &.info-widget {
    border: 1px solid $border-color;
    // border-top: $info-widget-border;
    margin-bottom: 20px;
    position: relative;

    &.brand-info {
      border-top-color: $brand-info;
    }

    &.brand-danger {
      border-top-color: $brand-danger;
    }
  }

  // .vuestic-widget-body {
  //   padding: $widget-padding 1.8rem;
  //   @media screen and (max-width: 930px) {
  //     padding: $widget-padding-mobile 1.2rem;
  //   }
  // }

  .vuestic-widget-header {
    /*height: $widget-header-height;*/
    padding: 10px $widget-padding;
    // border-bottom: $widget-header-border;
    border-bottom: 1px solid $border-color;
    font-size: 19px;
    font-weight: 600;
    display: flex;
    align-items: center;
    color: $text-color;
    @media (max-width: 930px) {
      font-size: 20px;
    }
    @media (max-width: 850px){
      font-size: 17px;
    }
  }

  .backIcon {
    margin: 8px;
    box-shadow: 0px 0px white;
  }

  .deleteIcon{
    margin: 8px;
    color:black;
    background-color:  white;
    box-shadow: 0px 0px white;
  }
  .spanTitle{
    width: 100%;
    margin-left: 10px;
  }
}
</style>
