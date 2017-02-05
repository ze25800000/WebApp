/*散点图组件*/
var H5ComponentPoint = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    var base = cfg.data[0][1];
    $.each(cfg.data, function (index, item) {
        var point = $('<div class="point point_' + index + '"></div>');
        var name = $('<div class="name">' + item[0] + '</div>');
        var rate = $('<div class="rate">' + (item[1] * 100) + '%' + '</div>');
        point.append(name);
        name.append(rate);
        var per = (item[1] / base * 100) + '%';
        point.width(per).height(per);
        if (item[2]) {
            point.css('background-color', item[2]);
        }
        if (item[3] != undefined && item[4] != undefined) {
            point.css({left: item[3], top: item[4]});
        }
        component.append(point);
    });
    return component;
};