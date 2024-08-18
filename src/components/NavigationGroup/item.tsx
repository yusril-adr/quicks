import { Box, IconButton, Text, useToken } from '@chakra-ui/react';
import { useAppSelector } from '@hooks/redux';
import { FC, ReactElement } from 'react';
import { When } from 'react-if';

import * as utils from '@utils/helpers/common';

const ButtonItem: FC<{
  name: string;
  iconIdle: ReactElement;
  iconActive: ReactElement;
  bgActive: string;
  onClick?: () => void;
}> = ({ name, iconIdle, iconActive, bgActive, onClick }) => {
  const [boxShadowColor] = useToken('colors', ['primary.black.dark']);

  const { curr } = useAppSelector(
    (state) => state.navigationGroupReducer.value,
  );
  const active = curr === name;

  const bgColor = active ? bgActive : '#F2F2F2';

  return (
    <Box position="relative">
      <When condition={!curr}>
        <Text
          position="absolute"
          top="-24px"
          left="0"
          right="0"
          align="center"
          fontWeight="bold"
          fontSize="12px"
          lineHeight="12px"
          mb="12px"
        >
          {utils.capitalizeEachWord(name)}
        </Text>
      </When>
      <IconButton
        isRound
        variant="solid"
        bgColor={bgColor}
        aria-label={name}
        w="60px"
        h="60px"
        icon={active ? iconActive : iconIdle}
        _hover={{ bgColor }}
        _active={{ bgColor }}
        onClick={onClick}
        {...(active && {
          boxShadow: `-15px 0 ${boxShadowColor}`,
        })}
      />
    </Box>
  );
};

export default ButtonItem;
