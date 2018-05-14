<template>
  <transition name="raise">
    <div class="popup-menu" v-if="menuState == menuName">
        <font-awesome-icon class="close-button"
                           icon="times" 
                           @click="$emit('close-button-clicked')" />
        <slot></slot>
    </div>
  </transition>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'popup-menu',
  props: {
    menuState: String,
    menuName: String
  },
  components: {
    FontAwesomeIcon
  }
}
</script>

<style lang="scss">
  .popup-menu {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    
    padding: 15px;
    font: 14px Oxygen, sans-serif;
    text-align: center;
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 4px rgba($color: black, $alpha: .2);

    .close-button {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 26px;
      color: #17202A;
      cursor: pointer;

      &:hover {
        color: black;
      }

      &:active {
        color: #17202A;
      }
    }

    h1, p {
      margin: 0 0 5px 0;
    }

    h1 {
      font-size: 30px;
    }

    p {
      font-size: 16px;
    }
  }

  .raise-enter-active {
    animation: raise .4s;
  }
  .raise-leave-active {
    animation: raise .4s reverse; 
  }

  @keyframes raise {
    from {
      top: 60%;
      opacity: 0;
    }

    to {
      top: 50%;
      opacity: 1;
    }
  }

  @media screen and (orientation:landscape) {
    .popup-menu {
      width: 40vw;
    }
  }

  @media screen and (orientation:landscape) and (min-width: 1000px) {
    .popup-menu {
      width: 400px;
    }
  }

  @media screen and (orientation:portrait) {
    .popup-menu {
      width: 80vw;
    }
  }
</style>
