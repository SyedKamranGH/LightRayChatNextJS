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

/***/ "./src/components/shared/side-bar/SidebarMenu.tsx":
/*!********************************************************!*\
  !*** ./src/components/shared/side-bar/SidebarMenu.tsx ***!
  \********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MenuButton: function() { return /* binding */ MenuButton; },\n/* harmony export */   SidebarMenu: function() { return /* binding */ SidebarMenu; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tailwind-merge */ \"./node_modules/tailwind-merge/dist/bundle-mjs.mjs\");\n/* harmony import */ var _store_auth_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/store/auth-store */ \"./src/store/auth-store.ts\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! .. */ \"./src/components/shared/index.ts\");\n/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../icons */ \"./src/components/shared/icons/index.ts\");\n/* harmony import */ var _modals_WaitlistModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../modals/WaitlistModal */ \"./src/components/shared/modals/WaitlistModal.tsx\");\n/* harmony import */ var _icons_LibraryIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../icons/LibraryIcon */ \"./src/components/shared/icons/LibraryIcon.tsx\");\n/* harmony import */ var _icons_HistoryIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../icons/HistoryIcon */ \"./src/components/shared/icons/HistoryIcon.tsx\");\n/* harmony import */ var _icons_UploadIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../icons/UploadIcon */ \"./src/components/shared/icons/UploadIcon.tsx\");\n/* harmony import */ var _icons_TwoChecksIcon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../icons/TwoChecksIcon */ \"./src/components/shared/icons/TwoChecksIcon.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst sidebarMenu = [\n    {\n        label: \"Home\",\n        Icon: (param)=>{\n            let { className } = param;\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icons__WEBPACK_IMPORTED_MODULE_7__.HomeIcon, {\n                className: className\n            }, void 0, false, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                lineNumber: 32,\n                columnNumber: 47\n            }, undefined);\n        },\n        href: \"/\"\n    },\n    {\n        label: \"Library\",\n        Icon: (param)=>{\n            let { className } = param;\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icons_LibraryIcon__WEBPACK_IMPORTED_MODULE_9__.LibraryIcon, {\n                className: className\n            }, void 0, false, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                lineNumber: 35,\n                columnNumber: 34\n            }, undefined);\n        },\n        href: \"/repository\"\n    },\n    {\n        label: \"Search History\",\n        Icon: (param)=>{\n            let { className } = param;\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icons_HistoryIcon__WEBPACK_IMPORTED_MODULE_10__.HistoryIcon, {\n                className: className\n            }, void 0, false, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                lineNumber: 40,\n                columnNumber: 34\n            }, undefined);\n        },\n        href: \"/chat-history\"\n    },\n    {\n        label: \"Sync your Files\",\n        Icon: (param)=>{\n            let { className } = param;\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icons_UploadIcon__WEBPACK_IMPORTED_MODULE_11__.UploadIcon, {\n                className: className\n            }, void 0, false, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                lineNumber: 45,\n                columnNumber: 34\n            }, undefined);\n        },\n        href: \"/sync\"\n    },\n    {\n        label: \"Volume Checks\",\n        Icon: (param)=>{\n            let { className } = param;\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icons_TwoChecksIcon__WEBPACK_IMPORTED_MODULE_12__.TwoChecksIcon, {\n                className: className\n            }, void 0, false, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                lineNumber: 50,\n                columnNumber: 34\n            }, undefined);\n        },\n        href: \"/volume\"\n    }\n];\nconst MenuButton = (props)=>{\n    _s();\n    const { label, href, Icon } = props;\n    const [showModal, setShowModal] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);\n    const closeModal = ()=>setShowModal(false);\n    const { showSidebar } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useContext)(___WEBPACK_IMPORTED_MODULE_6__.SidebarContext);\n    const [isLoggedIn] = (0,_store_auth_store__WEBPACK_IMPORTED_MODULE_5__.useAuthStore)((state)=>[\n            state.isLoggedIn\n        ]);\n    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.usePathname)();\n    const isActive = pathname === href;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                href: href,\n                onClick: ()=>{\n                    if (href !== \"/\" && href !== \"/login\" && !isLoggedIn) setShowModal(true);\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex-start group flex gap-2 py-[12px] pr-[12px] sm:py-[8px]\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            src: \"/assets/icons/caret-right.svg\",\n                            alt: \"caret right\",\n                            width: 17,\n                            height: 20,\n                            className: \"opacity-0 transition group-hover:opacity-100 \".concat(isActive && \"opacity-100\")\n                        }, void 0, false, {\n                            fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                            lineNumber: 75,\n                            columnNumber: 21\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_13__.twJoin)(\"flex items-center gap-3\", \"duration-500\", !showSidebar && \"gap-x-8 px-2\"),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Icon, {\n                                        className: (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_13__.twMerge)(\"stroke-white transition group-hover:stroke-primary-600\", isActive && \"stroke-primary-600\")\n                                    }, void 0, false, {\n                                        fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                                        lineNumber: 92,\n                                        columnNumber: 29\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                                    lineNumber: 91,\n                                    columnNumber: 25\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_13__.twMerge)(\"flex gap-2 whitespace-nowrap align-middle text-white transition group-hover:text-primary-600\", isActive && \"text-primary-600\"),\n                                    children: [\n                                        label,\n                                        href === \"/sync\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"group relative\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                    className: \"text-white\",\n                                                    children: \"Enhance your queries by syncing files from your cloud accounts like Google Drive and Dropbox\"\n                                                }, void 0, false, {\n                                                    fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                                                    lineNumber: 109,\n                                                    columnNumber: 41\n                                                }, undefined)\n                                            }, void 0, false, {\n                                                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                                                lineNumber: 108,\n                                                columnNumber: 37\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                                            lineNumber: 107,\n                                            columnNumber: 33\n                                        }, undefined)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                                    lineNumber: 99,\n                                    columnNumber: 25\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                            lineNumber: 84,\n                            columnNumber: 21\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                    lineNumber: 74,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                lineNumber: 68,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_modals_WaitlistModal__WEBPACK_IMPORTED_MODULE_8__.WaitlistModal, {\n                showModal: showModal,\n                onClose: closeModal\n            }, void 0, false, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                lineNumber: 120,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_s(MenuButton, \"069kStefEO66e4pJnBRvEIBpS3M=\", false, function() {\n    return [\n        _store_auth_store__WEBPACK_IMPORTED_MODULE_5__.useAuthStore,\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.usePathname\n    ];\n});\n_c = MenuButton;\nconst SidebarMenu = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex max-h-[300px] flex-1 flex-col gap-[5px] overflow-hidden overflow-y-auto sm:gap-[2px]\",\n        children: sidebarMenu.map((menu)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(MenuButton, {\n                ...menu\n            }, menu.label, false, {\n                fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n                lineNumber: 129,\n                columnNumber: 17\n            }, undefined))\n    }, void 0, false, {\n        fileName: \"/home/syedkamran/Figzol/LightRay-Chat-Client/src/components/shared/side-bar/SidebarMenu.tsx\",\n        lineNumber: 127,\n        columnNumber: 9\n    }, undefined);\n};\n_c1 = SidebarMenu;\nvar _c, _c1;\n$RefreshReg$(_c, \"MenuButton\");\n$RefreshReg$(_c1, \"SidebarMenu\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9zaGFyZWQvc2lkZS1iYXIvU2lkZWJhck1lbnUudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7QUFDRjtBQUNpQjtBQUNlO0FBQ1o7QUFFQztBQUNkO0FBU2xCO0FBQ3NDO0FBQ0w7QUFDQTtBQUNGO0FBQ007QUFTdEQsTUFBTWUsY0FBK0M7SUFDakQ7UUFBRUMsT0FBTztRQUFRQyxNQUFNO2dCQUFDLEVBQUVDLFNBQVMsRUFBRTtpQ0FBSyw4REFBQ1QsNENBQVFBO2dCQUFDUyxXQUFXQTs7Ozs7OztRQUFlQyxNQUFNO0lBQUk7SUFDeEY7UUFDSUgsT0FBTztRQUNQQyxNQUFNO2dCQUFDLEVBQUVDLFNBQVMsRUFBRTtpQ0FBSyw4REFBQ1AsMkRBQVdBO2dCQUFDTyxXQUFXQTs7Ozs7OztRQUNqREMsTUFBTTtJQUNWO0lBQ0E7UUFDSUgsT0FBTztRQUNQQyxNQUFNO2dCQUFDLEVBQUVDLFNBQVMsRUFBRTtpQ0FBSyw4REFBQ04sNERBQVdBO2dCQUFDTSxXQUFXQTs7Ozs7OztRQUNqREMsTUFBTTtJQUNWO0lBQ0E7UUFDSUgsT0FBTztRQUNQQyxNQUFNO2dCQUFDLEVBQUVDLFNBQVMsRUFBRTtpQ0FBSyw4REFBQ0wsMERBQVVBO2dCQUFDSyxXQUFXQTs7Ozs7OztRQUNoREMsTUFBTTtJQUNWO0lBQ0E7UUFDSUgsT0FBTztRQUNQQyxNQUFNO2dCQUFDLEVBQUVDLFNBQVMsRUFBRTtpQ0FBSyw4REFBQ0osZ0VBQWFBO2dCQUFDSSxXQUFXQTs7Ozs7OztRQUNuREMsTUFBTTtJQUNWO0NBQ0g7QUFFTSxNQUFNQyxhQUFhLENBQUNDOztJQUN2QixNQUFNLEVBQUVMLEtBQUssRUFBRUcsSUFBSSxFQUFFRixJQUFJLEVBQUUsR0FBR0k7SUFDOUIsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUduQiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNb0IsYUFBYSxJQUFNRCxhQUFhO0lBRXRDLE1BQU0sRUFBRUUsV0FBVyxFQUFFLEdBQUd0QixpREFBVUEsQ0FBQ0ssNkNBQWNBO0lBQ2pELE1BQU0sQ0FBQ2tCLFdBQVcsR0FBR25CLCtEQUFZQSxDQUFDb0IsQ0FBQUEsUUFBUztZQUFDQSxNQUFNRCxVQUFVO1NBQUM7SUFFN0QsTUFBTUUsV0FBVzFCLDREQUFXQTtJQUM1QixNQUFNMkIsV0FBV0QsYUFBYVQ7SUFFOUIscUJBQ0k7OzBCQUNJLDhEQUFDbEIsa0RBQUlBO2dCQUNEa0IsTUFBTUE7Z0JBQ05XLFNBQVM7b0JBQ0wsSUFBSVgsU0FBUyxPQUFPQSxTQUFTLFlBQVksQ0FBQ08sWUFBWUgsYUFBYTtnQkFDdkU7MEJBRUEsNEVBQUNRO29CQUFJYixXQUFVOztzQ0FDWCw4REFBQ2xCLG1EQUFLQTs0QkFDRmdDLEtBQUk7NEJBQ0pDLEtBQUk7NEJBQ0pDLE9BQU87NEJBQ1BDLFFBQVE7NEJBQ1JqQixXQUFXLGdEQUVWLE9BREdXLFlBQVk7Ozs7OztzQ0FHcEIsOERBQUNFOzRCQUNHYixXQUFXYix1REFBTUEsQ0FDYiwyQkFDQSxnQkFDQSxDQUFDb0IsZUFBZTs7OENBR3BCLDhEQUFDTTs4Q0FDRyw0RUFBQ2Q7d0NBQ0dDLFdBQVdaLHdEQUFPQSxDQUNkLDBEQUNBdUIsWUFBWTs7Ozs7Ozs7Ozs7OENBSXhCLDhEQUFDRTtvQ0FDR2IsV0FBV1osd0RBQU9BLENBQ2QsZ0dBQ0F1QixZQUFZOzt3Q0FHZmI7d0NBQ0FHLFNBQVMseUJBQ04sOERBQUNZOzRDQUFJYixXQUFVO3NEQUNYLDRFQUFDYTtnREFBSWIsV0FBVTswREFDWCw0RUFBQ2tCO29EQUFLbEIsV0FBVTs4REFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQVd6RCw4REFBQ1IsZ0VBQWFBO2dCQUFDWSxXQUFXQTtnQkFBV2UsU0FBU2I7Ozs7Ozs7O0FBRzFELEVBQUM7R0FwRVlKOztRQU1ZYiwyREFBWUE7UUFFaEJMLHdEQUFXQTs7O0tBUm5Ca0I7QUFzRU4sTUFBTWtCLGNBQWM7SUFDdkIscUJBQ0ksOERBQUNQO1FBQUliLFdBQVU7a0JBQ1ZILFlBQVl3QixHQUFHLENBQUNDLENBQUFBLHFCQUNiLDhEQUFDcEI7Z0JBQTZCLEdBQUdvQixJQUFJO2VBQXBCQSxLQUFLeEIsS0FBSzs7Ozs7Ozs7OztBQUkzQyxFQUFDO01BUllzQiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9zaGFyZWQvc2lkZS1iYXIvU2lkZWJhck1lbnUudHN4Pzg5MTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5pbXBvcnQgeyB1c2VQYXRobmFtZSB9IGZyb20gJ25leHQvbmF2aWdhdGlvbidcbmltcG9ydCB7IHVzZUNvbnRleHQsIHVzZVN0YXRlLCB0eXBlIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgdHdKb2luLCB0d01lcmdlIH0gZnJvbSAndGFpbHdpbmQtbWVyZ2UnXG5cbmltcG9ydCB7IHVzZUF1dGhTdG9yZSB9IGZyb20gJ0Avc3RvcmUvYXV0aC1zdG9yZSdcbmltcG9ydCB7IFNpZGViYXJDb250ZXh0IH0gZnJvbSAnLi4nXG5pbXBvcnQge1xuICAgIENoYXRJY29uLFxuICAgIERvY0ljb24sXG4gICAgRm9sZGVySWNvbixcbiAgICBIb21lSWNvbixcbiAgICBOZXdzSWNvbixcbiAgICBTZWFyY2hJY29uLFxuICAgIEdvb2dsZURyaXZlSWNvbixcbn0gZnJvbSAnLi4vaWNvbnMnXG5pbXBvcnQgeyBXYWl0bGlzdE1vZGFsIH0gZnJvbSAnLi4vbW9kYWxzL1dhaXRsaXN0TW9kYWwnXG5pbXBvcnQgeyBMaWJyYXJ5SWNvbiB9IGZyb20gJy4uL2ljb25zL0xpYnJhcnlJY29uJ1xuaW1wb3J0IHsgSGlzdG9yeUljb24gfSBmcm9tICcuLi9pY29ucy9IaXN0b3J5SWNvbidcbmltcG9ydCB7IFVwbG9hZEljb24gfSBmcm9tICcuLi9pY29ucy9VcGxvYWRJY29uJ1xuaW1wb3J0IHsgVHdvQ2hlY2tzSWNvbiB9IGZyb20gJy4uL2ljb25zL1R3b0NoZWNrc0ljb24nXG5pbXBvcnQgeyBEcm9wYm94SWNvbiB9IGZyb20gJy4uL2ljb25zL0Ryb3Bib3hJY29uJ1xuXG50eXBlIFRNZW51QnV0dG9uUHJvcHMgPSB7XG4gICAgbGFiZWw6IHN0cmluZ1xuICAgIGhyZWY6IHN0cmluZ1xuICAgIEljb246ICh7IGNsYXNzTmFtZSB9OiB7IGNsYXNzTmFtZTogc3RyaW5nIH0pID0+IFJlYWN0Tm9kZVxufVxuXG5jb25zdCBzaWRlYmFyTWVudTogUmVhZG9ubHlBcnJheTxUTWVudUJ1dHRvblByb3BzPiA9IFtcbiAgICB7IGxhYmVsOiAnSG9tZScsIEljb246ICh7IGNsYXNzTmFtZSB9KSA9PiA8SG9tZUljb24gY2xhc3NOYW1lPXtjbGFzc05hbWV9IC8+LCBocmVmOiAnLycgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnTGlicmFyeScsXG4gICAgICAgIEljb246ICh7IGNsYXNzTmFtZSB9KSA9PiA8TGlicmFyeUljb24gY2xhc3NOYW1lPXtjbGFzc05hbWV9IC8+LFxuICAgICAgICBocmVmOiAnL3JlcG9zaXRvcnknLFxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ1NlYXJjaCBIaXN0b3J5JyxcbiAgICAgICAgSWNvbjogKHsgY2xhc3NOYW1lIH0pID0+IDxIaXN0b3J5SWNvbiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gLz4sXG4gICAgICAgIGhyZWY6ICcvY2hhdC1oaXN0b3J5JyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdTeW5jIHlvdXIgRmlsZXMnLFxuICAgICAgICBJY29uOiAoeyBjbGFzc05hbWUgfSkgPT4gPFVwbG9hZEljb24gY2xhc3NOYW1lPXtjbGFzc05hbWV9IC8+LFxuICAgICAgICBocmVmOiAnL3N5bmMnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ1ZvbHVtZSBDaGVja3MnLFxuICAgICAgICBJY29uOiAoeyBjbGFzc05hbWUgfSkgPT4gPFR3b0NoZWNrc0ljb24gY2xhc3NOYW1lPXtjbGFzc05hbWV9IC8+LFxuICAgICAgICBocmVmOiAnL3ZvbHVtZScsXG4gICAgfSxcbl1cblxuZXhwb3J0IGNvbnN0IE1lbnVCdXR0b24gPSAocHJvcHM6IFRNZW51QnV0dG9uUHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGxhYmVsLCBocmVmLCBJY29uIH0gPSBwcm9wc1xuICAgIGNvbnN0IFtzaG93TW9kYWwsIHNldFNob3dNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgICBjb25zdCBjbG9zZU1vZGFsID0gKCkgPT4gc2V0U2hvd01vZGFsKGZhbHNlKVxuXG4gICAgY29uc3QgeyBzaG93U2lkZWJhciB9ID0gdXNlQ29udGV4dChTaWRlYmFyQ29udGV4dClcbiAgICBjb25zdCBbaXNMb2dnZWRJbl0gPSB1c2VBdXRoU3RvcmUoc3RhdGUgPT4gW3N0YXRlLmlzTG9nZ2VkSW5dKVxuXG4gICAgY29uc3QgcGF0aG5hbWUgPSB1c2VQYXRobmFtZSgpXG4gICAgY29uc3QgaXNBY3RpdmUgPSBwYXRobmFtZSA9PT0gaHJlZlxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChocmVmICE9PSAnLycgJiYgaHJlZiAhPT0gJy9sb2dpbicgJiYgIWlzTG9nZ2VkSW4pIHNldFNob3dNb2RhbCh0cnVlKVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXN0YXJ0IGdyb3VwIGZsZXggZ2FwLTIgcHktWzEycHhdIHByLVsxMnB4XSBzbTpweS1bOHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cIi9hc3NldHMvaWNvbnMvY2FyZXQtcmlnaHQuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cImNhcmV0IHJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXsxN31cbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17MjB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BvcGFjaXR5LTAgdHJhbnNpdGlvbiBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlICYmICdvcGFjaXR5LTEwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3R3Sm9pbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkdXJhdGlvbi01MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFzaG93U2lkZWJhciAmJiAnZ2FwLXgtOCBweC0yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0d01lcmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0cm9rZS13aGl0ZSB0cmFuc2l0aW9uIGdyb3VwLWhvdmVyOnN0cm9rZS1wcmltYXJ5LTYwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSAmJiAnc3Ryb2tlLXByaW1hcnktNjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0d01lcmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZmxleCBnYXAtMiB3aGl0ZXNwYWNlLW5vd3JhcCBhbGlnbi1taWRkbGUgdGV4dC13aGl0ZSB0cmFuc2l0aW9uIGdyb3VwLWhvdmVyOnRleHQtcHJpbWFyeS02MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSAmJiAndGV4dC1wcmltYXJ5LTYwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2hyZWYgPT09ICcvc3luYycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyb3VwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmxhY2sgYmctb3BhY2l0eS01MCBvcGFjaXR5LTAgdHJhbnNpdGlvbi1vcGFjaXR5IGR1cmF0aW9uLTMwMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5oYW5jZSB5b3VyIHF1ZXJpZXMgYnkgc3luY2luZyBmaWxlcyBmcm9tIHlvdXIgY2xvdWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudHMgbGlrZSBHb29nbGUgRHJpdmUgYW5kIERyb3Bib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDxXYWl0bGlzdE1vZGFsIHNob3dNb2RhbD17c2hvd01vZGFsfSBvbkNsb3NlPXtjbG9zZU1vZGFsfSAvPlxuICAgICAgICA8Lz5cbiAgICApXG59XG5cbmV4cG9ydCBjb25zdCBTaWRlYmFyTWVudSA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggbWF4LWgtWzMwMHB4XSBmbGV4LTEgZmxleC1jb2wgZ2FwLVs1cHhdIG92ZXJmbG93LWhpZGRlbiBvdmVyZmxvdy15LWF1dG8gc206Z2FwLVsycHhdXCI+XG4gICAgICAgICAgICB7c2lkZWJhck1lbnUubWFwKG1lbnUgPT4gKFxuICAgICAgICAgICAgICAgIDxNZW51QnV0dG9uIGtleT17bWVudS5sYWJlbH0gey4uLm1lbnV9IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKVxufVxuIl0sIm5hbWVzIjpbIkltYWdlIiwiTGluayIsInVzZVBhdGhuYW1lIiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwidHdKb2luIiwidHdNZXJnZSIsInVzZUF1dGhTdG9yZSIsIlNpZGViYXJDb250ZXh0IiwiSG9tZUljb24iLCJXYWl0bGlzdE1vZGFsIiwiTGlicmFyeUljb24iLCJIaXN0b3J5SWNvbiIsIlVwbG9hZEljb24iLCJUd29DaGVja3NJY29uIiwic2lkZWJhck1lbnUiLCJsYWJlbCIsIkljb24iLCJjbGFzc05hbWUiLCJocmVmIiwiTWVudUJ1dHRvbiIsInByb3BzIiwic2hvd01vZGFsIiwic2V0U2hvd01vZGFsIiwiY2xvc2VNb2RhbCIsInNob3dTaWRlYmFyIiwiaXNMb2dnZWRJbiIsInN0YXRlIiwicGF0aG5hbWUiLCJpc0FjdGl2ZSIsIm9uQ2xpY2siLCJkaXYiLCJzcmMiLCJhbHQiLCJ3aWR0aCIsImhlaWdodCIsInNwYW4iLCJvbkNsb3NlIiwiU2lkZWJhck1lbnUiLCJtYXAiLCJtZW51Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/shared/side-bar/SidebarMenu.tsx\n"));

/***/ })

});