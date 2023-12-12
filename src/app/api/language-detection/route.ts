import { detect } from "tinyld";

export async function POST(request: Request) {
  const text = await request.text();

  const detectLanguage = async (text = "") => {
    const detected = await detect(text);
    return detected;
  };

  return Response.json(await detectLanguage(text), {
    status: 200,
  });
}
