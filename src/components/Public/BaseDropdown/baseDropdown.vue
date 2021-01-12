<template>
  <div class="drop-down-warp" @mouseover="dropOver" @mouseout="dropOut">
    <slot class="slot" />
    <div class="drop-down-content" v-if="isOver">
      <i class="icon el-icon-caret-top"></i>
      <ul class="drop-down-ul">
        <li v-for="item in lists" :key="item.title">
          <i v-if="item.icon" :class="item.icon"></i>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { debounce } from '../../../assets/base'
  export default {
    name: "base-dropdown",
    props: {
      lists: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isOver: false,
      }
    },
    methods: {
      dropOver(e) {
        if (!this.isOver) {
          this.isOver = true;
        }
      },
      dropOut(e) {
        if (this.isOver) {
          this.isOver = false;
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .drop-down-warp {
    .drop-down-content {
      position: absolute;
      display: flex;
      justify-content: center;
      z-index: 9999;
    }
    .icon {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .drop-down-ul {
      margin-top: 12px;
      padding: 15px 0;
      background-color: #fff;
      border-radius: 10px;
      box-shadow:0 0 20px 0 rgba(64,158,255,0.1);
      box-sizing: border-box;
      li {
        @include flex-align(center);
        min-height: 40px;
        min-width: 130px;
        padding: 0 10px;
        color: #333;
        font-size: 18px;
        i {
          font-size: 22px;
          display: inline-block;
          width: 35%;
          text-align: center;
        }
        span {
          width: 65%;
        }
        &:hover {
          background-color: $hoverBlue;
          color: $blue;
        }
      }
    }
  }

</style>
