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
				if(data.code == 10000) {
					sessionStorage.name=$('.logname').val();
					location.href = 'http://localhost:3000';

				} else {
					$('.logerror').html(data.info)
				}

			}

		});

	});
	$('.tlist').click(function(){		
		location.href='/u/'+sessionStorage.name;
		
	})


});
function addzero(str) {
	var str = str.replace(/((\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2}))/, function(e, $1, $2, $3, $4,$5,$6,$7) {
		$2=$2.length>1?$2:'0'+$2;
		$3=$3.length>1?$3:'0'+$3;
		$4=$4.length>1?$4:'0'+$4;
		$5=$5.length>1?$5:'0'+$5;
		$6=$6.length>1?$6:'0'+$6;
		$7=$7.length>1?$7:'0'+$7;
		return $2+'-'+$3+'-'+$4+' '+$5+':'+$7+':'+$6
	})
	return str
}