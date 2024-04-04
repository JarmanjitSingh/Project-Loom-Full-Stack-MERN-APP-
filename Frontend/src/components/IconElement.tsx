import { Stack, Tooltip } from "@chakra-ui/react";
import { IconType } from "react-icons";

type IconElementProps = {
  h?: string;
  w?: string;
  p?: string;
  br?: string;
  label?: string;
  IconComponent: IconType;
  size: number;
};
const IconElement = ({
  h,
  w,
  p,
  br,
  label,
  IconComponent,
  size,
}: IconElementProps) => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      h={h}
      w={w}
      p={p}
      borderRadius={br}
      //   border={"1px solid red"}
      className="iconDiv"
    >
      <Tooltip hasArrow label={label} bg='gray.300' openDelay={500} color='black'>
       <span>
       <IconComponent size={size} />
       </span>
      </Tooltip>
    </Stack>
  );
};

export default IconElement;
