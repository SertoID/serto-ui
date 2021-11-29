import { storiesOf } from "@storybook/react";
import { EXAMPLE_VCS, EXAMPLE_SCHEMAS } from "vc-schema-tools";
import { Credential } from "./Credential";
import { IdentityThemeProvider } from "../../../themes/IdentityTheme";
import { BrowserRouter } from "react-router-dom";
import { SertoUiProvider } from "../../../context/SertoUiProvider";
import { createMockApiRequest } from "../../../utils/helpers";
import { jsonSchemaToSchemaInput } from "../Schemas/utils";

const schemas = Object.values(EXAMPLE_SCHEMAS)
  .map((schema) => {
    try {
      return jsonSchemaToSchemaInput(schema);
    } catch {
      return undefined;
    }
  })
  .filter((schema) => !!schema);

const diplomaVc = {
  ...EXAMPLE_VCS.DiplomaCredential,
  proof: {
    jwt:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTE4MDExNzAsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJmb28iOnsiYmFyIjoxMjMsImJheiI6dHJ1ZX19fSwibmJmIjpudWxsLCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4YWRjYzUzMjJlNWYyZDVmNGIzODNhOGU0OGVhMmQ4Y2Y2NGJkZmJmMiIsImlzcyI6ImRpZDpldGhyOnJpbmtlYnk6MHhhZGNjNTMyMmU1ZjJkNWY0YjM4M2E4ZTQ4ZWEyZDhjZjY0YmRmYmYyIn0.Xt7g2BgL9qxukk4merdNASqgXgtxZcD0JVCXnnf_F6d9N0j1q6q7tKIu3VxgnTlZzUNFmIsruD59SFe9yAl7OAA",
  },
};

storiesOf("Credential", module)
  .addDecorator((story) => (
    <BrowserRouter>
      <IdentityThemeProvider>
        <SertoUiProvider
          context={{
            schemasService: {
              getSchemas: createMockApiRequest(schemas),
            },
          }}
        >
          {story()}
        </SertoUiProvider>
      </IdentityThemeProvider>
    </BrowserRouter>
  ))
  .add("Collapsed", () => <Credential vc={diplomaVc} />)
  .add("Expanded", () => <Credential vc={diplomaVc} isOpen={true} />);
