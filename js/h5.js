/*内容管理对象*/
var h5 = function () {
  this.id = ('H5_' + Math.random()).replace('.', '_');
  this.el = $('<div id="' + this.id + '" class="H5"></div>').hide();
  this.page = [];
  $('body').append(this.el);
  // 插入一个页面
  this.addPage = function (name, text) {
    var page = $('<div class="H5_page section"></div>');
    if (name != undefined) {
      page.addClass('H5_page_' + name);
    }
    if (text != undefined) {
      page.text(text);
    }
    this.el.append(page);
    this.page.push(page);
    return this;
  };
  // 插入一个组件
  this.addComponent = function (name, cfg) {
    var cfg = cfg || {};
    cfg = $.extend({
      type: 'base'
    }, cfg);
    var component;
    var page = this.page.slice(-1)[0];
    switch (cfg.type) {
      case 'base':
        component = new H5ComponentBase(name, cfg);
        break;
    }
    page.append(component);
    return this;
  };
  this.loader = function () {
    this.el.fullpage({
      onLeave: function (index, nextIndex, direction) {
        $(this).find('.H5_component').trigger('onLeave');
      },
      afterLoad: function (anchorLink, index) {
        $(this).find('.H5_component').trigger('onLoad');
      }
    });
    this.page[0].find('.H5_component').trigger('onLoad');
    this.el.show();
  };
  return this;
};
