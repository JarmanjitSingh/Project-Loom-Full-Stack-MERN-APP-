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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { FormEvent, RefObject, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addNewGroup } from "../reduxToolkit/api_functions/user";
import { showToast } from "../utils/toast";
import TextEditor from "./TextEditor";
import { FaRegCheckCircle, FaRegHourglass } from "react-icons/fa";
import { BiSolidTime } from "react-icons/bi";
import { TasklistType } from "../pages/TasklistPage";

type GroupModalProps = {
  referernce: RefObject<HTMLButtonElement>;
  data: TasklistType
};

type GroupType = {
  name: string;
  description?: string;
};

const groupData: GroupType = {
  name: "",
  description: "",
};

const TaskModal = ({ referernce, data }: GroupModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [group, setGroup] = useState(groupData as GroupType);
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const toast = useToast();
  const dispatch = useDispatch();

  const handleTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await addNewGroup(group, dispatch);
      closeModal();
      showToast(toast, data.message);
      console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        showToast(toast, axiosError.message, "error");

        console.error("Axios Error:", axiosError.message);
        console.error("Axios Response Data:", axiosError.response?.data);
      } else {
        console.error("Non-Axios Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    onClose();
    setGroup(groupData);
  };

  return (
    <>
      <Button onClick={onOpen} display={"none"} ref={referernce}></Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size={"4xl"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton onClick={closeModal} />
          <form
            style={{ height: "100%" }}
            onSubmit={(e) => handleTaskSubmit(e)}
          >
            <ModalBody h={"60vh"} overflow={"auto"}>
              <FormControl isRequired>
                <FormLabel fontSize={"sm"}>Task List</FormLabel>
                <HStack>
                  <Select
                    // value={project.group}
                    // onChange={(e) =>
                    //   setProject({ ...project, group: e.target.value })
                    // }
                  >
                    {data &&
                      data?.map((tasklist) => {
                        return (
                          <option value={tasklist._id} key={tasklist._id}>
                            {tasklist.title}
                          </option>
                        );
                      })}
                  </Select>

                  <Button
                    fontSize={"lg"}
                    variant={"outline"}
                    // onClick={() => GroupModalButtonRef.current?.click()}
                  >
                    <IoMdAdd />
                  </Button>
                </HStack>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize={"sm"}>Title</FormLabel>
                <Input
                  placeholder="Title"
                  // value={group.name}
                  // onChange={(e) => setGroup({ ...group, name: e.target.value })}
                />
              </FormControl>

              <FormControl mt={2}>
                <FormLabel fontSize={"sm"}>Description</FormLabel>

                <TextEditor content={content} setContent={setContent} />
              </FormControl>

              <HStack mt={6}>
                <FormControl isRequired>
                  <FormLabel fontSize={"sm"}>Assigned to</FormLabel>
                  <Select>
                    <option>Unassigned</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize={"sm"}>Status</FormLabel>
                  <Select>
                    <option value="option1"><FaRegHourglass color="gray" /> No progress</option>
                    <option value="option2"><BiSolidTime color="orange" size={20} />In progress</option>
                    <option value="option3"><FaRegCheckCircle color="green" size={19} />Completed</option>
                  </Select>
                </FormControl>
              </HStack>


              <FormControl mt={2}>
                <FormLabel fontSize={"sm"}>Due Date</FormLabel>

                <Input placeholder='Due Date' type='date' readOnly/>
              </FormControl>

              <FormControl>
                  <FormLabel fontSize={"sm"}>Priority</FormLabel>
                  <Select>
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
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
                Add Group
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskModal;
