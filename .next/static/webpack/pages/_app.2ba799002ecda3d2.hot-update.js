"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/components/shared/tooltips/WithTooltip.tsx":
/*!********************************************************!*\
  !*** ./src/components/shared/tooltips/WithTooltip.tsx ***!
  \********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WithTooltip: function() { return /* binding */ WithTooltip; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-tooltip */ \"./node_modules/react-tooltip/dist/react-tooltip.min.mjs\");\n\n\n/**\n * This is a wrapper component around react-tooltip library.\n */ const WithTooltip = (props)=>{\n    const { children, tooltipText, placement = \"bottom\" } = props;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_tooltip__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {\n                id: \"react-tooltip\",\n                place: placement,\n                className: \"absolute z-50 max-w-[350px] text-center\"\n            }, void 0, false, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/tooltips/WithTooltip.tsx\",\n                lineNumber: 17,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                \"data-tooltip-id\": \"react-tooltip\",\n                \"data-tooltip-content\": tooltipText,\n                children: children\n            }, void 0, false, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/tooltips/WithTooltip.tsx\",\n                lineNumber: 22,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_c = WithTooltip;\nvar _c;\n$RefreshReg$(_c, \"WithTooltip\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9zaGFyZWQvdG9vbHRpcHMvV2l0aFRvb2x0aXAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBbUU7QUFRbkU7O0NBRUMsR0FDTSxNQUFNRSxjQUFjLENBQUNDO0lBQ3hCLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxXQUFXLEVBQUVDLFlBQVksUUFBUSxFQUFFLEdBQUdIO0lBRXhELHFCQUNJOzswQkFDSSw4REFBQ0Ysa0RBQVlBO2dCQUNUTSxJQUFHO2dCQUNIQyxPQUFPRjtnQkFDUEcsV0FBVTs7Ozs7OzBCQUVkLDhEQUFDQztnQkFBSUMsbUJBQWdCO2dCQUFnQkMsd0JBQXNCUDswQkFDdEREOzs7Ozs7OztBQUlqQixFQUFDO0tBZllGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3NoYXJlZC90b29sdGlwcy9XaXRoVG9vbHRpcC50c3g/ZWZkMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb29sdGlwIGFzIFJlYWN0VG9vbHRpcCwgUGxhY2VzVHlwZSB9IGZyb20gJ3JlYWN0LXRvb2x0aXAnXG5cbmludGVyZmFjZSBJV2l0aFRvb2x0aXBQcm9wcyB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZVxuICAgIHRvb2x0aXBUZXh0OiBzdHJpbmdcbiAgICBwbGFjZW1lbnQ/OiBQbGFjZXNUeXBlIC8vIE1ha2luZyBwbGFjZW1lbnQgcHJvcCBvcHRpb25hbFxufVxuXG4vKipcbiAqIFRoaXMgaXMgYSB3cmFwcGVyIGNvbXBvbmVudCBhcm91bmQgcmVhY3QtdG9vbHRpcCBsaWJyYXJ5LlxuICovXG5leHBvcnQgY29uc3QgV2l0aFRvb2x0aXAgPSAocHJvcHM6IElXaXRoVG9vbHRpcFByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgdG9vbHRpcFRleHQsIHBsYWNlbWVudCA9ICdib3R0b20nIH0gPSBwcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxSZWFjdFRvb2x0aXBcbiAgICAgICAgICAgICAgICBpZD1cInJlYWN0LXRvb2x0aXBcIlxuICAgICAgICAgICAgICAgIHBsYWNlPXtwbGFjZW1lbnR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgei01MCBtYXgtdy1bMzUwcHhdIHRleHQtY2VudGVyXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtdG9vbHRpcC1pZD1cInJlYWN0LXRvb2x0aXBcIiBkYXRhLXRvb2x0aXAtY29udGVudD17dG9vbHRpcFRleHR9PlxuICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8Lz5cbiAgICApXG59XG4iXSwibmFtZXMiOlsiVG9vbHRpcCIsIlJlYWN0VG9vbHRpcCIsIldpdGhUb29sdGlwIiwicHJvcHMiLCJjaGlsZHJlbiIsInRvb2x0aXBUZXh0IiwicGxhY2VtZW50IiwiaWQiLCJwbGFjZSIsImNsYXNzTmFtZSIsImRpdiIsImRhdGEtdG9vbHRpcC1pZCIsImRhdGEtdG9vbHRpcC1jb250ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/shared/tooltips/WithTooltip.tsx\n"));

/***/ })

});