(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/warehouse/warehouse"],{1197:function(t,e,n){"use strict";(function(t,e){var o=n("4ea4");n("34b8");o(n("66fd"));var u=o(n("8820"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(u.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"18f8":function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uButton:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-button/u-button")]).then(n.bind(null,"eb85"))},"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,"7e06"))}},u=function(){var t=this.$createElement;this._self._c},i=[]},6528:function(t,e,n){"use strict";var o=n("d429"),u=n.n(o);u.a},8820:function(t,e,n){"use strict";n.r(e);var o=n("18f8"),u=n("d137");for(var i in u)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return u[t]}))}(i);n("6528");var a=n("f0c5"),r=Object(a["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=r.exports},d137:function(t,e,n){"use strict";n.r(e);var o=n("d6c2"),u=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=u.a},d429:function(t,e,n){},d6c2:function(t,e,n){"use strict";(function(t){var o=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=o(n("448a")),i=n("a865"),a={data:function(){return{list:[],queryForm:{companyName:"",pageNum:1,pageSize:10,warehouseName:""},total:0,searchtext:"",form:{warehouseName:"",maxCount:"",minCount:"",warehouseType:"1",sysUserid:+new Date}}},onLoad:function(){this.getWarehouse()},methods:{getWarehouse:function(){var t=this;(0,i.getWarehouseList)(this.queryForm).then((function(e){console.log(e),t.list=e.data.items,t.total=e.data.total}))},search:function(){var t=this;if(""!=this.searchtext){var e=this.list.filter((function(e){return e.warehouseName.includes(t.searchtext)}));this.list=e}else this.getWarehouse()},open:function(){this.$refs.popup.open()},close:function(){this.$refs.popup.close()},submit:function(){var e=this;(0,i.addWarehouse)(this.form).then((function(n){t.showToast({title:"新增成功"}),e.getWarehouse()})),this.close()},onReachBottom:function(){var e=this;this.queryForm.pageNum*this.queryForm.pageSize>=this.total?(t.showToast({title:"没有更多数据了",icon:"none",duration:1e3}),setTimeout((function(){t.hideLoading()}),500)):(this.queryForm.pageNum<=this.queryForm.pageNum-1?setTimeout((function(){t.hideLoading()}),500):(t.showLoading({title:"加载中"}),this.queryForm.pageNum++,(0,i.getWarehouseList)(this.queryForm).then((function(t){200==t.code&&(e.total=t.data.total,e.list=[].concat((0,u.default)(e.list),(0,u.default)(t.data.items)))}))),setTimeout((function(){t.hideLoading()}),500))}}};e.default=a}).call(this,n("543d")["default"])}},[["1197","common/runtime","common/vendor"]]]);