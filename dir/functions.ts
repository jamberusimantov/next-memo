import { objectWithStringKey } from './types'

const composeURL = (base: string, object: objectWithStringKey) => {
    if (object && Object.keys(object).length > 0) {
        Object.keys(object).forEach((key, i) => {

            if (i === 0) {
                base += `?${key}=${encodeURI(object[key])}`
            } else {
                base += `&${key}=${encodeURI(object[key])}`
            }
        });
    }
    return base;
}

const fetcher = (url: string, method?: string) =>
    fetch(url, { method: method || 'GET' })
        .then((res) => res.json());

const isValidId = (id: any) => new String(id).match(/^[0-9a-fA-F]{24}$/) ? true : false;


export { fetcher, composeURL, isValidId }