import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { FC } from 'react';
import { GoClock, GoKebabHorizontal, GoPencil } from 'react-icons/go';

const TaskCard: FC = () => {
  const handleMenuButtonClick = (event: any) => {
    event.stopPropagation(); // Prevents the click event from propagating to AccordionButton
  };
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
                    <MenuItem>Download</MenuItem>
                    <MenuItem onClick={() => alert('Kagebunshin')}>
                      Create a Copy
                    </MenuItem>
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
        <VStack align="stretch">
          <Box mt="26px">
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton ps={0}>
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
                      ></Checkbox>
                      <Text>Cross-reference with Jeanne for Case #192813</Text>
                    </Box>
                    <Box
                      as="div"
                      display="flex"
                      flexDirection="row"
                      gap={2}
                      alignItems="center"
                    >
                      <Text color="red">2 Days left</Text>
                      <Text>12/06/2021</Text>
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
                        onClick={handleMenuButtonClick}
                      />
                      <MenuList>
                        <MenuItem color="red">Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap="2"
                    >
                      <GoClock size={20} color="#2F80ED" />
                      <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="date"
                        borderColor="#828282"
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
                        placeholder="Select Date and Time"
                        size="md"
                        type="text"
                        sx={{
                          border: 'none', // No border when not focused
                          _focus: {
                            border: '1px solid #828282', // Border when focused
                            boxShadow: 'none', // Remove default focus shadow if needed
                          },
                          _placeholder: {
                            color: '#828282', // Optional: Change placeholder color
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default TaskCard;
