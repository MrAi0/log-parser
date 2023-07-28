#!/usr/bin/env node
import * as fs from 'fs';
import { CommandType, apiCallPattern } from './constants/constants';
import { EndpointOccurence } from './commands/endpoint-occurence-cmd';
import { EndPointPerMinute } from './commands/endpoint-per-minute-cmd';
import { StatusCodeSummary } from './commands/status-code-summary-cmd';
import { APISignature } from './model/api-signature';

// Extracts the log file data and creates an array of APISignature Objects
function extractApiCalls(logContent: string): APISignature[] {
    const apiCalls: APISignature[] = [];

    let match: RegExpExecArray | null;
    while ((match = apiCallPattern.exec(logContent)) !== null) {
        const [, timestamp, , httpMethod, url, statusCode] = match;
        const apiCall: APISignature = { timestamp, httpMethod, url, statusCode };
        apiCalls.push(apiCall);
    }
    return apiCalls;
}

// Constructs the data based on the arguments passed
function constructData(apiCalls: APISignature[], commandType: CommandType): void {
    switch (commandType) {
        case CommandType.ENDPOINT_OCCURENCE:
            new EndpointOccurence().executeAndLog(apiCalls);
            break;
        case CommandType.ENDPOINT_PER_MINUTE: {
            new EndPointPerMinute().executeAndLog(apiCalls);
            break;
        }
        case CommandType.STATUS_CODE_SUMMARY: {
            new StatusCodeSummary().executeAndLog(apiCalls);
            break;
        }
        case CommandType.ALL:
            new EndpointOccurence().executeAndLog(apiCalls);
            new EndPointPerMinute().executeAndLog(apiCalls);
            new StatusCodeSummary().executeAndLog(apiCalls);
            break;
    }
}

// The entry part of the project
function bootStrap(): void {
    const commandType = process.argv[2];
    const fileName = process.argv[3];

    if (commandType === CommandType.HELP) {
        console.log('Use parse-log [OPTION]... [FILENAME]...');
        console.log('\n[OPTION]: ');
        console.log('-eo: To display which endpoint is called how many times');
        console.log('-epm: To display how many API calls were being made on per minute basis');
        console.log('-scs: To display how many API calls are there in total for each HTTP status code');
        console.log('-all: To display all data');
        console.log('\n[FILENAME]: Pass the file name present in the logs folder');
        return;
    }

    if (commandType !== CommandType.ALL && commandType !== CommandType.ENDPOINT_OCCURENCE && commandType !== CommandType.ENDPOINT_PER_MINUTE && commandType !== CommandType.STATUS_CODE_SUMMARY && commandType !== CommandType.HELP) {
        console.error('Please enter correct arguments');
        return;
    }

    if (!fileName || !fileName.endsWith('.log')) {
        console.error('Please enter correct file');
        return;
    }

    const logFilePath = `../logs/${fileName}`;
    try {
        const logContent = fs.readFileSync(`${__dirname}/${logFilePath}`, 'utf8');
        const apiCalls = extractApiCalls(logContent);
        constructData(apiCalls, commandType);
    } catch (error) {
        console.error('Error reading log file:', error);
        return;
    }
}

bootStrap();