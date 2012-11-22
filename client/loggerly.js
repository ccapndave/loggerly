/** Testbar view **/
(function() {
    var addLog = function(timestamp, source, level, message) {
        return Logs.insert({ timestamp: timestamp, source: source, level: level, message: message });
    };

    _.extend(Template.testbar, {
        events: {
            "click #testInfoButton": function(e) {
                e.preventDefault();
                addLog($.now(), "127.0.0.1", "info", "This is a test info message");
            },
            "click #testWarningButton": function(e) {
                e.preventDefault();
                addLog($.now(), "127.0.0.1", "warn", "This is a test warning message");
            },
            "click #testErrorButton": function(e) {
                e.preventDefault();

                var a = "";
                a = a + "TypeError: Error #1009: Cannot access a property or method of a null object reference.\n";
                a = a + "at com.firstcourt.vi.view.results.components::ResultsView/setLiveViewData()[D:\\Projects\\Vulcan\\VI\\src\\com\\firstcourt\\vi\\view\\results\\components\\ResultsView.mxml:77]";
                a = a + "at Function/<anonymous>()[D:\\Projects\\Vulcan\\VI\\src\\com\\firstcourt\\vi\\view\\live\\LiveMediator.as:208]";
                a = a + "at Function/http://adobe.com/AS3/2006/builtin::apply()";
                a = a + " mx.core::UIComponent/callLaterDispatcher2()[C:\\autobuild\\3.x\\frameworks\\projects\\framework\\src\mx\\core\\UIComponent.as:8892]";
                a = a + "at mx.core::UIComponent/callLaterDispatcher()[C:\\autobuild\\3.x\\frameworks\\projects\\framework\src\mx\\core\\UIComponent.as:8832]";

                addLog($.now(), "127.0.0.1", "error", a);
            }
        }
    });
})();

/** Toolbar view **/
(function() {
    var toggleAndRefreshButton = function(e) {
        e.preventDefault();
        $(e.currentTarget).toggleClass("active");

        var selectedLevels = [];
        $(e.currentTarget).parent().find("button.active").each(function(idx, button) {
            selectedLevels.push(button.getAttribute("data-level"));
        });

        Session.set("selectedLevels", selectedLevels);
    };

    _.extend(Template.toolbar, {
        events: {
            "click .btn[data-type=level]": toggleAndRefreshButton,
            "input .search-query": function(e) {
                var searchTerm = $(e.currentTarget).val() || undefined;
                Session.set("searchTerm", searchTerm);
            },
            "click a[data-type=clear]": function(e) {
                var clear = e.currentTarget.getAttribute("data-clear") || undefined;

                bootbox.confirm("Are you sure you want to delete these logs?", function(confirmed) {
                    if (confirmed) {
                        switch (clear) {
                            case "all-except-fatal":
                                Logs.remove( { level: { $nin: [ "fatal" ] } } );
                                break;
                            case "all-except-error-fatal":
                                Logs.remove( { level: { $nin: [ "error", "fatal" ] } } );
                                break;
                            case "older-than-hour":
                                Logs.remove( { timestamp: { $lt: (1).hour().ago() } } );
                                break;
                            case "older-than-day":
                                Logs.remove( { timestamp: { $lt: (1).day().ago() } } );
                                break;
                            case "older-than-week":
                                Logs.remove( { timestamp: { $lt: (1).week().ago() } } );
                                break;
                            case "all":
                                Logs.remove();
                                break;
                        }
                    }
                });
            }
        }
    })
})();

/** Grid view **/
_.extend(Template.grid, {
    logs: function() {
        return Logs.find({}, { sort: { "timestamp": -1 } });
    }
});