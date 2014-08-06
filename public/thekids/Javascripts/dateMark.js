
(function () {
  "use strict";
  BwataTimeline.DateMark.Presenter = {
    create: function (model, view) {
      var presenter = {};
      view.renderAll(model.getRenderInfo());
      return presenter;
    }
  };
}());

(function () {
  "use strict";
  BwataTimeline.DateMark.Model = {
    create: function (dateObj) {
      var model = {};

      model.getRenderInfo = function () {
        return {
          month: moment(dateObj).format('MMMM'),
          year: dateObj.getFullYear(),
          top: ((dateObj.getTime()) - beginningInt) * pixelIncrament,
          dateUTC: dateObj.toUTCString()
        };
      };
     
      return model;
    }
  };
}());

(function () {
  //"use strict";
  BwataTimeline.DateMark.View = {
    create: function () {
      var view = {};

      var timeline_cols = [document.getElementById("0_timeline"),document.getElementById("1_timeline")];
      var dateMarkNodes = [document.getElementById('date_mark_template').cloneNode(true),document.getElementById('date_mark_template').cloneNode(true)];

      view.renderAll  = function (options) {
        renderSingle(0, options["dateUTC"], options["month"], options["top"]);
        renderSingle(1, options["dateUTC"], options["year"], options["top"]);
      };

      renderSingle = function (colIndex, dateUTC, text, top) {
        dateMarkNodes[colIndex].style.top = top + "px";
        dateMarkNodes[colIndex].getElementsByTagName("time")[0].innerHTML = text;
        dateMarkNodes[colIndex].getElementsByTagName("time")[0].setAttribute("datetime", dateUTC);
        timeline_cols[colIndex].appendChild(dateMarkNodes[colIndex]);
      };

      return view;
    }
  };
}());


// <div class="date_mark">
//     <h4 class="date_mark_label">
//         January
//     </h4>
// </div>