import { HStack, Text, VStack } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { Border } from "../../components/Border";
import { Icon } from "../../components/Icon";
import { Quest as QuestType } from "../../quests/types";
import { getDistance } from "../../utils/getDistance";

export interface IQuestProps {
    quest: QuestType;
    coords?: GeolocationCoordinates;
}

export function Quest({ quest, coords }: IQuestProps) {
    const distance = coords
        ? getDistance([coords.latitude, coords.longitude], quest.location)
        : null;

    return (
        <HStack alignItems="start">
            <VStack>
                <Border
                    flexGrow={0}
                    flexShrink={0}
                    borderPath="/Border/panel-border-007.png"
                    mx={3}
                    w="16px"
                >
                    <Icon
                        size={32}
                        x={quest.type === "quest" ? 37 : 35}
                        y={13}
                        ml="-8px"
                    />
                </Border>
                <Text>{distance ? Math.round(distance) + " m" : ""}</Text>
            </VStack>
            <VStack flexGrow={1} alignItems="start" spacing={0}>
                <Text fontSize="larger" fontWeight="bold">
                    {quest.title}
                </Text>
                <Text>
                    <ReactMarkdown>
                        {quest.questbookSummary || ""}
                    </ReactMarkdown>
                </Text>
            </VStack>
        </HStack>
    );
}
