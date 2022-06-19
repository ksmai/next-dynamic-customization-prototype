// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  try {
    res.status(200).setHeader('Set-Cookie', `components=${JSON.stringify(req.body.components)}; Max-Age=31536000; Path=/;`).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
