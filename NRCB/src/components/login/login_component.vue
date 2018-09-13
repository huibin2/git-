<!--suppress ALL -->
<template>
    <div class="login">

        <div class="login-area">
            <div style="flex-direction: row">
                <image class="input_icon" src="./imgs/login/ic_name.png"></image>
                <input class="username" type="text" maxLength="18" v-model="userName" placeholder="请输入手机号/证件号/用户号"
                       @input="getName">
            </div>
            <div class="line_x"></div>

            <div style="flex-direction: row;margin-top: 20px">
                <image class="input_icon" src="./imgs/login/ic_password.png"></image>
                <input type="password" class="psw" auto-appear=true v-model="password" placeholder="请输入您的登录密码"/>
                <!--<password-input class="psw" placeholderColor="#ababab" minLength="6" maxLength="16"  encryptType="0" ref="Pwd1" kbdName="logingPw1"  placeholder="请输入您的登录密码"></password-input>-->
            </div>
            <div class="line_x"></div>
        </div>

        <div class="checkebox" @click="check">
            <div v-if="saveFlag">
                <image class="unckecked" src="./imgs/radioOn.png"/>
            </div>

            <div v-else>
                <image class="unckecked" src="./imgs/radio.png"/>
            </div>

            <text class="memory_text">记住用户名</text>
        </div>

        <div class="button-area">
            <div class="button" @click="doLogin()">
                <text class="button-text">登&nbsp;&nbsp;&nbsp;&nbsp;录</text>
            </div>
        </div>

        <div class="down_title">
            <div>
                <div @click="jump('/TestAllLogin')">
                    <text class="color">忘记密码</text>
                </div>
            </div>
            <div @click="jump('/RegisterFirst')">
                <div>
                    <text class="color">自助注册</text>
                </div>
            </div>
        </div>

        <!-- 登录提示框 -->
        <confirm v-if="show" :data="loginInfo" @cancel="cancel"></confirm>
    </div>


</template>

<style scoped>
    .titleBar {
        display: flex;
        flex-direction: row;
    }

    .input_icon {
        margin-left: 40px;
        width: 48px;
        height: 48px;
        margin-top: 5px;
    }

    .login-area {
        margin-top: 150px;
    }

    .login_text {
        margin-top: 61px;
        margin-left: 212px;
        font-size: 36px;
        color: #000000;
        text-align: center;
    }

    .back {
        width: 46px;
        height: 46px;
        margin-top: -9px;
        margin-left: -9px;
    }

    .backone {
        width: 100px;
        height: 100.2px;
        margin-top: 64px;
        margin-left: 32px;
    }

    .bank_logo {
        width: 260px;
        height: 233px;
        margin-top: 116px;
        margin-left: 245px;
    }

    .username {
        margin-left: 20px;
        margin-top: 8px;
        width: 500px;
        height: 42px;
        outline: none;
        font-size: 30px;
        /*color: #ababab;*/
        letter-spacing: -0.68px;
        font-family: PingFangSc-Regular;
    }

    .psw::-webkit-input-placeholder {
        color: #ababab;
    }

    .psw::-ms-input-placeholder {
        color: #ababab;
    }

    .psw::-moz-input-placeholder {
        color: #ababab;
    }

    .line_x {
        width: 678px;
        height: 0.68px;
        margin-left: 36px;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #dedede;
    }

    .psw {
        margin-left: 20px;
        margin-top: 8px;
        width: 500px;
        height: 42px;
        outline: none;
        font-size: 30px;
        letter-spacing: -0.68px;
        font-family: PingFangSc-Regular;
    }

    .code_area {
        flex-direction: row;
    }

    .code {
        width: 361px;
        margin-left: 86px;
        margin-top: 30px;
        height: 42px;
        outline: none;
        font-size: 30px;
        letter-spacing: -0.68px;
        font-family: PingFangSc-Regular;
    }

    .code_img {
        width: 222px;
        height: 62px;
        margin-top: 20px;
    }

    .unckecked {
        width: 32px;
        height: 32px;
        margin-top: 12px;
        margin-left: 50px;
    }

    .checkebox {
        flex-direction: row;
    }

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

    .memory_text {
        font-size: 28px;
        color: rgb(153, 153, 153);
        margin-top: 10px;
        margin-left: 28px;
    }

    .login_img {
        width: 582px;
        height: 86px;
        margin-top: 61px;
        margin-left: 87px;
    }

    .down_title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 36px 36px;
    }

    .color {
        font-size: 30px;
        color: rgb(102, 102, 102);
    }

    .login-more {
        padding-bottom: 20px;
        padding-top: 100px;
        align-items: center;
    }

    .more-txt {
        width: 180px;
        font-size: 28px;
        color: #565656;
        text-align: center;
        align-content: center;
        align-items: center;
        background-color: #ffffff;
    }

    .more-line {
        top: 15px;
        width: 250px;
        height: 1px;
        background-color: #979797;
        align-content: center;
        align-items: center;
    }
</style>


<script>
    const context = weex.requireModule("context");
    const modal = weex.requireModule("modal");
    const stream = weex.requireModule("stream");
    const getphoneInfo = weex.requireModule("getPhoneInfo");
    const picker = weex.requireModule("picker");
    // const face = weex.requireModule("face");
    const techshinoface = weex.requireModule("techshino");

    import Confirm from '@/components/common/confirm.vue'

    export default {
        components: {Confirm},
        data() {
            return {
                loginInfo: {
                    text: '密码错误！今日再输错两次，您的手机银行将锁定，无法登录！',
                    cancel: '我知道了'
                },  // 登录提示数据

                saveFlag: true, // 是否保存用户名
                show: false,  // 是否显示登录提示
                userName: '',// 用户名
                // showUserName: "",
                // MsgCode: '1111',
                // codeTemp: '',
                // machineCode: '',
                password: '',// 密码
                // data: {},    // 登录之后的所有信息
                RsetLoginPwd: '', // 是否重置密码
                FirstLoginFlag: '',
                CheckDevice: '',
                phoneNumber:'' //签约手机号

                // remuserName: "",//判断是否显示 手势登录，指纹登录
                // roleList: [],//千人千面json数据
                // licence: "MjUyNjE1bm9kZXZpY2Vjd2F1dGhvcml6Zd3l5ubm5+Ti/+fg5efm4+f+5Obm4Obg5Yjm5uvl5ubrkeXm5uvl5uai6+Xm5uvl5uTm6+Xm5uDm1efr5+vn6+er4Ofr5+vn66vn5+Tm5uXl",
                //活体检测licence
                // techshinoParam: {
                //     faceCfg:
                //     "<param>"
                //     + "<imgWidth>480</imgWidth>"// 出图宽
                //     + "<imgHeight>480</imgHeight>"// 出图高
                //     + "<imgCompress>100</imgCompress>"// 图像压缩率0-100
                //     + "<pupilDistMin>70</pupilDistMin>"// 双眼间距最短距离
                //     + "<pupilDistMax>130</pupilDistMax>"// 双眼间距最大距离
                //     + "<isActived>2</isActived>"// 是否检活
                //     + "<isAudio>1</isAudio>"// 是否开启声音提示
                //     + "<timeOut>80</timeOut>"// 超时时间
                //     + "<version>v1.0.5</version>"// 版本号
                //     + "<deviceIdx>0</deviceIdx>"// 摄像头号（0：前置，1：后置）
                //     + "<definitionAsk>1</definitionAsk>" // 清晰度（预留参数）
                //     + "<cryptType>0</cryptType>" // 是否加密（0：不加密，1：加密）
                //     + "<interfaceType>3</interfaceType>" // 界面背景序号
                //     + "<cryptKey>37010519820902167800</cryptKey>" // 加密key
                //     + "<action>5</action>"// 检活动作个数
                //     + "<headLeft>10</headLeft>" // 左转阈值
                //     + "<headRight>10</headRight>"// 右转阈值
                //     + "<headLow>10</headLow>" // 低头阈值
                //     + "<headHigh>10</headHigh>"// 抬头阈值
                //     + "<eyeDegree>25</eyeDegree>" // 眨眼阈值
                //     + "<mouthDegree>15</mouthDegree>"// 张嘴阈值
                //     + "<outType>0</outType>" // 图像输出模式（0：单图，1：多图）
                //     + "<supportLow>1</supportLow>"// 是否支持低版本（预留参数）
                //     + "<confidence>10</confidence>" // 置信度（0-100）
                //     + "<actionList>1278A</actionList>" // 检活动作列表
                //     + "<actionOrder>1***A</actionOrder>"// 检活动作顺序
                //     + "</param>",
                //     customInfo: "1234567890",
                //     serialno: "123456789012"
                // }
            }
        },
        methods: {

            cancel() {
                this.show = false;
            },

            // 保存用户名
            check() {
                this.saveFlag = !this.saveFlag;
            },
            // 登录函数
            doLogin() {
                // modal.toast({
                //     message: this.userName,
                //     duration: 1
                // });
                if (this.checkData()) {
                    this.login();
                }
            },
            // 检验数据
            checkData() {
                let flag = true;
                // 判断用户名是手机号，证件号还是用户号
                if (this.userName != '') {
                    // modal.toast({message: '是手机号', duration: 2});
                    if (this.password == '') {
                        this.loginInfo.text = '输入的密码不能为空！';
                        this.show = true;
                        flag = false;
                    }
                } else {
                    this.loginInfo.text = '输入的用户名有误！';
                    this.show = true;
                    flag = false;
                }

                return flag;
            },
            checkUserName() {

            },
            // 登录异步
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
                    this.RsetLoginPwd = data.RsetLoginPwd;  // 是否重置密码
                    this.CheckDevice = data.CheckDevice;    // 是否绑定设备
                    this.FirstLoginFlag = data.FirstLoginPwd; // 是否首次登录
                    this.phoneNumber = data.Mobile;
                    context.sessionSetString('CheckDevice', data.CheckDevice); // 是否绑定设备
                    // context.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ");
                    context.setToken(data.token);
                    var temp = data.token.split('.')[1];
                    this.alertMsg(this.b64DecodeUnicode(temp) + "$$" + context.checkToken() + "$$");

                    // this.alertMsg(data.LastLoginTime);

                    context.secureSetString('FingerFlag', data.FingerFlag);     // 是否设置指纹登录
                    context.secureSetString('GrapFlag', data.GrapFlag);         // 是否设置手势登录
                    context.secureSetString('HumanFaceFlag', data.HumanFaceFlag);// 是否设置刷脸登录

                    context.secureSetString('LoginId', data.LoginId); // 登录ID

                    context.secureSetString('LastLoginTime', data.LastLoginTime);// 上次登录时间
                    context.secureSetString('LoginTimes', data.LoginTimes);     // 登录次数

                    this.loginSuccess();
                }, data => {
                    this.alertMsg(data);
                });

            },

            b64DecodeUnicode(str) {
                return decodeURIComponent(atob(str).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            },

            loginSuccess() {
                // 登录成功后执行
                // 保存用户名
                if (this.saveFlag) {
                    context.sessionSetString("mobile",this.phoneNumber)
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
            // 以下方法没有用
            toLogin(time, keyVal) {
                if (this.propName(this.userName)) return;
                // this.sendFirst(this.password);

                //上传字段
                this.$refs.Pwd1.getKbdLength(length => {
                    if ((Number(length)) < 6) {
                        this.alertMsg('请输入6-16位密码');
                        return true
                    } else {
                        this.$refs.Pwd1.getValue(data => {
                            // this.$refs.Pwd1.getValue((keyVal,data) => {
                            // this.alertMsg(data);
                            // if(!this.show){
                            this.sendFirst(data);
                            // }else{
                            //   this.sendSecond(data);
                            // }
                        })
                    }
                })
                // if(!this.show){
                // this.sendFirst(this.password);
                // }else{
                //   this.sendSecond(this.password);
                // }
            },
            //不需验证码
            sendFirst(data) {
                // this.sendThree(data);
                const params = {
                    "ChnlId": "62",
                    "SigninTypCd": "2",
                    "LoginName": this.userName,
                    "UserPwd": data,
                    "LoginTypeWay": "1",
                    "EquipmentId": this.machineCode,
                    "_vTokenName": this.MsgCode
                }
                this.postDo("login.do", params, data => {
                    // this.alertMsg(data);
                    if (data.jsonError) {
                        this.show = true;
                        return;
                    }
                    this.alertMsg('登录成功！');
                    // if(data.TransFlag!='000000'){
                    //   this.alertMsg(data.TransMsg);
                    //   return;
                    // }
                    // var data={};
                    // this.$refs.Pwd1.clear();
                    context.secureSetString('userName', this.userName)
                    context.secureSetString('remuserName', this.userName)
                    context.sessionSetString('UserId', data.UserId);
                    context.sessionSetString('machineCode', this.machineCode);
                    context.sessionSetString('FirstLogin', data.FirstLogin);

                    context.sessionSetString('LoginMsg', JSON.stringify(data));
                    // context.sessionSetString('LoginMsg',JSON.stringify(data));
                    // this.alertMsg(context.sessionGetString('LoginMsg'))
                    //context.sessionSetString('isLogin','true');
                    // context.finish();
                    this.sendThree(data);
                    // },data =>{
                    // this.$refs.Pwd1.clear();
                    // this.getImgCode();
                    // this.show=true;
                });
            },
            //需要验证码
            sendSecond(data) {
                if (this.propSms(this.MsgCode)) return;
                const params = {
                    UserId: this.userName,
                    Password: data,
                    _vTokenName: this.MsgCode,

                }
                this.postDo("login.do", params, data => {
                    // var data={CifNo:'622300060001',Status:'5'}
                    this.$refs.Pwd1.clear();
                    // this.alertMsg(JSON.stringify(data));
                    context.sessionSetString('LoginMsg', JSON.stringify(data));
                    // context.sessionSetString('isLogin','true');
                    this.sendThree(data);
                    // },data =>{
                    //   this.$refs.Pwd1.clear();
                    //   this.getImgCode();
                });
            },
            //判断 加载类型
            getMoreLauncher(age, sex) {
                stream.fetch({
                        method: "GET",
                        url: this.$store.state.jsonBaseUrl + "json/character.json",
                        type: "json"
                    },
                    response => {

                        if (response.status === 200) {
                            // this.alertMsg("sex:"+sex+" age:"+age)
                            this.roleList = response.data.data.role
                            for (let i in this.roleList) {
                                // this.alertMsg(this.roleList[i].sex+"-"+this.roleList[i].min_age+"-"+this.roleList[i].max_age+"-")
                                if (this.roleList[i].min_age * 1 <= age * 1 && this.roleList[i].max_age * 1 >= age * 1 && sex == this.roleList[i].sex) {
                                    // this.alertMsg(1+":"+this.roleList[i].type);
                                    if (this.roleList[i].type == "A") {
                                        context.replaceStage("main.launcher");
                                    } else if (this.roleList[i].type == "B") {
                                        context.replaceStage("main.launcherOther");
                                    } else if (this.roleList[i].type == "C") {
                                        context.replaceStage("main.launcherOld");
                                    } else {
                                        context.finish();
                                    }
                                    return;
                                }
                            }

                        }
                    },
                    () => {
                    }
                );
            },
            //获取验证码
            getImgCode() {
                this.codeTemp = new Date().getTime();
                this.imgCodeUrl = "/pmobile/GenTokenImg.do?codeTemp=" + this.codeTemp;
            },
            // 设备验证跳转
            sendThree(data) {

                if (data.FirstLogin == 'Y') {
                    context.replaceStage('main.equipment?FirstLogin=Y');// 跳转设备绑定

                    return;
                } else if (data.FirstLogin == 'N' && data.IsBindFlag == 'N') {
                    context.replaceStage('main.equipment?FirstLogin=N');// 跳转设备绑定
                    return;
                }
                // const params = {
                //   MachineCode : this.machineCode,
                //   CifNo :data.CifNo,
                // }
                // // this.postDo("MachineBindingQryNew.do",params,data =>{
                //   // 判断是否绑定设备
                //   data.IsMachine='N';
                //   if(data.IsMachine == 'Y'){
                //     context.launchStage('main.equipment');// 跳转设备绑定
                //   }
                //   else {
                //     // 跳转首次登录密码修改
                //     var ss=context.sessionGetString('LoginMsg');
                //     if(ss!="" && ss.Status!=undefined){
                //       if(JSON.parse(ss).Status == '9'){
                //         context.launchStage('main.updateLoginPwd');
                //       }
                //     }else{
                //       //登录状态
                context.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ");
                context.sessionSetString('isLogin', 'true');
                //data.idenNum身份证号
                let isVX = context.getParam('isVX');//是否是从购买页跳到的登录
                if (isVX) {
                    context.next();
                    return;
                }
                let sex = this.getAge(data.IdenNum, 2)//性别
                let age = this.getAge(data.IdenNum, 3) + ""//年龄
                // let s=Math.ceil(Math.random()*2)
                // character.json
                // if(s==1){
                //   context.replaceStage("main.launcherOld");
                // }else if(ss==2){
                //   context.replaceStage("main.launcher");
                // }else{
                //   context.replaceStage("main.launcherOther");
                // }

                let that = this;
                this.getMoreLauncher(age, sex);


                //     }
                //   }
                // });
            },
            //身份证号获取年龄
            getAge(UUserCard, num) {
                if (num == 1) {
                    //获取出生日期
                    birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
                    return birth;
                }
                if (num == 2) {
                    //获取性别
                    if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                        //男
                        return "man";
                    } else {
                        //女
                        return "woman";
                    }
                }
                if (num == 3) {
                    //获取年龄
                    var myDate = new Date();
                    var month = myDate.getMonth() + 1;
                    var day = myDate.getDate();
                    var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
                    if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
                        age++;
                    }
                    return age;
                }
            },
            //获取公钥
            getKey() {
                this.postDo("GetGy.do", {}, data => {
                    context.sessionSetString("sm2PublicKey", data.sm2PublicKey);
                }, data => {
                    this.getKey();
                });
            },
            //获取时间戳
            getTimeStamp() {
                // if(!this.login){
                //   context.secureSetString('userName',this.userName);
                // }
                if (this.userName.length == 0 || this.userName.length == null) {
                    this.alertMsg('请输入8-18位用户名');
                    return true
                } else {
                    // this.postDo("Timestamp.do",{},data =>{
                    var data = {Timestamp: "1531451600883"}
                    var sttttttamp = data.Timestamp;
                    var pubbbbbkey = "2AAC31E4A7E57E164F911CEABFE0D9797C5FF3406E76780C2EC0BD4A84E9A5B2B897FF4EBF3AB2C6D36B8EFD865CB0DE8B127A3DEA4ED8307B5BD00C0CC09EF5";
                    context.setTimestamp(new Date().getTime() + "");
                    this.toLogin(sttttttamp, pubbbbbkey)
                    // });
                }
            },
            //更多登录
            moreLogin() {
                let items = ["手势登录", "指纹登录", "人脸登录"];
                picker.pick(
                    {
                        confirmTitle: "确认",
                        cancelTitle: "取消",
                        index: 0,
                        items
                    },
                    event => {
                        if (event.result === "success") {
                            modal.toast({message: event.data});
                            if (event.data == 0) {
                                // context.launchStage("main.gesture");
                                this.jump('/Gersture')
                            } else if (event.data == 1) {
                                this.jump('/Fingerprint')
                            } else if (event.data == 2) {
                                // face.setLicence(this.licence);
                                // face.startAliveCheck(data => {
                                //   context.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ");
                                //   context.sessionSetString('isLogin','true');
                                //   context.finish();
                                //   console.log(data.base64);
                                // });
                                techshinoface.start(JSON.stringify(this.techshinoParam), data => {
                                    context.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ");
                                    context.sessionSetString('isLogin', 'true');
                                    modal.alert({
                                        message: data,
                                        duration: 0.3
                                    }, () => {
                                        context.finish()
                                    });

                                });
                                // this.jump('/Face')
                            }
                        }
                    }
                );
            },
        },
        created() {
            let txt = context.secureGetString('userName')
            if (txt) {
                this.userName = txt;
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            // this.showUserName = context.secureGetString('userName');
            // this.remuserName = context.secureGetString('remuserName');
            // this.alertMsg(context.envGet("DeviceID"));
            // if (this.showUserName.length > 10) {
            //     this.showUserName = this.showUserName.substr(0, 3) + "****" + this.showUserName.substr(this.showUserName.length - 4);
            // }
            // this.getKey();
            // getphoneInfo.getPhoneInfo(data =>{
            //   this.alertMsg(JSON.stringify(data))
            //   this.machineCode=JSON.parse(data).machineCode
            // })
            // this.machineCode = context.envGet("DeviceID")
        }
    };
</script>


