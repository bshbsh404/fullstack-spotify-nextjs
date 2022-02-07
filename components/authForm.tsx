import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import { auth } from "../lib/mutations";
import NextLink from "next/link";
import NextImage from "next/image";

const AuthForm: FC<{ mode: "login | signup" }> = ({ mode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSumbit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const body =
      mode == "signup" ? { name, email, password } : { email, password };
    const user = await auth(mode, body);
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo.png" height={60} width={220} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSumbit}>
            {mode == "signup" ? (
              <Input
                placeholder="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <span />
            )}

            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
            >
              {mode}
            </Button>
          </form>
          {mode == "signup" ? (
            <p>
              Already have an account ?{" "}
              <NextLink href="/login">
                <strong>Sign In</strong>
              </NextLink>
            </p>
          ) : (
            <p>
              Dont have an account ?{" "}
              <NextLink href="/signup">
                <strong>Sign Up</strong>
              </NextLink>
            </p>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
