import { useState } from "react";
import { Flash, Flex, Text } from "rimble-ui";
import { Warning } from "@rimble/icons";
import { DidSearch, DidSearchProps } from "./DidSearch";
import { SelectedDid } from "../../types";
import { colors } from "../../themes";

export interface DidSearchWithMessagingInfoProps extends DidSearchProps {
  messagingUnsupportedText?: string;
  supportsMessaging?: boolean;
  setSupportsMessaging(supported: boolean): void;
}

export const DidSearchWithMessagingInfo: React.FunctionComponent<DidSearchWithMessagingInfoProps> = (props) => {
  const { messagingUnsupportedText, onChange, supportsMessaging, setSupportsMessaging } = props;

  const [didSearchBlurred, setDidSearchBlurred] = useState(false);
  const [value, setValue] = useState<SelectedDid | undefined>();

  return (
    <>
      <DidSearch
        {...{
          ...props,
          onChange: (val) => {
            setValue(val);
            setSupportsMessaging(!!val.messagingSupported);
            onChange(val);
          },
          onBlur: () => setDidSearchBlurred(true),
        }}
      />
      {didSearchBlurred && value && !supportsMessaging && (
        <Flash my={3} variant="warning">
          <Flex>
            <Warning color={colors.warning.dark} />
            <Text ml={2} fontSize={1}>
              {messagingUnsupportedText || (
                <>
                  The subject DID you selected does not support DIDComm messaging, so they cannot seamlessly receive the
                  VC you are issuing. You may still issue the VC here, and on the next screen can share it with the
                  subject via email, link, or QR code.
                </>
              )}
            </Text>
          </Flex>
        </Flash>
      )}
    </>
  );
};
