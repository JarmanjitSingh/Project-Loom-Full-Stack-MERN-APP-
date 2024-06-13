import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, RefObject, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewProject } from "../reduxToolkit/api_functions/user";
import { RootState } from "../reduxToolkit/store";
import { showToast } from "../utils/toast";
import GroupModal from "./GroupModal";

type ProjectModalProps = {
  referernce: RefObject<HTMLButtonElement>;
};

type ProjectType = {
  group: string;
  name: string;
  description?: string;
  color: string;
};

const projectData: ProjectType = {
  group: "",
  name: "",
  description: "",
  color: "#D3B9EC",
};

const ProjectModal = ({ referernce }: ProjectModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [project, setProject] = useState(projectData as ProjectType);
  const [loading, setLoading] = useState<boolean>(false);
  const GroupModalButtonRef = useRef<HTMLButtonElement>(null);

  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleProjectSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await CreateNewProject(project, dispatch);
      if(data){
        closeModal();
        showToast(toast, data.message);
      }
    } catch (error) {
        console.error("Non-Axios Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    onClose();
    setProject(projectData);
  };

  return (
    <>
      <Button onClick={onOpen} display={"none"} ref={referernce}></Button>
      <Modal
        onClose={onClose}
        //finalFocusRef={referernce}
        isOpen={isOpen}
        scrollBehavior={"inside"}
        size={"3xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Project</ModalHeader>
          <ModalCloseButton onClick={closeModal} />
          <form onSubmit={(e) => handleProjectSubmit(e)}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel fontSize={"sm"}>Project Group</FormLabel>
                <HStack>
                  <Select
                    placeholder="Select option"
                    value={project.group}
                    onChange={(e) =>
                      setProject({ ...project, group: e.target.value })
                    }
                  >
                    {user &&
                      user?.groups?.map((group) => {
                        return (
                          <option value={group._id} key={group._id}>
                            {group.name}
                          </option>
                        );
                      })}
                  </Select>

                  <Button
                    fontSize={"lg"}
                    variant={"outline"}
                    onClick={() => GroupModalButtonRef.current?.click()}
                  >
                    <IoMdAdd />
                  </Button>
                </HStack>
              </FormControl>

              <FormControl isRequired mt={2}>
                <FormLabel fontSize={"sm"}>Project Name</FormLabel>
                <Input
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) =>
                    setProject({ ...project, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mt={2}>
                <FormLabel fontSize={"sm"}>Project Description</FormLabel>
                <Textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) =>
                    setProject({ ...project, description: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mt={2}>
                <FormLabel fontSize={"sm"}>Project Color</FormLabel>
                <HStack>
                  <Input
                    type="color"
                    placeholder="Project color"
                    id="colorPicker"
                    value={project.color}
                    onChange={(e) =>
                      setProject({ ...project, color: e.target.value })
                    }
                  />{" "}
                  <Text>{project.color}</Text>
                </HStack>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={closeModal}
                mr={4}
                color={"red"}
                variant={"outline"}
              >
                Close
              </Button>
              <Button isLoading={loading} type="submit" colorScheme="green">
                Create Project
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <GroupModal referernce={GroupModalButtonRef} />
    </>
  );
};

export default ProjectModal;
