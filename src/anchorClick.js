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

    function handleCard(card) {
      var link = card.querySelector('[' + linkAttr + ']');
      if (link !== null) {
        card.classList.add(clickableClass);
      }
    }

    document.querySelectorAll('[' + parentAttr + ']').forEach(function (card) {
      handleCard(card);
    });

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (addedNode) {
          if (addedNode && addedNode.nodeType === Node.ELEMENT_NODE) {
            if (addedNode.hasAttribute(parentAttr)) {
              handleCard(addedNode);
            }
            addedNode.querySelectorAll('[' + parentAttr + ']').forEach(function (card) {
              handleCard(card);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    window.addEventListener('mousedown', function () {
      down = Number(new Date());
    });

    window.addEventListener('mouseup', function (event) {
      if (event.target.hasAttribute('href') || event.target.tagName === 'BUTTON') {
        return;
      }

      up = Number(new Date());
      var card = event.target.closest('[' + parentAttr + ']');
      var ignore = event.target.closest('[' + ignoreAttr + '], [href]:not([' + linkAttr + '])');

      if (!card) {
        return;
      }

      var cardValue = card.getAttribute(parentAttr);
      var link = cardValue && cardValue.length > 0
        ? card.querySelector('[' + linkAttr + '="' + cardValue + '"]')
        : card.querySelector('[' + linkAttr + ']');

      if (!link) {
        return;
      }

      if (up - down < downUpTime && !ignore) {
        if ((event.ctrlKey && event.ctrlKey === true) || (event.which && event.which === 2)) {
          window.open(link);
        } else {
          link.click();
        }
      }
    });
  };

});
