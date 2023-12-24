(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports);
  } else {
    // Browser globals
    factory((root.commonJsStrict = {}));
  }

}(this, function(exports) {

  if (typeof QRCode != 'function') {
    var script = document.createElement('script');
    script.src = 'https://mgf15.github.io/Qrjs/qrcode.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);
  }

  function Qrjs(element, text, color) {
    var element = element || this.element();
    var color = color || '#000000';
    var text = text || '';
    this.rest(element);
    var QR = new QRCode(element, {
      width: 280,
      height: 280,
      colorDark: color,
      colorLight: "#fafafa",
    });
    QR.makeCode(text);
    return QR;
  }
  // http://youmightnotneedjquery.com/#fade_in
  Qrjs.prototype.fadeIn = function(el) {
    el.style.opacity = 0;

    var last = +new Date();
    var tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
      last = +new Date();

      if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };

    tick();
  };
  Qrjs.prototype.rest = function(element) {
    this.fadeIn(element);
    element.innerHTML = '';
  };

  Qrjs.prototype.element = function() {
    if (document.getElementById('qrcode') == null) {
      var element = document.createElement('div');
      element.id = 'qrcode';
      document.body.appendChild(element);
    }
    return document.getElementById('qrcode');
  };
  exports.Qrjs = window.Qrjs = Qrjs;

  if (typeof module === 'object' && !!module.exports) {
    module.exports = Qrjs;
  }
}));
