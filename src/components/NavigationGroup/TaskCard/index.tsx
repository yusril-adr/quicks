import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  Text,
  Input,
  Spinner,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { getTasks, updateTaskById } from '@states/tasks';
import { StateStatus } from '@utils/constants/enum';
import dayjs from '@utils/libs/dayjs';
import { FC, useEffect } from 'react';
import { GoClock, GoKebabHorizontal, GoPencil } from 'react-icons/go';
import { Else, If, Then, When } from 'react-if';

const TaskCard: FC = () => {
  const { value: tasks, status } = useAppSelector((state) => state.tasks);
  const { value: user } = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getTasks(user?.user_id));
    }
  }, [dispatch, user]);

  return (
    <Box h="100%">
      <Box h="100%" ps="29px" pe="39px" py="20px">
        <Flex minWidth="max-content" flex={1}>
          <Box flex={1} display="flex" justifyContent={'center'}>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    borderColor="#828282"
                    borderWidth={1}
                    background="white"
                  >
                    {isOpen ? 'Close' : 'Open'}
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Personal Errands</MenuItem>
                    <MenuItem>Urgent to-do</MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Box>
          <Box flex={1} display="flex" justifyContent={'flex-end'}>
            <Button backgroundColor="#2F80ED" textColor="white" w="76px">
              New Task
            </Button>
          </Box>
        </Flex>

        <If condition={status === StateStatus.PENDING}>
          <Then>
            <Flex
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              h="100%"
              gap="12px"
            >
              <Spinner
                thickness="8px"
                speed="0.65s"
                emptyColor="#F8F8F8"
                color="#C4C4C4"
                w="86px"
                h="86px"
              />
              <Text>Loading Tasks ...</Text>
            </Flex>
          </Then>

          <Else>
            <VStack align="stretch">
              {tasks.map((task) => {
                let urgentLabel: string | null = null;
                const taskDate = dayjs(task.timestamp);

                if (taskDate.diff(dayjs(), 'day') <= 10 && !task.is_done) {
                  urgentLabel = taskDate.fromNow();
                }

                return (
                  <Box mt="26px" key={task.id}>
                    <Accordion defaultIndex={[0]} allowMultiple>
                      <AccordionItem>
                        <AccordionButton>
                          <Box
                            as="div"
                            flex="1"
                            display="flex"
                            flexDirection="row"
                            gap={2}
                          >
                            <Checkbox
                              iconColor="gray"
                              borderColor={'gray'}
                              colorScheme="transparent"
                              defaultChecked
                              isChecked={task.is_done}
                              onChange={() =>
                                dispatch(
                                  updateTaskById({
                                    taskId: task.id,
                                    userId: user?.user_id as string,
                                    payload: { is_done: !task.is_done },
                                  }),
                                )
                              }
                            ></Checkbox>
                            <Text
                              textDecoration={
                                task.is_done ? 'line-through' : 'none'
                              }
                              noOfLines={1}
                            >
                              {task.title}
                            </Text>
                          </Box>
                          <Box
                            as="div"
                            display="flex"
                            flexDirection="row"
                            gap={2}
                            alignItems="center"
                          >
                            <When condition={!!urgentLabel}>
                              <Text color="red">{urgentLabel}</Text>
                            </When>
                            <Text>{taskDate.format('MM/DD/YYYY')}</Text>
                            <AccordionIcon />
                          </Box>

                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<GoKebabHorizontal />}
                              variant="ghost"
                              border="0"
                              sx={{
                                border: 'none',
                                _hover: { bg: 'transparent' },
                                _focus: { boxShadow: 'none' },
                                _active: { bg: 'transparent' },
                              }}
                            />
                            <MenuList>
                              <MenuItem color="red">Delete</MenuItem>
                            </MenuList>
                          </Menu>
                        </AccordionButton>
                        <AccordionPanel pb={4} px={10}>
                          <Box display="flex" flexDirection="column" gap={2}>
                            <Box
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                              gap="2"
                              w="50%"
                            >
                              <GoClock size={20} color="#2F80ED" />
                              <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="date"
                                borderColor="#828282"
                                value={taskDate.format('YYYY-MM-DD')}
                              />
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                              gap={2}
                            >
                              <GoPencil size={20} color="#2F80ED" />
                              <Input
                                placeholder="No Description"
                                value={task.description || ''}
                                size="md"
                                type="text"
                                sx={{
                                  border: 'none',
                                  _focus: {
                                    border: '1px solid #828282',
                                    boxShadow: 'none',
                                  },
                                  _placeholder: {
                                    color: '#828282',
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                );
              })}
            </VStack>
          </Else>
        </If>
      </Box>
    </Box>
  );
};

export default TaskCard;
