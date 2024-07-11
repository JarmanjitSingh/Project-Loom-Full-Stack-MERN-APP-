import {
    Button,
    Container,
    FormControl,
    Heading,
    Input,
    useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../reduxToolkit/api_functions/user";
import { showToast } from "../utils/toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const { token } = useParams();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = await resetPassword(password, token as string, toast);

    if (data) {
      showToast(toast, data.message);
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <Container py={16} h={"90vh"}>
      <form onSubmit={submitHandler}>
        <Heading my={16} textTransform={"uppercase"} textAlign={"center"}>
          Reset password
        </Heading>

        <FormControl my={4}>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </FormControl>

        <Button isLoading={loading} w={"full"} colorScheme="blue" type="submit">
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default ResetPasswordPage;
