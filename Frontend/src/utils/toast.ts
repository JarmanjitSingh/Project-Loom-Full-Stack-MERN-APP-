import { ToastId, UseToastOptions } from "@chakra-ui/react";

type ToastFunctionType = (
  toast: (options?: UseToastOptions | undefined) => ToastId,
  title: string,
  status?: "success" | "error",
  description?: string,
) => void;

export const showToast: ToastFunctionType = (
  toast,
  title,
  status = "success",
  description = ""
) => {
  toast({
    title,
    status,
    description,
    isClosable: true,
    position: "top-right",
    duration: 5000,
  });
};
