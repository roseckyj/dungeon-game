import { Box, Center, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import screenfull from "screenfull";
import { Border } from "./Border";
import { Icon } from "./Icon";
import { UIDivider } from "./UIDivider";
import { Map } from "./sections/map/Map";
import { Quests } from "./sections/quests/Quests";

function App() {
    const [fullscreen, setFullscreen] = useState(false);
    const [tab, setTab] = useState<"map" | "quests" | "social">("map");

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            watchPosition: true,
            userDecisionTimeout: 10000,
            suppressLocationOnMount: false,
            geolocationProvider: navigator.geolocation,
        });

    useEffect(() => {
        const interval = setInterval(() => {
            if (!screenfull.isFullscreen) {
                setFullscreen(false);
            }
        }, 1000);
        return () => clearInterval(interval);
    });

    if (!isGeolocationAvailable) {
        return (
            <Center bg="black" color="white" w="full" h="100vh">
                <VStack alignItems="center" spacing={6}>
                    <Text>
                        The game requires geolocation
                        <br />
                        and your browser does not seem to enable it...
                    </Text>
                    <Icon size={64} x={35} y={21} />
                </VStack>
            </Center>
        );
    }

    if (!isGeolocationEnabled) {
        return (
            <Center bg="black" color="white" w="full" h="100vh">
                <VStack alignItems="center" spacing={6}>
                    <Text>
                        The game requires geolocation
                        <br />
                        and you have rejected it...
                    </Text>
                    <Icon size={64} x={35} y={21} />
                </VStack>
            </Center>
        );
    }

    if (!fullscreen) {
        return (
            <Center bg="black" color="white" w="full" h="100vh">
                <VStack alignItems="center" spacing={6}>
                    <Text>The game must run in fullscreen mode</Text>
                    <Border
                        borderPath="/Border/panel-border-007.png"
                        onClick={() => {
                            if (screenfull.isEnabled) {
                                screenfull.request();
                                setFullscreen(true);
                            }
                        }}
                    >
                        <Text>Return to the game</Text>
                    </Border>
                </VStack>
            </Center>
        );
    }

    return (
        <VStack
            w="full"
            h="100vh"
            overflow="hidden"
            alignItems="stretch"
            bg="black"
            color="white"
        >
            <VStack alignItems="center" py={5} spacing={0}>
                <Text fontSize="2xl" fontWeight="bold">
                    Zmoklé veverky
                </Text>
                <UIDivider divider="/Divider Fade/divider-fade-003.png">
                    <Text>1 964 XP</Text>
                </UIDivider>
            </VStack>
            {tab === "map" && <Map coords={coords} />}
            {tab === "quests" && <Quests />}
            {tab === "social" && <Box flexGrow={1}>Social</Box>}
            <HStack
                w="full"
                pt={3}
                alignItems="end"
                spacing={5}
                h="80px"
                flexShrink={0}
            >
                <Spacer />
                <Border
                    borderPath="/Border/panel-border-007.png"
                    skipBorder={{ bottom: true }}
                    pt={3}
                    pb={tab === "map" ? 5 : 2}
                    transition="all 0.2s"
                    onClick={() => setTab("map")}
                >
                    <Icon size={32} x={32} y={15} />
                </Border>
                <Border
                    borderPath="/Border/panel-border-007.png"
                    skipBorder={{ bottom: true }}
                    pt={3}
                    pb={tab === "quests" ? 5 : 2}
                    transition="all 0.2s"
                    onClick={() => setTab("quests")}
                >
                    <Icon size={32} x={33} y={15} />
                </Border>
                <Border
                    borderPath="/Border/panel-border-007.png"
                    skipBorder={{ bottom: true }}
                    pt={3}
                    pb={tab === "social" ? 5 : 2}
                    transition="all 0.2s"
                    onClick={() => setTab("social")}
                >
                    <Icon size={32} x={44} y={16} />
                    <Box
                        bg="red"
                        border="solid 3px black"
                        boxSizing="content-box"
                        w={2}
                        h={2}
                        position="absolute"
                        top="12px"
                        right="12px"
                    />
                </Border>
                <Spacer />
            </HStack>
        </VStack>
    );
}

export default App;
