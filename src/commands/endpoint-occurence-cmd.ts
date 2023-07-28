import { APISignature } from "../model/api-signature";
import { ICommand } from "./commands.interface";

export class EndpointOccurence implements ICommand {

    // Used to execute the the endpoint occurence in the array of APISignature objects and logs the output
    executeAndLog(apiCalls: APISignature[]): void {
        const endpointOccurrencesResponse = []
        const endpointOccurrences = {};

        for (const apiCall of apiCalls) {
            const { httpMethod, url } = apiCall;
            const endpoint = `${httpMethod} ${url}`;
            if (endpointOccurrences.hasOwnProperty(endpoint)) {
                endpointOccurrences[endpoint] += 1;
                continue;
            }
            endpointOccurrences[endpoint] = 1;
        }

        for (const key in endpointOccurrences) {
            const obj = {}
            obj["endPoint"] = key;
            obj["count"] = endpointOccurrences[key];
            endpointOccurrencesResponse.push(obj);
        }

        console.log('Endpoint Occurrences:');
        console.table(endpointOccurrencesResponse);
    }

}