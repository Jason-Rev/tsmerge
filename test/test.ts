import {merge} from '../src/index';
import * as df from 'deep-freeze';
import {expect} from 'chai';

describe('validate merge', () => {
    it('makes sure it is immutable', () => {
        const a = df({ a: 'a' });
        const b = df({ b: 'b' });
        const c = df({ c: 'c' });
        expect(merge(a, b)).to.be.deep.equal({ a: 'a', b: 'b' });
        expect(merge(a, b, c)).to.be.deep.equal({ a: 'a', b: 'b', c: 'c' });
    });

    it('makes sure the values are merged left to right', () => {
        const a = { v: 'a', x: 'a', y: 'a' };
        const b = { v: 'b', x: 'b' };
        const c = { x: 'c' };
        expect(merge(a, b, c)).to.be.deep.equal({ v: 'b', x: 'c', y: 'a' });
    });

    it('makes sure it is a shallow copy', () => {
        const a = { one: { value: 'a'} };
        const b = { two: { value: 'b' } };
        const ab = merge(a, b);
        expect(ab).to.be.deep.equal({ one: { value: 'a' }, two: { value: 'b'}});
        expect(ab.one).to.be.equal(a.one);
        expect(ab.two).to.be.equal(b.two);

        // change a.one and expect ab.one to also change.
        a.one.value = 'A';
        expect(ab.one.value).to.be.equal('A');
    });
});