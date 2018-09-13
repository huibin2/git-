<template>
    <div class="wrapper">
        <wxc-overlay :hasAnimation="false" opacity="0.6"></wxc-overlay>
        <!--登录方式弹出框-->
        <div class="container">

            <div style="width: 600px;border-radius: 10px;background-color: rgb(140, 140, 140)">
                <div v-if="containLoginMode('P') && nowLoginPage != 'PASSWORD'">
                    <div class="select-area" @click="login()">
                        <text style="font-size: 30px;color: rgb(102, 102, 102);">用户名密码登录</text>
                    </div>
                </div>
                <div v-if="containLoginMode('G') && nowLoginPage != 'GESTURE'">
                    <div style="height: 1px;"></div>
                    <div  class="select-area" @click="jump('/Gersture')">
                        <text style="font-size: 30px;color: rgb(102, 102, 102);">手势密码登录</text>
                    </div>
                </div>
                <div v-if="containLoginMode('F') && nowLoginPage != 'FINGERPRINT'">
                    <div style="height: 1px;"></div>
                    <div class="select-area" @click="jump('/Fingerprint')">
                        <text style="font-size: 30px;color: rgb(102, 102, 102);">指纹登录</text>
                    </div>
                </div>
                <div v-if="containLoginMode('H') && nowLoginPage != 'FACE'">
                    <div  style="height: 1px;"></div>
                    <div class="select-area" @click="jump('/Face')">
                        <text style="font-size: 30px;color: rgb(102, 102, 102);">刷脸登录</text>
                    </div>
                </div>

                <div style="height: 1px;"></div>
                <div class="select-area" @click="cancel">
                    <text style="font-size: 30px;color: rgb(216, 10, 48);">取消</text>
                </div>
            </div>


            <!--<div style="height: 10px;"></div>-->

            <div style="border-radius: 10px;">

            </div>
        </div>
    </div>
</template>

<script>
    import { WxcOverlay } from "weex-ui";
    const stream = weex.requireModule("stream");
    const context = weex.requireModule("context");

    export default {
        components: { WxcOverlay },
        props:['nowLoginPage', 'loginModeList'],
        data() {
            return {
                top: "0px"
            };
        },
        mounted() {
            this.getHeight();
        },
        computed: {},
        methods: {
            containLoginMode(value) {
                let hasLoginMode = false;
                for (var i = 0; i < this.loginModeList.length; i ++){
                    if (this.loginModeList[i] == value) {
                        hasLoginMode = true;
                        break;
                    }
                }

                return hasLoginMode;
            },
            login() {

                // context.sessionSetString('userName', 'hello');

                // var userName = context.sessionGetString('userName');
                // modal.toast({
                //     message: userName,
                //     duration: 2
                // })
                // if(userName == '') {
                //     this.jump('/Login');
                // } else {
                //     this.jump('/NoFirstLogin');
                // }

                this.jump('/NoFirstLogin');
            },
            cancel() {
                this.$emit("cancel");
            },
            getHeight() {
                const { env: { deviceHeight, deviceWidth } } = weex.config;
                var pageHeight = deviceHeight / deviceWidth * 750;
                this.top = pageHeight  - 480 + "px";
            }

        }
    };
</script>

<style scoped>
    .wrapper {
        position: fixed;
        width: 750px;
        /*兼容H5异常*/
        z-index: 99999;
    }
    .container {
        position: fixed;
        bottom: 54px;
        width: 750px;
        /*background-color: #fff;*/

        align-items: center;
    }
    .select-area {
        width: 600px;
        height: 88px;
        /*border-radius: 10px;*/
        /*margin-left: 36px;*/
        background-color: white;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>
