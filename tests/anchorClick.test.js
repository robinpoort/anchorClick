import { describe, it, expect, beforeEach } from 'vitest';
import anchorClick from '../src/anchorClick.js';

describe('anchorClick — default attributes', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('adds clickable class to cards with a link', () => {
    document.body.innerHTML = `
      <div data-anchor-parent>
        <a href="/test" data-anchor-click>Title</a>
      </div>
    `;
    anchorClick();
    const card = document.querySelector('[data-anchor-parent]');
    expect(card.classList.contains('is-clickable')).toBe(true);
  });

  it('does not add clickable class to cards without a link', () => {
    document.body.innerHTML = `
      <div data-anchor-parent>
        <p>No link here</p>
      </div>
    `;
    anchorClick();
    const card = document.querySelector('[data-anchor-parent]');
    expect(card.classList.contains('is-clickable')).toBe(false);
  });
});

describe('anchorClick — custom attributes', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('works with custom attribute names (legacy data-card)', () => {
    document.body.innerHTML = `
      <div data-card>
        <a href="/test" data-card-link>Title</a>
      </div>
    `;
    anchorClick({ parent: 'data-card', link: 'data-card-link', ignore: 'data-card-ignore', clickableClass: 'is-clickable-card' });
    const card = document.querySelector('[data-card]');
    expect(card.classList.contains('is-clickable-card')).toBe(true);
  });

  it('uses custom clickableClass option', () => {
    document.body.innerHTML = `
      <div data-anchor-parent>
        <a href="/test" data-anchor-click>Title</a>
      </div>
    `;
    anchorClick({ clickableClass: 'my-custom-class' });
    const card = document.querySelector('[data-anchor-parent]');
    expect(card.classList.contains('my-custom-class')).toBe(true);
  });
});
