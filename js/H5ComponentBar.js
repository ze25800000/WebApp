/*柱状图组件*/
var H5ComponentBar = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    $.each(cfg.data, function (index, item) {
        var line = $('<div class="line"></div>');
        var name = $('<div class="name"></div>');
        var rate = $('<div class="rate"></div>');
        var per = $('<div class="per"></div>');
        name.text(item[0]);
        rate.html('<div class="bg""></div>');
        if (item[2]) {
            rate.find('.bg').css('backgroundColor', item[2]);
        }
        rate.css('width', item[1] * 100 + '%');
        per.text(item[1] * 100 + '%');
        line.append(name).append(rate).append(per);
        component.append(line);
    });
    return component;
};