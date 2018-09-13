<template>
    <scroller>
        <div class="button-area">
            <div class="button" @click="jump('/Login')">
                <text class="button-text">首次登录</text>
            </div>
        </div>
        <div class="button-area">
            <div class="button" @click="jump('/NoFirstLogin')">
                <text class="button-text">非首次登录</text>
            </div>
        </div>
        <div class="button-area">
            <div class="button" @click="jump('/Face')">
                <text class="button-text">刷脸登录</text>
            </div>
        </div>
        <div class="button-area">
            <div class="button" @click="jump('/Gersture')">
                <text class="button-text">手势登录</text>
            </div>
        </div>
        <div class="button-area">
            <div class="button" @click="jump('/Fingerprint')">
                <text class="button-text">指纹登录</text>
            </div>
        </div>
        <div class="button-area">
            <div class="button" @click="jump('/ForgetPassword')">
                <text class="button-text">忘记密码</text>
            </div>
        </div>
        <div class="button-area">
            <div class="button" @click="jump('/ResetPassword')">
                <text class="button-text">重置密码</text>
            </div>
        </div>
        <div class="button-area">
            <div class="button" @click="jump('/DeviceBinding')">
                <text class="button-text">绑定设备</text>
            </div>
        </div>
        <div class="button-area">
            <div class="button" @click="jump('/BootLogin')">
                <text class="button-text">引导登录设置</text>
            </div>
        </div>
        <div class="button-area">
            <div class="button" @click="start">
                <text class="button-text">扫描二维码</text>
            </div>
        </div>
        <div class="button-area">
            <div class="button" @click="contact">
                <text class="button-text">通讯录</text>
            </div>
        </div>
        <div class="button-area">
            <div class="button" @click="getValue">
                <text class="button-text">得到扫描二维码的值</text>
            </div>
        </div>

    </scroller>
</template>

<script>

    const context = weex.requireModule('context');
    const modal = weex.requireModule('modal');
    const stream = weex.requireModule("stream");

    export default {
        created() {
            // this.getValue();
            // context.sessionSetString('resetFlag', 'true');
            // var data  = {
            //     LoginId:111111,
            //     Password:111,
            //     LoginMode:'P'
            // };
            //
            // var url = 'Login.do';
            // stream.fetch(
            //     {
            //         method: "GET",
            //         url: `/pmobile/` + url + "?" + this.toParams(data),
            //         type: "json",
            //     },
            //     response => {
            //         // this.closeOverlay();
            //         // this.alertMsg(response);
            //         // this.alertMsg(response);
            //
            //         if (response.status != 200) {
            //             this.alertMsg("网络异常" + response.status);
            //             return;
            //         }
            //
            //         if (response.data._RejCode != '000000') {
            //             this.alertMsg(response.data._RejCode);
            //             return ;
            //         }
            //         //
            //         this.alertMsg(response.data._RejCode);
            //
            //
            //
            //     }
            // );
            // context.clearToken();

            // this.postDo('GenToken.do', {}, data => {
            //     this.alertMsg(data);
            // }, data => {
            //     this.alertMsg(data);
            // })


        },
        methods: {

            start() {
                this.alertMsg('hello');
                context.launchStage('main.qrcode');
                modal.toast({
                    message: 'end',
                    duration: 3
                });
                // this.jump('/qrCode');
            },
            contact() {
                this.jump('/Contact');
                // context.launchStage('main.contact');
            },

            getValue() {
                var value = context.sessionGetString('qrCode');

                modal.toast({
                    message: value,
                    duration: 3
                });
            }
        }
    }
</script>

<style scoped>

    .button-area {
        width: 750px;
        height: 100px;
        margin-top: 100px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .button {
        width: 678px;
        height: 88px;
        background-color: rgb(216, 10, 48);
        justify-content: center;
        align-items: center;
        border-radius: 10px;
    }

    .button:active {
        background-color: rgb(180, 8, 21);
    }

    .button-text {
        font-size: 36px;
        color: white;
    }

</style>