export async function POST(request) {
  const { url, method } = await request.json();

  const start = performance.now();

  try {
    const response = await fetch(url, { method });
    const end = performance.now();
    const contentType = response.headers.get("Content-Type");

    let data;

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else if (contentType?.includes("text/")) {
      data = await response.text();
    } else {
      // Unknown or binary → return base64 string
      const buffer = await response.arrayBuffer();
      data = Buffer.from(buffer).toString("base64");
    }

    return Response.json({
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      durationMs: Math.round(end - start),
      data,
    });
  } catch (err) {
    const end = performance.now();

    return Response.json(
      {
        ok: false,
        error: err.message,
        durationMs: Math.round(end - start),
      },
      { status: 500 }
    );
  }
}
