import React from "react";
import { storiesOf } from "@storybook/react";
import { Credential, CredentialViewTypes } from "./Credential";

const attributes = {
  credentialSubject: {
    foo: {
      bar: 12345678,
      baz: true,
    },
  },
};

storiesOf("Credential", module)
  .add("List view", () => {
    return (
      <Credential
        attributes={attributes}
        credentialType={"Verified Credential"}
        issuanceDate={1592412982}
        issuer={"did:ethr:rinkeby:0xadcc5322e5f2d5f4b383a8e48ea2d8cf64bdfbf2"}
        jwt={
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTE4MDExNzAsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJmb28iOnsiYmFyIjoxMjMsImJheiI6dHJ1ZX19fSwibmJmIjpudWxsLCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4YWRjYzUzMjJlNWYyZDVmNGIzODNhOGU0OGVhMmQ4Y2Y2NGJkZmJmMiIsImlzcyI6ImRpZDpldGhyOnJpbmtlYnk6MHhhZGNjNTMyMmU1ZjJkNWY0YjM4M2E4ZTQ4ZWEyZDhjZjY0YmRmYmYyIn0.Xt7g2BgL9qxukk4merdNASqgXgtxZcD0JVCXnnf_F6d9N0j1q6q7tKIu3VxgnTlZzUNFmIsruD59SFe9yAl7OAA"
        }
        title={"Know Your Customer Check"}
        viewType={CredentialViewTypes.LIST}
      />
    );
  })
  .add("Collapsible view", () => {
    return (
      <Credential
        attributes={attributes}
        credentialType={"Verified Credential"}
        issuanceDate={1592412982}
        issuer={"did:ethr:rinkeby:0xadcc5322e5f2d5f4b383a8e48ea2d8cf64bdfbf2"}
        jwt={
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTE4MDExNzAsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJmb28iOnsiYmFyIjoxMjMsImJheiI6dHJ1ZX19fSwibmJmIjpudWxsLCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4YWRjYzUzMjJlNWYyZDVmNGIzODNhOGU0OGVhMmQ4Y2Y2NGJkZmJmMiIsImlzcyI6ImRpZDpldGhyOnJpbmtlYnk6MHhhZGNjNTMyMmU1ZjJkNWY0YjM4M2E4ZTQ4ZWEyZDhjZjY0YmRmYmYyIn0.Xt7g2BgL9qxukk4merdNASqgXgtxZcD0JVCXnnf_F6d9N0j1q6q7tKIu3VxgnTlZzUNFmIsruD59SFe9yAl7OAA"
        }
        title={"Know Your Customer Check"}
        viewType={CredentialViewTypes.COLLAPSIBLE}
      />
    );
  })
  .add("Full view", () => {
    return (
      <Credential
        attributes={attributes}
        credentialType={"Verified Credential"}
        issuanceDate={1592412982}
        issuer={"did:ethr:rinkeby:0xadcc5322e5f2d5f4b383a8e48ea2d8cf64bdfbf2"}
        jwt={
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTE4MDExNzAsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJmb28iOnsiYmFyIjoxMjMsImJheiI6dHJ1ZX19fSwibmJmIjpudWxsLCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4YWRjYzUzMjJlNWYyZDVmNGIzODNhOGU0OGVhMmQ4Y2Y2NGJkZmJmMiIsImlzcyI6ImRpZDpldGhyOnJpbmtlYnk6MHhhZGNjNTMyMmU1ZjJkNWY0YjM4M2E4ZTQ4ZWEyZDhjZjY0YmRmYmYyIn0.Xt7g2BgL9qxukk4merdNASqgXgtxZcD0JVCXnnf_F6d9N0j1q6q7tKIu3VxgnTlZzUNFmIsruD59SFe9yAl7OAA"
        }
        title={"Know Your Customer Check"}
      />
    );
  });
