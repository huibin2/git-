// import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//加载器
/*主页加载器*/
import Launcher from './views/launcher/launcher.vue'//主页加载器
import Tab_home from './views/tab_home/main.vue'//首页
import Tab_finance from './views/tab_finance/main.vue'//理财
import Tab_loan from './views/Tab_loan/main.vue'//贷款
import Tab_user from './views/tab_user/home_view.vue'//我的

import LauncherOther from './views/launcherOther/launcher.vue'//其他主页加载器
import Tab_homeOther from './views/tab_homeOther/main.vue'//首页

/*登录*/
import Login from './views/login/home_view.vue'//普通登录
import NoFirstLogin from './views/login/no_first_login_view.vue' // 非首次登录
import Gersture from './views/login/gersture_view.vue'//手势登录
import Fingerprint from './views/login/fingerprint_view.vue'//指纹登录
import Face from './views/login/face_view.vue'//人脸登录
import TestAllLogin from './views/login/test_function.vue' // 测试所有登录方式

/*引导设置手势登录*/
import BootLogin from './views/login/bootLogin.vue'//设置手势登录密码页
import TestBootLogin from './views/login/testBootLogin.vue'//设置手势登录密码页


/*透明页面*/
import QrCode from './views/transparent/qrcode.vue' // 扫描二维码
import Contact from './views/transparent/contact.vue' // 通讯录

/*重置密码*/
import ResetPassword from './views/resetPassword/resetpassword.vue' // 重置密码身份验证
import SetPassword from './views/resetPassword/setpassword.vue' // 设置新密码
import SetPasswordResult from './views/resetPassword/setpasswordresult.vue' //设置新密码结果

/*找回密码*/
import ForgetPassword from './views/forgetPassword/forgetpwd_view.vue'
import FindPassword from './views/forgetPassword/findpwd_view.vue'
import FindPasswordResult from './views/forgetPassword/findpwdresult_view.vue'
import Identify_P from './views/forgetPassword/identify_P.vue'
import Identify_T from './views/forgetPassword/identify_T.vue'


/*设备绑定*/
import DeviceBinding from './views/deviceBinding/devicebinding.vue'
import DeviceBindingResult from './views/deviceBinding/devicebindingresult.vue'

/*注册*/
import RegisterFirst from './views/register/RegisterFirst.vue'//注册第一步 注册手机号
import RegisterPassword from './views/register/registerPassword.vue'//设置手机登录密码
import RegisterPhoneSuccess from './views/register/registerPhoneSuccess.vue'//设置登录密码成功页  
import RegisterAccount from './views/register/registerAccount.vue'//本行账户  设置加挂账户
import RegisterAccountNext from './views/register/registerAccountNext.vue'//继续填写加挂信息
import RegisterAccountResult from './views/register/registerAccountResult.vue'//加挂结果页
import RegisterCif from './views/register/registerCif.vue'//不是本行账户  开电子账户--身份验证页
import RegisterCifSecond from './views/register/registerCifSecond.vue'//身份验证信息核对页
import RegisterSuccess from './views/register/registerSuccess.vue'//身份验证成功页
import RegisterOpenCard from './views/register/registerOpenCard.vue'//开户页
import RegisterDetail from './views/register/registerDetail.vue'//开户页下的详情页
import RegisterSetPwd from './views/register/registerSetPwd.vue'//开户页下的设置取款密码
import RegisterOpenCardResult from './views/register/registerOpenCardResult.vue'//开户结果页



/*我的-安全设置*/
import SafeSet from './views/tab_user/safe_set.vue' 
/*登录密码修改*/
import updateLoginPwd from './views/tab_user/updateLoginPwd.vue'

import setPOS from './views/tab_user/setPOS.vue' //pos限额设置

import setATM from './views/tab_user/setATM.vue' //ATM限额设置

import gestureLoginSet from './views/tab_user/setGesture.vue' //手势登录
import SetGestureLock from './views/tab_user/setGestureLock.vue' //设置手势登录密码
import TestGestureLock from './views/tab_user/testGestureLock.vue' //验证手势登录密码
import SetGestureSuccess from './views/tab_user/setGestureSuccess.vue' //设置手势登录密码成功
import CloseGestureLock from './views/tab_user/closeGestureLock.vue' //关闭手势登录设置
import CloseGestureSuccess from './views/tab_user/closeGestureSuccess.vue' //关闭手势登录设置成功
import VerifyTestGestureLock from './views/tab_user/verifyTestGestureLock.vue' //修改手势登录设置验证页
import VerifyGestureLock from './views/tab_user/verifyGestureLock.vue' //修改手势登录设置页
import VerifyGestureLockTest from './views/tab_user/verifyGestureLockTest.vue' //修改手势登录设置验证页
import VerifyGestureSuccess from './views/tab_user/verifyGestureSuccess.vue' //修改手势登录设置成功页

import fingerLoginSet from './views/tab_user/setFinger.vue' //指纹登录设置

import ATM_SetSuccess from './views/tab_user/ATM_setSuccess.vue' //设置成功

import POS_SetSuccess from './views/tab_user/POS_setSuccess.vue' //设置成功

import updateLoginPwd_success from './views/tab_user/updateLoginPwd_success' //设置成功


export default new Router({
    // mode: 'abstract',
    routes: [
        {
            path: '/Launcher',
            component: Launcher
        },
        {
            path: '/LauncherOther',
            component: LauncherOther
        },
        {
            path: '/Tab_home',
            component: Tab_home
        },
        {
            path: '/Tab_homeOther',
            component: Tab_homeOther
        },
        {
            path: '/Tab_finance',
            component: Tab_finance
        },
        {
            path: '/Tab_loan',
            component: Tab_loan
        },
        {
            path: '/Tab_user',
            component: Tab_user
        },
        {
            path: '/Login',
            component: Login
        },
        {
            path: '/NoFirstLogin',
            component: NoFirstLogin
        },
        {
            path: '/Gersture',
            component: Gersture
        },
        {
            path: '/Fingerprint',
            component: Fingerprint
        },
        {
            path: '/Face',
            component: Face
        },
        {
            path: '/TestAllLogin',
            component: TestAllLogin
        },
        {
            path: '/BootLogin',
            component: BootLogin
        },
        {
            path: '/TestBootLogin',
            component: TestBootLogin
        },

        {
            path: '/qrCode',
            component: QrCode
        }, {
            path: '/Contact',
            component: Contact
        },

        {
            path: '/ResetPassword',
            component: ResetPassword
        }, {
            path: '/SetPassword',
            component: SetPassword
        }, {
            path: '/SetPasswordResult',
            component: SetPasswordResult
        },

        {
            path: '/ForgetPassword',
            component: ForgetPassword
        }, {
            path: '/FindPassword',
            name: 'FindPassword',
            component: FindPassword
        }, {
            path: '/Identify_P',
            name: 'Identify_P',
            component: Identify_P
        }, {
            path: '/Identify_T',
            name: 'Identify_T',
            component: Identify_T
        }, {
            path: '/FindPasswordResult',
            component: FindPasswordResult
        },

        {
            path: '/DeviceBinding',
            component: DeviceBinding
        }, {
            path: '/DeviceBindingResult',
            component: DeviceBindingResult
        },

        {
            path: '/RegisterFirst',
            component: RegisterFirst
        },
        {
            path: '/RegisterPassword',
            component: RegisterPassword
        },
        {
            path: '/RegisterPhoneSuccess',
            component: RegisterPhoneSuccess
        },
        {
            path: '/RegisterCif',
            component: RegisterCif
        },
        {
            path: '/RegisterCifSecond',
            name: 'registersecond',
            component: RegisterCifSecond
        },
        {
            path: '/RegisterSuccess',
            component: RegisterSuccess
        },
        {
            path: '/RegisterOpenCard',
            component: RegisterOpenCard
        },
        {
            path: '/RegisterDetail',
            component:RegisterDetail
        },
        {
            path: '/RegisterSetPwd',
            component:RegisterSetPwd
        },
        {
            path: '/RegisterOpenCardResult',
            component:RegisterOpenCardResult
        },
        {
            path: '/RegisterAccount',
            component: RegisterAccount
        },
        {
            path:'/RegisterAccountNext',
            component:RegisterAccountNext
        },
        {
            path:'/RegisterAccountResult',
            component:RegisterAccountResult
        },
        {
            path: '/SafeSet',
            component: SafeSet
        },
        {
            path: '/updateLoginPwd',
            component: updateLoginPwd
        },
        {
            path: '/setATM',
            component: setATM
        },
        {
            path: '/setPOS',
            component: setPOS
        },
        {
            path: '/gestureLoginSet',
            component: gestureLoginSet
        },
        {
            path: '/SetGestureLock',
            component: SetGestureLock
        },
        {
            path: '/TestGestureLock',
            component: TestGestureLock
        },
        {
            path: '/SetGestureSuccess',
            component: SetGestureSuccess
        },
        {
            path: '/CloseGestureLock',
            component: CloseGestureLock
        },
        {
            path: '/CloseGestureSuccess',
            component: CloseGestureSuccess
        },
        {
            path: '/VerifyTestGestureLock',
            component: VerifyTestGestureLock
        },
        {
            path: '/VerifyGestureLock',
            component: VerifyGestureLock
        },
        {
            path: '/VerifyGestureLockTest',
            component: VerifyGestureLockTest
        },
        {
            path: '/VerifyGestureSuccess',
            component: VerifyGestureSuccess
        },
        {
            path: '/fingerLoginSet',
            component: fingerLoginSet
        },
        {
            path: '/ATM_SetSuccess',
            component: ATM_SetSuccess
        },
        {
            path: '/POS_SetSuccess',
            component: POS_SetSuccess
        },
        {
            path: '/updateLoginPwd_success',
            component: updateLoginPwd_success
        },



        {
            path: '/',
            redirect: '/NoFirstLogin'
        }
    ]
})