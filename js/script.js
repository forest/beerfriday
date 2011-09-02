/* Author: 

*/


jQuery(document).ready(function() {
  $('#countdown').countdown({
    image: 'img/digits.png',
    startTime: timeUntilBeerFriday(),
    timerEnd: function() {
      $('#countdown_container').slideUp();
      $('#complete_message').slideDown();
    }
  });
});

// code to get the next friday
function timeUntilBeerFriday() {
  var nextFriday = dateOfNext(5);
  nextFriday.setHours(16);
  nextFriday.setMinutes(0);
  nextFriday.setSeconds(0);
  
  var now       = jQuery.now(),
      diffSecs  = (nextFriday - now) / 1000,
      secs      = Math.floor(diffSecs % 60),
      mins      = Math.floor(diffSecs/60)%60,
      hours     = Math.floor(diffSecs/60/60)%24,
      days      = Math.floor(diffSecs/60/60/24);

  return jQuery.sprintf("%02s:%02s:%02s:%02s", days, hours, mins, secs);
}

function addDays(myDate,days) {
    return new Date(myDate.getTime() + days*24*60*60*1000);
}

function subtractDays(myDate,days) {
    return new Date(myDate.getTime() - days*24*60*60*1000);
}

function dateOfNext(weekdayNumber) {
    var today = new Date();

    var lastSunday = subtractDays(today, today.getDay());

    var daysToAdd = weekdayNumber;
    if (weekdayNumber <= today.getDay()) {
        daysToAdd = daysToAdd + 7;
    }

    return addDays(lastSunday, daysToAdd);
}