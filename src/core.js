const babel = require('babel-core');
const types = require('babel-types');

let visitor = {
    ImportDeclaration(path, ref= {}){
        let {opt = {library: 'lodash'}} = ref;
        let node = path.node;
        let specifiers = node.specifiers;
        if(opt.library == node.source.value && !types.isImportDeclaration(specifiers[0])){
            let newImport = specifiers.map((specifier) => (
                types.importDeclaration(
                    [types.importDefaultSpecifier(specifier.local)],
                    types.stringLiteral(`${node.source.value}/${specifier.local.name}`)
                )
            ));
            path.replaceWithMultiple(newImport);
        }
    }
}

const code = "import {flatten, join} from 'lodash';";
const { ast } = babel.transform(code, {
    plugins: [{visitor}]
});

const generate = require('babel-generator').default;
const { code: codeFromBabel } = generate(ast);

console.log(codeFromBabel)