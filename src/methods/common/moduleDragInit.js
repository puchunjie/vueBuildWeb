exports.dragInit = function(_this) {
    $(_this.$el).find(".side-module").draggable({
        //revert: true,
        helper: function() {
            return $(this).clone().addClass("dragHelper").appendTo("body");
        },
        start: function(event) {
            //$(".bst-left-viewbox").addClass("leave");
            $("body").data("offset", {
                x: event.offsetX,
                y: event.offsetY
            });
        }
    })
}