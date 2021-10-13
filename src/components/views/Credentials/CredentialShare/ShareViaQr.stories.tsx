import { storiesOf } from "@storybook/react";
import { Box } from "rimble-ui";
import { ShareViaQr } from "./ShareViaQr";

const URL =
  "http://staging.search.serto.id/vc-validator?vc=eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJzb2NpYWxNZWRpYVByb2ZpbGVVcmwiOiJodHRwczovL3R3aXR0ZXIuY29tL29mdGJ5b3gifSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiLCJodHRwczovL3N0YWdpbmcuYXBpLnNjaGVtYXMuc2VydG8uaWQvdjEvcHVibGljL3NvY2lhbC1tZWRpYS1saW5rYWdlLWNyZWRlbnRpYWwvMS4wL2xkLWNvbnRleHQuanNvbiJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiU29jaWFsTWVkaWFQcm9maWxlTGlua2FnZSJdfSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6Imh0dHBzOi8vc3RhZ2luZy5hcGkuc2NoZW1hcy5zZXJ0by5pZC92MS9wdWJsaWMvc29jaWFsLW1lZGlhLWxpbmthZ2UtY3JlZGVudGlhbC8xLjAvanNvbi1zY2hlbWEuanNvbiIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJzdWIiOiJkaWQ6ZXRocjoweDAzOWM0ZGYwNDUwYjY3OTBlZmFiODliYzZlNjQzNzVlYzVjOTAwYTRlMGVhNTE3OTY1NWE5NGFlNzQzNjQzZmM5NCIsIm5iZiI6MTYzNDEzMDkzOSwiaXNzIjoiZGlkOmV0aHI6MHgwMzljNGRmMDQ1MGI2NzkwZWZhYjg5YmM2ZTY0Mzc1ZWM1YzkwMGE0ZTBlYTUxNzk2NTVhOTRhZTc0MzY0M2ZjOTQifQ.aRuSouJuuGZQih0rZsGupCowiWdwzRvyYdMNtsKUgIaMNdcp9wkmeBB-YDPgwBzSrbFkqQU0bG-oG9213cLe8A";

storiesOf("Share", module)
  .add("ShareViaQr", () => {
    return (
      <Box width="480px" height="640px">
        <ShareViaQr url={URL} />
      </Box>
    );
  })
  .add("ShareViaQr (inline)", () => {
    return (
      <Box width="480px" height="640px">
        <ShareViaQr url={URL} inline />
      </Box>
    );
  });
