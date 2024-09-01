import { meaningOfLife } from "../lib/meaning-of-life";

export default function Invoice() {
  return <div>{meaningOfLife()}</div>;
}
