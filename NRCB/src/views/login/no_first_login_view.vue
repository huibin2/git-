<template>
    <scroller class="home">
        <title titleJson="login/titlebar.json"></title>
        <NoFirstLogin :name="userName" :url="url" :isPwd="isPwd" nowLoginPage="PASSWORD">

            <div style="margin-top: 50px;">
                <div style="flex-direction: row;margin-top: 20px">
                    <image class="input_icon" src="./imgs/login/ic_password.png"/>
                    <input type="password" class="psw" auto-appear=true v-model="password" placeholder="请输入您的登录密码"/>
                </div>
                <!--<password-input class="psw" placeholderColor="#ababab" minLength="6" maxLength="16"  encryptType="0" ref="Pwd1" kbdName="logingPw1"  placeholder="请输入您的登录密码"></password-input>-->
                <div class="line_x"></div>

                <div style="width: 750px;height: 100px;margin-top: 100px;flex-direction: row;justify-content: center;align-items: center">
                    <div class="button" @click="doLogin()">
                        <text style="font-size: 36px;color: white;">登&nbsp;&nbsp;&nbsp;&nbsp;录</text>
                    </div>
                </div>
            </div>

        </NoFirstLogin>


    </scroller>
</template>
<style scoped>
    .center{
        top:140px;
    }

    .psw {
        margin-left: 30px;
        margin-top: 8px;
        width: 500px;
        height: 42px;
        outline:none;
        font-size: 30px;
        letter-spacing: -0.68px;
        font-family: PingFangSc-Regular;
    }

    .input_icon {
        margin-left: 40px;
        width: 48px;
        height: 48px;
        margin-top: 5px;
    }

    .line_x {
        width: 678px;
        height: 0.68px;
        margin-left: 36px;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #dedede;
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

</style>

<script>

    import Title from "@/components/login/titlebar_component.vue";
    import NoFirstLogin from "@/components/login/nofirstlogin_component.vue"

    const modal = weex.requireModule('modal');
    const context = weex.requireModule('context');

    export default {
        components: {Title, NoFirstLogin},
        data() {
            return {
                loginInfo: {
                    text: '密码错误！今日再输错两次，您的手机银行将锁定，无法登录！',
                    cancel: '我知道了'
                },  // 登录提示数据
                userName:'',
                url: './imgs/login/login_tx.png',
                isPwd: true
            };
        },
        created() {
            this.userName=context.secureGetString('userName');
        },
        computed: {},
        methods: {
             loginSuccess() {
                // 登录成功后执行
                // 保存用户名
                if (this.saveFlag) {
                    context.secureSetString('userName', this.userName);
                } else {
                    context.secureSetString('userName', '');
                }

                var resetFlag = this.RsetLoginPwd;
                if (resetFlag == 'Y') {
                    // modal.toast({message: resetFlag, duration: 2});
                    this.jump('/ResetPassword');
                    // context.launchStage('main.tab_home');
                } else if (this.CheckDevice == 'Y') {
                    this.jump('/DeviceBinding');
                } else if (this.FirstLoginFlag == 'Y') {
                    this.jump('/BootLogin');
                } else {
                    this.goBack();
                }
            },
            doLogin() {
                // modal.toast({
                //     message: this.userName,
                //     duration: 1
                // });
                if (this.checkData()) {
                    this.login();
                }
            },
             checkData() {
                let flag = true;
                // 判断用户名是手机号，证件号还是用户号
               
                    // modal.toast({message: '是手机号', duration: 2});
                    if (this.password == '') {
                        this.loginInfo.text = '输入的密码不能为空！';
                        this.show = true;
                        flag = false;
                    }
                return flag;
            },
            login() {
                var data = {
                    LoginId: this.userName,
                    Password: this.password,
                    LoginMode: 'P'
                };
                // modal.alert({message: this.toParams(data)});

                this.postDo('Login.do', data, (data) => {
                    // modal.alert({message: data._RejCode});
                    this.data = data;
                    this.RsetLoginPwd = 'Y';  // 是否重置密码
                    this.CheckDevice = data.CheckDevice;    // 是否绑定设备
                    this.FirstLoginFlag = data.FirstLoginPwd; // 是否首次登录
                    context.sessionSetString('CheckDevice', data.CheckDevice); // 是否绑定设备
                    // context.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ");
                    context.setToken(data.token);
                    var temp = data.token.split('.')[1];
                    this.alertMsg(this.b64DecodeUnicode(temp) + "$$" + context.checkToken() + "$$");
                    context.secureSetString('FingerFlag', data.FingerFlag);     // 是否设置指纹登录
                    context.secureSetString('GrapFlag', data.GrapFlag);         // 是否设置手势登录
                    context.secureSetString('HumanFaceFlag', data.HumanFaceFlag);// 是否设置刷脸登录

                    context.secureSetString('LastLoginTime', data.LastLoginTime);// 上次登录时间

                    this.loginSuccess();
                }, data => {
                    this.alertMsg(data);
                });

            },
        }
    };
</script>