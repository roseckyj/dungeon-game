import { HStack, Text, VStack } from "@chakra-ui/react";
import { Border } from "../../components/Border";
import { IconNative } from "../../components/IconNative";
import { GameStore } from "../../quests/GameStore";
import { formatNumber } from "../../utils/formatNumber";

export interface ISocialProps {
    store: GameStore;
    coords?: GeolocationCoordinates;
}

export function Social({ store }: ISocialProps) {
    return (
        <VStack flexGrow={1} p={5} overflowY="auto">
            <Border
                borderPath="/Border/panel-border-007.png"
                w="full"
                py={5}
                px={3}
            >
                <HStack spacing={5} alignItems="start">
                    <VStack pt={4} w={16} spacing={0} fontSize="smaller">
                        <IconNative
                            size={32}
                            x={28}
                            y={0}
                            highlight={30}
                            filter="saturate(50%) brightness(5) saturate(2)"
                        />
                        <Text whiteSpace="nowrap" mt={3}>
                            150 m
                        </Text>
                        <Text whiteSpace="nowrap" mt={-1}>
                            now
                        </Text>
                    </VStack>
                    <VStack alignItems="start" spacing={0}>
                        <Text fontSize="1.5em" fontWeight="bold">
                            {store.teamName}
                        </Text>
                        <Text textAlign="start">
                            {store.members.join(", ")}
                        </Text>
                        <Text textAlign="start" pt={5}>
                            {formatNumber(store.score)} XP
                        </Text>
                    </VStack>
                </HStack>
            </Border>
        </VStack>
    );
}
