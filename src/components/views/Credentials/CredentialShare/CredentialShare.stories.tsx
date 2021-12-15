import { storiesOf } from "@storybook/react";
import { Box } from "rimble-ui";
import { EXAMPLE_VCS } from "vc-schema-tools";
import { CredentialShare } from "./";
import { SertoUiProvider } from "../../../../context/SertoUiProvider";

const vc = EXAMPLE_VCS.DiplomaCredential;

storiesOf("Share", module)
  .add("CredentialShare", () => {
    return (
      <SertoUiProvider>
        <Box width="480px">
          <CredentialShare vc={vc} />
        </Box>
      </SertoUiProvider>
    );
  })
  .add("CredentialShare (issueVcFlow)", () => {
    return (
      <SertoUiProvider>
        <Box width="480px">
          <CredentialShare vc={vc} issueVcFlow />
        </Box>
      </SertoUiProvider>
    );
  });
