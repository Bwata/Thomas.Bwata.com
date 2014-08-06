(function () {
  //"use strict";
  BwataTimeline.Timeline.Presenter = {
    create: function (model, view) {
      view.setTitle(model.getTitle());
      view.setColor(model.getColorName());
      

    }
  };
}());

(function () {
  //"use strict";
  BwataTimeline.Timeline.Model = {
    create: function (timeline) {
      var model = {};
      var selfTimeline = timeline;
      

      model.getTitle = function () {
        return timeline.timelineTitle;
      };

      model.getColorName = function () {
        return timeline.timelineColorName;
      }


      return model;
    }
  };
}());

(function () {
  "use strict";
  BwataTimeline.Timeline.View = {
    create: function (container) {
      var view = {};
      var selfContainer = container;

      view.setTitle = function (title) {
        $(".timeline_label_text", selfContainer).text(title);
      };

      view.setColor = function (colorName) {
        container.className = container.className + (" timeline_" + colorName);
      };

      return view;
    }
  };
}());




/*
  Timeline Object

  {
    id: 1,
    title: "Testing",
    colorName: "colorGreen",
    events: {
      {
        id: 1,
        date: "7/09/14",
        title: "this is a test JSON",
        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rutrum eu tellus congue ultricies. Sed pharetra ante odio, dictum rutrum est ultrices et. Nunc accumsan, eros.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rutrum eu tellus congue ultricies. Sed pharetra ante odio, dictum rutrum est ultrices et. </p>"
      }

      {
        id: 1,
        date: "7/1/14",
        title: "this is a test JSON2",
        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rutrum eu tellus congue ultricies. Sed pharetra ante odio, dictum rutrum est ultrices et. Nunc accumsan, eros.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rutrum eu tellus congue ultricies. Sed pharetra ante odio, dictum rutrum est ultrices et. </p>"
      }
    }
  }


*/