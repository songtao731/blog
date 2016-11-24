$(function() {

	$.ajax({
		type: "get",
		url: "/api/getAll",
		async: true,
		success: function(data) {
				data.reverse();
				console.log(data)
			if(data.length&&data[0].url) {			
				
				$('.maintitle').html('<div class="maintitle"><h3><span>标题</span><span>' + data[0].title + '</span></h3>\
			<p><span>作者:</span><span>' + data[0].name + '</span>\
			</p>\<p><span>日期:</span><span>' + addzero(data[0].time) + '</span></p>\
			<p>' + data[0].post + '</p>\
			<p><img src="'+ data[0].url.substring(6)+'"></p>\
			</div>')
			}else{
					$('.maintitle').html('<div class="maintitle"><h3><span>标题</span><span>' + data[0].title + '</span></h3>\
			<p><span>作者:</span><span>' + data[0].name + '</span>\
			</p>\<p><span>日期:</span><span>' + addzero(data[0].time) + '</span></p>\
			<p>' + data[0].post + '</p>\
			</div>')
				
			}
			
		}

	});

})

