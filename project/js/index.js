
	$(function(){
        login_account();
    });
    function login_account(){

        $.post(
            "/artshop/TCustomerController/loginOk",
            {phone:'18709276530',password:'123'},
            function(data){
                if(data && data.sessionId){
                    // data.loginInfo = JSON.parse(data.loginInfo);
                    // $("#LoginBox").hide();
                    // $("#currentUserAID").html(data.loginInfo.name);
                    // cookieUtil.setCookie("loginSessionId",data.sessionId, "h24");
                    // cookieUtil.setCookie("loginSessionTime",data.time, "h24");
                    // cookieUtil.setCookie("loginId",data.loginInfo.id, "h24");
                    // cookieUtil.setCookie("loginAccount",data.loginInfo.login_id, "h24");
                    // cookieUtil.setCookie("phone",data.loginInfo.phone, "h24");
                    // window.location.href="/artshop";
                }else{
                    console.log("用户名或密码错误");
                }

            },"json"
        );
    }
