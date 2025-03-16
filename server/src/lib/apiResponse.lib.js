class ApiResponse{
    constructor(statusCode, message, object){
        this.statusCode = statusCode;
        this.message = message;
        this.object = object;
    }
}

export default ApiResponse;
