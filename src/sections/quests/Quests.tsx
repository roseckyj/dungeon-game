import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { GameStore } from "../../quests/GameStore";
import { Quest } from "./Quest";

export interface IQuestsProps {
    store: GameStore;
    coords?: GeolocationCoordinates;
}

export function Quests({ store, coords }: IQuestsProps) {
    const activeQuests = store.activeQuests.filter(
        (quest) => quest.showInQuestBook
    );

    return (
        <Box flexGrow={1} overflow="auto">
            {activeQuests.length > 0 ? (
                <VStack alignItems="stretch" spacing={8}>
                    {activeQuests.map((quest, i) => (
                        <Quest quest={quest} key={i} coords={coords} />
                    ))}
                </VStack>
            ) : (
                <Center w="full" h="full" px={10}>
                    <Text align="center" opacity={0.5}>
                        You currently do not have any active quests. Look around
                        and search for questionmarks, that will unlock a quest
                        for you.
                    </Text>
                </Center>
            )}
        </Box>
    );
}
