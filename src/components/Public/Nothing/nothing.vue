<template>
	<div class="nothing">
		<div class="nothing-img">
      <img :style="{'width': picSize}" src="../../../assets/img/nothing.jpg">
      <span :style="{'font-size': fontSize}">{{title}}</span>
    </div>
	</div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '暂无相关数据'
      },
      picSize: {
        type: String,
        default: '100%'
      },
      fontSize: {
        type: String,
        default: '26px'
      }
    }
  }
</script>

<style scoped lang="scss">
	.nothing {
		@include flex-justify-align(center);
    height: calc(100% - 100px);
	}
  .nothing-img {
    @include flex-align();
    flex-direction: column;
    font-size: 26px;
    letter-spacing: 2px;
    color: #D0D0D0;
  }
  img {
		width: 100%;
    padding-bottom: 30px;
  }
</style>
