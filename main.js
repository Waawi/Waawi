// FORMS

function serializeJson(form) {
	var data = {};
	$.each($(form).serializeArray(), function () {
		data[this.name] = this.value;
	});
	return data;
}

$('#newsletter').validate({
	submitHandler: function (form) {
		var $form = $(form);
		$form.addClass('loading');

		var data = serializeJson(form);

		$form.find('input, button').attr('disabled', true);

		$.ajax({
			url: $(form).attr('action').replace('/post', '/post-json') + '&c=?',
			method: 'GET',
			data: data,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				if (data.result !== "success") {
					alert(data.msg);
					$form.find('input, button').attr('disabled', false);
				} else {
					form.reset();
					$form.addClass('sent').removeClass('loading');
				}
			},
			error: function (error) {
				alert(error);
				$form.find('input, button').attr('disabled', false);
			},
			complete: function () {
				$form.addClass('loading');
			}
		});
		return false;
	}
});