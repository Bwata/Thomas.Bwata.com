
(function () {
  "use strict";
  BwataTimeline.Event.Presenter = {
    create: function (model, view) {
      var presenter = {};
      
      // presenter.render = function () {
        view.renderEvent(model.renderOptions());
      // }



      return presenter;
    }
  };
}());

(function () {
  "use strict";
  BwataTimeline.Event.Model = {
    create: function (evnt) {
      var model = {};
      var dateObj = new Date(evnt.eventDate);
      var title = evnt.eventTitle;
      var content = evnt.eventContents;


      model.setValues = function (values) {
        dateObj = new Date(values.eventDate);
        title = values.eventTitle;
        content = values.eventContents;

      };

      model.renderOptions = function () {
        return {
          top: ((dateObj.getTime()) - beginningInt) * pixelIncrament,
          title: title,
          formatDate: moment(dateObj).format('MMMM Do, YYYY'),
          dateUTC: dateObj.toUTCString(),
          content: content
        };
      }

      return model;
    }
  };
}());

(function () {
  "use strict";
  BwataTimeline.Event.View = {
    create: function (container, scrollObj) {
      var view = {};
      var eventNode = $('#event_template').clone();
      eventNode.attr("id", "");

      view.renderEvent  = function (options) {
        eventNode.css('top', options['top'] + "px");
        eventNode.find(".event_title_text").html(options['title']);
        eventNode.find("time").html(options['formatDate']);
        eventNode.find("time").attr("datetime", options['dateUTC']);
        eventNode.find(".event_body").html(options['content']);

        //eventNode.classList.toggle("hidden");
        container.append(eventNode);
      };

      view.setValues = function (options) {
        eventNode.css('top', options['top'] + "px");
        eventNode.find(".event_title_text").html(options['title']);
        eventNode.find("time").html(options['formatDate']);
        eventNode.find("time").attr("datetime", options['dateUTC']);
        eventNode.find(".event_body").html(options['content']);
        eventNode.hide().show();
      };

      // scrollObj.bind("scrolling", function (value) {
      //   console.log("got");
      // });

      return view;
    }
  };
}());

/*
event object
{
  id: 1,
  date: "7/09/14",
  title: "this is a test JSON",
  content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rutrum eu tellus congue ultricies. Sed pharetra ante odio, dictum rutrum est ultrices et. Nunc accumsan, eros.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rutrum eu tellus congue ultricies. Sed pharetra ante odio, dictum rutrum est ultrices et. </p>"
}
*/
