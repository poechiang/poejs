define(function(){
	'use strict'

	return {
		ref:'_def_',
		ui:'',//modal|toast|loading|notify|input|verif
		title:{text:'',min:false,close:false},//{text:'',min:false,close:false},
		anim:true,
		mask:true,
		type:'',//info,success|error|warn
		align:'center',
		during:0,//ui显示时长，0表示无限时长，需要手动或通过API关闭
		delay:50,
		abort:{
			text:'放弃',
			cb:function(){},
		},
		icon:{color:'#ffffff'},
		cancel:{
			text:'取消',
			cb:function(){},
		},
		confirm:{
			text:'确认',
			cb:function(){},
		},
		movable:false,
	}
})