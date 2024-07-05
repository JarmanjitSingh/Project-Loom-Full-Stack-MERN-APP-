import {
  Avatar,
  Box,
  Card,
  CardBody,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { CiFolderOn } from "react-icons/ci";
import { FaRegComments } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";

type TaskType = {
  title: string;
  assignedTo?: string;
  StatusIcon: IconType;
  iconColor: string;
  iconSize: number;
};

const TaskCard = ({
  title,
  assignedTo,
  StatusIcon,
  iconColor,
  iconSize,
}: TaskType) => {
  console.log(StatusIcon, StatusIcon.toString());
  return (
    <>
      <Card w={"full"}>
        <CardBody>
          <VStack>
            <HStack w={"full"} justifyContent={"space-between"}>
              <HStack gap={4} w={"full"}>
                {" "}
                <StatusIcon color={iconColor} size={iconSize} />{" "}
                <Heading
                  size={"xs"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  w={"full"}
                >
                  {title}
                </Heading>
              </HStack>
              <HStack>
                <Box
                  border={"1px solid #d2d2d2"}
                  borderRadius={"10px"}
                  fontSize={"0.87rem"}
                  color={"gray"}
                  p={"4px 7px"}
                >
                  4/4
                </Box>
                <MdOutlineDescription />
                <FaRegComments />
              </HStack>
            </HStack>

            {assignedTo && (
              <>
                <Divider m={"10px 0"} />

                <HStack w={"full"}>
                  <Avatar size={"sm"} name={assignedTo} src="" />
                  <Text>{assignedTo}</Text>
                  <CiFolderOn />
                </HStack>
              </>
            )}
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

export default TaskCard;
