/**
 * Makes an HTTP request to certain URL
 * with method and body
 * @param {string} url
 * @param {string} method - GET | POST | PUT | DELETE
 * @param {*} body - optional (object | string | null)
 * @returns  {{
 *   statusCode: number,
 *   durationMs: number,
 *   headers: object,
 *   data: any,
 *   contentType: string | null
 * }}
 */
export async function request(url, method, body = null) {
  const options = {
    method,
    headers: {},
  };

  if (body && method !== "GET") {
    if (typeof body === "object") {
      options.body = JSON.stringify(body);
      options.headers["Content-Type"] = "application/json";
    } else if (typeof body === "string") {
      options.body = body; // assume already stringified
      options.headers["Content-Type"] = "application/json";
    }
  }

  let response;

  const start = performance.now();

  try {
    response = await fetch(url, options);
  } catch (error) {
    return { error: error.message };
  }
  const end = performance.now();
  const durationMs = Math.round(end - start);

  const contentType = response.headers.get("Content-Type");
  let data;

  try {
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else if (contentType?.includes("text/")) {
      data = await response.text();
    } else {
      // Unknown or binary → return base64 string
      const buffer = await response.arrayBuffer();
      data = Buffer.from(buffer).toString("base64");
    }
  } catch (err) {
    data = null; // Parsing failed, but request succeeded
  }

  const result = {
    statusCode: response.status,
    durationMs,
    headers: Object.fromEntries(response.headers.entries()),
    data,
  };

  return result;
}
