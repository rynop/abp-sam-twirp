import * as $protobuf from "protobufjs";
export namespace com {

    namespace abpsamtwirp {

        namespace platform {

            interface IEmpty {
            }

            class Empty implements IEmpty {
                constructor(properties?: com.abpsamtwirp.platform.IEmpty);
                public static create(properties?: com.abpsamtwirp.platform.IEmpty): com.abpsamtwirp.platform.Empty;
                public static encode(message: com.abpsamtwirp.platform.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: com.abpsamtwirp.platform.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.abpsamtwirp.platform.Empty;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.abpsamtwirp.platform.Empty;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): com.abpsamtwirp.platform.Empty;
                public static toObject(message: com.abpsamtwirp.platform.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            interface ITimestamp {
                seconds?: (number|Long|null);
                nanos?: (number|null);
            }

            class Timestamp implements ITimestamp {
                constructor(properties?: com.abpsamtwirp.platform.ITimestamp);
                public seconds: (number|Long);
                public nanos: number;
                public static create(properties?: com.abpsamtwirp.platform.ITimestamp): com.abpsamtwirp.platform.Timestamp;
                public static encode(message: com.abpsamtwirp.platform.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: com.abpsamtwirp.platform.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.abpsamtwirp.platform.Timestamp;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.abpsamtwirp.platform.Timestamp;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): com.abpsamtwirp.platform.Timestamp;
                public static toObject(message: com.abpsamtwirp.platform.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            interface ILatLng {
                latitude?: (number|null);
                longitude?: (number|null);
            }

            class LatLng implements ILatLng {
                constructor(properties?: com.abpsamtwirp.platform.ILatLng);
                public latitude: number;
                public longitude: number;
                public static create(properties?: com.abpsamtwirp.platform.ILatLng): com.abpsamtwirp.platform.LatLng;
                public static encode(message: com.abpsamtwirp.platform.ILatLng, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: com.abpsamtwirp.platform.ILatLng, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.abpsamtwirp.platform.LatLng;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.abpsamtwirp.platform.LatLng;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): com.abpsamtwirp.platform.LatLng;
                public static toObject(message: com.abpsamtwirp.platform.LatLng, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            class AuthSvc extends $protobuf.rpc.Service {
                constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);
                public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): AuthSvc;
                public token(request: com.abpsamtwirp.platform.ITokenReq, callback: com.abpsamtwirp.platform.AuthSvc.TokenCallback): void;
                public token(request: com.abpsamtwirp.platform.ITokenReq): Promise<com.abpsamtwirp.platform.TokenRes>;
            }

            namespace AuthSvc {

                type TokenCallback = (error: (Error|null), response?: com.abpsamtwirp.platform.TokenRes) => void;
            }

            interface ITokenReq {
                existingPlatformToken?: (string|null);
                firebaseToken?: (string|null);
            }

            class TokenReq implements ITokenReq {
                constructor(properties?: com.abpsamtwirp.platform.ITokenReq);
                public existingPlatformToken: string;
                public firebaseToken: string;
                public static create(properties?: com.abpsamtwirp.platform.ITokenReq): com.abpsamtwirp.platform.TokenReq;
                public static encode(message: com.abpsamtwirp.platform.ITokenReq, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: com.abpsamtwirp.platform.ITokenReq, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.abpsamtwirp.platform.TokenReq;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.abpsamtwirp.platform.TokenReq;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): com.abpsamtwirp.platform.TokenReq;
                public static toObject(message: com.abpsamtwirp.platform.TokenReq, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            interface ITokenRes {
                jwt?: (string|null);
                exp?: (number|Long|null);
            }

            class TokenRes implements ITokenRes {
                constructor(properties?: com.abpsamtwirp.platform.ITokenRes);
                public jwt: string;
                public exp: (number|Long);
                public static create(properties?: com.abpsamtwirp.platform.ITokenRes): com.abpsamtwirp.platform.TokenRes;
                public static encode(message: com.abpsamtwirp.platform.ITokenRes, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: com.abpsamtwirp.platform.ITokenRes, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.abpsamtwirp.platform.TokenRes;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.abpsamtwirp.platform.TokenRes;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): com.abpsamtwirp.platform.TokenRes;
                public static toObject(message: com.abpsamtwirp.platform.TokenRes, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
