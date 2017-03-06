import Vue from 'vue'

Vue.directive('draggable', {
    bind: function(el) {
        $(el).css("position", "fixed")
        $(el).draggable({
            handle: $(el).find(".moduleSetBox-header"),
            containment: "parent",
            scroll: false,
            drag: function(event, ui) {
                $(el).css({
                    width: 800,
                    height: $(el).find("div").eq(0).height() + 55
                })
            },
            stop: function() {
                $(el).css({
                    height: "auto"
                })
            }
        });
    }
});