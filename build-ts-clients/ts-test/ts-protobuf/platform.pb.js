/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.com = (function() {

    /**
     * Namespace com.
     * @exports com
     * @namespace
     */
    var com = {};

    com.abpsamtwirp = (function() {

        /**
         * Namespace abpsamtwirp.
         * @memberof com
         * @namespace
         */
        var abpsamtwirp = {};

        abpsamtwirp.platform = (function() {

            /**
             * Namespace platform.
             * @memberof com.abpsamtwirp
             * @namespace
             */
            var platform = {};

            platform.Empty = (function() {

                /**
                 * Properties of an Empty.
                 * @memberof com.abpsamtwirp.platform
                 * @interface IEmpty
                 */

                /**
                 * Constructs a new Empty.
                 * @memberof com.abpsamtwirp.platform
                 * @classdesc Represents an Empty.
                 * @implements IEmpty
                 * @constructor
                 * @param {com.abpsamtwirp.platform.IEmpty=} [properties] Properties to set
                 */
                function Empty(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new Empty instance using the specified properties.
                 * @function create
                 * @memberof com.abpsamtwirp.platform.Empty
                 * @static
                 * @param {com.abpsamtwirp.platform.IEmpty=} [properties] Properties to set
                 * @returns {com.abpsamtwirp.platform.Empty} Empty instance
                 */
                Empty.create = function create(properties) {
                    return new Empty(properties);
                };

                /**
                 * Encodes the specified Empty message. Does not implicitly {@link com.abpsamtwirp.platform.Empty.verify|verify} messages.
                 * @function encode
                 * @memberof com.abpsamtwirp.platform.Empty
                 * @static
                 * @param {com.abpsamtwirp.platform.IEmpty} message Empty message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Empty.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified Empty message, length delimited. Does not implicitly {@link com.abpsamtwirp.platform.Empty.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.abpsamtwirp.platform.Empty
                 * @static
                 * @param {com.abpsamtwirp.platform.IEmpty} message Empty message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Empty.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Empty message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.abpsamtwirp.platform.Empty
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.abpsamtwirp.platform.Empty} Empty
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Empty.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.abpsamtwirp.platform.Empty();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an Empty message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.abpsamtwirp.platform.Empty
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.abpsamtwirp.platform.Empty} Empty
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Empty.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an Empty message.
                 * @function verify
                 * @memberof com.abpsamtwirp.platform.Empty
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Empty.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates an Empty message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.abpsamtwirp.platform.Empty
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.abpsamtwirp.platform.Empty} Empty
                 */
                Empty.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.abpsamtwirp.platform.Empty)
                        return object;
                    return new $root.com.abpsamtwirp.platform.Empty();
                };

                /**
                 * Creates a plain object from an Empty message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.abpsamtwirp.platform.Empty
                 * @static
                 * @param {com.abpsamtwirp.platform.Empty} message Empty
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Empty.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this Empty to JSON.
                 * @function toJSON
                 * @memberof com.abpsamtwirp.platform.Empty
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Empty.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Empty;
            })();

            platform.Timestamp = (function() {

                /**
                 * Properties of a Timestamp.
                 * @memberof com.abpsamtwirp.platform
                 * @interface ITimestamp
                 * @property {number|Long|null} [seconds] Timestamp seconds
                 * @property {number|null} [nanos] Timestamp nanos
                 */

                /**
                 * Constructs a new Timestamp.
                 * @memberof com.abpsamtwirp.platform
                 * @classdesc Represents a Timestamp.
                 * @implements ITimestamp
                 * @constructor
                 * @param {com.abpsamtwirp.platform.ITimestamp=} [properties] Properties to set
                 */
                function Timestamp(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Timestamp seconds.
                 * @member {number|Long} seconds
                 * @memberof com.abpsamtwirp.platform.Timestamp
                 * @instance
                 */
                Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Timestamp nanos.
                 * @member {number} nanos
                 * @memberof com.abpsamtwirp.platform.Timestamp
                 * @instance
                 */
                Timestamp.prototype.nanos = 0;

                /**
                 * Creates a new Timestamp instance using the specified properties.
                 * @function create
                 * @memberof com.abpsamtwirp.platform.Timestamp
                 * @static
                 * @param {com.abpsamtwirp.platform.ITimestamp=} [properties] Properties to set
                 * @returns {com.abpsamtwirp.platform.Timestamp} Timestamp instance
                 */
                Timestamp.create = function create(properties) {
                    return new Timestamp(properties);
                };

                /**
                 * Encodes the specified Timestamp message. Does not implicitly {@link com.abpsamtwirp.platform.Timestamp.verify|verify} messages.
                 * @function encode
                 * @memberof com.abpsamtwirp.platform.Timestamp
                 * @static
                 * @param {com.abpsamtwirp.platform.ITimestamp} message Timestamp message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Timestamp.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                    if (message.nanos != null && message.hasOwnProperty("nanos"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                    return writer;
                };

                /**
                 * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link com.abpsamtwirp.platform.Timestamp.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.abpsamtwirp.platform.Timestamp
                 * @static
                 * @param {com.abpsamtwirp.platform.ITimestamp} message Timestamp message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Timestamp message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.abpsamtwirp.platform.Timestamp
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.abpsamtwirp.platform.Timestamp} Timestamp
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Timestamp.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.abpsamtwirp.platform.Timestamp();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.seconds = reader.int64();
                            break;
                        case 2:
                            message.nanos = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Timestamp message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.abpsamtwirp.platform.Timestamp
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.abpsamtwirp.platform.Timestamp} Timestamp
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Timestamp.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Timestamp message.
                 * @function verify
                 * @memberof com.abpsamtwirp.platform.Timestamp
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Timestamp.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                            return "seconds: integer|Long expected";
                    if (message.nanos != null && message.hasOwnProperty("nanos"))
                        if (!$util.isInteger(message.nanos))
                            return "nanos: integer expected";
                    return null;
                };

                /**
                 * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.abpsamtwirp.platform.Timestamp
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.abpsamtwirp.platform.Timestamp} Timestamp
                 */
                Timestamp.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.abpsamtwirp.platform.Timestamp)
                        return object;
                    var message = new $root.com.abpsamtwirp.platform.Timestamp();
                    if (object.seconds != null)
                        if ($util.Long)
                            (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                        else if (typeof object.seconds === "string")
                            message.seconds = parseInt(object.seconds, 10);
                        else if (typeof object.seconds === "number")
                            message.seconds = object.seconds;
                        else if (typeof object.seconds === "object")
                            message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                    if (object.nanos != null)
                        message.nanos = object.nanos | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.abpsamtwirp.platform.Timestamp
                 * @static
                 * @param {com.abpsamtwirp.platform.Timestamp} message Timestamp
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Timestamp.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.seconds = options.longs === String ? "0" : 0;
                        object.nanos = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (typeof message.seconds === "number")
                            object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                        else
                            object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                    if (message.nanos != null && message.hasOwnProperty("nanos"))
                        object.nanos = message.nanos;
                    return object;
                };

                /**
                 * Converts this Timestamp to JSON.
                 * @function toJSON
                 * @memberof com.abpsamtwirp.platform.Timestamp
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Timestamp.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Timestamp;
            })();

            platform.LatLng = (function() {

                /**
                 * Properties of a LatLng.
                 * @memberof com.abpsamtwirp.platform
                 * @interface ILatLng
                 * @property {number|null} [latitude] LatLng latitude
                 * @property {number|null} [longitude] LatLng longitude
                 */

                /**
                 * Constructs a new LatLng.
                 * @memberof com.abpsamtwirp.platform
                 * @classdesc Represents a LatLng.
                 * @implements ILatLng
                 * @constructor
                 * @param {com.abpsamtwirp.platform.ILatLng=} [properties] Properties to set
                 */
                function LatLng(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * LatLng latitude.
                 * @member {number} latitude
                 * @memberof com.abpsamtwirp.platform.LatLng
                 * @instance
                 */
                LatLng.prototype.latitude = 0;

                /**
                 * LatLng longitude.
                 * @member {number} longitude
                 * @memberof com.abpsamtwirp.platform.LatLng
                 * @instance
                 */
                LatLng.prototype.longitude = 0;

                /**
                 * Creates a new LatLng instance using the specified properties.
                 * @function create
                 * @memberof com.abpsamtwirp.platform.LatLng
                 * @static
                 * @param {com.abpsamtwirp.platform.ILatLng=} [properties] Properties to set
                 * @returns {com.abpsamtwirp.platform.LatLng} LatLng instance
                 */
                LatLng.create = function create(properties) {
                    return new LatLng(properties);
                };

                /**
                 * Encodes the specified LatLng message. Does not implicitly {@link com.abpsamtwirp.platform.LatLng.verify|verify} messages.
                 * @function encode
                 * @memberof com.abpsamtwirp.platform.LatLng
                 * @static
                 * @param {com.abpsamtwirp.platform.ILatLng} message LatLng message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                LatLng.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.latitude != null && message.hasOwnProperty("latitude"))
                        writer.uint32(/* id 1, wireType 1 =*/9).double(message.latitude);
                    if (message.longitude != null && message.hasOwnProperty("longitude"))
                        writer.uint32(/* id 2, wireType 1 =*/17).double(message.longitude);
                    return writer;
                };

                /**
                 * Encodes the specified LatLng message, length delimited. Does not implicitly {@link com.abpsamtwirp.platform.LatLng.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.abpsamtwirp.platform.LatLng
                 * @static
                 * @param {com.abpsamtwirp.platform.ILatLng} message LatLng message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                LatLng.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a LatLng message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.abpsamtwirp.platform.LatLng
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.abpsamtwirp.platform.LatLng} LatLng
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LatLng.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.abpsamtwirp.platform.LatLng();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.latitude = reader.double();
                            break;
                        case 2:
                            message.longitude = reader.double();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a LatLng message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.abpsamtwirp.platform.LatLng
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.abpsamtwirp.platform.LatLng} LatLng
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LatLng.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a LatLng message.
                 * @function verify
                 * @memberof com.abpsamtwirp.platform.LatLng
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                LatLng.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.latitude != null && message.hasOwnProperty("latitude"))
                        if (typeof message.latitude !== "number")
                            return "latitude: number expected";
                    if (message.longitude != null && message.hasOwnProperty("longitude"))
                        if (typeof message.longitude !== "number")
                            return "longitude: number expected";
                    return null;
                };

                /**
                 * Creates a LatLng message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.abpsamtwirp.platform.LatLng
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.abpsamtwirp.platform.LatLng} LatLng
                 */
                LatLng.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.abpsamtwirp.platform.LatLng)
                        return object;
                    var message = new $root.com.abpsamtwirp.platform.LatLng();
                    if (object.latitude != null)
                        message.latitude = Number(object.latitude);
                    if (object.longitude != null)
                        message.longitude = Number(object.longitude);
                    return message;
                };

                /**
                 * Creates a plain object from a LatLng message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.abpsamtwirp.platform.LatLng
                 * @static
                 * @param {com.abpsamtwirp.platform.LatLng} message LatLng
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                LatLng.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.latitude = 0;
                        object.longitude = 0;
                    }
                    if (message.latitude != null && message.hasOwnProperty("latitude"))
                        object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
                    if (message.longitude != null && message.hasOwnProperty("longitude"))
                        object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
                    return object;
                };

                /**
                 * Converts this LatLng to JSON.
                 * @function toJSON
                 * @memberof com.abpsamtwirp.platform.LatLng
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                LatLng.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return LatLng;
            })();

            platform.AuthSvc = (function() {

                /**
                 * Constructs a new AuthSvc service.
                 * @memberof com.abpsamtwirp.platform
                 * @classdesc Represents an AuthSvc
                 * @extends $protobuf.rpc.Service
                 * @constructor
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 */
                function AuthSvc(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }

                (AuthSvc.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = AuthSvc;

                /**
                 * Creates new AuthSvc service using the specified rpc implementation.
                 * @function create
                 * @memberof com.abpsamtwirp.platform.AuthSvc
                 * @static
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 * @returns {AuthSvc} RPC service. Useful where requests and/or responses are streamed.
                 */
                AuthSvc.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                };

                /**
                 * Callback as used by {@link com.abpsamtwirp.platform.AuthSvc#token}.
                 * @memberof com.abpsamtwirp.platform.AuthSvc
                 * @typedef TokenCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {com.abpsamtwirp.platform.TokenRes} [response] TokenRes
                 */

                /**
                 * Calls Token.
                 * @function token
                 * @memberof com.abpsamtwirp.platform.AuthSvc
                 * @instance
                 * @param {com.abpsamtwirp.platform.ITokenReq} request TokenReq message or plain object
                 * @param {com.abpsamtwirp.platform.AuthSvc.TokenCallback} callback Node-style callback called with the error, if any, and TokenRes
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(AuthSvc.prototype.token = function token(request, callback) {
                    return this.rpcCall(token, $root.com.abpsamtwirp.platform.TokenReq, $root.com.abpsamtwirp.platform.TokenRes, request, callback);
                }, "name", { value: "Token" });

                /**
                 * Calls Token.
                 * @function token
                 * @memberof com.abpsamtwirp.platform.AuthSvc
                 * @instance
                 * @param {com.abpsamtwirp.platform.ITokenReq} request TokenReq message or plain object
                 * @returns {Promise<com.abpsamtwirp.platform.TokenRes>} Promise
                 * @variation 2
                 */

                return AuthSvc;
            })();

            platform.TokenReq = (function() {

                /**
                 * Properties of a TokenReq.
                 * @memberof com.abpsamtwirp.platform
                 * @interface ITokenReq
                 * @property {string|null} [existingPlatformToken] TokenReq existingPlatformToken
                 * @property {string|null} [firebaseToken] TokenReq firebaseToken
                 */

                /**
                 * Constructs a new TokenReq.
                 * @memberof com.abpsamtwirp.platform
                 * @classdesc Represents a TokenReq.
                 * @implements ITokenReq
                 * @constructor
                 * @param {com.abpsamtwirp.platform.ITokenReq=} [properties] Properties to set
                 */
                function TokenReq(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TokenReq existingPlatformToken.
                 * @member {string} existingPlatformToken
                 * @memberof com.abpsamtwirp.platform.TokenReq
                 * @instance
                 */
                TokenReq.prototype.existingPlatformToken = "";

                /**
                 * TokenReq firebaseToken.
                 * @member {string} firebaseToken
                 * @memberof com.abpsamtwirp.platform.TokenReq
                 * @instance
                 */
                TokenReq.prototype.firebaseToken = "";

                /**
                 * Creates a new TokenReq instance using the specified properties.
                 * @function create
                 * @memberof com.abpsamtwirp.platform.TokenReq
                 * @static
                 * @param {com.abpsamtwirp.platform.ITokenReq=} [properties] Properties to set
                 * @returns {com.abpsamtwirp.platform.TokenReq} TokenReq instance
                 */
                TokenReq.create = function create(properties) {
                    return new TokenReq(properties);
                };

                /**
                 * Encodes the specified TokenReq message. Does not implicitly {@link com.abpsamtwirp.platform.TokenReq.verify|verify} messages.
                 * @function encode
                 * @memberof com.abpsamtwirp.platform.TokenReq
                 * @static
                 * @param {com.abpsamtwirp.platform.ITokenReq} message TokenReq message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TokenReq.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.existingPlatformToken != null && message.hasOwnProperty("existingPlatformToken"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.existingPlatformToken);
                    if (message.firebaseToken != null && message.hasOwnProperty("firebaseToken"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.firebaseToken);
                    return writer;
                };

                /**
                 * Encodes the specified TokenReq message, length delimited. Does not implicitly {@link com.abpsamtwirp.platform.TokenReq.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.abpsamtwirp.platform.TokenReq
                 * @static
                 * @param {com.abpsamtwirp.platform.ITokenReq} message TokenReq message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TokenReq.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TokenReq message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.abpsamtwirp.platform.TokenReq
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.abpsamtwirp.platform.TokenReq} TokenReq
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TokenReq.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.abpsamtwirp.platform.TokenReq();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.existingPlatformToken = reader.string();
                            break;
                        case 2:
                            message.firebaseToken = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TokenReq message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.abpsamtwirp.platform.TokenReq
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.abpsamtwirp.platform.TokenReq} TokenReq
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TokenReq.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TokenReq message.
                 * @function verify
                 * @memberof com.abpsamtwirp.platform.TokenReq
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TokenReq.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.existingPlatformToken != null && message.hasOwnProperty("existingPlatformToken"))
                        if (!$util.isString(message.existingPlatformToken))
                            return "existingPlatformToken: string expected";
                    if (message.firebaseToken != null && message.hasOwnProperty("firebaseToken"))
                        if (!$util.isString(message.firebaseToken))
                            return "firebaseToken: string expected";
                    return null;
                };

                /**
                 * Creates a TokenReq message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.abpsamtwirp.platform.TokenReq
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.abpsamtwirp.platform.TokenReq} TokenReq
                 */
                TokenReq.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.abpsamtwirp.platform.TokenReq)
                        return object;
                    var message = new $root.com.abpsamtwirp.platform.TokenReq();
                    if (object.existingPlatformToken != null)
                        message.existingPlatformToken = String(object.existingPlatformToken);
                    if (object.firebaseToken != null)
                        message.firebaseToken = String(object.firebaseToken);
                    return message;
                };

                /**
                 * Creates a plain object from a TokenReq message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.abpsamtwirp.platform.TokenReq
                 * @static
                 * @param {com.abpsamtwirp.platform.TokenReq} message TokenReq
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TokenReq.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.existingPlatformToken = "";
                        object.firebaseToken = "";
                    }
                    if (message.existingPlatformToken != null && message.hasOwnProperty("existingPlatformToken"))
                        object.existingPlatformToken = message.existingPlatformToken;
                    if (message.firebaseToken != null && message.hasOwnProperty("firebaseToken"))
                        object.firebaseToken = message.firebaseToken;
                    return object;
                };

                /**
                 * Converts this TokenReq to JSON.
                 * @function toJSON
                 * @memberof com.abpsamtwirp.platform.TokenReq
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TokenReq.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TokenReq;
            })();

            platform.TokenRes = (function() {

                /**
                 * Properties of a TokenRes.
                 * @memberof com.abpsamtwirp.platform
                 * @interface ITokenRes
                 * @property {string|null} [jwt] TokenRes jwt
                 * @property {number|Long|null} [exp] TokenRes exp
                 */

                /**
                 * Constructs a new TokenRes.
                 * @memberof com.abpsamtwirp.platform
                 * @classdesc Represents a TokenRes.
                 * @implements ITokenRes
                 * @constructor
                 * @param {com.abpsamtwirp.platform.ITokenRes=} [properties] Properties to set
                 */
                function TokenRes(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TokenRes jwt.
                 * @member {string} jwt
                 * @memberof com.abpsamtwirp.platform.TokenRes
                 * @instance
                 */
                TokenRes.prototype.jwt = "";

                /**
                 * TokenRes exp.
                 * @member {number|Long} exp
                 * @memberof com.abpsamtwirp.platform.TokenRes
                 * @instance
                 */
                TokenRes.prototype.exp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new TokenRes instance using the specified properties.
                 * @function create
                 * @memberof com.abpsamtwirp.platform.TokenRes
                 * @static
                 * @param {com.abpsamtwirp.platform.ITokenRes=} [properties] Properties to set
                 * @returns {com.abpsamtwirp.platform.TokenRes} TokenRes instance
                 */
                TokenRes.create = function create(properties) {
                    return new TokenRes(properties);
                };

                /**
                 * Encodes the specified TokenRes message. Does not implicitly {@link com.abpsamtwirp.platform.TokenRes.verify|verify} messages.
                 * @function encode
                 * @memberof com.abpsamtwirp.platform.TokenRes
                 * @static
                 * @param {com.abpsamtwirp.platform.ITokenRes} message TokenRes message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TokenRes.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.jwt != null && message.hasOwnProperty("jwt"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.jwt);
                    if (message.exp != null && message.hasOwnProperty("exp"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int64(message.exp);
                    return writer;
                };

                /**
                 * Encodes the specified TokenRes message, length delimited. Does not implicitly {@link com.abpsamtwirp.platform.TokenRes.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.abpsamtwirp.platform.TokenRes
                 * @static
                 * @param {com.abpsamtwirp.platform.ITokenRes} message TokenRes message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TokenRes.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TokenRes message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.abpsamtwirp.platform.TokenRes
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.abpsamtwirp.platform.TokenRes} TokenRes
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TokenRes.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.abpsamtwirp.platform.TokenRes();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.jwt = reader.string();
                            break;
                        case 2:
                            message.exp = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TokenRes message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.abpsamtwirp.platform.TokenRes
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.abpsamtwirp.platform.TokenRes} TokenRes
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TokenRes.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TokenRes message.
                 * @function verify
                 * @memberof com.abpsamtwirp.platform.TokenRes
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TokenRes.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.jwt != null && message.hasOwnProperty("jwt"))
                        if (!$util.isString(message.jwt))
                            return "jwt: string expected";
                    if (message.exp != null && message.hasOwnProperty("exp"))
                        if (!$util.isInteger(message.exp) && !(message.exp && $util.isInteger(message.exp.low) && $util.isInteger(message.exp.high)))
                            return "exp: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a TokenRes message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.abpsamtwirp.platform.TokenRes
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.abpsamtwirp.platform.TokenRes} TokenRes
                 */
                TokenRes.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.abpsamtwirp.platform.TokenRes)
                        return object;
                    var message = new $root.com.abpsamtwirp.platform.TokenRes();
                    if (object.jwt != null)
                        message.jwt = String(object.jwt);
                    if (object.exp != null)
                        if ($util.Long)
                            (message.exp = $util.Long.fromValue(object.exp)).unsigned = false;
                        else if (typeof object.exp === "string")
                            message.exp = parseInt(object.exp, 10);
                        else if (typeof object.exp === "number")
                            message.exp = object.exp;
                        else if (typeof object.exp === "object")
                            message.exp = new $util.LongBits(object.exp.low >>> 0, object.exp.high >>> 0).toNumber();
                    return message;
                };

                /**
                 * Creates a plain object from a TokenRes message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.abpsamtwirp.platform.TokenRes
                 * @static
                 * @param {com.abpsamtwirp.platform.TokenRes} message TokenRes
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TokenRes.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.jwt = "";
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.exp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.exp = options.longs === String ? "0" : 0;
                    }
                    if (message.jwt != null && message.hasOwnProperty("jwt"))
                        object.jwt = message.jwt;
                    if (message.exp != null && message.hasOwnProperty("exp"))
                        if (typeof message.exp === "number")
                            object.exp = options.longs === String ? String(message.exp) : message.exp;
                        else
                            object.exp = options.longs === String ? $util.Long.prototype.toString.call(message.exp) : options.longs === Number ? new $util.LongBits(message.exp.low >>> 0, message.exp.high >>> 0).toNumber() : message.exp;
                    return object;
                };

                /**
                 * Converts this TokenRes to JSON.
                 * @function toJSON
                 * @memberof com.abpsamtwirp.platform.TokenRes
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TokenRes.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TokenRes;
            })();

            return platform;
        })();

        return abpsamtwirp;
    })();

    return com;
})();

module.exports = $root;
