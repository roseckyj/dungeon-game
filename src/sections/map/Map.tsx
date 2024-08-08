import { Box, Flex } from "@chakra-ui/react";
import { DivIcon } from "leaflet";
import { useMemo, useState } from "react";
import * as ReactDOMServer from "react-dom/server";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Border } from "../../components/Border";
import { Icon } from "../../components/Icon";
import { IconNative } from "../../components/IconNative";
import { QuestStore } from "../../quests/QuestStore";
import { Quest } from "../../quests/types";
import { Dialogue } from "../dialogue/Dialogue";

export interface IMapProps {
    coords?: GeolocationCoordinates;
    store: QuestStore;
}

export function Map({ coords, store }: IMapProps) {
    const [quest, setQuest] = useState<Quest | null>(null);

    const getDistance = (
        coord1: [number, number],
        coord2: [number, number]
    ): number => {
        const radius = 6371e3; // Earth's radius in meters
        const [lat1, lon1] = coord1.map((degree) => (degree * Math.PI) / 180); // Convert degrees to radians
        const [lat2, lon2] = coord2.map((degree) => (degree * Math.PI) / 180); // Convert degrees to radians

        const deltaLat = lat2 - lat1;
        const deltaLon = lon2 - lon1;

        const a =
            Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) *
                Math.cos(lat2) *
                Math.sin(deltaLon / 2) *
                Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return radius * c; // Distance in meters
    };

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coords]);

    const exclamation = (highlighted: boolean) =>
        new DivIcon({
            html: ReactDOMServer.renderToString(
                <IconNative
                    size={32}
                    x={35}
                    y={13}
                    highlight={highlighted ? 0 : undefined}
                    filter={
                        highlighted ? "saturate(30%) brightness(2)" : undefined
                    }
                />
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            tooltipAnchor: [0, -16],
        });

    const question = (highlighted: boolean) =>
        new DivIcon({
            html: ReactDOMServer.renderToString(
                <IconNative
                    size={32}
                    x={37}
                    y={13}
                    highlight={highlighted ? 0 : undefined}
                    filter={
                        highlighted ? "saturate(30%) brightness(2)" : undefined
                    }
                />
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            tooltipAnchor: [0, -16],
        });

    const location = new DivIcon({
        html: ReactDOMServer.renderToString(
            <IconNative
                size={32}
                x={28}
                y={0}
                highlight={30}
                filter="saturate(50%) brightness(5) saturate(2)"
            />
        ),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        tooltipAnchor: [0, 0],
    });

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
