import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import ts from 'typescript';

const sourcePath = path.resolve(process.argv[2]);
const source = fs.readFileSync(sourcePath, 'utf8');
const output = ts.transpileModule(source, {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
    fileName: sourcePath,
}).outputText;
const generatedPath = path.join(path.dirname(sourcePath), '.' + path.basename(sourcePath) + '.' + process.pid + '.mjs');

try {
    fs.writeFileSync(generatedPath, output);
    const result = spawnSync(process.execPath, [generatedPath], {stdio: 'inherit'});
    if (result.error) throw result.error;
    process.exitCode = result.status ?? 1;
} finally {
    fs.rmSync(generatedPath, {force: true});
}
