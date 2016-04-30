"use strict";
var index_1 = require('../src/index');
var df = require('deep-freeze');
var chai_1 = require('chai');
describe('validate merge', function () {
    it('makes sure it is immutable', function () {
        var a = df({ a: 'a' });
        var b = df({ b: 'b' });
        var c = df({ c: 'c' });
        chai_1.expect(index_1.merge(a, b)).to.be.deep.equal({ a: 'a', b: 'b' });
        chai_1.expect(index_1.merge(a, b, c)).to.be.deep.equal({ a: 'a', b: 'b', c: 'c' });
    });
    it('makes sure the values are merged left to right', function () {
        var a = { v: 'a', x: 'a', y: 'a' };
        var b = { v: 'b', x: 'b' };
        var c = { x: 'c' };
        chai_1.expect(index_1.merge(a, b, c)).to.be.deep.equal({ v: 'b', x: 'c', y: 'a' });
    });
    it('makes sure it is a shallow copy', function () {
        var a = { one: { value: 'a' } };
        var b = { two: { value: 'b' } };
        var ab = index_1.merge(a, b);
        chai_1.expect(ab).to.be.deep.equal({ one: { value: 'a' }, two: { value: 'b' } });
        chai_1.expect(ab.one).to.be.equal(a.one);
        chai_1.expect(ab.two).to.be.equal(b.two);
        // change a.one and expect ab.one to also change.
        a.one.value = 'A';
        chai_1.expect(ab.one.value).to.be.equal('A');
    });
});
//# sourceMappingURL=test.js.map