import { Box, Container, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { FaTasks } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { PiSquaresFourThin } from "react-icons/pi";
import { RiDashboardLine, RiHome3Line } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import IconElement from "./IconElement";
import { IoIosArrowDown } from "react-icons/io";

const SideBar = () => {
  return (
    <Container
      border={"2px solid red"}
      h={"full"}
      w={"22rem"}
      p={0}
      background={"#35353d"}
    >
      <HStack
        gap={0}
        color={"gray"}
        borderBottom={"1px solid gray"}
        w={"full"}
        h={"65px"}
        justifyContent={"space-evenly"}
      >
        <IconElement IconComponent={RiHome3Line} size={22} />
        <IconElement IconComponent={PiSquaresFourThin} size={24} />
        <IconElement IconComponent={FaTasks} size={20} />
        <IconElement IconComponent={RxCalendar} size={20} />
        <IconElement IconComponent={RiDashboardLine} size={22} />
        <IconElement IconComponent={LuSettings2} size={22} />
      </HStack>

      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        h={"75px"}
        borderBottom={"1px solid gray"}
        p={"5px 10px"}
      >
        <Box
          //   border={"1px solid red"}
          h={"full"}
          w={"full"}
          borderRadius={"10px"}
          background={"rgba(255, 255, 255, 0.1)"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          pl={"10px"}
          position={"relative"}
          className="chooseProject"
        >
          <Heading size={"sm"} color={"gray"}>
            Choose Project
          </Heading>
          <Text fontSize={"xs"} color={"gray"}>
            No Project Selected
          </Text>

          <div style={{ position: "absolute", right: "10px", color: "gray" }}>
            <IconElement IconComponent={IoIosArrowDown} size={20} />
          </div>
        </Box>
      </Stack>
    </Container>
  );
};

export default SideBar;
