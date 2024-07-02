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
import { FormEvent, RefObject, useEffect, useState } from "react";
import { BiSolidTime } from "react-icons/bi";
import { FaRegCheckCircle, FaRegHourglass } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { TasklistType } from "../pages/TasklistPage";
import { createTask } from "../reduxToolkit/api_functions/user";
import { showToast } from "../utils/toast";
import { catchErrorFunction } from "../utils/utils";
import TextEditor from "./TextEditor";

type TaskModalProps = {
  referernce: RefObject<HTMLButtonElement>;
  data: TasklistType;
};

export type TaskType = {
  title: string;
  tasklistId: string;
  description: string;
  assignedTo: string | null;
  status: "no progress" | "in progress" | "completed";
  startDate: Date | null;
  dueDate: Date | null;
  priority: "none" | "low" | "medium" | "high";
};

const taskData: TaskType = {
  title: "",
  tasklistId: "",
  description: "",
  assignedTo: null,
  status: "no progress",
  startDate: null,
  dueDate: null,
  priority: "none",
};

const TaskModal = ({ referernce, data }: TaskModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [task, setTask] = useState(taskData as TaskType);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  // const dispatch = useDispatch();

  const handleTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log("task state", task)

    try {
      const data = await createTask(task, toast);
      closeModal();
      showToast(toast, data.message);
      console.log("saved task data", data);
    } catch (error) {
      catchErrorFunction(error, null, toast);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    onClose();
    setTask({...task, tasklistId: data[0]?._id});
  };

  useEffect(() => {
    if (data && data.length > 0 && task.tasklistId === "") {
      setTask({ ...task, tasklistId: data[0]._id });
      console.log("tasklist id ", data[0]._id )
    }

  }, [data]);

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
                    value={task.tasklistId}
                    onChange={(e) =>
                      setTask({ ...task, tasklistId: e.target.value })
                    }
                    required
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
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
              </FormControl>

              <FormControl mt={2}>
                <FormLabel fontSize={"sm"}>Description</FormLabel>

                <TextEditor content={task} setContent={setTask} />
              </FormControl>

              <HStack mt={6}>
                <FormControl>
                  <FormLabel fontSize={"sm"}>Assigned to</FormLabel>
                  <Select
                    value={task.assignedTo || ""}
                    onChange={(e) =>
                      setTask({
                        ...task,
                        assignedTo:
                          e.target.value === "" ? null : e.target.value,
                      })
                    }
                  >
                    <option value="" selected>
                      Unassigned
                    </option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize={"sm"}>Status</FormLabel>
                  <Select
                    value={task.status}
                    onChange={(e) =>
                      setTask({
                        ...task,
                        status: e.target.value as
                          | "no progress"
                          | "in progress"
                          | "completed",
                      })
                    }
                  >
                    <option value="no progress">
                      <FaRegHourglass color="gray" /> No progress
                    </option>
                    <option value="in progress">
                      <BiSolidTime color="orange" size={20} />
                      In progress
                    </option>
                    <option value="completed">
                      <FaRegCheckCircle color="green" size={19} />
                      Completed
                    </option>
                  </Select>
                </FormControl>
              </HStack>

              <FormControl mt={2}>
                <FormLabel fontSize={"sm"}>Due Date</FormLabel>

                <Input
                  placeholder="Due Date"
                  type="date"
                  value={
                    task.dueDate ? task.dueDate.toISOString().split("T")[0] : ""
                  }
                  onChange={(e) =>
                    setTask({
                      ...task,
                      dueDate: e.target.value ? new Date(e.target.value) : null,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize={"sm"}>Priority</FormLabel>
                <Select
                  value={task.priority}
                  onChange={(e) =>
                    setTask({
                      ...task,
                      priority: e.target.value as
                        | "none"
                        | "low"
                        | "medium"
                        | "high",
                    })
                  }
                >
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
                Add Task
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskModal;
