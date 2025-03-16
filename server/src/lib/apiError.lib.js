class ApiError{
    constructor(statusCode, msg){
        this.statusCode = statusCode;
        this.msg = msg;
    }
};

export default ApiError;