import { statusMap } from "../constants/constants";
import { APISignature } from "../model/api-signature";
import { ICommand } from "./commands.interface";

export class StatusCodeSummary implements ICommand {

    // Used to execute the the status code summary in the array of APISignature objects and logs the output
    executeAndLog(apiCalls: APISignature[]): void {
        const apiCallByStatusResponse = [];
        const apiCallsByStatusCode = {};

        for (const apiCall of apiCalls) {
            const { statusCode } = apiCall;
            if (apiCallsByStatusCode.hasOwnProperty(statusCode)) {
                apiCallsByStatusCode[statusCode] += 1;
                continue;
            }
            apiCallsByStatusCode[statusCode] = 1;
        }
        for (const key in apiCallsByStatusCode) {
            const obj = {}
            obj["statusMessage"] = statusMap.get(key);
            obj["statusCode"] = key;
            obj["count"] = apiCallsByStatusCode[key];
            apiCallByStatusResponse.push(obj);
        }
        console.log('API Calls by HTTP Status Code:');
        console.table(apiCallByStatusResponse);
    }
}