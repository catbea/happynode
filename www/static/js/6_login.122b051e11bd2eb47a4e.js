webpackJsonp([6],{P7ry:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("Xxa5"),a=r.n(n),o=r("mvHQ"),l=r.n(o),s=r("exGp"),c=r.n(s),u=r("zL8q"),i=r("YaEn"),p=r("j5zc"),m=r("jIA7"),f=r("QmSG"),d=r.n(f),b={data:function(){return{rules2:{account:[{validator:function(e,t,r){t&&"string"==typeof t?r():r(new Error("请输入账号"))},trigger:"blur"}],pwd:[{validator:function(e,t,r){t&&"string"==typeof t?r():r(new Error("请输入密码"))},trigger:"blur"}]},form:{account:"",pwd:""}}},methods:{onSubmit:function(e){var t,r=this;this.$refs.form.validate((t=c()(a.a.mark(function e(t){var n,o,s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=8;break}return e.next=3,Object(p.a)(d.a.apiHost+"/user/login",{method:"POST",body:l()(r.form)});case 3:n=e.sent,(o=n.data)&&200===o.code?(Object(u.Message)({message:"登录成功!",type:"success"}),Object(m.c)("token",o.data.token,720),i.a.push({name:"Works"})):(s=o?o.msg:"网络发生错误",Object(u.Message)({message:s,type:"error"})),e.next=10;break;case 8:return console.log("请先解决输入错误！"),e.abrupt("return",!1);case 10:case"end":return e.stop()}},e,r)})),function(e){return t.apply(this,arguments)}))},onJumpToSignIn:function(){console.log("跳转去注册！"),i.a.push({name:"SignIn"})}}},g={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-row",{staticStyle:{padding:"10px"},attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{xs:24,sm:16,md:12,lg:8,xl:6}},[r("h1",[e._v("HappyNode 登录")]),e._v(" "),r("el-form",{ref:"form",attrs:{rules:e.rules2,model:e.form,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"账号",prop:"account"}},[r("el-input",{attrs:{placeholder:"请输入账号",clearable:"",maxlength:"32"},model:{value:e.form.account,callback:function(t){e.$set(e.form,"account",t)},expression:"form.account"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码",prop:"pwd"}},[r("el-input",{attrs:{type:"password",placeholder:"请输入密码",clearable:"",maxlength:"32"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onSubmit(t):null}},model:{value:e.form.pwd,callback:function(t){e.$set(e.form,"pwd",t)},expression:"form.pwd"}})],1),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("登录")]),e._v(" "),r("el-button",{attrs:{type:"primary",plain:""},on:{click:e.onJumpToSignIn}},[e._v("注册")])],1)],1)],1)},staticRenderFns:[]},v=r("VU/8")(b,g,!1,null,null,null);t.default=v.exports}});
//# sourceMappingURL=6_login.122b051e11bd2eb47a4e.js.map