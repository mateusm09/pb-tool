import arg from 'arg';
import inquirer from 'inquirer';

export function parseArgs() {
    return arg({
        '--file': String,
        '--help': Boolean,

        '-f': '--file',
        '-h': '--help',
    });
}

export async function chooseMessage(_messages: string[]) {
    const messages = ['enter name', ..._messages];

    const result = await inquirer.prompt({
        type: 'list',
        name: 'message',
        message: 'Choose a message to parse',
        choices: messages,
    });

    if (result.message === 'enter name') {
        const name = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter message name',
            validate: (input: string) => (_messages.includes(input) ? true : 'Message does not exist'),
        });

        return name.name;
    }

    return result.message;
}

function pbTypeToInput(type: string) {
    switch (type) {
        case 'int32':
        case 'int64':
        case 'uint32':
        case 'uint64':
        case 'sint32':
        case 'sint64':
        case 'fixed32':
        case 'fixed64':
        case 'sfixed32':
        case 'sfixed64':
        case 'double':
        case 'float':
            return 'number';
        case 'bool':
            return 'confirm';
        case 'string':
            return 'input';
        case 'bytes':
            return 'input';
        default:
            return 'string';
    }
}

export async function inputParams(message: protobuf.Type) {
    const params = await inquirer.prompt(
        message.fieldsArray.map((field) => ({
            type: pbTypeToInput(field.type),
            name: field.name,
            message: field.name,
        }))
    );

    return params;
}
