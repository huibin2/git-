<template>
    <scroller class="home">
        <title titleJson="./login/findpwdresult_title.json"></title>
        <div class="result-area">
            <image class="result-img" src="./imgs/suc.png"></image>
            <text class="result-text">找回密码成功</text>
        </div>
        <div class="button-area">
            <div class="button" @click="login">
                <text class="button-text">重新登录 ({{second}}S)</text>
            </div>
        </div>
    </scroller>
</template>

<script>
    import Title from "@/components/common/titlebar_func.vue";

    const context = weex.requireModule('context');
 
    export default {
        components: {Title},
        data(){
            return {
                second: 3,
                timer: null
            };
        },
        created() {
            this.count();
        },
        methods: {
            login() {
                context.replaceStage('main.login');
            },
            count() {
                var that = this;
                setInterval(function(){
                    that.second--;
                    if(that.second == 0){
                        clearInterval(that.timer);
                        context.replaceStage('main.login');
                    }
                },1000);
                // }.bind(this),1000);
            }
        }
    }
</script>

<style scoped>

    .home {
        width: 750px;
        height: 1500px;
        background-color: rgb(240, 240, 240);
    }

    .result-area {
        margin-top: 128px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 750px;
        height: 350px;
        background-color: white;
    }

    .result-img {
        width: 120px;
        height: 120px;
    }

    .result-text {
        font-size: 36px;
        margin-top: 30px;
        color: rgb(65, 201, 142);
    }

    .button-area {
        margin-top: 80px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .button {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 678px;
        height: 88px;
        border-width: 3px;
        border-color: rgb(216, 10, 48);
        border-style: solid;
        border-radius: 10px;
    }

    .button-text {
        font-size: 35px;
        color: rgb(216, 10, 48);
    }

</style>