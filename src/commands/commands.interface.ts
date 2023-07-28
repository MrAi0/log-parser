import { APISignature } from "../model/api-signature";

// Interface for every class in the commands
export interface ICommand {
    executeAndLog(apiCalls: APISignature[]): void;
}