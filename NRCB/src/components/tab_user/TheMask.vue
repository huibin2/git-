<template>
	<div class="matte" :style="{'height':main_height}" :class="[$store.state.overLayShow?'main-show':'main-hide']">
		<wxc-overlay :show="$store.state.overLayShow" opacity="0.1"></wxc-overlay>
		<div class="spinner2" ref="one">
			<div class="dot1" ref="two"></div>
			<div class="dot2" ref="three"></div>
		</div>
		<div class="loading_text">
            Loading&nbsp;.&nbsp;.&nbsp;.&nbsp;请稍等&nbsp;.&nbsp;.&nbsp;.
        </div>
	</div>
</template>

<script>
	import { WxcOverlay } from "weex-ui";
	const animation = weex.requireModule("animation");
	const modal = weex.requireModule('modal')

	export default {
		components: { WxcOverlay },
		data() {
			return {
				current_rotate: 0,
				scall2: 1,
				scall3: 0
			};
		},
		methods: {
			loading() {
				var self = this;
				self.current_rotate += 90;
				animation.transition(
					self.$refs.one, {
						styles: {
							transform: "rotate(" + self.current_rotate + "deg)"
						},
						duration: 250,
						timingFunction: "linear",
						needLayout: false,
						delay: 0
					},
					function() {
						if(self.$store.state.overLayShow == true) {
							self.loading();
						}
					}
				);
			},
			loading2() {
				var self = this;
				if(self.scall2 == 0) {
					self.scall2 = 1;
				} else {
					self.scall2 = 0;
				}
				animation.transition(
					self.$refs.two, {
						styles: {
							transform: "scale(" + self.scall2 + ")"
						},
						duration: 375,
						timingFunction: "ease-in-out",
						needLayout: false,
						delay: 0
					},
					function() {
						if(self.$store.state.overLayShow == true) {
							self.loading2();
						}
					}
				);
			},
			loading3() {
				var self = this;
				if(self.scall3 == 0) {
					self.scall3 = 1;
				} else {
					self.scall3 = 0;
				}
				animation.transition(
					self.$refs.three, {
						styles: {
							transform: "scale(" + self.scall3 + ")"
						},
						duration: 375,
						timingFunction: "ease-in-out",
						needLayout: false,
						delay: 0
					},
					function() {
						if(self.$store.state.overLayShow == true) {
							self.loading3();
						}
					}
				);
			}
		},
		computed: {
			main_height: function() {
				var height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - 100;
				return height;
			}
		},
		watch: {
			"$store.state.overLayShow": function(val) {
				if(val == true) {
					this.loading();
					this.loading2();
					this.loading3();
				}
			}
		}
	}
</script>

<style scoped>
	.matte {
		position: fixed;
		top: 80px;
		left: 0;
		right: 0;
		bottom: 0;
		/*width: 750px;*/
		/*height: 1000px;*/
		justify-content: center;
		align-items: center;
	}
	
	.matte-main {
		width: 140px;
		height: 140px;
		position: relative;
	}
	
	.matte-bg {
		width: 140px;
		height: 140px;
		position: absolute;
	}
	
	.matte-cr {
		width: 100px;
		height: 100px;
		position: absolute;
		top: 20px;
		left: 20px;
	}
	
	.matte-logo {
		width: 50px;
		height: 50px;
		position: absolute;
		top: 45px;
		left: 45px;
	}
	
	.main-show {
		visibility: visible;
	}
	
	.main-hide {
		visibility: hidden;
	}
	
	.loading_text {
		text-align: center;
		line-height: 40px;
		color: #d2d2d2;
	}
	
	.spinner2 {
		/*margin: 0px auto;*/
		width: 90px;
		height: 90px;
		position: relative;
		border: 1px solid #000000;
		z-index: 10;
	}
	
	.dot1 {
		background-color: #F43223;
	}
	
	.dot2 {
		background-color: #EBEB0F;
	}
	
	.dot1,
	.dot2 {
		width: 50%;
		height: 50%;
		display: inline-block;
		position: absolute;
		/*top: 0;*/
		border-radius: 100%;
	}
	
	.dot2 {
		top: auto;
		bottom: 0px;
		/*-webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;*/
	}
</style>