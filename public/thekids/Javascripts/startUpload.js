var testPresenter;
var timelineView;

$( document ).ready(function() {
  timelineView = $("#1_timeline");

  $('.timeline_col').css("height", $(window).height() + "px");
  $("#textInput").cleditor();
  //var dateObj = new Date()

  testPresenter = BwataTimeline.Event.TestPresenter.create (
    null,
    BwataTimeline.Event.View.create(timelineView));

  testPresenter.firstRender();

});

function showText () {
  //var text = $("#textInput")[0].value;

  var form = document.forms[0];

  testPresenter.setAll(form["title"].value, form["date"].value, form["content"].value);
  testPresenter.showChanges();

  console.log($('input[name="kid"]:checked'));

  if ($('input[name="kid"]:checked').val() === "1") {
    console.log("YES");
    timelineView.toggleClass("timeline_colorBlue", true);
    timelineView.toggleClass("timeline_colorRed", false);
  } else {
    console.log("NO");
    timelineView.toggleClass("timeline_colorBlue", false);
    timelineView.toggleClass("timeline_colorRed", true);
  }
  
};



BwataTimeline.Event.TestPresenter = {
    create: function (model, view) {
      var presenter = {};

      var shellModel = {
        top: 100,
        title: "title",
        formatDate: moment().format('MMMM Do, YYYY'),
        dateUTC: new Date().toUTCString(),
        content: "<p>This is where the input content will be placed for testing"
      }
      
      var setTitle = function (value) {
        shellModel.title = value;
      };

      var setDateVal = function (value) {
        var dateThing = new Date(value);
        shellModel.formatDate = moment(dateThing).format('MMMM Do, YYYY');
        shellModel.dateUTC = dateThing.toUTCString();
      };

      var setContent = function (value) {
        shellModel.content = value;
      };

      presenter.setAll = function (title, date, content) {
        setTitle(title);
        setDateVal(date);
        setContent(content);
      };

      presenter.showChanges = function () {
        view.setValues(shellModel);
      };

      presenter.firstRender = function () {
        view.renderEvent(shellModel);
      };



      return presenter;
    }
  };

//BwataTimeline.Event.init(results[i]);