$(function() {

	$('#regsub').click(function() {
		$.ajax({
			type: "post",
			url: "/reg",
			async: true,
			data: {
				name: $('.regname').val(),
				password: $('.regpd').val(),
				repassword: $('.regrepd').val(),
				email: $('.regemail').val()
			},
			success: function(data) {
				if(data.code == '10000') {
					location.href = 'http://localhost:3000/login';
				} else {
					$('.reerror').html(data.info)
				}
			}

		});
	});
	$('.login').click(function() {

		$.ajax({
			type: 'post',
			url: '/login',
			data: {
				name: $('.logname').val(),
				password: $('.logpd').val()
			},
			success: function(data) {
				if(data.code==10000){
					location.href='http://localhost:3000';
					
				}else{
					$('.logerror').html(data.info)
				}

			}

		});

	})
	
	$('.postbtn').click(function(){
		$.ajax({
			type:"post",
			url:"/post",
			async:true,
			data:{
				title:$('.posttitle').val(),
				post:$('.posttext').val()
			},
			success:function(data){
				
				console.log(data)
				
			}
		});	
	});
	

})