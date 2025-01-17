import * as dom from './dom';

export class Ruler {
  constructor(text) {
    var style =
      'max-width:none;' +
      'display:inline-block;' +
      'position:absolute;' +
      'height:100%;' +
      'width:100%;' +
      'overflow:scroll;' +
      'font-size:16px;';

    this.element = dom.createElement('div');
    this.element.setAttribute('aria-hidden', 'true');

    dom.append(this.element, dom.createText(text));

    this.collapsible = dom.createElement('span');
    this.expandable = dom.createElement('span');
    this.collapsibleInner = dom.createElement('span');
    this.expandableInner = dom.createElement('span');

    this.lastOffsetWidth = -1;

    dom.style(this.collapsible, style);
    dom.style(this.expandable, style);
    dom.style(this.expandableInner, style);
    dom.style(
      this.collapsibleInner,
      'display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;',
    );

    dom.append(this.collapsible, this.collapsibleInner);
    dom.append(this.expandable, this.expandableInner);

    dom.append(this.element, this.collapsible);
    dom.append(this.element, this.expandable);
  }

  /**
   * @return {Element}
   */
  getElement() {
    return this.element;
  }

  /**
   * @param {string} font
   */
  setFont(font) {
    dom.style(
      this.element,
      'max-width:none;' +
        'min-width:20px;' +
        'min-height:20px;' +
        'display:inline-block;' +
        'overflow:hidden;' +
        'position:absolute;' +
        'width:auto;' +
        'margin:0;' +
        'padding:0;' +
        'top:-999px;' +
        'white-space:nowrap;' +
        'font-synthesis:none;' +
        'font:' +
        font +
        ';',
    );
  }

  /**
   * @return {number}
   */
  getWidth() {
    return this.element.offsetWidth;
  }

  /**
   * @param {string} width
   */
  setWidth(width) {
    this.element.style.width = width + 'px';
  }

  /**
   * @private
   *
   * @return {boolean}
   */
  reset() {
    var offsetWidth = this.getWidth(),
      width = offsetWidth + 100;

    this.expandableInner.style.width = width + 'px';
    this.expandable.scrollLeft = width;
    this.collapsible.scrollLeft = this.collapsible.scrollWidth + 100;

    if (this.lastOffsetWidth !== offsetWidth) {
      this.lastOffsetWidth = offsetWidth;
      return true;
    } else {
      return false;
    }
  }

  /**
   * @private
   * @param {function(number)} callback
   */
  onScroll(callback) {
    if (this.reset() && this.element.parentNode !== null) {
      callback(this.lastOffsetWidth);
    }
  }

  /**
   * @param {function(number)} callback
   */
  onResize(callback) {
    var that = this;

    function onScroll() {
      that.onScroll(callback);
    }

    dom.addListener(this.collapsible, 'scroll', onScroll);
    dom.addListener(this.expandable, 'scroll', onScroll);
    this.reset();
  }
}
