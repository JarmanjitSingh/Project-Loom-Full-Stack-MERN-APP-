import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { forgetPassword } from "../reduxToolkit/api_functions/user";
import { showToast } from "../utils/toast";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = await forgetPassword(email, toast);

    if (data) {
      showToast(toast, data.message);
      setEmail("");
    }
    setLoading(false);
  };


  return (
    <Container py={16} h={"90vh"}>
      <form onSubmit={submitHandler}>
        <Heading my={16} textTransform={"uppercase"} textAlign={"center"}>
          Forget password
        </Heading>

        <FormControl my={4}>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </FormControl>

        <Button isLoading={loading} w={"full"} colorScheme="blue" type="submit">
          Send Reset Link
        </Button>
      </form>
    </Container>
  );
};

export default ForgetPasswordPage;
