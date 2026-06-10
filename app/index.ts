import { Redirect } from "expo-router";
import { createElement } from "react";

export default function IndexPage() {
  return createElement(Redirect, { href: "/Home" });
}
