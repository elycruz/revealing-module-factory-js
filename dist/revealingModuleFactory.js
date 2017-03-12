/**! revealingModuleFactory.js 1.0.0 | License: ISC | Homepage: https://github.com/elycruz/revealing-module-factory-js#readme | SHA1 Checksum: b1117c71085326459f4566fbb8fd67d748943699 | Generated: Sun Mar 12 2017 01:36:24 GMT-0500 (Eastern Standard Time) **/'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (exports) {
    'use strict';

    /**
     * Created by elyde on 3/11/2017.
     */

    var _undefined = 'undefined';

    /**
     * Sets an enumerable property (with value) on an object.
     * @function defineEnumPropValue
     * @param onObj {Object}
     * @param propName {String}
     * @param value {*}
     * @returns {Object}
     */
    function defineEnumPropValue(onObj, propName, value) {
        return Object.defineProperty(onObj, propName, {
            value: value,
            enumerable: true
        });
    }

    /**
     * Sets an un-configurable namespace on an object with optional value at the end of the namespace.
     * @note Copied directly from `sjljs`.
     * @param nsString {String} - Namespace or namespace-string to set on `obj`.
     * @param obj {Object} - Object to add un-configurable namespace on.
     * @param [valueToSet=undefined] {*} - Value to set.  Optional.  Default `undefined`.
     * @returns {*} - Object that was passed in.
     */
    function unConfigurableNamespace(nsString, obj, valueToSet) {
        var shouldSetValue = (typeof valueToSet === 'undefined' ? 'undefined' : _typeof(valueToSet)) !== _undefined;

        // Reduce original object to itself with requested modifications
        return nsString.split('.').reduce(function (agg, key, ind, parts) {
            var ObjHasOwnProperty = agg.hasOwnProperty(key);
            if (ind === parts.length - 1 && shouldSetValue && !ObjHasOwnProperty) {
                defineEnumPropValue(agg, key, valueToSet);
            } else if (_typeof(agg[key]) === _undefined && !ObjHasOwnProperty) {
                defineEnumPropValue(agg, key, {});
            }
            return agg[key];
        }, obj);
    }

    /**
     * Revealing module function.  Returns itself if being called as a setter or stored
     *  member/namespace if one is found.
     * @function revealingModule
     * @param nsString {String} - Name of module to store/get or namespace string which can also include module name to get/set at end.
     * @param [value=undefined] {*} - Value to set on module (revealing module function).
     * @parm [freeze=false] {Boolean} - Whether to freeze
     * @returns {*} - Self or found namespace/module.
     */

    /**
     * Revealing module factory.  Returns a revealing module function which in turn allows you to set
     * modules on it via namespace strings.  Also note module namespaces are set as not `writable` and not `configurable`
     * via `Object.defineProperty` - This makes your namespaces harder to tamper with;  E.g.,
     * ```
     *   var myModule = revealingModuleFactory();
    
     *   // Some values to work with
     *   function Hello () {}
     *   function SomeMember () {}
     *
     *   myModule('some.namespace.Hello', Hello);
     *   myModule('SomeMember', SomeMember);
     *   myModule.SomeMember === SomeMember;        // `true`
     *   myModule.some.namespace.Hello === Hello;   // `true`
     *
     *   // Error is thrown here as property is not `writable` and
     *   // property is not `configurable` or in essence protected.
     *   myModule.SomeMember = Hello;
     *
     * ```
     *
     * @function revealingModuleFactory
     * @module revealingModuleFactory
     * @returns {revealingModule} - Revealing module function (store members on itself and makes them un-'configurable' (as propert(y|ies))).
     */
    function revealingModuleFactory() {
        return function revealingModule(nsString, value) {
            return (typeof nsString === 'undefined' ? 'undefined' : _typeof(nsString)) === _undefined ? revealingModule : unConfigurableNamespace(nsString, revealingModule, value);
        };
    }

    defineEnumPropValue(revealingModuleFactory, unConfigurableNamespace.name, unConfigurableNamespace);
    defineEnumPropValue(revealingModuleFactory, defineEnumPropValue.name, defineEnumPropValue);

    exports['default'] = revealingModuleFactory;
})(undefined.revealingModuleFactory = undefined.revealingModuleFactory || {});