(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.anchorClick = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

  if (!('querySelector' in document && 'addEventListener' in window)) {
    return function () {};
  }

  return function anchorClick(options) {
    var config = Object.assign({
      parent: 'data-anchor-parent',
      link: 'data-anchor-click',
      ignore: 'data-anchor-ignore',
      clickableClass: 'is-clickable',
      downUpTime: 200
    }, options);

    var parentAttr = config.parent;
    var linkAttr = config.link;
    var ignoreAttr = config.ignore;
    var clickableClass = config.clickableClass;
    var downUpTime = config.downUpTime;
    var down;
    var up;

    function handleItem(item) {
      var link = item.querySelector('[' + linkAttr + ']');
      if (link !== null) {
        item.classList.add(clickableClass);
      } else {
        item.classList.remove(clickableClass);
      }
    }

    document.querySelectorAll('[' + parentAttr + ']').forEach(function (item) {
      handleItem(item);
    });

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function (addedNode) {
            if (addedNode && addedNode.nodeType === Node.ELEMENT_NODE) {
              if (addedNode.hasAttribute(parentAttr)) {
                handleItem(addedNode);
              }
              addedNode.querySelectorAll('[' + parentAttr + ']').forEach(function (item) {
                handleItem(item);
              });
            }
          });
        } else if (mutation.type === 'attributes') {
          var target = mutation.target;
          if (mutation.attributeName === parentAttr) {
            handleItem(target);
          } else if (mutation.attributeName === linkAttr) {
            var parent = target.closest('[' + parentAttr + ']');
            if (parent) {
              handleItem(parent);
            }
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [parentAttr, linkAttr]
    });

    window.addEventListener('mousedown', function () {
      down = Number(new Date());
    });

    window.addEventListener('mouseup', function (event) {
      if (event.target.hasAttribute('href') || event.target.tagName === 'BUTTON') {
        return;
      }

      up = Number(new Date());
      var item = event.target.closest('[' + parentAttr + ']');
      var ignore = event.target.closest('[' + ignoreAttr + '], [href]:not([' + linkAttr + '])');

      if (!item) {
        return;
      }

      var itemValue = item.getAttribute(parentAttr);
      var link = itemValue && itemValue.length > 0
        ? item.querySelector('[' + linkAttr + '="' + itemValue + '"]')
        : item.querySelector('[' + linkAttr + ']');

      if (!link) {
        return;
      }

      if (item && up - down < downUpTime && !ignore) {
        if ((event.ctrlKey && event.ctrlKey === true) || (event.which && event.which === 2)) {
          window.open(link);
        } else {
          link.click();
        }
      }
    });
  };

});
