// Generated by protoc-gen-twirp_typescript. DO NOT EDIT
import {com} from './platform.pb';
import {createTwirpAdapter} from 'pbjs-twirp';
import Axios from 'axios';

const getServiceMethodName = (fn: any): string => {
	if (fn === com.abpsamtwirp.platform.AuthSvc.prototype.token) {
		return 'Token';
    }

    throw new Error('Unknown Method');
};


export const AuthSvcPathPrefix = '/com.abpsamtwirp.platform.AuthSvc/';

export const createAuthSvc = (baseURL: string, options = {}): com.abpsamtwirp.platform.AuthSvc => {
    const defaultOpts = {
        baseURL: baseURL + AuthSvcPathPrefix,
        headers: {
          Accept: 'application/protobuf'
        }
    };
    const axiosOpts = { ...defaultOpts, ...options };
    
    const axios = Axios.create(axiosOpts);

    return com.abpsamtwirp.platform.AuthSvc.create(createTwirpAdapter(axios, getServiceMethodName));
};