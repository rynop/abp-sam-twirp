
import {createTwirpRequest, throwTwirpError, Fetch} from './twirp';


export interface Empty {
}

interface EmptyJSON {
}


export interface Timestamp {
    seconds?: number;
    nanos?: number;
}

interface TimestampJSON {
    seconds?: number;
    nanos?: number;
}


export interface LatLng {
    latitude?: number;
    longitude?: number;
}

interface LatLngJSON {
    latitude?: number;
    longitude?: number;
}


export interface TokenReq {
    existingplatformtoken?: string;
    firebasetoken?: string;
}

interface TokenReqJSON {
    existingPlatformToken?: string;
    firebaseToken?: string;
}



const TokenReqToJSON = (m: TokenReq): TokenReqJSON => {
    return {
        existingPlatformToken: m.existingplatformtoken,
        firebaseToken: m.firebasetoken,
    };
};


export interface TokenRes {
    jwt?: string;
    exp?: number;
}

interface TokenResJSON {
    jwt?: string;
    exp?: number;
}



const JSONToTokenRes = (m: TokenRes | TokenResJSON): TokenRes => {
    return {
        jwt: m.jwt,
        exp: m.exp,
    };
};


export interface AuthSvc {
    token: (tokenReq: TokenReq) => Promise<TokenRes>;
    
}

export class DefaultAuthSvc implements AuthSvc {
    private hostname: string;
    private fetch: Fetch;
    private writeCamelCase: boolean;
    private pathPrefix = "/com.abpsamtwirp.platform.AuthSvc/";
    private headersOverride: HeadersInit;

    constructor(hostname: string, fetch: Fetch, writeCamelCase = false, headersOverride: HeadersInit = {}) {
        this.hostname = hostname;
        this.fetch = fetch;
        this.writeCamelCase = writeCamelCase;
        this.headersOverride = headersOverride;
    }
    token(tokenReq: TokenReq): Promise<TokenRes> {
        const url = this.hostname + this.pathPrefix + "Token";
        let body: TokenReq | TokenReqJSON = tokenReq;
        if (!this.writeCamelCase) {
            body = TokenReqToJSON(tokenReq);
        }
        return this.fetch(createTwirpRequest(url, body, this.headersOverride)).then((resp) => {
            if (!resp.ok) {
                return throwTwirpError(resp);
            }

            return resp.json().then(JSONToTokenRes);
        });
    }
    
}

