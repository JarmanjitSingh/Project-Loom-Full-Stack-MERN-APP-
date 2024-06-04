import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { RefObject } from "react";

type GroupModalProps = {
  referernce: RefObject<HTMLButtonElement>;
};

const GroupModal = ({ referernce }: GroupModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} display={"none"} ref={referernce}></Button>
      <Modal
        onClose={onClose}
        //finalFocusRef={referernce}
        isOpen={isOpen}
        scrollBehavior={"inside"}
        size={'3xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            What is the capacity to do work and the eligibility criteria is the
            most important thing in the world so that the issue is this nothing
            is permanent in this area of cross section and the eligibility
            criteria
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModal;
