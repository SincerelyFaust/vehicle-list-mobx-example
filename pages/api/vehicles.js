import { vehiclesData } from "./vehiclesData";

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(vehiclesData);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
}
