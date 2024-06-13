import { Button, useToast } from "@chakra-ui/react";

type ToastPropTypes = {
  title: string;
  description: string;
  status?: "success" | "info" | "warning" | "error" | "loading" | undefined;
};

const ToastComp = ({
  title,
  description,
  status = 'success',
}: ToastPropTypes) => {
  const toast = useToast();

  const showToast = () => {
    toast({
      title,
      description,
      status,
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <>
      <Button onClick={showToast}>Show toastf</Button>
    </>
  );
};

export default ToastComp;
