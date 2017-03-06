export function colorpickerInit(_this) {
    $(_this.$el).find(".color-pick").colorpicker({
        displayIndicator: false,
        strings:"主题颜色,标准颜色,网络颜色,返回,返回,历史"
    });

    $(".color-pick", $(_this.$el)).on("change.color", function(event, color) {
        let target = $(event.target).attr('target');
        _this[target] = color;
        _this.save();
    })
}