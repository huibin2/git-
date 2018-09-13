<template>
    <!--<div style="background-color: rgba(0, 0, 0, 0.5); width: 750px; height: 1400px;flex-direction: row;justify-content: center;align-items: center;">-->
        <!--<div style="width: 100px;height: 88px;font-size: 30px;background-color: red;color: white;flex-direction: row;justify-content: center;align-items: center;" @click="startQrCode">按钮</div>-->
    <!--</div>-->
    <div></div>
</template>

<script>

    const qrcode = weex.requireModule('qr-code');
    const modal = weex.requireModule('modal');
    const context = weex.requireModule('context');

    export default {

        data() {
            return {
                // data: ""
            }
        },

        created() {
            this.startQrCode();
        },

        // watch: {
        //     data: function (value) {
        //         // this.data = "";
        //         this.finish();
        //     }
        // },

        // mounted() {
        //     setTimeout(() => {
        //         this.startQrCode()
        //     }, 500);
        // },

        methods:{

            startQrCode() {
                qrcode.scanQRcode(data => {

                    // this.data = data;

                    // let ret = context.handleQRCode(data);

                    context.sessionSetString("qrCode", data);
                    modal.toast({
                        message: data,
                        duration: 3
                    });
                    // this.finish();
                    setTimeout(() => {
                        context.finish()
                    }, 500);

                });
            },

            finish() {
                modal.toast({
                    message: 'end',
                    duration: 3
                });
                // context.replaceStage('main.test');
                context.finish();

            }
        }
    }
</script>

<style scoped>

</style>