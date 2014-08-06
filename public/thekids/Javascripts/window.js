
(function () {
  "use strict";
  BwataTimeline.Window.Presenter = {
    create: function (startDate, endDate, pixelIncrament) {
      var presenter = {};
      var model = BwataTimeline.Window.Model.create(startDate, endDate, pixelIncrament);
      var view = BwataTimeline.Window.View.create($('body'));

      view.setHeight(model.getHeight());

      $(window).scroll(function () {
        //var halfWindow = $(window).height()/2;
        console.log($(window).scrollTop());
        presenter.trigger("scrolling", $(window).scrollTop());
      });

      return presenter;
    }
  };
}());


// var beginningInt = (new Date("12/1/2013")).getTime();
// var endingInt = (new Date()).getTime();
// var timeSpan = endingInt - beginningInt;
// var pixelIncrament = .0000005;

(function () {
  "use strict";
  BwataTimeline.Window.Model = {
    create: function (startDate, endDate, pixelIncrament) {
      var model = {};

      model.getHeight = function () {
        return ((endDate.getTime() - startDate.getTime()) - pixelIncrament);
      };

      




      return model;
    }
  };
}());

(function () {
  "use strict";
  BwataTimeline.Window.View = {
    create: function (container) {
      var view = {};

      view.setHeight = function (value) {
        container.css("height", value + "px");
      };


      



      return view;
    }
  };
}());


