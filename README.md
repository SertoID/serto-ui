## Serto UI

[![CircleCI](https://circleci.com/gh/SertoID/serto-ui.svg?style=svg&circle-token=1c9f5796a3867357f99158ec5200124191b126eb)](https://circleci.com/gh/SertoID/serto-ui/tree/master)
[![codecov](https://codecov.io/gh/SertoID/serto-ui/branch/main/graph/badge.svg?token=92Z92RQFWG)](https://codecov.io/gh/SertoID/serto-schemas-backend)

### Install

```bash
npm install --save serto-ui styled-components react
# or
yarn add serto-ui styled-components react
```

### Usage

```jsx
import React from "react";
import { SertoUiProvider, Credential, CredentialViewTypes } from "serto-ui";

const vc = {
  "@context": ["https://www.w3.org/2018/credentials/v1", "https://www.w3.org/2018/credentials/examples/v1"],
  type: ["VerifiableCredential", "DiplomaCredential"],
  issuer: "did:ethr:rinkeby:0xabc123",
  issuanceDate: "2017-12-05T14:27:42Z",
  credentialSubject: {
    id: "did:ethr:rinkeby:0x123abc",
    degree: "Bachelor of Science in Examples",
    alumniOf: "Example University",
  },
  proof: {
    jwt: "eyJ0eXAiO0000000000etc",
  },
};

const ExampleComponent = () => {
  return (
    <SertoUiProvider>
      <Credential vc={vc} viewType={CredentialViewTypes.COLLAPSIBLE} />
    </SertoUiProvider>
  );
};
```

#### Context provider and theme

Serto UI uses [Rimble](https://rimble.consensys.design/) for many elements. The `<SertoUiProvider>` in the above example sets up the default Serto UI theme that will be used by any child components that use Rimble - this provider should wrap instances of Serto UI components, or your entire app for convenience. You may alternately exclude the provider to use default Rimble styling, or replace the Serto UI styles by passing your own `theme` prop into the provider. See [`IdentityTheme.tsx`](src/themes/IdentityTheme.tsx) for details about the theme.

Some components also query this provider for values in [`SertoUiContext`](src/context/SertoUiContext.tsx). These can be provided by passing the desired context as the `value` prop into the provider. See [`App.tsx`](src/App.tsx) for an example of this.

### Development

#### Local development alongside your app

If you wish to work on the Serto UI library while importing it into your own app, you can do so for instance using `npm link` or `yarn link`.

Set up the Serto UI repo:

```bash
git clone https://github.com/SertoID/serto-ui.git
yarn install
yarn link
yarn run watch
```

In your app you can then run:

```bash
yarn link serto-ui
```

Your app will now use your local copy of Serto UI and should receive any changes as you make them.

#### Standalone Serto UI development

If you wish to work on the Serto UI library directly, you can do so without another app:

```bash
git clone https://github.com/SertoID/serto-ui.git
cd serto-ui
yarn install
yarn run install-peer-deps
```

You can now run `yarn run storybook` to work on individual components, or `yarn run server:start` to run the example create-react-app app.

**Note** that once you have run `install-peer-deps` in your local Serto UI library, if you are linking it to your app then your app will end up with duplicate copies of Serto UI's `package.json`'s `peerDependencies`, and so React (and styled-components if you are using that) will probably break. To resolve this, you will have to link these dependencies: navigate to `<your-app>/node_modules/react` and run `yarn link`, and then return to the `serto-ui` directory and run `yarn link react` (and repeat for any other peer dependencies that are causing issues, like `react-dom` and `react-router-dom`). See [this article](https://dev.to/yvonnickfrin/how-to-handle-peer-dependencies-when-developing-modules-18fa) for more context. Alternately, you can delete `serto-ui/node_modules`, re-run `yarn install`, and do not install peer dependencies.
