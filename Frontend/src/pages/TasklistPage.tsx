import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiSolidTime } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaLayerGroup, FaRegCheckCircle, FaRegHourglass } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoFilterOutline, IoSettingsOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import SideBar from "../components/SideBar";
import TaskCard from "../components/TaskCard";
import { GetProjectTasklists } from "../reduxToolkit/api_functions/user";

type TaskType = {
  createdAt: Date;
  description: string;
  priority: "low" | "medium" | "high" | "none";
  startDate: Date;
  status: "no progress" | "in progress" | "completed";
  tasklistId: string;
  title: string;
  updatedAt: Date;
  _id: string;
  assignedTo?: string;
};

type TasklistType = {
  _id: string;
  title: string;
  projectId: string;
  completedTasks?: TaskType[];
  inProgressTasks?: TaskType[];
  noProgressTasks?: TaskType[];
}[];

const TasklistPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<TasklistType>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchTasklist = async () => {
      try {
        const data = await GetProjectTasklists(id as string);
        setData(data.tasklist);
        console.log(data.tasklist);
      } catch (error) {
        console.log("Error while fetching tasklist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasklist();
  }, [id]);

  return (
    <>
      <HStack w={"100vw"} h={"100vh"} gap={0}>
        <SideBar />

        {loading ? (
          <Loader />
        ) : (
          <VStack
            h={"full"}
            w={"100%"}
            gap={0}
            bgColor={"#edf2f7"}
            overflow={"auto"}
          >
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

            {data &&
              data.length > 0 &&
              data.map((tasklist) => (
                <Accordion allowMultiple w={"full"} key={tasklist._id}>
                  <AccordionItem>
                    <h2 style={{ height: "4rem", display: "flex" }}>
                      <AccordionButton p={"0 2rem"}>
                        <AccordionIcon mr={2} />
                        <Box as="span" flex="1" textAlign="left">
                          <Heading size={"sm"} color={"GrayText"}>
                            {tasklist.title}
                          </Heading>
                          <Text fontSize={"xs"} color={"gray"}>
                            description
                          </Text>
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      pb={4}
                      p={0}
                      borderTop={"1px solid #e0e0e0"}
                    >
                      <Grid templateColumns={"repeat(3, 1fr)"} w={"full"}>
                        <GridItem
                          borderRight={"1px solid #e0e0e0"}
                          p={"1rem"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          flexDirection={"column"}
                          h={"full"}
                          gap={2}
                        >
                          {tasklist.noProgressTasks &&
                            tasklist.noProgressTasks.length > 0 &&
                            tasklist.noProgressTasks.map((task) => {
                              return (
                                <TaskCard
                                  key={task._id}
                                  title={task.title}
                                  assignedTo={task.assignedTo}
                                  StatusIcon={FaRegHourglass}
                                />
                              );
                            })}
                        </GridItem>

                        <GridItem
                          borderRight={"1px solid #e0e0e0"}
                          p={"1rem"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          flexDirection={"column"}
                          h={"full"}
                          gap={2}
                        >
                          {tasklist.inProgressTasks &&
                            tasklist.inProgressTasks.length > 0 &&
                            tasklist.inProgressTasks.map((task) => {
                              return (
                                <TaskCard
                                  key={task._id}
                                  title={task.title}
                                  assignedTo={task.assignedTo}
                                  StatusIcon={BiSolidTime}
                                />
                              );
                            })}
                        </GridItem>

                        <GridItem
                          borderRight={"1px solid #e0e0e0"}
                          p={"1rem"}
                          display={"flex"}
                          alignItems={"center"}
                          flexDirection={"column"}
                          justifyContent={"center"}
                          h={"full"}
                          gap={2}
                        >
                          {tasklist.completedTasks &&
                            tasklist.completedTasks.length > 0 &&
                            tasklist.completedTasks.map((task) => {
                              return (
                                <TaskCard
                                  key={task._id}
                                  title={task.title}
                                  assignedTo={task.assignedTo}
                                  StatusIcon={FaRegCheckCircle}
                                />
                              );
                            })}
                        </GridItem>
                      </Grid>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
          </VStack>
        )}
      </HStack>
    </>
  );
};

export default TasklistPage;
