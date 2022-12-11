const apiRequest = async (url = "", optionsObj = null, errorMsg = null) => {
  try {
    const response = await fetch(url, optionsObj);

    if (!response.ok) {
      throw Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    errorMsg = error.message;
  } finally {
    if (errorMsg) {
      return {
        "ok": false,
        "error": errorMsg,
      };
    }

    return {
      "ok": true,
      "error": null,
    };
  }
};

export default apiRequest;
