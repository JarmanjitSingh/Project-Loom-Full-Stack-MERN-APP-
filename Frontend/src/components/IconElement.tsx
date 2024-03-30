import { Box, Stack } from "@chakra-ui/react";
import { IconType } from "react-icons";

type IconElementProps = {
  height?: string;
  width?: string;
  IconComponent: IconType;
  size: number;
};
const IconElement = ({
  height = "100%",
  width = "100%",
  IconComponent,
  size,
}: IconElementProps) => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      h={height}
      w={width}
      //   border={"1px solid red"}
      className="iconDiv"
    >
      <IconComponent size={size} />
    </Stack>
  );
};

export default IconElement;
