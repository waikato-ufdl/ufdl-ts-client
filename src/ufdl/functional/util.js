"use strict";

export function detail_url(base_url, object_pk) {
    return base_url + object_pk + "/"
}

export function partial_params(params) {
    params = { ...params };

    for (let key of Object.keys(params)) {
        if (params[key] === undefined) delete params[key];
    }
}