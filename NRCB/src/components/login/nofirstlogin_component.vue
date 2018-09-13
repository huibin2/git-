<template>
    <scroller class="main">

        <!-- 上面 -->
        <div>
            <div class="login-area">
                <image class="login-img" :src="url"></image>
                <text class="login-text">{{name}}</text>
            </div>

            <slot></slot>

        </div>

        <!-- 下面 -->
        <div class="bottom-area" :style="{ bottom: bottom + 'px' }">
            <div style="flex-direction: row;justify-content: space-between;">

                <text v-if="isPwd" class="text-left" @click="jump('/ForgetPassword')">忘记密码</text>
                <text v-else class="text-left" @click="switchLoginMode()">切换登录方式</text>
                <text class="text-right" @click="jump('/Login')">切换用户</text>
            </div>
        </div>

        <switch-login-mode v-if="showOverlay" :nowLoginPage="nowLoginPage" :loginModeList="loginModeList" @cancel="hidden"></switch-login-mode>

    </scroller>

</template>

<style scoped>

    .main {
        padding-top: 128px;
        flex-direction: column;
        width: 750px;
        height: 1100px;
        /*justify-content: space-between;*/
    }

    .login-area {
        width: 750px;
        height: 350px;
        flex-direction: column;
        align-items: center;
    }

    .login-img {
        margin-top: 72px;
        margin-bottom: 20px;
        width: 168px;
        height: 168px;
    }

    .login-text {
        font-size: 36px;
        color: rgb(51, 51, 51);
    }

    .text-left {
        margin-left: 36px;
        color: rgb(102, 102, 102);
        font-size: 30px;
    }

    .text-right {
        margin-right: 36px;
        color: rgb(102, 102, 102);
        font-size: 30px;
    }

    .bottom-area {
        position: fixed;
        width: 750px;
    }

</style>

<script>

    // import Login from "@/components/login/login_component.vue";
    import Title from "@/components/login/titlebar_component.vue";
    // 切换登录方式
    import SwitchLoginMode from '@/components/login/switchloginmode_component.vue'

    const modal = weex.requireModule('modal');
    const context = weex.requireModule('context');

    export default {
        components: {Title, SwitchLoginMode},
        props: ['name', 'url', 'isPwd', 'nowLoginPage'],
        data() {
            return {
                showOverlay: false, // 显示切换登录方式的浮窗
                loginModeList: ['P']  //当前用户设置的所有登录方式 H是人脸识别，判断用户是否开启其它登录方式
            };
        },
        created() {
            
            if (context.secureSetString('FingerFlag') != '') {
                this.loginModeList.push('F');
            }
            if (context.secureSetString('GrapFlag') != '') {
                this.loginModeList.push('G');
            }
            if (context.secureSetString('HumanFaceFlag') != '') {
                this.loginModeList.push('H');
            }
        },
        computed: {
            // height: function () {
            //     return weex.config.env.deviceHeight * 0.68;
            // },
            bottom: function () {
                // this.alertMsg(weex.config.env.osName);
                if (weex.config.env.osName == 'android') {
                    return -80;
                } else {
                    return 40;
                }
            }
        },
        methods: {
            switchLoginMode() {
                this.showOverlay = true;
            },
            hidden() {
                this.showOverlay = false;
            }
        }
    };
</script>