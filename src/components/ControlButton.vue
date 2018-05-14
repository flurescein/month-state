<template>
  <div class="control-button">
    <font-awesome-icon class="icon" :icon="icon" />
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'control-button',
  props: {
    icon: String
  },
  components: {
      FontAwesomeIcon
  }
}
</script>

<style lang="scss">
  $button-color: #b06ab3;
  $action-button-color: #4568dc;

  .control-button {
    position: relative;
    width: 40px;
    height: 40px;
    border: 5px $button-color solid;
    border-radius: 50%;
    transition: border-color .2s;
    cursor: pointer;
    
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);

      font-size: 24px;
      color: #b06ab3;
      transition: color .2s;
    }

    &:hover {
      border-color: $action-button-color;
      
      .icon {
        color: $action-button-color;
      }
    }

    &:active {
      background: $action-button-color;

      .icon {
        color: #17202A;
      }
    }
  }
</style>
