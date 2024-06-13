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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { FormEvent, RefObject, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewGroup } from "../reduxToolkit/api_functions/user";
import { showToast } from "../utils/toast";

type GroupModalProps = {
  referernce: RefObject<HTMLButtonElement>;
};

type GroupType = {
  name: string;
  description?: string;
};

const groupData: GroupType = {
  name: "",
  description: "",
};

const GroupModal = ({ referernce }: GroupModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [group, setGroup] = useState(groupData as GroupType);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleGroupSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      {/* <ToastComp title="Group created" description="" /> */}
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
          <ModalHeader>Add Group</ModalHeader>
          <ModalCloseButton onClick={closeModal} />
          <form onSubmit={(e) => handleGroupSubmit(e)}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel fontSize={"sm"}>Group Name</FormLabel>
                <Input
                  placeholder="Group name"
                  value={group.name}
                  onChange={(e) => setGroup({ ...group, name: e.target.value })}
                />
              </FormControl>

              <FormControl mt={2}>
                <FormLabel fontSize={"sm"}>Group Description</FormLabel>
                <Textarea
                  placeholder="Group Description"
                  value={group.description}
                  onChange={(e) =>
                    setGroup({ ...group, description: e.target.value })
                  }
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
                Add Group
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModal;
