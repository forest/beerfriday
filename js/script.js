/* Author: 

*/

var MINUTES     = 1000*60,
    HOURS       = MINUTES*60,
    DAYS        = HOURS*24,
    YEARS       = DAYS*365,
    TARGET_DAY  = 5,
    TARGET_HOUR = 16;

$(document).ready(function() {
  // log(timeUntilBeerFriday());
  
  var now = new Date();
  
  if (now.getDay() == TARGET_DAY && now.getHours() >= TARGET_HOUR) {
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
    
    if (now.getDay() == TARGET_DAY && now.getHours() >= (TARGET_HOUR - 1))
      showAlmostTimeMessage();
 }  
});

function showCompleteMessage() {
  $('#almost_time').hide();
  $('#almost_time').addClass('hidden');
  $('#complete_message').hide();
  $('#complete_message').removeClass('hidden');
  $('#complete_message').fadeIn(2000);
  
}

function showAlmostTimeMessage() {
  $('#almost_time').hide();
  $('#almost_time').removeClass('hidden');
  $('#almost_time').fadeIn(2000);  
}

function showCountdown() {
  $('#countdown_container').hide();
  $('#countdown_container').removeClass('hidden');
  $('#countdown_container').fadeIn(1000);
}

// code to get the next friday
function timeUntilBeerFriday() {
  var today      = new Date(),
      beerFriday = (today.getDay() == TARGET_DAY) ? new Date() : dateOfNext(TARGET_DAY);
      
  // force time to be target time
  beerFriday.setHours(TARGET_HOUR);
  beerFriday.setMinutes(0);
  beerFriday.setSeconds(0);
  
  var now       = today.getTime(),
      diffSecs  = (beerFriday - now) / 1000,
      secs      = Math.floor(diffSecs % 60),
      mins      = Math.floor(diffSecs/60)%60,
      hours     = Math.floor(diffSecs/60/60)%24,
      days      = Math.floor(diffSecs/60/60/24);

  // log("diffSecs:"+diffSecs);
  // log("today:"+today);
  // log("beerFriday:"+beerFriday);
  // log("now:"+now);
  // log("days:"+days);
  // log("hours:"+hours);
  // log("mins:"+mins);
  // log("secs:"+secs);
  
  return $.sprintf("%02s:%02s:%02s:%02s", days, hours, mins, secs);
}

function addDays(myDate,days) {
    return new Date(myDate.getTime() + days*24*60*60*1000);
}

function subtractDays(myDate,days) {
    return new Date(myDate.getTime() - days*24*60*60*1000);
}

function dateOfNext(weekdayNumber) {
    var today       = new Date(),
        lastSunday  = subtractDays(today, today.getDay()),
        daysToAdd = weekdayNumber;
        
    if (weekdayNumber <= today.getDay()) {
        daysToAdd = daysToAdd + 7;
    }

    return addDays(lastSunday, daysToAdd);
}
