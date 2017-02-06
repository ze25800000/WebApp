var H5_loading = function (images, firstPage) {
  var id = this.id;
  if (this._images === undefined) {
    this._images = (images || []).length;
    this._load = 0;
    window[id] = this;
    for (s in images) {
      var img = new Image;
      img.src = images[s];
      img.onload = function () {
        window[id].loader();
      };
    }
    $('#rate').text('0%');
    return this;
  } else {
    this._load++;
    $('#rate').text(((this._load / this._images * 100) >> 0) + '%');
    if (this._load < this._images) {
      return this;
    }
  }
  window[id] = null;

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
  if (firstPage) {
    $.fn.fullpage.moveTo(firstPage);
  }
};
