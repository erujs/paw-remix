import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/canine", "./routes/canine.tsx"),
  route("/canine/:id", "./routes/canine.$id.tsx"),
  route("/feline", "./routes/feline.tsx"),
  route("/feline/:id", "./routes/feline.$id.tsx"),
] satisfies RouteConfig;
