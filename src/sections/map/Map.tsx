import { Box, Flex } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Border } from "../../components/Border";
import { Icon } from "../../components/Icon";
import { GameStore } from "../../quests/GameStore";
import { Quest } from "../../quests/types";
import { getDistance } from "../../utils/getDistance";
import { exclamation, location, question } from "../../utils/icons";
import { Dialogue } from "../dialogue/Dialogue";

export interface IMapProps {
    coords?: GeolocationCoordinates;
    store: GameStore;
}

export function Map({ coords, store }: IMapProps) {
    const [quest, setQuest] = useState<Quest | null>(null);

    const nearby = useMemo(() => {
        if (coords) {
            const distances = store.activeQuests.map((quest) => ({
                quest,
                distance: getDistance(
                    [coords.latitude, coords.longitude],
                    quest.location
                ),
            }));
            return distances
                .filter(({ distance }) => distance < 100) // TODO: 20m
                .map(({ quest }) => quest);
        }
        return [];
    }, [coords, store.activeQuests]);

    return (
        <Flex
            flexGrow={1}
            alignItems="stretch"
            justifyItems="stretch"
            position="relative"
        >
            <Box position="absolute" top={6} right={6} zIndex="overlay">
                <Border
                    borderPath="/Border/panel-border-007.png"
                    w="32px"
                    h="32px"
                    bg="rgba(0,0,0,0.7)"
                    opacity={nearby && nearby.length > 0 ? 1 : 0.2}
                    cursor="pointer"
                    onClick={() => setQuest(nearby ? nearby[0] : null)}
                >
                    <Icon size={32} x={36} y={13} ml="-8px" />
                </Border>
            </Box>
            <MapContainer
                center={
                    coords
                        ? [coords.latitude, coords.longitude]
                        : store.activeQuests[0].location
                }
                zoom={17}
                zoomControl={false}
                style={{
                    padding: "-20px",
                    flexGrow: 1,
                    backgroundColor: "black",
                    overflow: "hidden",
                }}
            >
                <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
                {coords && (
                    <Marker
                        position={[coords.latitude, coords.longitude]}
                        icon={location}
                    ></Marker>
                )}
                {Object.entries(store.activeQuests).map(([key, quest]) => {
                    const near = nearby ? nearby.includes(quest) : false;

                    return (
                        <Marker
                            position={quest.location}
                            key={key}
                            icon={
                                quest.type === "quest"
                                    ? question(near)
                                    : exclamation(near)
                            }
                        ></Marker>
                    );
                })}
            </MapContainer>
            {quest && (
                <Dialogue
                    onClose={() => setQuest(null)}
                    quest={quest}
                    store={store}
                />
            )}
        </Flex>
    );
}
