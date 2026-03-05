# anchor-click

Makes entire items clickable by delegating clicks to an anchor link within. Useful for layouts where you want a large clickable area without wrapping everything in an `<a>` tag (which is invalid HTML for block-level content).

Handles text selection (no accidental navigation), Ctrl+click and middle-click (opens in new tab), and dynamically added items via MutationObserver.

## Installation

```
npm install anchor-click
```

Or include directly via a `<script>` tag:

```html
<script src="anchorClick.min.js"></script>
```

## Usage

Add `data-anchor-parent` to any item and `data-anchor-click` to the anchor inside it, then call `anchorClick()`:

```html
<div data-anchor-parent>
  <h2><a href="/page" data-anchor-click>Title</a></h2>
  <p>Clicking anywhere on this item navigates to /page.</p>
</div>

<script src="anchorClick.min.js"></script>
<script>anchorClick();</script>
```

The item automatically receives the class `is-clickable`, which you can use to style it:

```css
.is-clickable {
  cursor: pointer;
}
```

## Options

All options are optional. Defaults shown below:

```js
anchorClick({
  parent: 'data-anchor-parent',  // attribute on the clickable item
  link: 'data-anchor-click',     // attribute on the target anchor
  ignore: 'data-anchor-ignore',  // attribute to exclude child elements
  clickableClass: 'is-clickable', // class added to clickable items
  downUpTime: 200                // max ms between mousedown/up to count as a click
});
```

## Multiple links in one item

If an item contains multiple links, use a named reference to specify which link should act as the primary click target:

```html
<div data-anchor-parent="primary">
  <h2><a href="/page" data-anchor-click="primary">Title</a></h2>
  <a href="/other">Other link</a>
</div>
```

## Ignoring elements

Add `data-anchor-ignore` to any element inside an item that should not trigger navigation:

```html
<div data-anchor-parent>
  <a href="/page" data-anchor-click>Title</a>
  <button data-anchor-ignore>Add to favourites</button>
</div>
```

Buttons and anchor tags are always ignored automatically.

## Behaviour

- **Text selection** — clicking and dragging to select text does not trigger navigation (threshold: 200ms).
- **Ctrl+click / middle-click** — opens the link in a new tab.
- **Dynamic content** — items added to the DOM after page load are handled automatically via `MutationObserver`.

## License

MIT
