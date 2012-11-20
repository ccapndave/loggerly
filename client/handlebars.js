Handlebars.registerHelper("formatDate", function(timestamp) {
    return new Date(timestamp).toString("dd MMM yyyy, HH:mm");
});

Handlebars.registerHelper("logLevelClass", function(level) {
    switch (level) {
        case "info":
            return "info";
        case "warn":
            return "warning";
        case "error":
            return "error";
        default:
            return "";
    }
});