import { Box, VStack } from "@chakra-ui/react";
import { Quest } from "./Quest";

export function Quests() {
    return (
        <Box flexGrow={1} overflow="auto">
            <VStack alignItems="stretch" spacing={8}>
                {Array.from({ length: 20 }, (_, i) => (
                    <Quest key={i} />
                ))}
            </VStack>
        </Box>
    );
}
