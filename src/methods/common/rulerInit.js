export default function (_this) {
    var width=parseInt(_this.websiteInfo.pageWidth);
    var evt         = new rulerEvent()
    var dragdrop    = new Dragdrop(evt)
    var rg          = new RulersGuides(evt, dragdrop,width);
}