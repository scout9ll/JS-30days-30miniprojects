// Decorator is a function that receive three parameters which are target, propertyKey and PropertyDescriptor

// target , usually decorated class  prototype

// propertyKey , usually method name

// PropertyDescriptor
interface PropertyDescriptor {
  getter: Function; //	get 语法为属性绑定一个函数,每当查询该属性时便调用对应的函数,查询的结构为该函数的返回值
  setter: Function; //	如果试着改变一个属性的值，那么对应的 setter 函数将被执行
  value: any; //	描述指定属性的值 , 可以是任何有效的 Javascript 值(函数 , 对象 , 字符串 ...).
  configurable: boolean; //	当且仅当该属性的 configurable 为 true 时，该属性 描述符 才能够被改变, 同时该属性也能从对应的对象上被删除.
  enumerable: boolean; //描述指定的属性是否是 可枚举 的.
  writable: boolean; //当且仅当该属性的 writable 为 true 时, value 才能被赋值运算符改变
}

// to use Decorator we need decorator factory function, factory function will execute  and return decorator function at runtime

function decoratorFactory(value: string) {
  // this is the decorator factory
  return function (target, propertyKey, PropertyDescriptor) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}
