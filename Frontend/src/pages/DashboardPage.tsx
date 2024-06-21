import { Box, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import { BsPlusLg } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import GroupModal from "../components/GroupModal";
import ProjectModal from "../components/ProjectModal";
import SideBar from "../components/SideBar";

const DashboardPage = () => {
  const GroupModalButtonRef = useRef<HTMLButtonElement>(null!);
  const ProjectModalButtonRef = useRef<HTMLButtonElement>(null!);

  return (
    <>
      <HStack w={"100vw"} h={"100vh"} gap={0} >
        <SideBar />

        <VStack h={"full"} w={"100%"} gap={0}>
          <HStack w={"full"} p={"10px 20px"} justifyContent={"space-between"}>
            <HStack>
              <GoHome size={20} />
              <Heading size={"md"}>Ciao! </Heading>
              <Text>When all is said and done, more is said than done.</Text>
            </HStack>
            <Box>
              <Button
                colorScheme="blue"
                variant={"outline"}
                mr={4}
                leftIcon={<BsPlusLg />}
                onClick={() => GroupModalButtonRef.current.click()}
              >
                Add Group
              </Button>
              <Button
                colorScheme="green"
                leftIcon={<BsPlusLg />}
                onClick={() => ProjectModalButtonRef.current.click()}
              >
                Add Project
              </Button>
            </Box>
          </HStack>

          <HStack
            background={"gray.100"}
            h={"full"}
            w={"full"}
            border={"3px solid oranges"}
          ></HStack>
        </VStack>
      </HStack>

      <GroupModal referernce={GroupModalButtonRef} />
      <ProjectModal referernce={ProjectModalButtonRef} />
    </>
  );
};

export default DashboardPage;
