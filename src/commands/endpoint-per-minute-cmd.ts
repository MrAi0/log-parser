import { APISignature } from "../model/api-signature";
import { ICommand } from "./commands.interface";

export class EndPointPerMinute implements ICommand {

    // Used to execute the the endpoint per minute occurence in the array of APISignature objects and logs the output
    executeAndLog(apiCalls: APISignature[]): void {
        const apiCallsPerMinuteResponse = []
        const apiCallsPerMinute = {};

        for (const apiCall of apiCalls) {
            const minuteApiCalls = apiCall.timestamp.slice(0, 16);
            if (apiCallsPerMinute.hasOwnProperty(minuteApiCalls)) {
                apiCallsPerMinute[minuteApiCalls] += 1;
                continue;
            }
            apiCallsPerMinute[minuteApiCalls] = 1;
        }

        for (const key in apiCallsPerMinute) {
            const obj = {}
            obj["time"] = key;
            obj["count"] = apiCallsPerMinute[key];
            apiCallsPerMinuteResponse.push(obj);
        }
        console.log('API Calls per Minute:');
        console.table(apiCallsPerMinuteResponse);
    }
}