import React from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "rimble-ui";
import { CopyableTruncatableText } from "./CopyableTruncatableText";

storiesOf("CopyableTruncatableText", module)
  .add("Text only", () => {
    return (
      <CopyableTruncatableText text="eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTE4MDExNzAsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJmb28iOnsiYmFyIjoxMjMsImJheiI6dHJ1ZX19fSwibmJmIjpudWxsLCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4YWRjYzUzMjJlNWYyZDVmNGIzODNhOGU0OGVhMmQ4Y2Y2NGJkZmJmMiIsImlzcyI6ImRpZDpldGhyOnJpbmtlYnk6MHhhZGNjNTMyMmU1ZjJkNWY0YjM4M2E4ZTQ4ZWEyZDhjZjY0YmRmYmYyIn0.Xt7g2BgL9qxukk4merdNASqgXgtxZcD0JVCXnnf_F6d9N0j1q6q7tKIu3VxgnTlZzUNFmIsruD59SFe9yAl7OAA" />
    );
  })
  .add("Link out", () => {
    return (
      <CopyableTruncatableText
        text="https://beta.search.serto.id/vc-validator?vc=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTE4MDExNzAsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJmb28iOnsiYmFyIjoxMjMsImJheiI6dHJ1ZX19fSwibmJmIjpudWxsLCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4YWRjYzUzMjJlNWYyZDVmNGIzODNhOGU0OGVhMmQ4Y2Y2NGJkZmJmMiIsImlzcyI6ImRpZDpldGhyOnJpbmtlYnk6MHhhZGNjNTMyMmU1ZjJkNWY0YjM4M2E4ZTQ4ZWEyZDhjZjY0YmRmYmYyIn0.Xt7g2BgL9qxukk4merdNASqgXgtxZcD0JVCXnnf_F6d9N0j1q6q7tKIu3VxgnTlZzUNFmIsruD59SFe9yAl7OAA"
        linkOutHref
      />
    );
  })
  .add("Input style", () => {
    return (
      <CopyableTruncatableText
        text="https://beta.search.serto.id/vc-validator?vc=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTE4MDExNzAsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJmb28iOnsiYmFyIjoxMjMsImJheiI6dHJ1ZX19fSwibmJmIjpudWxsLCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4YWRjYzUzMjJlNWYyZDVmNGIzODNhOGU0OGVhMmQ4Y2Y2NGJkZmJmMiIsImlzcyI6ImRpZDpldGhyOnJpbmtlYnk6MHhhZGNjNTMyMmU1ZjJkNWY0YjM4M2E4ZTQ4ZWEyZDhjZjY0YmRmYmYyIn0.Xt7g2BgL9qxukk4merdNASqgXgtxZcD0JVCXnnf_F6d9N0j1q6q7tKIu3VxgnTlZzUNFmIsruD59SFe9yAl7OAA"
        linkOutHref
        useInput
      />
    );
  })
  .add("Link out, custom buttons", () => {
    return (
      <CopyableTruncatableText
        text="https://beta.search.serto.id/vc-validator?vc=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTE4MDExNzAsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJmb28iOnsiYmFyIjoxMjMsImJheiI6dHJ1ZX19fSwibmJmIjpudWxsLCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4YWRjYzUzMjJlNWYyZDVmNGIzODNhOGU0OGVhMmQ4Y2Y2NGJkZmJmMiIsImlzcyI6ImRpZDpldGhyOnJpbmtlYnk6MHhhZGNjNTMyMmU1ZjJkNWY0YjM4M2E4ZTQ4ZWEyZDhjZjY0YmRmYmYyIn0.Xt7g2BgL9qxukk4merdNASqgXgtxZcD0JVCXnnf_F6d9N0j1q6q7tKIu3VxgnTlZzUNFmIsruD59SFe9yAl7OAA"
        linkOutHref
        copyButtonOverride={(copied) => <Button>{copied ? "Copied" : "Custom Button"}</Button>}
        linkOutButtonOverride={<Button.Outline>out</Button.Outline>}
      />
    );
  });
