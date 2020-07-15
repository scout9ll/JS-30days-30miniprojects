type ModuleExports = any;
/**
 * 接口 vs. 类型别名
 * 像我们提到的，类型别名可以像接口一样；然而，仍有一些细微差别。
 * 类型别名并不创建新名字—比如，错误信息就不会使用别名。 在下面的示例代码里，在编译器中将鼠标悬停在 interfaced上，显示它返回的是 Interface，但悬停在 aliased上时，显示的却是对象字面量类型。
 */

type WebpackRequireFucntion = (moduleId: number | any) => ModuleExports;
interface WebpackRequireObject {
  i: Function;
  m: Module[];
  c: Object;
  d: Function;
  n: Function;
  o: Function;
  p: string;
  s: number;
}
type WebpackRequire = WebpackRequireObject & WebpackRequireFucntion;
type Module = (
  module: ModuleContent,
  exports: ModuleExports,
  __webpack_require__: WebpackRequire
) => void;

interface ModuleContent {
  i: number;
  l: boolean;
  exports: ModuleExports;
}

function webpackBootstrap(modules: Module[]) {
  // webpackBootstrap
  // The module cache
  var installedModules = {};

  // The require function
  const __webpack_require__: WebpackRequire = function (moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module: ModuleContent = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });
    // 传入 _webpack_require_ 函数 保证installedModules的引用,
    // Execute the module function，执行module函数，module
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  };

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // identity function for calling harmony imports with the correct context
  __webpack_require__.i = function (value) {
    return value;
  };

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        configurable: false,
        enumerable: true,
        get: getter,
      });
    }
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module["default"];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, "a", getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  __webpack_require__.p = "";

  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = 0));
}

const exampleModule: Module = function (module, exports, __webpack_require__) {
  // 1
  module.exports = "I am waiting someone can import me";
};

const startModule: Module = function (module, exports, __webpack_require__) {
  // 0
  const exampleModule = __webpack_require__(1);
  module.exports =
    "i am entry module, start with me,every modules will be imported " +
    exampleModule;
};
webpackBootstrap([startModule, exampleModule]);
