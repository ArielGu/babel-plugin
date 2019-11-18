const babel = require('babel-core');
const code = `
import e from './where'
const [ a, b, c ] = [ 1, 2, 3 ]
`;

const {ast} = babel.transform(code, {ast: true});
console.log(ast);

const generate = require('babel-generator').default;
const { code: codeFromBabel } = generate(ast);

console.log(codeFromBabel)
