
document.addEventListener('plusready',  ()=> {
    let webview = plus.webview.currentWebview();
    let isIndex = false
    plus.key.addEventListener('backbutton',  ()=> {
        webview.canBack( (e) =>{
            if (e.canBack) {
	            webview.back()
	            isIndex = false
	            // window.history.go(-1)
            } else {
	            isIndex = true
	            //首页返回键处理
                //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                let first = null;
                plus.key.addEventListener('backbutton', () =>{
	                //首次
	                // ，提示‘再按一次退出应用’
                    if (!first) {
	                    if(isIndex === true){
		                    plus.nativeUI.toast("再按一次退出应用");
	                    }
                        first = new Date().getTime();
                        // alert('再按一次退出应用');//返回提示
                        setTimeout( () =>{
                            first = null
	                        isIndex = false
                        }, 1000)
                    } else {
                        if (new Date().getTime() - first < 2500) {
                            plus.runtime.quit()
                        }
                    }
                }, false);
            }
        })
    });
});



