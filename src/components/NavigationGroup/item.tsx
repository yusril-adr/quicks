import { Box, IconButton, Text, useToken } from '@chakra-ui/react';
import { FC, ReactElement, ReactNode, useState } from 'react';
import { When } from 'react-if';

const ButtonItem: FC<{
  name: string;
  iconIdle: ReactElement;
  iconActive: ReactElement;
  active: boolean;
  bgActive: string;
  onClick?: () => void;
}> = ({ name, iconIdle, iconActive, bgActive, active, onClick }) => {
  const bgColor = active ? bgActive : '#F2F2F2';
  const [boxShadowColor] = useToken('colors', ['primary.black.dark']);

  return (
    <Box position="relative">
      <When condition={!active}>
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
          {name}
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
