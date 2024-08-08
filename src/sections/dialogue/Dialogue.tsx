import { Image, Input, Portal, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Border } from "../../components/Border";
import { UIDivider } from "../../components/UIDivider";
import { GameStore } from "../../quests/GameStore";
import { Quest } from "../../quests/types";

export interface IDialogueProps {
    store: GameStore;
    quest: Quest;
    onClose: () => void;
}

export function Dialogue({ store, onClose, quest }: IDialogueProps) {
    const [stepID, setStepID] = useState(quest.initialStepId);
    const step = quest.content[stepID];
    const [inputs, setInputs] = useState<Record<string, string>>(
        step.content
            .filter((block) => block.type === "input")
            .reduce(
                (acc, block) => ({
                    ...acc,
                    [(block as { id: string }).id]: "",
                }),
                {}
            )
    );

    return (
        <Portal>
            <VStack
                position="fixed"
                inset={0}
                bgColor="rgba(0,0,0,0.7)"
                backdropFilter="blur(10px)"
                zIndex="overlay"
                py={10}
                spacing={7}
                overflowY="auto"
            >
                <Image
                    src={step.image}
                    w="256px"
                    style={{ imageRendering: "pixelated" }}
                />
                <UIDivider divider="/Divider Fade/divider-fade-003.png">
                    <Text
                        fontSize="1.5em"
                        fontWeight="bold"
                        textAlign="justify"
                    >
                        {step.name}
                    </Text>
                </UIDivider>

                <VStack
                    alignItems="stretch"
                    spacing={4}
                    px={10}
                    mt={8}
                    w="full"
                >
                    {step.content.map((block, index) => {
                        switch (block.type) {
                            case "text":
                                return (
                                    <Text key={index} textAlign="justify">
                                        <ReactMarkdown>
                                            {block.content}
                                        </ReactMarkdown>
                                    </Text>
                                );
                            case "input":
                                return (
                                    <Border
                                        flexGrow={1}
                                        borderPath="/Border/panel-border-005.png"
                                        key={index}
                                    >
                                        <Input
                                            placeholder={block.placeholder}
                                            variant="unstyled"
                                            onChange={(e) => {
                                                setInputs({
                                                    ...inputs,
                                                    [block.id]: e.target.value,
                                                });
                                            }}
                                            value={inputs[block.id]}
                                        />
                                    </Border>
                                );
                            case "button":
                                return (
                                    <Border
                                        flexGrow={1}
                                        key={index}
                                        onClick={() => {
                                            const nextStepID = step.evaluator(
                                                store,
                                                block.id,
                                                inputs
                                            );
                                            if (nextStepID) {
                                                setStepID(nextStepID);
                                            } else {
                                                onClose();
                                            }
                                        }}
                                        borderPath="/Border/panel-border-007.png"
                                    >
                                        <ReactMarkdown>
                                            {block.content}
                                        </ReactMarkdown>
                                    </Border>
                                );
                        }
                    })}
                </VStack>
            </VStack>
        </Portal>
    );
}
