import { HStack, Text, VStack } from "@chakra-ui/react";
import { Border } from "../../Border";
import { Icon } from "../../Icon";

export function Quest() {
    return (
        <HStack alignItems="start">
            <Border borderPath="/Border/panel-border-007.png" mx={3}>
                <Icon size={32} x={35} y={13} ml="-8px" />
            </Border>
            <VStack flexGrow={1} alignItems="start" spacing={0}>
                <Text fontSize="larger" fontWeight="bold">
                    Quest name
                </Text>
                <Text>
                    Amet aute deserunt aliquip est. Mollit mollit eiusmod anim
                    eiusmod consequat. Irure esse laboris ad laborum. Eiusmod
                    amet ex reprehenderit enim. Ullamco sint consectetur
                    reprehenderit velit deserunt eiusmod. Laborum cillum nisi
                    cillum ex sit labore cupidatat Lorem ullamco aliqua.
                    Excepteur adipisicing ex ut elit minim cillum irure deserunt
                    est nulla.
                </Text>
            </VStack>
        </HStack>
    );
}
