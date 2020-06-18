$(document).ready(function() {

	var animCls = ".-anim";

	new fullpage('#fullpage', {
		anchors: ['firstPage', 'secondPage', 'thirdPage'],
		css3: false,
		autoScrolling:true,
		scrollHorizontally: true,
		verticalCentered: false,
		afterLoad: function(origin, destination, direction) {
			console.log("afterLoad--->");
			console.log(origin, destination);

			var $originItem = $(origin.item);
			
			if (origin.index === destination.index) {
				$originItem.find(animCls).each(function(_, item) {
					addClass($(item));
				});
				// 自定义动画
				if (origin.index === 0) {
					setTimeout(function() {
						$originItem.find(".bubble").animate({ opacity: 1 }, 1000);
					}, 400);
				}
			} else {
				// 滚动完全后才移除当前页的动画
				$originItem.find(animCls).each(function(_, item) {
					removeClass($(item));
				});
				// 自定义动画
				if (origin.index === 0) {
					$originItem.find(".bubble").animate({ opacity: 0 }, 0);
				}
			}
		},
		onLeave: function(origin, destination, direction) {
			console.log("onLeave--->");
			console.log(origin, destination);

			var $destinationItem = $(destination.item);
			
			// 在滚动完全前就执行动画
			$destinationItem.find(animCls).each(function(_, item) {
				// 添加延迟，防止动画播放过快
				setTimeout(function() {
					addClass($(item));
				}, 200);
			});
			// 自定义动画
			if (destination.index === 0) {
				setTimeout(function() {
					$destinationItem.find(".bubble").animate({ opacity: 1 }, 1000);
				}, 400);
			}
		},
	});

	function addClass($target) {
		var animation = $target.data("animation"),
			animationDelay = $target.data("animation-delay"),
			animationDuration = $target.data("animation-duration"),
			animationComplete = $target.data("animation-complete");

		if (animationDelay) {
			setTimeout(function() {
				_addClass($target);
				_animateWithDuration();
			}, animationDelay);
		} else {
			_addClass($target);
			_animateWithDuration();
		}

		function _addClass() {
			$target.removeClass("hidden").addClass(animation + " visible");
		}

		function _animateWithDuration() {
			if (animationDuration) {
				setTimeout(function() {
					removeClass($target);
					setTimeout(function() {
						$target.removeClass("hidden").addClass(animation + " visible " + animationComplete);
					}, 50);
				}, animationDuration);
			}
		}
	}

	function removeClass($target) {
		$target.removeClass($target.data("animation")  + " visible " + $target.data("animation-complete")).addClass("hidden");
	}

	var audio = document.getElementById("audio");
	var audioController = document.querySelector(".bgm-btn");

	// 自定义浏览器标签切换事件
	// 用于实现切换浏览器标签，控制音乐的开关
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