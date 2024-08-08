import { Box, BoxProps, Flex } from "@chakra-ui/react";

export interface IBorderProps extends BoxProps {
    borderPath: string;
    skipBorder?: {
        top?: boolean;
        right?: boolean;
        bottom?: boolean;
        left?: boolean;
    };
}

export function Border({
    children,
    borderPath,
    skipBorder,
    ...rest
}: IBorderProps) {
    const borderProps: BoxProps = {
        bgImage: borderPath,
        bgSize: "300% 300%",
        bgRepeat: "no-repeat",
        position: "absolute",
        style: { imageRendering: "pixelated" },
    };

    return (
        <Flex position="relative" minW="48px" minH="48px" {...rest}>
            {!skipBorder?.top && !skipBorder?.left && (
                <Box
                    {...borderProps}
                    top={0}
                    left={0}
                    bgPosition="0% 0%"
                    w="16px"
                    h="16px"
                />
            )}
            {!skipBorder?.top && !skipBorder?.right && (
                <Box
                    {...borderProps}
                    top={0}
                    right={0}
                    bgPosition="100% 0%"
                    w="16px"
                    h="16px"
                />
            )}
            {!skipBorder?.bottom && !skipBorder?.left && (
                <Box
                    {...borderProps}
                    bottom={0}
                    left={0}
                    bgPosition="0% 100%"
                    w="16px"
                    h="16px"
                />
            )}
            {!skipBorder?.bottom && !skipBorder?.right && (
                <Box
                    {...borderProps}
                    bottom={0}
                    right={0}
                    bgPosition="100% 100%"
                    w="16px"
                    h="16px"
                />
            )}

            {!skipBorder?.top && (
                <Box
                    {...borderProps}
                    top={0}
                    left={skipBorder?.left ? 0 : "16px"}
                    right={skipBorder?.right ? 0 : "16px"}
                    h="16px"
                    bgPosition="50% 0%"
                />
            )}
            {!skipBorder?.bottom && (
                <Box
                    {...borderProps}
                    bottom={0}
                    left={skipBorder?.left ? 0 : "16px"}
                    right={skipBorder?.right ? 0 : "16px"}
                    h="16px"
                    bgPosition="50% 100%"
                />
            )}
            {!skipBorder?.left && (
                <Box
                    {...borderProps}
                    left={0}
                    top={skipBorder?.top ? 0 : "16px"}
                    bottom={skipBorder?.bottom ? 0 : "16px"}
                    w="16px"
                    bgPosition="0% 50%"
                />
            )}
            {!skipBorder?.right && (
                <Box
                    {...borderProps}
                    right={0}
                    top={skipBorder?.top ? 0 : "16px"}
                    bottom={skipBorder?.bottom ? 0 : "16px"}
                    w="16px"
                    bgPosition="100% 50%"
                />
            )}
            <Box my="auto" px="4" minW="100%" textAlign="center">
                {children}
            </Box>
        </Flex>
    );
}
