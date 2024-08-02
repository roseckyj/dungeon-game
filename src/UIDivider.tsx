import { Box, BoxProps, HStack } from "@chakra-ui/react";

export interface IUIDividerProps {
    divider: string;
    children: React.ReactNode;
}

export function UIDivider({ children, divider }: IUIDividerProps) {
    const dividerProps: BoxProps = {
        bgImage: divider,
        h: 10,
        w: "full",
        flexGrow: 1,
        flexShrink: 1,
        bgSize: "contain",
        bgRepeat: "no-repeat",
        style: { imageRendering: "pixelated" },
    };

    return (
        <HStack alignItems="center" w="full" px={8}>
            <Box {...dividerProps} bgPosition="right" />
            <Box flexGrow={0} flexShrink={0} mx={8}>
                {children}
            </Box>
            <Box {...dividerProps} bgPosition="right" transform="scaleX(-1)" />
        </HStack>
    );
}
