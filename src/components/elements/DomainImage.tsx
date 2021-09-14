import { Flex } from "rimble-ui";
import { baseColors } from "../../themes";

export interface DomainImageProps {
  background?: boolean;
  domain: string;
  size?: string;
}

export const DomainImage: React.FunctionComponent<DomainImageProps> = (props) => {
  return (
    <Flex alignItems="center" {...props}>
      <Flex
        alignItems="center"
        bg={props.background ? baseColors.white : "transparent"}
        borderRadius="50%"
        height={props.size || "20px"}
        justifyContent="center"
        p="3px"
        width={props.size || "20px"}
      >
        <img
          src={"https://www.google.com/s2/favicons?sz=64&domain=" + props.domain}
          alt={props.domain}
          width="100%"
          height="auto"
        />
      </Flex>
    </Flex>
  );
};
