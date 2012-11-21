/** Testbar view **/
_.extend(Template.testbar, {
    events: {
        "click #testInfoButton": function(e) {
            e.preventDefault();
            Logs.addLog($.now(), "127.0.0.1", "info", "This is a test info message");
        },
        "click #testWarningButton": function(e) {
            e.preventDefault();
            Logs.addLog($.now(), "127.0.0.1", "warn", "This is a test warning message");
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

            Logs.addLog($.now(), "127.0.0.1", "error", a);
        }
    }
});

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
            "click .btn.level": toggleAndRefreshButton,
            "input .search-query": function(e) {
                var searchTerm = $(e.currentTarget).val() || undefined;
                Session.set("searchTerm", searchTerm);
            }
        }
    })
})();

/** Grid view **/
_.extend(Template.grid, {
    logs: function() {
        return Logs.getAllLogs({ levels: Session.get("selectedLevels"), searchTerm: Session.get("searchTerm") });
    }
});