	//check internet connection of user thru server request
	function checkInternet(){
		//return true if internet is ok	
		//return false if intenet is not ok
		var x = false;
		$.ajax({
			url : 'http://rescuemakati.cloudapp.net/check',
			type : "GET",
			dataType: "JSON",
			async : false,
			success: function(data){
				x = true;

			},
			error : function(xhr, ajaxOptions, thrownError){
				x =  false;
			}
		});
		return x;
	}
	function checkUserStatus(){
		userid = getUserInfo().userid;
		$.ajax({
			url : 'http://rescuemakati.cloudapp.net/user/status',
			type : 'GET',
			async: false,
			data : {userid : userid},
			success : function(data){
				obj = JSON.parse(localStorage.userinfo);
				obj.status = data.status;
				localStorage.userinfo = JSON.stringify(obj);
				
			}

		});
		return getUserInfo().status;
	}
	function updateInfoAlert(){
		alert("Please Update your Personal Details");
		// location.href = "#tab2";
		// $$("#tab2").addClass('active');
		$(".home-div").hide();	
		$(".hotlines-div").hide();	
		$(".info-div").show();	
	}

	//show home tab
	function showHome(x){
		$(".info-div").hide();	
		$(".hotlines-div").hide();	
		$(".home-div").show();
		$(".tab").parent().removeClass("active");
		$(x).parent().addClass("active");
		initialize(); //map initialization
	}

	//show info tab
	function showInfo(x){
		$(".home-div").hide();	
		$(".hotlines-div").hide();	
		$(".info-div").show();	
		$(".tab").parent().removeClass("active");
		$(x).parent().addClass("active");
	}

	//show hotlines tab
	function showHotlines(x){
		$(".home-div").hide();	
		$(".info-div").hide();	
		$(".hotlines-div").show();
		$(".tab").parent().removeClass("active");
		$(x).parent().addClass("active");
	}

	//sending emergency request to server
	/**
		request = emergency button
	**/
	function sendEmergency(request){
		// alert('sending');
		var server = "http://rescuemakati.cloudapp.net/request/add";
		var server2 = "http://192.168.1.105:1337/request/add";
		var data = JSON.stringify({request : request, userid : getUserInfo().userid, name : getUserInfo().firstname+' '+getUserInfo().lastname, age : getUserInfo().age, mobile : getUserInfo().mobile, lat : getMapInfo().lat, lng : getMapInfo().lng, address : getMapInfo().address });
		
		$.ajax({
			url : server,
			type : "POST",
			data : {
					data : data
			},
			success : function(data){
				alert(data.status);
			},
			error : function(err){
				console.log(err);
				alert('error');
			}
		});
	}
	//setting user info 
	function setUserInfo(userid, firstname, lastname, age, mobile, status){
		var userinfo = {userid : userid, firstname : firstname, lastname : lastname, age : age, mobile : mobile, status : status};
		localStorage.userinfo = JSON.stringify(userinfo);
	}


	//retrieve Map info from gmaps.js
	function getMapInfo(){
		return {lat : lat, lng : lng, address : address};
	}
	//retrieve user info from localStorage.userinfo
	function getUserInfo(){
		return JSON.parse(localStorage.userinfo);
	}
