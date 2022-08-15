import { chooseMessage, inputParams, parseArgs } from './cli';
import fs from 'fs';
import protobuf from 'protobufjs';
import { parseMessageNames } from './protobuf';

async function main() {
    const args = parseArgs();

    if (args['--help']) {
        process.stdout.write('Usage ./pb-tool --file <file>\n');
        process.stdout.write('--file -f proto file to be parsed\n');
        process.stdout.write('--help -h opens help\n');
        return;
    }

    if (!args['--file']) {
        process.stdout.write('Usage ./pb-tool --file <file>\n');
        process.stdout.write('No file specified\n');
        return;
    }

    const file = args['--file'];
    if (!fs.existsSync(file)) {
        process.stdout.write('File does not exist\n');
        return;
    }

    const root = await protobuf.load(file);
    const messages = parseMessageNames(root.nested);

    const result = await chooseMessage(messages);

    const message = root.lookupType(result);

    const payload = await inputParams(message);
    console.log('Payload:', payload);

    const error = message.verify(payload);
    if (!payload || error) {
        process.stdout.write(`Invalid payload ${error}\n`);
        return;
    }

    const buffer = message.encode(payload).finish();
    process.stdout.write(`Payload: ${Buffer.from(buffer).toString('hex')}\n`);
}
main();
