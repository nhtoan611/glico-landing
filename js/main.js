$(document).ready(function () {
  countdownTimer();
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
    var hourQuotient =  Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) / 10);
    var hourRemainder = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) % 10;
    var minuteQuotient =  Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60) / 10);
    var minuteRemainder = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) % 10;
    var secondQuotient = Math.floor((distance % (1000 * 60)) / 1000 / 10);
    var secondRemainder = Math.floor((distance % (1000 * 60)) / 1000) % 10;

  }, 1000);
}