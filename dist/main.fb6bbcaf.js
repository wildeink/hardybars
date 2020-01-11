// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
;

(function () {
  'use strict'; // iPad and iPod detection	

  var isiPad = function isiPad() {
    return navigator.platform.indexOf("iPad") != -1;
  };

  var isiPhone = function isiPhone() {
    return navigator.platform.indexOf("iPhone") != -1 || navigator.platform.indexOf("iPod") != -1;
  };

  var fullHeight = function fullHeight() {
    if (!isiPad() && !isiPhone()) {
      $('.js-fullheight').css('height', $(window).height());
      $(window).resize(function () {
        $('.js-fullheight').css('height', $(window).height());
      });
    }
  };

  var sliderMain = function sliderMain() {
    $('#fh5co-home .flexslider').flexslider({
      animation: "fade",
      slideshowSpeed: 5000
    });
    $('#fh5co-home .flexslider .slides > li').css('height', $(window).height());
    $(window).resize(function () {
      $('#fh5co-home .flexslider .slides > li').css('height', $(window).height());
    });
  };

  var sliderSayings = function sliderSayings() {
    $('#fh5co-sayings .flexslider').flexslider({
      animation: "slide",
      slideshowSpeed: 5000,
      directionNav: false,
      controlNav: true,
      smoothHeight: true,
      reverse: true
    });
  };

  var offcanvasMenu = function offcanvasMenu() {
    $('body').prepend('<div id="fh5co-offcanvas" />');
    $('body').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle"><i></i></a>');
    $('.fh5co-main-nav .fh5co-menu-1 a, .fh5co-main-nav .fh5co-menu-2 a').each(function () {
      var $this = $(this);
      $('#fh5co-offcanvas').append($this.clone());
    }); // $('#fh5co-offcanvas').append
  };

  var mainMenuSticky = function mainMenuSticky() {
    var sticky = $('.js-sticky');
    sticky.css('height', sticky.height());
    $(window).resize(function () {
      sticky.css('height', sticky.height());
    });
    var $section = $('.fh5co-main-nav');
    $section.waypoint(function (direction) {
      if (direction === 'down') {
        $section.css({
          'position': 'fixed',
          'top': 0,
          'width': '100%',
          'z-index': 99999
        }).addClass('fh5co-shadow');
        ;
      }
    }, {
      offset: '0px'
    });
    $('.js-sticky').waypoint(function (direction) {
      if (direction === 'up') {
        $section.attr('style', '').removeClass('fh5co-shadow');
      }
    }, {
      offset: function offset() {
        return -$(this.element).height() + 69;
      }
    });
  }; // Parallax


  var parallax = function parallax() {
    $(window).stellar();
  }; // Burger Menu


  var burgerMenu = function burgerMenu() {
    $('body').on('click', '.js-fh5co-nav-toggle', function (event) {
      var $this = $(this);
      $('body').toggleClass('fh5co-overflow offcanvas-visible');
      $this.toggleClass('active');
      event.preventDefault();
    });
  };

  var scrolledWindow = function scrolledWindow() {
    $(window).scroll(function () {
      var scrollPos = $(this).scrollTop();
      $('#fh5co-home .fh5co-text').css({
        'opacity': 1 - scrollPos / 300,
        'margin-top': -212 + scrollPos / 1
      });
      $('#fh5co-home .flexslider .fh5co-overlay').css({
        'opacity': .5 + scrollPos / 2000
      });

      if (scrollPos > 300) {
        $('#fh5co-home .fh5co-text').css('display', 'none');
      } else {
        $('#fh5co-home .fh5co-text').css('display', 'block');
      }
    });
    $(window).resize(function () {
      if ($('body').hasClass('offcanvas-visible')) {
        $('body').removeClass('offcanvas-visible');
        $('.js-fh5co-nav-toggle').removeClass('active');
      }
    });
  };

  var goToTop = function goToTop() {
    $('.js-gotop').on('click', function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $('html').offset().top
      }, 500);
      return false;
    });
  }; // Page Nav


  var clickMenu = function clickMenu() {
    var topVal = $(window).width() < 769 ? 0 : 58;
    $(window).resize(function () {
      topVal = $(window).width() < 769 ? 0 : 58;
    });
    $('.fh5co-main-nav a:not([class="external"]), #fh5co-offcanvas a:not([class="external"])').click(function (event) {
      var section = $(this).data('nav-section');

      if ($('div[data-section="' + section + '"]').length) {
        $('html, body').animate({
          scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
        }, 500);
      }

      event.preventDefault(); // return false;
    });
  }; // Reflect scrolling in navigation


  var navActive = function navActive(section) {
    $('.fh5co-main-nav a[data-nav-section], #fh5co-offcanvas a[data-nav-section]').removeClass('active');
    $('.fh5co-main-nav, #fh5co-offcanvas').find('a[data-nav-section="' + section + '"]').addClass('active');
  };

  var navigationSection = function navigationSection() {
    var $section = $('div[data-section]');
    $section.waypoint(function (direction) {
      if (direction === 'down') {
        navActive($(this.element).data('section'));
      }
    }, {
      offset: '150px'
    });
    $section.waypoint(function (direction) {
      if (direction === 'up') {
        navActive($(this.element).data('section'));
      }
    }, {
      offset: function offset() {
        return -$(this.element).height() + 155;
      }
    });
  }; // Animations


  var homeAnimate = function homeAnimate() {
    if ($('#fh5co-home').length > 0) {
      $('#fh5co-home').waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(function () {
            $('#fh5co-home .to-animate').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeInUp animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '80%'
      });
    }
  };

  var aboutAnimate = function aboutAnimate() {
    var about = $('#fh5co-about');

    if (about.length > 0) {
      about.waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(function () {
            about.find('.to-animate').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeInUp animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          setTimeout(function () {
            about.find('.to-animate-2').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeIn animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '80%'
      });
    }
  };

  var sayingsAnimate = function sayingsAnimate() {
    var sayings = $('#fh5co-sayings');

    if (sayings.length > 0) {
      sayings.waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(function () {
            sayings.find('.to-animate').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeInUp animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '80%'
      });
    }
  };

  var featureAnimate = function featureAnimate() {
    var feature = $('#fh5co-featured');

    if (feature.length > 0) {
      feature.waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(function () {
            feature.find('.to-animate').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeInUp animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          setTimeout(function () {
            feature.find('.to-animate-2').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('bounceIn animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 500);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '80%'
      });
    }
  };

  var typeAnimate = function typeAnimate() {
    var type = $('#fh5co-type');

    if (type.length > 0) {
      type.waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(function () {
            type.find('.to-animate').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeInUp animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '80%'
      });
    }
  };

  var foodMenusAnimate = function foodMenusAnimate() {
    var menus = $('#fh5co-menus');

    if (menus.length > 0) {
      menus.waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(function () {
            menus.find('.to-animate').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeInUp animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          setTimeout(function () {
            menus.find('.to-animate-2').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeIn animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 500);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '80%'
      });
    }
  };

  var eventsAnimate = function eventsAnimate() {
    var events = $('#fh5co-events');

    if (events.length > 0) {
      events.waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(function () {
            events.find('.to-animate').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeIn animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          setTimeout(function () {
            events.find('.to-animate-2').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeInUp animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 500);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '80%'
      });
    }
  };

  var reservationAnimate = function reservationAnimate() {
    var contact = $('#fh5co-contact');

    if (contact.length > 0) {
      contact.waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(function () {
            contact.find('.to-animate').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeIn animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          setTimeout(function () {
            contact.find('.to-animate-2').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeInUp animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 500);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '80%'
      });
    }
  };

  var footerAnimate = function footerAnimate() {
    var footer = $('#fh5co-footer');

    if (footer.length > 0) {
      footer.waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(function () {
            footer.find('.to-animate').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeIn animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          setTimeout(function () {
            footer.find('.to-animate-2').each(function (k) {
              var el = $(this);
              setTimeout(function () {
                el.addClass('fadeInUp animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 500);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '80%'
      });
    }
  }; // Document on load.


  $(function () {
    fullHeight();
    sliderMain();
    sliderSayings();
    offcanvasMenu();
    mainMenuSticky();
    parallax();
    burgerMenu();
    scrolledWindow();
    clickMenu();
    navigationSection();
    goToTop(); // Animations

    homeAnimate();
    aboutAnimate();
    sayingsAnimate();
    featureAnimate();
    typeAnimate();
    foodMenusAnimate();
    eventsAnimate();
    reservationAnimate();
    footerAnimate();
  });
})();
},{}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49731" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map