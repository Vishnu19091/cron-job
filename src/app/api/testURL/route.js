export async function POST(request) {
  const { url, method } = await request.json();

  const start = performance.now();

  try {
    const response = await fetch(url, { method });
    const end = performance.now();
    const data = await response.json();

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
