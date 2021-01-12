<template>
	<div class="uni-tab-bar ">
		<div scroll-x class="uni-swiper-tab ">
			<block v-for="(tab,index) in tabBars" :key="tab.id">
				<div class="swiper-tab-list " :class="{'active':tabIndex==index}" @tap="tabtap(index,tab.type)">
					{{tab.name}}
					<div class="swiper-tab-line"></div>
				</div>
			</block>
			<div class="sds">

				<div calss="nav-tab-bar-line"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			tabBars: Array,
			tabIndex: Number,
			active:String,
		},
		methods: {
			//当前点击的哪个
			tabtap(index,type) {
				// this.tabIndex = index
				this.$emit('tabtap', index,type)
			},

		}
	}
</script>

<style>
	.uni-swiper-tab {
		border-top: 10px solid #F5F5F5;
		border-bottom: 1px solid #EEEEEE;	
		background: #FFFFFF;
	}

	.swiper-tab-list {
		color: #969696;
		padding: 0 150px;
		font-size: 30px;
	}

	.uni-tab-bar {
		margin-top: 20px;
	}

	.uni-tab-bar .active {
		color: #343434;
	}

	.active .swiper-tab-line {
		color: #FEDE33;
		border-bottom: 6px solid #0C76C6;
		width: 80upx;
		margin: auto;
		border-top: 6px solid #0C76C6;
		border-radius: 20px;
		margin-left: 18px;
	}

	.nav-tab-bar-line {
		border-bottom: 5px solid #ff9619;
		border-bottom: 5px solid #ff9619;
		width: 70px;
		height: 500px;
		border-radius: 20px;
	}
</style>
