import { Box, VStack } from "@chakra-ui/react";
import { QuestStore } from "../../quests/QuestStore";
import { Quest } from "./Quest";

export interface IQuestsProps {
    store: QuestStore;
}

export function Quests({ store }: IQuestsProps) {
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
