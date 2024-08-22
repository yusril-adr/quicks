import { Box, Flex, IconButton } from '@chakra-ui/react';
import { FC, useEffect, useMemo } from 'react';
import { Image } from '@chakra-ui/next-js';
import { motion, useAnimate, usePresence } from 'framer-motion';

import lightningIcon from '@utils/icons/lightning.svg';
import inboxPurpleIcon from '@utils/icons/inbox-purple.svg';
import inboxWhiteIcon from '@utils/icons/inbox-white.svg';
import taskYellowIcon from '@utils/icons/task-yellow.svg';
import taskWhiteIcon from '@utils/icons/task-white.svg';

import Item from './item';
import { Case, Switch, When } from 'react-if';
import { NavigationName } from '@utils/constants/enum';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import {
  setNavigationGroup,
  unsetNavigationGroup,
} from '@states/navigationGroup';
import InboxCard from './InboxCard';

const NavigationGroup: FC = () => {
  const [isPresent, safeToRemove] = usePresence();
  const [scopeTask, animateTask] = useAnimate();
  const [scopeInbox, animateInbox] = useAnimate();
  const [scopeContainer, animateContainer] = useAnimate();

  const { isOpen, curr } = useAppSelector(
    (state) => state.navigationGroup.value,
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
    if (!isOpen) {
      return {
        opacity: [1, 0],
        translateX: [0, 175],
        zIndex: 0,
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
    if (!isOpen) {
      return {
        opacity: [1, 0],
        translateX: [0, 90],
        zIndex: 0,
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
  }, [animateInbox, animateTask, scopeTask, taskVariant]);

  useEffect(() => {
    animateInbox(scopeInbox.current, inboxVariant);
  }, [animateInbox, animateTask, scopeInbox, inboxVariant]);

  useEffect(() => {
    if (curr) {
      animateContainer(scopeContainer.current, {
        translateY: [100, 0],
        opacity: [0, 1],
      });
    } else if (scopeContainer.current) {
      animateContainer(scopeContainer.current, {
        translateY: [0, 100],
        opacity: [1, 0],
      });
    }
  }, [curr, animateContainer, scopeContainer]);

  useEffect(() => {
    if (!isPresent) {
      setTimeout(safeToRemove, 1000);
    }
  }, [isPresent, safeToRemove]);

  return (
    <Flex
      position="fixed"
      bottom="0"
      right="0"
      left="0"
      px="34px"
      pb="27px"
      justifyContent="end"
    >
      <Box width="100%" onClick={() => dispatch(unsetNavigationGroup())} />

      <Box
        ref={scopeContainer}
        translateX="100"
        position="absolute"
        bottom="110px"
        right={[0, 34]}
        bgColor="#fff"
        w={{
          base: '100vw',
          md: '49.142vw',
        }}
        maxW="734px"
        h={{
          base: 'calc(100vh - 110px)',
          md: 'calc(100vh - 110px - 21.574vh)',
        }}
        border="2px solid #BDBDBD"
        maxH="737px"
        borderRadius="5px"
        ps="29px"
        pe="39px"
        py="20px"
        color="black"
        overflow="auto"
      >
        <Switch>
          <Case condition={curr === NavigationName.INBOX}>
            <InboxCard />
          </Case>
        </Switch>
      </Box>

      <Flex justifyContent="end" alignItems="center" gap="26px">
        <Box ref={scopeTask} translateX="175px" opacity="0">
          <Item
            name={NavigationName.TASK}
            iconIdle={
              <Image src={taskYellowIcon} alt="Task" w="27px" h="27px" />
            }
            iconActive={
              <Image src={taskWhiteIcon} alt="Task" w="27px" h="27px" />
            }
            bgActive="#F8B76B"
            onClick={() => {
              if (curr === NavigationName.TASK) {
                dispatch(unsetNavigationGroup());
              } else {
                dispatch(
                  setNavigationGroup({
                    prev: curr,
                    curr: NavigationName.TASK,
                  }),
                );
              }
            }}
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
            onClick={() => {
              if (curr === NavigationName.INBOX) {
                dispatch(unsetNavigationGroup());
              } else {
                dispatch(
                  setNavigationGroup({
                    prev: curr,
                    curr: NavigationName.INBOX,
                  }),
                );
              }
            }}
          />
        </Box>

        <When condition={!curr}>
          <motion.div
            animate={{
              scale: [0, 1],
              opacity: [0, 1],
            }}
          >
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
          </motion.div>
        </When>
      </Flex>
    </Flex>
  );
};

export default NavigationGroup;
