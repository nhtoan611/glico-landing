$(document).ready(function () {
  countdownTimer();
  $("#btn-store").click(function () {
    $('html, body').animate({
      scrollTop: $("#store-location-page").offset().top
    }, 1000);
  });
});

function countdownTimer() {
  var countDownDate = new Date("Jan 1, 2020 00:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    var dayQuotient = Math.floor(distance / (1000 * 60 * 60 * 24) / 10);
    var dayRemainder = Math.floor(distance / (1000 * 60 * 60 * 24)) % 10;
    var hourQuotient = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) / 10);
    var hourRemainder = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) % 10;
    var minuteQuotient = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60) / 10);
    var minuteRemainder = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) % 10;
    var secondQuotient = Math.floor((distance % (1000 * 60)) / 1000 / 10);
    var secondRemainder = Math.floor((distance % (1000 * 60)) / 1000) % 10;

    $("#day-quotient").text(dayQuotient);
    $("#day-remainder").text(dayRemainder);
    $("#hour-quotient").text(hourQuotient);
    $("#hour-remainder").text(hourRemainder);
    $("#minute-quotient").text(minuteQuotient);
    $("#minute-remainder").text(minuteRemainder);
    $("#second-quotient").text(secondQuotient);
    $("#second-remainder").text(secondRemainder);

  }, 1000);
}