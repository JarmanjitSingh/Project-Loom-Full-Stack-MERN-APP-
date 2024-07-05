import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
  };

  useEffect(() => {}, []);

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
