$(document).ready(function () {
    var parallax = $(".parallax");

    $(window).scroll(function () {
      var yPos = $(window).scrollTop();
      parallax.css("background-position", "center " + yPos * 0.4 + "px");
    });
});

