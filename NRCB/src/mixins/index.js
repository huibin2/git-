//客户端扩展模块
const context = weex.requireModule('context');
const modal = weex.requireModule("modal");
const stream = weex.requireModule("stream");
export default {
    methods: {
        //json转字符串，用在stream的body
        toParams(obj) {
            var param = "";
            for (const name in obj) {
                if (typeof obj[name] != 'function') {
                    param += "&" + name + "=" + encodeURIComponent(obj[name])
                }
            }
            return param.substring(1)
        },
        jump(to, flag) {
            if (this.$router) {
                if (flag) {
                    this.$router.replace(to)
                } else {
                    this.$router.push(to)
                  }
                  
              }
          },
          jumpTo(url) {
            if (url) {
              context.launchStage(url);
            }
          },      
          goBack() {
              if (this.$router) {
                 let arr=["/Login","/SafeSet", "/NoFirstLogin", "/Face", "/Fingerprint", "/Gersture"]
                  if(this.$route.path=='/Launcher' || this.$route.path=='/LauncherOld'){
                      // modal.alert({
                      //     message: 1
                      // });
                    this.$store.state.show=true;
                  }else if (arr.toString().indexOf(this.$route.path)!=-1) {
                      // modal.alert({
                      //     message: 2
                      // });
                     context.finish()
                  } else {
                      // modal.alert({
                      //     message: this.$route.path
                      // });
                      this.$router.back()
                  }
              }
          },
          commonTransResponse(response,sucessCallback,failCallback) {
            if (response.status == 200) {

                if (response.data._RejCode == "000000") {
                    sucessCallback(response.data);

                } else {
                    this.alertMsg(
                        JSON.stringify(response.data.errmsg),
                    );
                    failCallback(JSON.stringify(response.data.errmsg));
                }
            } else {
                this.alertMsg(
                    "网络异常",
                );
                failCallback("通讯异常");

            }
        },
        alertMsgCallBack(message, callback) {
            modal.alert({
                message: message,
                okTitle: '确定',
                duration: 3
            }, function (value) {
                callback();
            })
        },
        alertMsg(message) {
            modal.alert({
                message: message,
                okTitle: '确定',
                duration: 3
            })
        },
        getHeight() {
            const { env: { deviceHeight, deviceWidth } } = weex.config;
            var pageHeight = deviceHeight / deviceWidth * 750;
            return pageHeight;
        },
        propName(value) {
            if (value == '') {
                this.alertMsg('用户名或手机号不能为空')
                return true;
            }
        },
        propSms(value) {
            if (value == '') {
                this.alertMsg('图形验证码不能为空')
                return true;
            }
        },
        openOverlay() {
            this.$store.state.overLayShow = true;
            // setTimeout(()=>{
            //     this.$store.state.overLayShow=false;
            // },30000)
        },
        closeOverlay() {
            this.$store.state.overLayShow = false;
        },
        postDo(url, data, sucessCallback, failCallback) {
            // var ss=new Date();
            // var uploadData = {};
            //公共请求头
<<<<<<< HEAD
            var head = {
                "_MChannelId": "PMBS",
                "_DeviceType": "iOS",
                // weex.config.env.osName,
                "_DeviceNo": "BE828DD2-4D99-4D84-BCFB-5ECDD25CD2AD",
                "_DeviceVersion": "iOS 10.1",
                //  weex.config.env.osName+' '+ weex.config.env.osVersion,
                "_Brand": "iPhone",
                "_Model": "iPhone X",
                // weex.config.env.deviceModel,
                "_ScreenSize": "2436x1125",
                // weex.config.env.deviceWidth+' x '+weex.config.env.deviceHeight,
                "_ClientVersion": "2.1",
                "_VXClientVersion": "2.1",
                "_CommType": "WIFI"
            };
=======
            // var head = {
            //     "_locale": "zh_CN",
            //     "BankId": "9999",
            //     "LoginType": "P",
            //     "_ChannelId": "PMBS",
            //     "ChnlId": "62",
            //     "version": "1.0",
            //     "appid": "test001",
            //     "charset": "UTF-8",
            //     "sequenceid": new Date().getTime() + "",
            //     "timestamp": new Date().getTime() + "",
            //     "algorithm": "SHA256withRSA",
            //     "BranchId": "8010000",
            //     "content-type": "application/json;charset=utf-8"
            // }
>>>>>>> cc5c066c3bc8c69de8951a866446ca3107b9aa5a
            this.openOverlay();
            stream.fetch(
                {
                    method: "GET",
<<<<<<< HEAD
                    url: `/pmobile/` + url + "?" + this.toParams(head) + "&" + this.toParams(data),
=======
                    url: `/pmobile/` + url + "?" + this.toParams(data),
>>>>>>> cc5c066c3bc8c69de8951a866446ca3107b9aa5a
                    type: "json",
                },
                response => {
                    this.closeOverlay();
                    // this.alertMsg(response);
                    this.alertMsg(response);

                    if (response.status != 200) {
                        this.alertMsg("网络异常" + response.status);
                        return;
                    }

                    if (response.data._RejCode != '000000') {
                        // this.alertMsg(response.data._RejCode);
                        failCallback(response.data);
                        return ;
                    }
                    //
                    // this.alertMsg(response.data._RejCode);
                    sucessCallback(response.data);



                }
            );
        },
        //增加公共参数
        // addCommonParams(params) {
        //     // 公共参数
        //     params["_locale"] = "zh_CN",
        //         params["BankId"] = "9999",
        //         params["LoginType"] = "P",
        //         params["_ChannelId"] = "PMBS",
        //         params["ChnlId"] = "62",
        //         params["version"] = "1.0",
        //         params["appid"] = "test001",
        //         params["charset"] = "UTF-8",
        //         params["sequenceid"] = new Date().getTime() + "",
        //         params["timestamp"] = new Date().getTime() + "",
        //         params["algorithm"] = "SHA256withRSA",
        //         params["BranchId"] = "8010000"
        //
        //
        //
        // }
    }
}