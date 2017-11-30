/*
 *  author: fxzh
 *  date: 2017/11/20
 *  email: 1334099433@qq.com
 */
;
(function() {
    var page = {
        _scrollTop: 0,
        isTop: true, // is or not top
        timer: null, // scroll 
        init: function() {
            page._scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            page._clientHeight = document.documentElement.clientHeight;
            page._clientWidth = document.documentElement.clientWidth;

            // Listener for nav scroll up and down 
            window.addEventListener("scroll", function() {
                page.fullScreen();
                page.toggleGoTopBtn();
            }, false);

            document.querySelector(".goTop").addEventListener("click", function() {
                page.goTop();
            });
        },
        // scroll up and down(nav show and hide)
        fullScreen: function() {
            var afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var differ = afterScrollTop - page._scrollTop;

            if (page._clientWidth > 480) {
                if (afterScrollTop > 50) {
                    if (differ <= 0) {
                        // scroll up
                        document.querySelector("header").style.top = "0px";
                    } else {
                        // scroll down
                        document.querySelector("header").style.top = "-100px";
                    }
                }
                // update _scrollTop
                page._scrollTop = afterScrollTop;
            }
        },

        // click event for goTop
        goTop: function() {
            var perTime = 30;

            var goTopFunc = function() {

                page.timer = setInterval(function() {
                    var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                    var ispeed = Math.floor(-osTop / 6); //floor() 方法执行的是向下取整计算，它返回的是小于或等于函数参数，并且与之最接近的整数。
                    document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;

                    page.isTop = true;
                    if (osTop == 0) {
                        clearInterval(page.timer);
                    }
                }, perTime);
            };

            goTopFunc();
        },

        // hide goTop btn while scroll down
        toggleGoTopBtn: function() {
            var goTop = document.querySelector(".goTop");
            var _scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (_scrollTop >= page._clientHeight) {
                goTop.style.opacity = 1;
            } else {
                goTop.style.opacity = 0;
            }

            if (!page.isTop) {
                clearInterval(page.timer);
            }
            page.isTop = false;
        }
    };
    page.init();

    var jump = function() {
        var m = $('#navbar-collapse ul li a[href^="#"]');

        for (var i = 0; i < m.length; i++) {
            m[i].addEventListener('click', function() {
                $("html, body").animate({
                    scrollTop: $($(this).attr("href")).offset().top + "px"
                }, {
                    duration: 500,
                    easing: "swing"
                });

                return false;
            }, false);
        }
    };

    jump();
})();