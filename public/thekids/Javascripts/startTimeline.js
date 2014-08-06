//set Global variables
var beginningInt = (new Date("12/1/2013")).getTime();
var endingInt = (new Date()).getTime();
var timeSpan = endingInt - beginningInt;
var pixelIncrament = .0000005;

var scrollObj = null;

var loadEventsSuccess = function (result) {
    var results = result["events"];
    var i;
    var length = results.length;
    for (i = 0; i < length; i++) {
      BwataTimeline.Event.init(results[i]);
    }
  };

var loadTimelineSuccess = function (result) {
  var results = result["timelines"];
  var i;
  var length = results.length;
  for (i = 0; i < length; i++) {
    BwataTimeline.Timeline.init(results[i], document.getElementById(i + "_timeline"));
    loadEvents(results[i]["timelineID"], i, loadEventsSuccess);
  }
};


$( document ).ready(function() {

  

  $('.timeline_col').css("height", (timeSpan * pixelIncrament) + "px");
  

  loadTimelines(loadTimelineSuccess);

  BwataTimeline.DateMark.init(4);
});