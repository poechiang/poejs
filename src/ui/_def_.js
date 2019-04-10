define(function(){
	'use strict'

	return {
		ref:'_def_',
		ui:'',//modal|toast|loading|notify|input|verif
		title:false,//{text:'',min:false,close:false},
		anim:true,
		mask:true,
		type:'',//info,success|error|warn
		align:'center',
		during:0,//ui显示时长，0表示无限时长，需要手动或通过API关闭
		delay:50,
		abort:false,
		icon:{color:'#ffffff'},
		cancel:{
			text:'取消',
			cb:function(){},
			color:'#888888',
		},
		confirm:{
			text:'确认',
			cb:function(){},
			color:'#414141',
		},
		autoRemove:false,
	}
})