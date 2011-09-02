/* Author: 

*/

var TARGET_DAY  = 5,
    TARGET_HOUR = 16;

$(document).ready(function() {
  // $('#complete_message').hide();
  // $('#countdown_container').hide();
  
  var now = new Date();
  
  if (now.getDay() == TARGET_DAY && now.getHours() == TARGET_HOUR) {
    showCompleteMessage();
  } else {
    showCountdown();
    
    $('#countdown').countdown({
      image: 'img/digits.png',
      startTime: timeUntilBeerFriday(),
      timerEnd: function() {
        $('#countdown_container').slideUp(1000, function () {
          $('#countdown_container').hide();
          showCompleteMessage();
        });
      }
    });
  }
  
});

function showCompleteMessage() {
  $('#complete_message').hide();
  $('#complete_message').removeClass('hidden');
  $('#complete_message').fadeIn(2000);  
}

function showCountdown() {
  $('#countdown_container').hide();
  $('#countdown_container').removeClass('hidden');
  $('#countdown_container').fadeIn(1000);
}

// code to get the next friday
function timeUntilBeerFriday() {
  var nextFriday = dateOfNext(TARGET_DAY);
  nextFriday.setHours(TARGET_HOUR);
  nextFriday.setMinutes(0);
  nextFriday.setSeconds(0);
  
  var now       = $.now(),
      diffSecs  = (nextFriday - now) / 1000,
      secs      = Math.floor(diffSecs % 60),
      mins      = Math.floor(diffSecs/60)%60,
      hours     = Math.floor(diffSecs/60/60)%24,
      days      = Math.floor(diffSecs/60/60/24);

  return $.sprintf("%02s:%02s:%02s:%02s", days, hours, mins, secs);
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
