function lambdaResponse({
  json,
  statusCode,
  allowCORS = false,
  isJson = true,
}) {
  const response = {
    statusCode,
    body: isJson ? JSON.stringify(json) : json,
    headers: isJson
      ? { "content-type": "application/json; charset=utf-8" }
      : {},
  };

  if (allowCORS) {
    response.headers = {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "content-type": "application/json; charset=utf-8",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
    };
  }

  return response;
}

export function corsErrorResponse(json, statusCode = 500) {
  return lambdaResponse({
    json,
    statusCode: statusCode,
    allowCORS: true,
  });
}

export const corsSuccessResponse = (json, statusCode = 200) => {
  return lambdaResponse({
    json,
    statusCode: statusCode,
    allowCORS: true,
  });
};

export const corsTextSuccessResponse = (json, statusCode = 200) => {
  return lambdaResponse({
    json,
    statusCode: statusCode,
    allowCORS: true,
    isJson: false,
  });
};
