import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiFolderOn, CiSearch } from "react-icons/ci";
import {
  FaLayerGroup,
  FaRegCheckCircle,
  FaRegComments,
  FaRegHourglass,
} from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoFilterOutline, IoSettingsOutline } from "react-icons/io5";
import SideBar from "../components/SideBar";
import { BiSolidTime } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";

const TasklistPage = () => {
  return (
    <>
      <HStack w={"100vw"} h={"100vh"} gap={0}>
        <SideBar />

        <VStack h={"full"} w={"100%"} gap={0} bgColor={"#edf2f7"}>
          <HStack
            w={"full"}
            h={"4rem"}
            justifyContent={"space-between"}
            p={"0 2rem"}
            bgColor={"white"}
          >
            <HStack>
              <Button
                leftIcon={<IoFilterOutline size={20} />}
                variant={"ghost"}
                colorScheme="blue"
              >
                Filter
              </Button>
              <Button
                leftIcon={<CiSearch size={20} />}
                variant={"ghost"}
                colorScheme="blue"
              >
                Search
              </Button>
              <Button
                leftIcon={<FaLayerGroup />}
                variant={"ghost"}
                colorScheme="blue"
              >
                Group By
              </Button>
            </HStack>

            <HStack>
              <Button leftIcon={<FiPlus size={20} />} colorScheme="green">
                Add Task
              </Button>
              <Button variant={"ghost"} colorScheme="blue">
                <IoSettingsOutline size={22} />
              </Button>
            </HStack>
          </HStack>

          <Grid
            templateColumns={"repeat(3, 1fr)"}
            bgColor={"white"}
            w={"full"}
            h={"4rem"}
          >
            <GridItem
              border={"1px solid #eaeaea"}
              p={"1rem 2rem"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"start"}
              gap={2}
            >
              {" "}
              <FaRegHourglass color="gray" />
              <Heading size={"md"}>No Progress</Heading>
            </GridItem>
            <GridItem
              border={"1px solid #eaeaea"}
              p={"1rem 2rem"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"start"}
              gap={2}
            >
              {" "}
              <BiSolidTime color="orange" size={20} />{" "}
              <Heading size={"md"}>In Progress</Heading>
            </GridItem>
            <GridItem
              border={"1px solid #eaeaea"}
              p={"1rem 2rem"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"start"}
              gap={2}
            >
              {" "}
              <FaRegCheckCircle color="green" size={19} />{" "}
              <Heading size={"md"}>Completed</Heading>{" "}
            </GridItem>
          </Grid>

          <Accordion allowMultiple w={"full"}>
            <AccordionItem>
              <h2 style={{ height: "4rem", display: "flex" }}>
                <AccordionButton p={"0 2rem"}>
                  <AccordionIcon mr={2} />
                  <Box as="span" flex="1" textAlign="left">
                    <Heading size={"sm"} color={"GrayText"}>
                      Live Server(CRM Tasks)
                    </Heading>
                    <Text fontSize={"xs"} color={"gray"}>
                      Tasks that are ready to be deployed
                    </Text>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} p={0} borderTop={"1px solid #e0e0e0"}>
                <Grid templateColumns={"repeat(3, 1fr)"} w={"full"}>
                  <GridItem
                    borderRight={"1px solid #e0e0e0"}
                    p={"1rem"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h={"full"}
                    gap={2}
                  >
                    <Card>
                      <CardBody>
                        <VStack>
                          <HStack w={'full'}>
                            <HStack gap={4}>
                              {" "}
                              <FaRegHourglass color="gray" />{" "}
                              <Heading size={"xs"} >
                                Improved Business Dashboard 01
                              </Heading>
                            </HStack>
                            <HStack>
                              <Box border={"1px solid #d2d2d2"} borderRadius={'10px'} fontSize={'0.87rem'} color={"gray"} p={'4px 7px'}>4/4</Box>
                              <MdOutlineDescription />
                              <FaRegComments />
                            </HStack>
                          </HStack>

                          <Divider m={"10px 0"} />

                          <HStack w={'full'}> 
                            <Avatar size={"sm"} name="Satwinder Kaur" src="" />
                            <Text>Satwinder Kaur</Text>
                            <CiFolderOn />
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem
                    borderRight={"1px solid #e0e0e0"}
                    p={"1rem"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h={"full"}
                    gap={2}
                  ></GridItem>

                  <GridItem
                    borderRight={"1px solid #e0e0e0"}
                    p={"1rem"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h={"full"}
                    gap={2}
                  ></GridItem>
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </HStack>
    </>
  );
};

export default TasklistPage;
