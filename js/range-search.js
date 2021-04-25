!function (t) {
    "use strict";
    var n = function (n, i) {
        this.element = n, this.options = i || {}, this.defaults = {
            output: {
                prefix: "",
                suffix: "",
                format: function (t) {
                    return t
                }
            }, change: function (t, n) {
            }
        }, this.metadata = t(this.element).data("options")
    };
    n.prototype = {
        init: function () {
            this.config = t.extend(!0, {}, this.defaults, this.options, this.metadata);
            var n = this;
            return this.trackFull = t('<div class="track track--full"></div>').appendTo(n.element), this.trackIncluded = t('<div class="track track--included"></div>').appendTo(n.element), this.inputs = [], t('input[type="range"]', this.element).each(function (i, u) {
                var e = this;
                e.output = t("<output>").appendTo(n.element), e.output.zindex = parseInt(t(e.output).css("z-index")) || 1, e.thumb = t('<div class="slider-thumb">').prependTo(n.element), e.initialValue = t(this).val(), e.update = function () {
                    var i = t(this).attr("max") - t(this).attr("min"), u = t(this).val() - t(this).attr("min"),
                        a = u / i * 100 + "%", s = u / i * -100 + "%",
                        o = "function" == typeof n.config.output.prefix ? n.config.output.prefix.call(n, e) : n.config.output.prefix,
                        r = n.config.output.format(t(e).val()),
                        c = "function" == typeof n.config.output.suffix ? n.config.output.suffix.call(n, e) : n.config.output.suffix;
                    t(e.output).html(r + "" + o + c), t(e.output).css("left", a), t(e.output).css("transform", "translate(" + s + ",0)"), t(e.thumb).css("left", a), t(e.thumb).css("transform", "translate(" + s + ",0)"), n.adjustTrack()
                }, e.sendOutputToFront = function () {
                    t(this.output).css("z-index", e.output.zindex + 1)
                }, e.sendOutputToBack = function () {
                    t(this.output).css("z-index", e.output.zindex)
                }, t(e.thumb).on("mousedown", function (i) {
                    n.sendAllOutputToBack(), e.sendOutputToFront(), t(this).data("tracking", !0), t(document).one("mouseup", function () {
                        t(e.thumb).data("tracking", !1), n.change(i)
                    })
                }), t("body").on("mousemove", function (n) {
                    if (t(e.thumb).data("tracking")) {
                        var i = t(e).offset(), u = n.pageX - i.left, a = t(e).width();
                        if (u <= a) {
                            var s = u / a;
                            t(e).val(s * t(e).attr("max")), e.update()
                        }
                    }
                }), t(this).on("mousedown input change touchstart", function (t) {
                    n.sendAllOutputToBack(), e.sendOutputToFront(), e.update()
                }), t(this).on("mouseup touchend", function (t) {
                    n.change(t)
                }), n.inputs.push(this)
            }), this.reset(), this
        }, sendAllOutputToBack: function () {
            t.map(this.inputs, function (t, n) {
                t.sendOutputToBack()
            })
        }, change: function (n) {
            var i = t.map(this.inputs, function (n, i) {
                return {value: parseInt(t(n).val()), min: parseInt(t(n).attr("min")), max: parseInt(t(n).attr("max"))}
            });
            i.sort(function (t, n) {
                return t.value - n.value
            }), this.config.change.call(this, n, i)
        }, reset: function () {
            t.map(this.inputs, function (n, i) {
                t(n).val(n.initialValue), n.update()
            })
        }, adjustTrack: function () {
            var n = 1 / 0, i = 1 / 0, u = 0, e = 0;
            t.map(this.inputs, function (a, s) {
                var o = parseInt(t(a).val()), r = parseInt(t(a).attr("min")), c = parseInt(t(a).attr("max"));
                n = o < n ? o : n, u = o > u ? o : u, i = r < i ? r : i, e = c > e ? c : e
            }), this.inputs.length > 1 ? (this.trackIncluded.css("width", (u - n) / (e - i) * 100 + "%"), this.trackIncluded.css("left", (n - i) / (e - i) * 100 + "%")) : (this.trackIncluded.css("width", u / (e - i) * 100 + "%"), this.trackIncluded.css("left", "0%"))
        }
    }, n.defaults = n.prototype.defaults, t.fn.RangeSlider = function (i) {
        return this.each(function () {
            var u = t(this).data("RangeSlider");
            u || (u = new n(this, i).init(), t(this).data("RangeSlider", u))
        })
    }
}(jQuery);
var rangeSlider = $("#facet-price-range-slider");
rangeSlider.length > 0 && rangeSlider.RangeSlider({
    output: {
        format: function (t) {
            return t.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        }, suffix: function (t) {
            return parseInt($(t).val()) == parseInt($(t).attr("max")) ? this.config.maxSymbol : ""
        }
    }
});