import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Image } from '@chakra-ui/next-js';
import { useAnimate, motion } from 'framer-motion';

import lightningIcon from '@utils/icons/lightning.svg';
import inboxPurpleIcon from '@utils/icons/inbox-purple.svg';
import inboxWhiteIcon from '@utils/icons/inbox-white.svg';
import taskYellowIcon from '@utils/icons/task-yellow.svg';
import taskWhiteIcon from '@utils/icons/task-white.svg';

import Item from './item';
import { Else, If, Then, When } from 'react-if';
import { NavigationName } from '@utils/constants/enum';

const NavigationGroup: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currState, setCurrState] = useState<string | null>(null);
  const [prevState, setPrevState] = useState<string | null>(null);
  const [scopeTask, animateTask] = useAnimate();
  const [scopeInbox, animateInbox] = useAnimate();

  const handleIsOpen = () => {
    if (isOpen) {
      setCurrState(null);
      setPrevState(null);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const taskVariant = useMemo(() => {
    if (!isOpen && currState === NavigationName.TASK) {
      return {
        opacity: [1, 0],
        translateX: [175, 0],
      };
    }

    if (!isOpen) {
      return {
        opacity: [1, 0],
        translateX: [0, 175],
      };
    }

    if (isOpen && currState === NavigationName.TASK) {
      return {
        translateX: [0, 86],
        zIndex: 999,
      };
    }

    if (isOpen && currState === NavigationName.INBOX) {
      return {
        translateX: [86, 0],
        zIndex: 999,
      };
    }

    return {
      opacity: [0, 1],
      translateX: [86, 0],
    };
  }, [isOpen, currState]);

  const inboxVariant = useMemo(() => {
    if (!isOpen && currState === NavigationName.INBOX) {
      return {
        opacity: [1, 0],
        translateX: [90, 0],
      };
    }

    if (!isOpen) {
      return {
        opacity: [1, 0],
        translateX: [0, 90],
      };
    }

    if (
      isOpen &&
      currState === NavigationName.TASK &&
      prevState === NavigationName.INBOX
    ) {
      return {
        translateX: [0, -90],
        zIndex: 999,
      };
    }

    if (
      isOpen &&
      currState === NavigationName.TASK &&
      prevState !== NavigationName.INBOX
    ) {
      return {
        translateX: [0, -90],
        zIndex: 999,
      };
    }

    if (isOpen && currState === NavigationName.INBOX) {
      return {
        translateX: [-90, 0],
        zIndex: 999,
      };
    }

    return {
      opacity: [0, 1],
      translateX: [90, 0],
    };
  }, [isOpen, currState]);

  useEffect(() => {
    animateTask(scopeTask.current, taskVariant);
  }, [scopeTask, taskVariant]);

  useEffect(() => {
    animateInbox(scopeInbox.current, inboxVariant);
  }, [scopeInbox, inboxVariant]);

  return (
    <Flex
      position="fixed"
      bottom="0"
      right="0"
      px="34px"
      pb="27px"
      gap="26px"
      justifyContent="center"
      alignItems="center"
    >
      <Box ref={scopeTask}>
        <Item
          name="Task"
          iconIdle={<Image src={taskYellowIcon} alt="Task" w="27px" h="27px" />}
          iconActive={
            <Image src={taskWhiteIcon} alt="Task" w="27px" h="27px" />
          }
          bgActive="#F8B76B"
          onClick={() =>
            setCurrState((prev) => {
              setPrevState(prev);
              return NavigationName.TASK;
            })
          }
          active={currState === NavigationName.TASK}
        />
      </Box>

      <Box ref={scopeInbox}>
        <Item
          name="Inbox"
          iconIdle={
            <Image src={inboxPurpleIcon} alt="Inbox" w="27px" h="27px" />
          }
          iconActive={
            <Image src={inboxWhiteIcon} alt="Inbox" w="27px" h="27px" />
          }
          bgActive="#8785FF"
          onClick={() =>
            setCurrState((prev) => {
              setPrevState(prev);
              return NavigationName.INBOX;
            })
          }
          active={currState === NavigationName.INBOX}
        />
      </Box>

      <When condition={!currState}>
        <IconButton
          isRound
          variant="solid"
          bgColor="primary.blue"
          aria-label="Navigation"
          w="68px"
          h="68px"
          icon={
            <Image src={lightningIcon} alt="Navigation" w="18px" h="32px" />
          }
          _hover={{ bgColor: 'primary.blue' }}
          _active={{ bgColor: 'primary.blue' }}
          onClick={handleIsOpen}
        />
      </When>
    </Flex>
  );
};

export default NavigationGroup;
