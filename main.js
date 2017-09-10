// HEADER

var scrolling = false;

function onScroll() {
	var top = $(window).scrollTop();
	if (top > 0) {
		if (!scrolling) {
			scrolling = true;
			$('header').addClass('scrolling');
		}
	} else {
		if (scrolling) {
			scrolling = false;
			$('header').removeClass('scrolling');
		}
	}
}

$(window).scroll(onScroll)
	.resize(onScroll);
onScroll();

// SMOOTH SCROLL
$('header a').click(function (ev) {
	if (this.href.indexOf(window.location.origin) !== 0) {
		return;
	}
	ev.preventDefault();
	var targetY = 0;
	var hash = this.hash;

	if (hash) {
		targetY = $(this.hash + ', a[name="' + this.hash.substr(1) + '"]').offset().top;
		targetY -= 80;
	}

	$('html, body').animate({
		scrollTop: targetY
	}, 500, function () {
		window.location.hash = hash;
	})
});

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
		$form.find('button').attr('disabled', true);

		$.ajax({
			url: $(form).attr('action').replace('/post', '/post-json') + '&c=?',
			method: 'GET',
			data: serializeJson(form),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				if (data.result !== "success") {
					alert(data.msg);
					$form.find('button').attr('disabled', false);
				} else {
					form.reset();
					$form.addClass('sent').removeClass('loading');
				}
			},
			error: function (error) {
				alert(error);
				$form.find('button').attr('disabled', false);
			},
			complete: function () {
				$form.addClass('loading');
			}
		});
		return false;
	}
});

$('.contact').validate({
	message: {
		minlength: 10
	},
	submitHandler: function (form) {
		var $form = $(form);
		$form.addClass('loading');
		$form.find('button').attr('disabled', true);

		$.ajax({
			url: $(form).attr('action'),
			method: $(form).attr('method'),
			data: serializeJson(form),
			dataType: "json",
			success: function () {
				form.reset();
				$form.addClass('sent').removeClass('loading');
			},
			error: function (error) {
				alert(error);
				$form.find('button').attr('disabled', false);
			},
			complete: function () {
				$form.addClass('loading');
			}
		});
	}
});