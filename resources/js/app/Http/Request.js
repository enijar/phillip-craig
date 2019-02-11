import request from "superagent";
import get from "lodash/get";
import config from "../config";
import {guid} from "../utils";

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

const pendingRequests = [];

const sendRequest = ({method, endpoint, data = {}, type = 'json', progressCallback = null, headers = {}}) => new Promise(resolve => {
    headers = Object.assign(DEFAULT_HEADERS, headers);

    // We're using JWT here to authenticate, so if the token is not in
    // localStorage, then the user is definitely not authenticated.
    // NOTE: We ignore any routes that are public (defined in app config.
    const user = JSON.parse(localStorage.getItem('auth.user')) || {};

    if (!config.publicRoutes.includes(endpoint) && !user.hasOwnProperty('jwt')) {
        return resolve({success: false, errors: ['Unauthorised'], message: null, code: 401});
    }

    // Set the JWT in the Bearer header for all requests.
    headers['Authorization'] = `Bearer ${user.jwt || ''}`;

    const req = request[method](endpoint);
    req.guid = guid();
    pendingRequests.push(req);

    if (type === 'json') {
        req.set(headers).send(data);
    }

    if (type === 'file') {
        delete headers['Content-Type'];

        const otherData = Object.assign({}, data);
        delete otherData.file;

        for (let field in otherData) {
            if (!otherData.hasOwnProperty(field)) {
                continue;
            }
            req.field(field, otherData[field]);
        }

        req.set(headers).attach('file', data.file).on('progress', event => {
            if (typeof progressCallback === 'function' && event.direction === 'upload') {
                progressCallback(event.percent);
            }
        });
    }

    req.end((err, res) => {
        // Remove this request from the pending requests array
        for (let i = pendingRequests.length - 1; i >= 0; i--) {
            if (pendingRequests[i].guid === req.guid) {
                pendingRequests.splice(i, 1);
                break;
            }
        }

        if (res === undefined) {
            // Server is disconnected
            return resolve({success: false, errors: ['Server disconnected'], message: null, code: 503});
        }

        if (res.statusCode < 300) {
            return resolve({
                success: true,
                body: res.body,
                errors: [],
                message: get(res, 'body.message', null),
                code: res.statusCode,
            });
        }

        let errors = ['Unknown error'];

        if (res.statusCode === 404) {
            errors = ['Page not found'];
        }

        if (res.statusCode === 500) {
            errors = ['Internal server error'];
        }

        if (res.body && res.body.errors) {
            errors = res.body.errors;
        }

        resolve({success: false, errors, message: null, code: res.statusCode});
    });
});

export default class Request {
    static get(endpoint, data = {}, headers = {}) {
        return sendRequest({method: 'get', endpoint, data, headers});
    }

    static post(endpoint, data = {}, headers = {}) {
        return sendRequest({method: 'post', endpoint, data, headers});
    }

    static patch(endpoint, data = {}, headers = {}) {
        return sendRequest({method: 'patch', endpoint, data, headers});
    }

    static delete(endpoint, data = {}, headers = {}) {
        return sendRequest({method: 'delete', endpoint, data, headers});
    }

    static abortAllRequests() {
        // Stop all pending requests and remove them from the array
        for (let i = pendingRequests.length - 1; i >= 0; i--) {
            pendingRequests[i].abort();
            pendingRequests.splice(i, 1);
        }
    }
}
