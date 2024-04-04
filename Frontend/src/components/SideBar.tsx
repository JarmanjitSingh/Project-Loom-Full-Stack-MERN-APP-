import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsClockHistory } from "react-icons/bs";
import { CgReorder } from "react-icons/cg";
import { CiBookmark, CiCirclePlus, CiSearch } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { GoHome, GoPlus } from "react-icons/go";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiSquaresFourThin } from "react-icons/pi";
import { RiDashboardLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import IconElement from "./IconElement";

const SideBar = () => {
  return (
    <VStack
      border={"2px solid red"}
      h={"full"}
      w={"22rem"}
      p={0}
      background={"#35353d"}
      gap={0}
      position={"relative"}
    >
      <HStack
        gap={0}
        color={"gray"}
        borderBottom={"1px solid gray"}
        w={"full"}
        h={"65px"}
        justifyContent={"space-evenly"}
      >
        <IconElement
          IconComponent={GoHome}
          size={24}
          label="Home"
          h="100%"
          w="100%"
        />
        <IconElement
          IconComponent={PiSquaresFourThin}
          size={24}
          label="Projects"
          h="100%"
          w="100%"
        />
        <IconElement
          IconComponent={FaTasks}
          size={20}
          label="Tasks Board"
          h="100%"
          w="100%"
        />
        <IconElement
          IconComponent={RxCalendar}
          size={20}
          label="Calender Board"
          h="100%"
          w="100%"
        />
        <IconElement
          IconComponent={RiDashboardLine}
          size={22}
          label="Widgets Board"
          h="100%"
          w="100%"
        />
        <IconElement
          IconComponent={LuSettings2}
          size={22}
          label="Manage Boards"
          h="100%"
          w="100%"
        />
      </HStack>

      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        h={"75px"}
        w={"full"}
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

      <VStack
        overflow={"auto"}
        h={"50vh"}
        w={"full"}
        //  border={"2px solid blue"}
      >
        <Accordion defaultIndex={[0]} w={"full"} allowToggle>
          <AccordionItem
            color={"white"}
            border={"none"}
            p={"5px 1px"}
            m={"7px 10px"}
          >
            <h2>
              <AccordionButton
                border={"1px solid #7a7a7a"}
                borderRadius={"10px"}
              >
                <AccordionIcon />
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontWeight={"bold"}
                  ml={1}
                  mr={"auto"}
                >
                  Projects
                </Box>
                <IconElement
                  IconComponent={IoFilterSharp}
                  size={16}
                  label="Filter Projects"
                  p="7px 7px"
                  br="10px"
                />
                <IconElement
                  IconComponent={MdOutlineRemoveRedEye}
                  label="Show Applications"
                  size={18}
                  p="7px 7px"
                  br="10px"
                />
                <IconElement
                  IconComponent={CgReorder}
                  label="Order Projects"
                  size={18}
                  p="7px 7px"
                  br="10px"
                />
                <IconElement
                  IconComponent={GoPlus}
                  label="Create Project"
                  size={18}
                  p="7px 7px"
                  br="10px"
                />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>Lorem ipsum dolor sit</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>

      <HStack
        w={"full"}
        h={"60px"}
        borderTop={"1px solid gray"}
        position={"absolute"}
        bottom={0}
        padding={"5px 5px"}
        justifyContent={"space-between"}
      >
        <Avatar name="Harman cheema" src="https://bit.ly/tioluwani-kolawole" />

        <HStack h={"full"} color={"gray"}>
          <IconElement
            IconComponent={CiSearch}
            label="Search"
            size={20}
            p="7px 7px"
            br="10px"
          />

          <IconElement
            IconComponent={CiCirclePlus}
            label="Quick Add"
            size={20}
            p="7px 7px"
            br="10px"
          />

          <IconElement
            IconComponent={CiBookmark}
            label="Book Marks"
            size={20}
            p="7px 7px"
            br="10px"
          />

          <IconElement
            IconComponent={BsClockHistory}
            label="Full Recap"
            size={20}
            p="7px 7px"
            br="10px"
          />

          <IconElement
            IconComponent={IoMdNotificationsOutline}
            label="Notifications"
            size={20}
            p="7px 7px"
            br="10px"
          />
        </HStack>
      </HStack>
    </VStack>
  );
};

export default SideBar;
