namespace ApiMariscos.Utilities
{
    public  class Result<T>
    {
        public bool Success { get; set; }
        public T? Data { get; set; }
        public string? ErrorMessage { get; set; }
        public int StatusCode { get; set; }

     
        public static Result<T> SuccessResult(T data, int statusCode)
        {
            return new Result<T>
            {
                Success = true,
                Data = data,
                StatusCode = statusCode
            };
        }


        public static Result<T> FailureResult(string? errorMessage, int statusCode)
        {
            return new Result<T>
            {
                Success = false,
                ErrorMessage = errorMessage,
                StatusCode = statusCode
            };
        }

        public static Result<IEnumerable<T>> SuccessResultIEnum<T>(IEnumerable<T> data, int statusCode)
        {
            return new Result<IEnumerable<T>>
            {
                Success = true,
                Data = data,
                StatusCode = statusCode
            };
        }

        public static Result<T> FailureResultIEnum(string errorMessage, int statusCode)
        {
            return new Result<T>
            {
                Success = false,
                ErrorMessage = errorMessage,
                StatusCode = statusCode
            };
        }

    }
}
