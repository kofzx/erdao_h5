$(document).ready(function() {

	new fullpage('#fullpage', {
		autoScrolling:true,
		scrollHorizontally: true,
		verticalCentered: false,
		afterLoad: function(origin, destination, direction) {
			$(origin.item).find(".some-text").addClass("some-text-anim");
		},
		onLeave: function(origin, destination, direction) {
			$(origin.item).find(".some-text").removeClass("some-text-anim");
		},
	});

	var audio = document.getElementById("audio");
	var audioController = document.querySelector(".bgm-btn");

	// 自定义浏览器标签切换事件
	// 参数有两个，分别为onShow, onHide回调
	window.onTabChange(
		function() {
			audio.play()
				.then(() => {
					audioController.style.animationPlayState = "running";
				})
				.catch(() => {})
		}, 
		function() {
			pauseAudio();
		}
	);

	// 音频播放事件
	$("body").on("click", function(e) {
		if ($(e.target).hasClass("bgm-btn")) {
			if (audio.paused) {
				playAudio();
			} else {
				pauseAudio();
			}
		} else {
			playAudio();
		}
	})

	function playAudio() {
		audio.play();
		audioController.style.animationPlayState = "running";
	}

	function pauseAudio() {
		audio.pause();
		audioController.style.animationPlayState = "paused";
	}
	
});