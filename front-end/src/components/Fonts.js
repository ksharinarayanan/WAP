import React from "react";
import "@fontsource/inter";
import "@fontsource/cascadia-code";

export function ArialFont({ children }) {
  return <div style={{ fontFamily: "Arial, sans-serif" }}>{children}</div>;
}

export function CascadiaCode({ children }) {
  return <div style={{ fontFamily: "cascadia code" }}>{children}</div>;
}

export function Inter({ children }) {
  return <div style={{ fontFamily: "Inter" }}>{children}</div>;
}
