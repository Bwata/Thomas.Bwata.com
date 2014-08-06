var BwataTimeline = {};

BwataTimeline.Window = {
  init: function (startDate, endDate, pixelIncrament) {
    // var windowObj = {};
    // windowObj.scrolling = function () {
    //   $(window).scroll(function () {
    //     var halfWindow = $(window).height()/2;
    //     console.log($(window).scrollTop()+halfWindow);
    //     scroller.trigger("scrolling", $(window).scrollTop()+halfWindow);
    //   });
    // };

    return BwataTimeline.Window.Presenter.create(startDate, endDate, pixelIncrament);

    // return windowObj;
  }
}

BwataTimeline.Event = {
  init: function (evnt, scrollObj) {
    console.log(evnt);
    var container = $('#' + (evnt.timelineID-1) + '_timeline');
    return BwataTimeline.Event.Presenter.create(
      BwataTimeline.Event.Model.create(evnt),
      BwataTimeline.Event.View.create(container, scrollObj)
    );
  }
};

BwataTimeline.Timeline = {
  init: function (tmln, container) {
    BwataTimeline.Timeline.Presenter.create(
      BwataTimeline.Timeline.Model.create(tmln),
      BwataTimeline.Timeline.View.create(container)
    );
  }
};

BwataTimeline.Window = {
  init: function () {
    BwataTimeline.Window.Presenter.create(
      BwataTimeline.Window.Model.create(),
      BwataTimeline.Window.View.create()
    );
  }
};

BwataTimeline.DateMark = {
  init: function (beginningDatexx) {
    var beginningDate = new Date("12/1/2013");
    var nowDate = new Date();

    var nextDate = new Date(beginningDate);

    while (nextDate < nowDate) {
      console.log(nextDate.toUTCString());

      BwataTimeline.DateMark.Presenter.create(
        BwataTimeline.DateMark.Model.create(nextDate),
        BwataTimeline.DateMark.View.create()
      );

      nextDate = new Date(nextDate.getTime());
      nextDate.setMonth(nextDate.getMonth() + 1);
    }
  }
};

// BwataTimeline.Helpers = {
//   inFront: nil,
//   bringToFront: function (eventToFront) {
//     if (!inFront) {
//       inFront.css("z-index", 0);
//     }

//   }
// };
// $(window).scroll(function () {
//   var halfWindow = $(window).height()/2;
//   console.log($(window).scrollTop()+halfWindow);
//   BwataTimeline.Event.View.trigger("scrolling", $(window).scrollTop()+halfWindow);
// });

// var scrollTop = $(window).scrollTop();


function loadTimelines (successFunc) {
  $.ajax ({
    url: "timelineProcessing.php",
    type: "GET", //for none destructive, "POST" for destructive
    dataType: "json", //can be other things
    success: successFunc, //function name or un-namedfunction to perform for success
    error: errorFunction, //function name or un-named function to perform on failure
  });

  function errorFunction (xhr, status, strErr) {
    console.log("AJAX Fail");
    console.log(xhr);
    console.log(status);
    console.log(strErr);
  };

};

function loadEvents (timelineID, timelineIndex, successFunc) {
  $.ajax ({
    url: "timelineProcessing.php?id=" + timelineID,
    type: "GET", //for none destructive, "POST" for destructive
    dataType: "json", //can be other things
    success: successFunc, //function name or un-namedfunction to perform for success
    error: errorFunction, //function name or un-named function to perform on failure
  });

  function errorFunction (xhr, status, strErr) {
    console.log("AJAX Fail");
    console.log(xhr);
    console.log(status);
    console.log(strErr);
  };

};

/*
TODO
[x] build the timeline from scratch in timeline js.
[x] set the color of the timeline when created
[x] set un initiated timeline to specific colors.
[x] make time divisions in project.
[ ] ajax to call earliest date, beginning of that month
[x] end date is always current date
[ ] add zoom feature
[ ] ask about older or newer on top 
[ ] use the data-occupied
[ ] add click to bring event to top
*/