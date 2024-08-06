import { Box, Flex } from "@chakra-ui/react";
import { DivIcon } from "leaflet";
import { useMemo } from "react";
import * as ReactDOMServer from "react-dom/server";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Border } from "../../Border";
import { Icon } from "../../Icon";
import { IconNative } from "../../IconNative";

export interface IMapProps {
    coords?: GeolocationCoordinates;
}

export type POI = {
    type: "quest";
    location: [number, number];
};

export function Map({ coords }: IMapProps) {
    const positions: Record<string, POI> = {
        a: { type: "quest", location: [49.24424, 16.586657] },
        b: { type: "quest", location: [49.244595, 16.587615] },
        c: { type: "quest", location: [49.24449, 16.585678] },
        d: { type: "quest", location: [49.243401, 16.586553] },
        e: { type: "quest", location: [49.242802, 16.587491] },
        f: { type: "quest", location: [49.243776, 16.588296] },
        g: { type: "quest", location: [49.243573, 16.584895] },
        h: { type: "quest", location: [49.242511, 16.585582] },
    };

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
            const distances = Object.entries(positions).map(([key, value]) => ({
                key,
                distance: getDistance(
                    [coords.latitude, coords.longitude],
                    value.location
                ),
            }));
            return distances
                .filter(({ distance }) => distance < 20)
                .map(({ key }) => key);
        }
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
                >
                    <Icon size={32} x={36} y={13} ml="-8px" />
                </Border>
            </Box>
            <MapContainer
                center={
                    coords
                        ? [coords.latitude, coords.longitude]
                        : positions[0].location
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
                {Object.entries(positions).map(([key, poi]) => {
                    const near = nearby ? nearby.includes(key) : false;

                    return (
                        <Marker
                            position={poi.location}
                            key={key}
                            icon={
                                poi.type === "quest"
                                    ? question(near)
                                    : exclamation(near)
                            }
                        ></Marker>
                    );
                })}
            </MapContainer>
        </Flex>
    );
}
