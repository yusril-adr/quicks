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
import { When } from 'react-if';
import { NavigationName } from '@utils/constants/enum';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import {
  setNavigationGroup,
  unsetNavigationGroup,
} from '@states/navigationGroup';

const NavigationGroup: FC = () => {
  const [scopeTask, animateTask] = useAnimate();
  const [scopeInbox, animateInbox] = useAnimate();
  const { isOpen, curr, prev } = useAppSelector(
    (state) => state.navigationGroupReducer.value,
  );

  const dispatch = useAppDispatch();

  const handleIsOpen = () => {
    if (isOpen) {
      dispatch(unsetNavigationGroup());
    } else {
      dispatch(setNavigationGroup({ isOpen: true }));
    }
  };

  const taskVariant = useMemo(() => {
    if (!isOpen && curr === NavigationName.TASK) {
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

    if (isOpen && curr === NavigationName.TASK) {
      return {
        translateX: [0, 86],
        zIndex: 999,
      };
    }

    if (isOpen && curr === NavigationName.INBOX) {
      return {
        translateX: [86, 0],
        zIndex: 999,
      };
    }

    return {
      opacity: [0, 1],
      translateX: [86, 0],
    };
  }, [isOpen, curr]);

  const inboxVariant = useMemo(() => {
    if (!isOpen && curr === NavigationName.INBOX) {
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

    if (isOpen && curr === NavigationName.TASK) {
      return {
        translateX: [0, -90],
        zIndex: 999,
      };
    }

    if (isOpen && curr === NavigationName.INBOX) {
      return {
        translateX: [-90, 0],
        zIndex: 999,
      };
    }

    return {
      opacity: [0, 1],
      translateX: [90, 0],
    };
  }, [isOpen, curr]);

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
      <Box ref={scopeTask} translateX="175px" opacity="0">
        <Item
          name={NavigationName.TASK}
          iconIdle={<Image src={taskYellowIcon} alt="Task" w="27px" h="27px" />}
          iconActive={
            <Image src={taskWhiteIcon} alt="Task" w="27px" h="27px" />
          }
          bgActive="#F8B76B"
          onClick={() =>
            dispatch(
              setNavigationGroup({
                prev: curr,
                curr: NavigationName.TASK,
              }),
            )
          }
        />
      </Box>

      <Box ref={scopeInbox} translateX="90px" opacity="0">
        <Item
          name={NavigationName.INBOX}
          iconIdle={
            <Image src={inboxPurpleIcon} alt="Inbox" w="27px" h="27px" />
          }
          iconActive={
            <Image src={inboxWhiteIcon} alt="Inbox" w="27px" h="27px" />
          }
          bgActive="#8785FF"
          onClick={() =>
            dispatch(
              setNavigationGroup({
                prev: curr,
                curr: NavigationName.INBOX,
              }),
            )
          }
        />
      </Box>

      <When condition={!curr}>
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
