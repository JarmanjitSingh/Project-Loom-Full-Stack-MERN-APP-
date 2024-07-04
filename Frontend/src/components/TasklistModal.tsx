import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, RefObject, useState } from "react";
import {
  GetProjectTasklists,
  createTasklist,
} from "../reduxToolkit/api_functions/user";
import { showToast } from "../utils/toast";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { catchErrorFunction } from "../utils/utils";

type TasklistModalProps = {
  referernce: RefObject<HTMLButtonElement>;
};

export type TasklistFormData = {
  projectId: string;
  title: string;
  description?: string;
};

const TasklistModal = ({ referernce }: TasklistModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const toast = useToast();
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleTasklistSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData: TasklistFormData = {
      projectId: id!,
      title,
      description,
    };

    try {
      const data = await createTasklist(formData, toast);
      closeModal();
      showToast(toast, data.message);
      GetProjectTasklists(id as string, dispatch);
      console.log("saved task data", data);
    } catch (error) {
      catchErrorFunction(error, null, toast);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    onClose();
  };
  return (
    <>
      <>
        <Button onClick={onOpen} display={"none"} ref={referernce}></Button>
        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={"inside"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add List</ModalHeader>
            <ModalCloseButton onClick={closeModal} />
            <form
              style={{ height: "100%" }}
              onSubmit={(e) => handleTasklistSubmit(e)}
            >
              <ModalBody overflow={"auto"}>
                <FormControl isRequired>
                  <FormLabel fontSize={"sm"}>Title</FormLabel>
                  <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel fontSize={"sm"}>Description</FormLabel>
                  <Input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
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
                  Add List
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default TasklistModal;
