import { isSameType } from "./utils/helper";
class VD {
  tag: string;
  props: object;
  children: VD[];
  target: HTMLElement;
  constructor(tag, props, children) {
    this.tag = tag;
    this.props = props;
    this.children = children;
  }
  render() {
    const ele = document.createElement(this.tag);
    ele[`ATTR_KEY`] = this.props;
    Object.keys(this.props).forEach(key => {
      ele.setAttribute(key, this.props[key]);
    });
    this.children.forEach(child => {
      const cEle =
        child instanceof VD ? child.render() : document.createTextNode(child);
      ele.appendChild(cEle);
    });
    return ele;
  }
  mount(target) {
    this.target = target;
    target.appendChild(this.render());
  }

  static diff(dom, newVDom: VD, parent) {
    // 新建node
    if (dom == undefined) {
      parent.appendChild(newVDom.render());
      return false;
    }

    // 删除node
    if (newVDom == undefined) {
      parent.removeChild(dom);
      return false;
    }

    // 替换node
    if (!isSameType(dom, newVDom)) {
      parent.replaceChild(newVDom.render(), dom);
      return false;
    }

    // 更新node
    if (dom.nodeType === Node.ELEMENT_NODE) {
      // 比较props的变化
      VD.diffProps(newVDom, dom);

      // 比较children的变化
      VD.diffChildren(newVDom, dom);
    }

    return true;
  }
  static diffChildren(newVDom, parent) {
    // 获取子元素最大长度
    const childLength = Math.max(
      parent.childNodes.length,
      newVDom.children.length
    );

    // 遍历并diff子元素
    for (let i = 0; i < childLength; i++) {
      VD.diff(newVDom.children[i], parent, i);
    }
  }
  static diffProps(newVDom, element) {
    let newProps = { ...element[`ATTR_KEY`] };
    const allProps = { ...newProps, ...newVDom.props };

    // 获取新旧所有属性名后，再逐一判断新旧属性值
    Object.keys(allProps).forEach(key => {
      const oldValue = newProps[key];
      const newValue = newVDom.props[key];

      // 删除属性
      if (newValue == undefined) {
        element.removeAttribute(key);
        delete newProps[key];
      }
      // 更新属性
      else if (oldValue == undefined || oldValue !== newValue) {
        element.setAttribute(key, newValue);
        newProps[key] = newValue;
      }
    });

    // 属性重新赋值
    element[`ATTR_KEY`] = newProps;
  }
}
// jsx =>vd
function createVD(tag, props, ...children) {
  return new VD(tag, props, children);
}
