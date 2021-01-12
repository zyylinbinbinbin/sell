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
	
</style>
