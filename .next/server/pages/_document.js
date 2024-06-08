"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./src/pages/_document.tsx":
/*!*********************************!*\
  !*** ./src/pages/_document.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ pageComponent),\n/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),\n/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps)\n/* harmony export */ });\n/* harmony import */ var _sentry_server_config_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../sentry.server.config.ts */ \"./sentry.server.config.ts\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/nextjs */ \"@sentry/nextjs\");\n/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nfunction Document() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Html, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Head, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"link\", {\n                    rel: \"shortcut icon\",\n                    href: \"/image/favicon.jpeg\",\n                    type: \"image/x-icon\"\n                }, void 0, false, {\n                    fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/pages/_document.tsx\",\n                    lineNumber: 7,\n                    columnNumber: 17\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/pages/_document.tsx\",\n                lineNumber: 6,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"body\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Main, {}, void 0, false, {\n                        fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/pages/_document.tsx\",\n                        lineNumber: 10,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.NextScript, {}, void 0, false, {\n                        fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/pages/_document.tsx\",\n                        lineNumber: 11,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/pages/_document.tsx\",\n                lineNumber: 9,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/pages/_document.tsx\",\n        lineNumber: 5,\n        columnNumber: 9\n    }, this);\n}\n\nvar routeModule = /*#__PURE__*/Object.freeze({\n    __proto__: null,\n    'default': Document\n});\n\n/*\n * This file is a template for the code which will be substituted when our webpack loader handles non-API files in the\n * `pages/` directory.\n *\n * We use `__SENTRY_WRAPPING_TARGET_FILE__.cjs` as a placeholder for the path to the file being wrapped. Because it's not a real package,\n * this causes both TS and ESLint to complain, hence the pragma comments below.\n */\n\nconst userPageModule = routeModule ;\n\nconst pageComponent = userPageModule ? userPageModule.default : undefined;\n\nconst origGetInitialProps = pageComponent ? pageComponent.getInitialProps : undefined;\nconst origGetStaticProps = userPageModule ? userPageModule.getStaticProps : undefined;\nconst origGetServerSideProps = userPageModule ? userPageModule.getServerSideProps : undefined;\n\n// eslint-disable-next-line @typescript-eslint/no-explicit-any\nconst getInitialPropsWrappers = {\n  '/_app': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_3__.wrapAppGetInitialPropsWithSentry,\n  '/_document': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_3__.wrapDocumentGetInitialPropsWithSentry,\n  '/_error': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_3__.wrapErrorGetInitialPropsWithSentry,\n};\n\nconst getInitialPropsWrapper = getInitialPropsWrappers['/_document'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_3__.wrapGetInitialPropsWithSentry;\n\nif (pageComponent && typeof origGetInitialProps === 'function') {\n  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;\n}\n\nconst getStaticProps =\n  typeof origGetStaticProps === 'function'\n    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_3__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/_document')\n    : undefined;\nconst getServerSideProps =\n  typeof origGetServerSideProps === 'function'\n    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_3__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/_document')\n    : undefined;\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2RvY3VtZW50LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZSxTQUFTQSxRQUFBQSxHQUFBQTtBQUNwQix5QkFDSUMsNkRBQUNDLENBQUFBLCtDQUFBQSxFQUFBQTs7MEJBQ0dELDZEQUFDRSxDQUFBQSwrQ0FBQUEsRUFBQUE7QUFDRyx3Q0FBQUYsNkRBQUNHLENBQUFBLE1BQUFBLEVBQUFBO0FBQUtDLG9CQUFBQSxHQUFJO0FBQWdCQyxvQkFBQUEsSUFBSztBQUFzQkMsb0JBQUFBLElBQUs7Ozs7Ozs7Ozs7OzBCQUU5RE4sNkRBQUNPLENBQUFBLE1BQUFBLEVBQUFBOztrQ0FDR1AsNkRBQUNRLENBQUFBLCtDQUFBQSxFQUFBQSxFQUFBQSxFQUFBQSxLQUFBQSxDQUFBQSxFQUFBQSxLQUFBQSxFQUFBQTs7Ozs7a0NBQ0RSLDZEQUFDUyxDQUFBQSxxREFBQUEsRUFBQUEsRUFBQUEsRUFBQUEsS0FBQUEsQ0FBQUEsRUFBQUEsS0FBQUEsRUFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSWpCOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sY0FBYyxHQUFHLFdBQVcsRUFBRTtBQUNwQztBQUNNLG1CQUFhLEdBQUcsY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLEdBQUcsVUFBVTtBQUMxRTtBQUNBLE1BQU0sbUJBQW1CLEdBQUcsYUFBYSxHQUFHLGFBQWEsQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBQ3RGLE1BQU0sa0JBQWtCLEdBQUcsY0FBYyxHQUFHLGNBQWMsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0FBQ3RGLE1BQU0sc0JBQXNCLEdBQUcsY0FBYyxHQUFHLGNBQWMsQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7QUFDOUY7QUFDQTtBQUNBLE1BQU0sdUJBQXVCLEdBQUc7QUFDaEMsRUFBRSxPQUFPLEVBQUUsNEVBQXVDO0FBQ2xELEVBQUUsWUFBWSxFQUFFLGlGQUE0QztBQUM1RCxFQUFFLFNBQVMsRUFBRSw4RUFBeUM7QUFDdEQsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxNQUFNLHNCQUFzQixHQUFHLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxJQUFJLHlFQUFvQyxDQUFDO0FBQzdHO0FBQ0EsSUFBSSxhQUFhLElBQUksT0FBTyxtQkFBbUIsS0FBSyxVQUFVLEVBQUU7QUFDaEUsRUFBRSxhQUFhLENBQUMsZUFBZSxHQUFHLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLEVBQUU7QUFDL0UsQ0FBQztBQUNEO0FBQ0ssTUFBQyxjQUFjO0FBQ3BCLEVBQUUsT0FBTyxrQkFBa0IsS0FBSyxVQUFVO0FBQzFDLE1BQU0sd0VBQW1DLENBQUMsa0JBQWtCLEVBQUUsWUFBWSxDQUFDO0FBQzNFLE1BQU0sVUFBVTtBQUNYLE1BQUMsa0JBQWtCO0FBQ3hCLEVBQUUsT0FBTyxzQkFBc0IsS0FBSyxVQUFVO0FBQzlDLE1BQU0sNEVBQXVDLENBQUMsc0JBQXNCLEVBQUUsWUFBWSxDQUFDO0FBQ25GLE1BQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hYnNsaS9zcmMvcGFnZXMvX2RvY3VtZW50LnRzeD9lYjcwIiwid2VicGFjazovL2Fic2xpL3NlbnRyeS13cmFwcGVyLW1vZHVsZT82Zjk2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0bWwsIEhlYWQsIE1haW4sIE5leHRTY3JpcHQgfSBmcm9tICduZXh0L2RvY3VtZW50J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEb2N1bWVudCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8SHRtbD5cbiAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInNob3J0Y3V0IGljb25cIiBocmVmPVwiL2ltYWdlL2Zhdmljb24uanBlZ1wiIHR5cGU9XCJpbWFnZS94LWljb25cIiAvPlxuICAgICAgICAgICAgPC9IZWFkPlxuICAgICAgICAgICAgPGJvZHk+XG4gICAgICAgICAgICAgICAgPE1haW4gLz5cbiAgICAgICAgICAgICAgICA8TmV4dFNjcmlwdCAvPlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L0h0bWw+XG4gICAgKVxufVxuIiwiaW1wb3J0ICogYXMgcm91dGVNb2R1bGUgZnJvbSAnX19TRU5UUllfV1JBUFBJTkdfVEFSR0VUX0ZJTEVfXy5janMnO1xuZXhwb3J0ICogZnJvbSAnX19TRU5UUllfV1JBUFBJTkdfVEFSR0VUX0ZJTEVfXy5janMnO1xuaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvbmV4dGpzJztcblxuLypcbiAqIFRoaXMgZmlsZSBpcyBhIHRlbXBsYXRlIGZvciB0aGUgY29kZSB3aGljaCB3aWxsIGJlIHN1YnN0aXR1dGVkIHdoZW4gb3VyIHdlYnBhY2sgbG9hZGVyIGhhbmRsZXMgbm9uLUFQSSBmaWxlcyBpbiB0aGVcbiAqIGBwYWdlcy9gIGRpcmVjdG9yeS5cbiAqXG4gKiBXZSB1c2UgYF9fU0VOVFJZX1dSQVBQSU5HX1RBUkdFVF9GSUxFX18uY2pzYCBhcyBhIHBsYWNlaG9sZGVyIGZvciB0aGUgcGF0aCB0byB0aGUgZmlsZSBiZWluZyB3cmFwcGVkLiBCZWNhdXNlIGl0J3Mgbm90IGEgcmVhbCBwYWNrYWdlLFxuICogdGhpcyBjYXVzZXMgYm90aCBUUyBhbmQgRVNMaW50IHRvIGNvbXBsYWluLCBoZW5jZSB0aGUgcHJhZ21hIGNvbW1lbnRzIGJlbG93LlxuICovXG5cbmNvbnN0IHVzZXJQYWdlTW9kdWxlID0gcm91dGVNb2R1bGUgO1xuXG5jb25zdCBwYWdlQ29tcG9uZW50ID0gdXNlclBhZ2VNb2R1bGUgPyB1c2VyUGFnZU1vZHVsZS5kZWZhdWx0IDogdW5kZWZpbmVkO1xuXG5jb25zdCBvcmlnR2V0SW5pdGlhbFByb3BzID0gcGFnZUNvbXBvbmVudCA/IHBhZ2VDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzIDogdW5kZWZpbmVkO1xuY29uc3Qgb3JpZ0dldFN0YXRpY1Byb3BzID0gdXNlclBhZ2VNb2R1bGUgPyB1c2VyUGFnZU1vZHVsZS5nZXRTdGF0aWNQcm9wcyA6IHVuZGVmaW5lZDtcbmNvbnN0IG9yaWdHZXRTZXJ2ZXJTaWRlUHJvcHMgPSB1c2VyUGFnZU1vZHVsZSA/IHVzZXJQYWdlTW9kdWxlLmdldFNlcnZlclNpZGVQcm9wcyA6IHVuZGVmaW5lZDtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmNvbnN0IGdldEluaXRpYWxQcm9wc1dyYXBwZXJzID0ge1xuICAnL19hcHAnOiBTZW50cnkud3JhcEFwcEdldEluaXRpYWxQcm9wc1dpdGhTZW50cnksXG4gICcvX2RvY3VtZW50JzogU2VudHJ5LndyYXBEb2N1bWVudEdldEluaXRpYWxQcm9wc1dpdGhTZW50cnksXG4gICcvX2Vycm9yJzogU2VudHJ5LndyYXBFcnJvckdldEluaXRpYWxQcm9wc1dpdGhTZW50cnksXG59O1xuXG5jb25zdCBnZXRJbml0aWFsUHJvcHNXcmFwcGVyID0gZ2V0SW5pdGlhbFByb3BzV3JhcHBlcnNbJy9fZG9jdW1lbnQnXSB8fCBTZW50cnkud3JhcEdldEluaXRpYWxQcm9wc1dpdGhTZW50cnk7XG5cbmlmIChwYWdlQ29tcG9uZW50ICYmIHR5cGVvZiBvcmlnR2V0SW5pdGlhbFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gIHBhZ2VDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzID0gZ2V0SW5pdGlhbFByb3BzV3JhcHBlcihvcmlnR2V0SW5pdGlhbFByb3BzKSA7XG59XG5cbmNvbnN0IGdldFN0YXRpY1Byb3BzID1cbiAgdHlwZW9mIG9yaWdHZXRTdGF0aWNQcm9wcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gU2VudHJ5LndyYXBHZXRTdGF0aWNQcm9wc1dpdGhTZW50cnkob3JpZ0dldFN0YXRpY1Byb3BzLCAnL19kb2N1bWVudCcpXG4gICAgOiB1bmRlZmluZWQ7XG5jb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHMgPVxuICB0eXBlb2Ygb3JpZ0dldFNlcnZlclNpZGVQcm9wcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gU2VudHJ5LndyYXBHZXRTZXJ2ZXJTaWRlUHJvcHNXaXRoU2VudHJ5KG9yaWdHZXRTZXJ2ZXJTaWRlUHJvcHMsICcvX2RvY3VtZW50JylcbiAgICA6IHVuZGVmaW5lZDtcblxuZXhwb3J0IHsgcGFnZUNvbXBvbmVudCBhcyBkZWZhdWx0LCBnZXRTZXJ2ZXJTaWRlUHJvcHMsIGdldFN0YXRpY1Byb3BzIH07XG4iXSwibmFtZXMiOlsiRG9jdW1lbnQiLCJfanN4REVWIiwiSHRtbCIsIkhlYWQiLCJsaW5rIiwicmVsIiwiaHJlZiIsInR5cGUiLCJib2R5IiwiTWFpbiIsIk5leHRTY3JpcHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_document.tsx\n");

/***/ }),

/***/ "./sentry.server.config.ts":
/*!*********************************!*\
  !*** ./sentry.server.config.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/nextjs */ \"@sentry/nextjs\");\n/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);\nvar _sentryCollisionFreeGlobalObject = \"undefined\" === \"undefined\" ? global : window;\n_sentryCollisionFreeGlobalObject[\"__sentryRewritesTunnelPath__\"] = \"/monitoring\";\n_sentryCollisionFreeGlobalObject[\"SENTRY_RELEASE\"] = undefined;\n_sentryCollisionFreeGlobalObject[\"__rewriteFramesDistDir__\"] = \".next\";\n// This file configures the initialization of Sentry on the server.\n// The config you add here will be used whenever the server handles a request.\n// https://docs.sentry.io/platforms/javascript/guides/nextjs/\n\n_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.init({\n    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,\n    // Adjust this value in production, or use tracesSampler for greater control\n    tracesSampleRate: 1,\n    // Setting this option to true will print useful information to the console while you're setting up Sentry.\n    debug: false\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zZW50cnkuc2VydmVyLmNvbmZpZy50cyIsIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxtQ0FBbUMsZ0JBQWtCLGNBQWNDLFNBQVNDO0FBQ2hGRixnQ0FBZ0MsQ0FBQywrQkFBK0IsR0FBRztBQUNuRUEsZ0NBQWdDLENBQUMsaUJBQWlCLEdBQUdHO0FBQ3JESCxnQ0FBZ0MsQ0FBQywyQkFBMkIsR0FBRztBQUUvRCxtRUFBbUU7QUFDbkUsOEVBQThFO0FBQzlFLDZEQUE2RDtBQUVyQjtBQUV4Q0ksZ0RBQVcsQ0FBQztJQUNSRSxLQUFLQyxRQUFRQyxHQUFHLENBQUNDLHNCQUFzQjtJQUV2Qyw0RUFBNEU7SUFDNUVDLGtCQUFrQjtJQUVsQiwyR0FBMkc7SUFDM0dDLE9BQU87QUFDWCIsInNvdXJjZXMiOlsid2VicGFjazovL2Fic2xpLy4vc2VudHJ5LnNlcnZlci5jb25maWcudHM/ZGNkYiJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3NlbnRyeUNvbGxpc2lvbkZyZWVHbG9iYWxPYmplY3QgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuX3NlbnRyeUNvbGxpc2lvbkZyZWVHbG9iYWxPYmplY3RbXCJfX3NlbnRyeVJld3JpdGVzVHVubmVsUGF0aF9fXCJdID0gXCIvbW9uaXRvcmluZ1wiO1xuX3NlbnRyeUNvbGxpc2lvbkZyZWVHbG9iYWxPYmplY3RbXCJTRU5UUllfUkVMRUFTRVwiXSA9IHVuZGVmaW5lZDtcbl9zZW50cnlDb2xsaXNpb25GcmVlR2xvYmFsT2JqZWN0W1wiX19yZXdyaXRlRnJhbWVzRGlzdERpcl9fXCJdID0gXCIubmV4dFwiO1xuXG4vLyBUaGlzIGZpbGUgY29uZmlndXJlcyB0aGUgaW5pdGlhbGl6YXRpb24gb2YgU2VudHJ5IG9uIHRoZSBzZXJ2ZXIuXG4vLyBUaGUgY29uZmlnIHlvdSBhZGQgaGVyZSB3aWxsIGJlIHVzZWQgd2hlbmV2ZXIgdGhlIHNlcnZlciBoYW5kbGVzIGEgcmVxdWVzdC5cbi8vIGh0dHBzOi8vZG9jcy5zZW50cnkuaW8vcGxhdGZvcm1zL2phdmFzY3JpcHQvZ3VpZGVzL25leHRqcy9cblxuaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvbmV4dGpzJ1xuXG5TZW50cnkuaW5pdCh7XG4gICAgZHNuOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TRU5UUllfRFNOLFxuXG4gICAgLy8gQWRqdXN0IHRoaXMgdmFsdWUgaW4gcHJvZHVjdGlvbiwgb3IgdXNlIHRyYWNlc1NhbXBsZXIgZm9yIGdyZWF0ZXIgY29udHJvbFxuICAgIHRyYWNlc1NhbXBsZVJhdGU6IDEsXG5cbiAgICAvLyBTZXR0aW5nIHRoaXMgb3B0aW9uIHRvIHRydWUgd2lsbCBwcmludCB1c2VmdWwgaW5mb3JtYXRpb24gdG8gdGhlIGNvbnNvbGUgd2hpbGUgeW91J3JlIHNldHRpbmcgdXAgU2VudHJ5LlxuICAgIGRlYnVnOiBmYWxzZSxcbn0pXG4iXSwibmFtZXMiOlsiX3NlbnRyeUNvbGxpc2lvbkZyZWVHbG9iYWxPYmplY3QiLCJnbG9iYWwiLCJ3aW5kb3ciLCJ1bmRlZmluZWQiLCJTZW50cnkiLCJpbml0IiwiZHNuIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NFTlRSWV9EU04iLCJ0cmFjZXNTYW1wbGVSYXRlIiwiZGVidWciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./sentry.server.config.ts\n");

/***/ }),

/***/ "@sentry/nextjs":
/*!*********************************!*\
  !*** external "@sentry/nextjs" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@sentry/nextjs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./src/pages/_document.tsx")));
module.exports = __webpack_exports__;

})();