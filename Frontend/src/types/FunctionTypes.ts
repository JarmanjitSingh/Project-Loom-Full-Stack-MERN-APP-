import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export type CatchAsyncErrorsType = (
  error: unknown,
  dispatch?: Dispatch<UnknownAction> | null,
  toast?: (options?: UseToastOptions | undefined) => ToastId,
) => void;
