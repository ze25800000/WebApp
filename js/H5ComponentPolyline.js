/*折线图图组件*/
var H5ComponentPolyline = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    // 插入画布
    var w = cfg.width;
    var h = cfg.height;
    var cas = document.createElement('canvas');
    var ctx = cas.getContext('2d');
    cas.width = ctx.width = w;
    cas.height = ctx.height = h;
    component.append(cas);

    // 绘制水平网格线
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#aaa';

    for (var i = 0; i < step + 1; i++) {
        var y = (h / step) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    ctx.stroke();

    //绘制垂直网格线
    step = cfg.data.length + 1;
    var text_w = w / step >> 0;
    for (var i = 0; i < step + 1; i++) {
        var x = (w / step) * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        if (cfg.data[i]) {
            var text = $('<div class="text"></div>');
            text.text(cfg.data[i][0]);
            text.css('width', text_w / 2).css('left', (x / 2 - text_w / 4) + text_w / 2);
            component.append(text);
        }
    }
    ctx.stroke();

    // 绘制折线
    var cas = document.createElement('canvas');
    var ctx = cas.getContext('2d');
    cas.width = ctx.width = w;
    cas.height = ctx.height = h;
    component.append(cas);

    var draw = function (per) {
        // 清空画布
        ctx.clearRect(0, 0, w, h);
        // 画点
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff8878';
        var x = 0,
            y = 0,
            row_w = (w / (cfg.data.length + 1));
        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - (h * item[1] * per);
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
        }
        ctx.stroke();

        // 连线
        ctx.moveTo(row_w, h - (h * cfg.data[0][1] * per));
        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - (h * item[1] * per);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.lineWidth = 1;
        // 阴影
        ctx.lineTo(x, h);
        ctx.lineTo(row_w, h);
        ctx.fillStyle = 'rgba(255,118,118,.2)';
        ctx.fill();

        // 写数据
        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - (h * item[1] * per);
            ctx.fillStyle = item[2] ? item[2] : '#595959';
            ctx.moveTo(x, y);
            ctx.fillText(((item[1] * 100) >> 0) + '%', x - 10, y - 10);
        }
        ctx.stroke();
    };
    component.on('onLoad', function () {
        var s = 0;
        for (i = 0; i < 100; i++) {
            setTimeout(function () {
                s += .01;
                draw(s);
            }, i * 10);
        }
    });
    component.on('onLeave', function () {
        var s = 1;
        for (i = 0; i < 100; i++) {
            setTimeout(function () {
                s -= .01;
                draw(s);
            }, i * 10);
        }
    });

    return component;
};