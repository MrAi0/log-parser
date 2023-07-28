// Regex for extracting the data from the log file
export const apiCallPattern = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) \+\d{2}:\d{2}: ::ffff:(\d+\.\d+\.\d+\.\d+) - - \[\d{2}\/\w+\/\d{4}:\d{2}:\d{2}:\d{2} \+\d{4}\] "(GET|POST|PUT|DELETE) (\S+) \S+" (\d{3}) (\d+) "-" ".*?" - (\d+\.\d+) ms/g;

export enum HttpStatusCode {
    CONTINUE = 100,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}

export enum CommandType {
    ENDPOINT_OCCURENCE = '-eo',
    ENDPOINT_PER_MINUTE = '-epm',
    STATUS_CODE_SUMMARY = '-scs',
    ALL = '-all',
    HELP = '-help'
}

export const statusMap = new Map([
    ['200', 'OK'],
    ['201', 'Created'],
    ['204', 'No Content'],
    ['206', 'Partial Content'],
    ['400', 'Bad Request'],
    ['401', 'Unauthorized'],
    ['404', 'Not Found'],
    ['422', 'Unprocessable Content'],
    ['500', 'Internal Server Error']
]);