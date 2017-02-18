import { Router } from 'express'
import * as _ from 'lodash';

const router = new Router()

/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

router.get('/wordmatch', (req, res) => {
    const wordMatchDict = {
        '1': '',
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz',
        '0': ' '
    }
    const validWords = ['good', 'bad', 'dad', 'yousha', 'rizvi', 'syed', 'raza', 'job',
                        'get', 'fetch', 'put', 'post', 'manage', 'treat', 'act', 'react',];

    let input = req.query.input;
    let validate = req.query.validate;

    let cartesianProduct = (sets) => {
        return _.reduce(sets, (a, b) => _.flatten(
                                        _.map(a, (x) =>
                                            _.map(b, (y) => 
                                                x.concat([y]))), true), [ [] ]); 
    };

    let matchedWords = cartesianProduct(input.split('')
                        .map(key =>
                                (key in wordMatchDict) ?
                                    wordMatchDict[key].split(''):
                                    `${key}`.split('')))
                        .map(subset => subset.join(''))
                        .filter(word => validate==='false' ?
                                        true : validWords.indexOf(word) >= 0)
    return res.send(matchedWords);
})

export default router
