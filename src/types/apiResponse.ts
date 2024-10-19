type apiResponse =
    | {
          success: false;
      }
    | {
          success: true;
          data: unknown;
      };

export default apiResponse;
