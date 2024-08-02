import { DivIcon } from "leaflet";
import * as ReactDOMServer from "react-dom/server";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { IconNative } from "../../IconNative";

export function Map() {
    const positions: [number, number][] = [
        [50.138089, 16.806386],
        [50.136674, 16.804541],
        [50.139381, 16.805405],
        [50.141959, 16.8071],
        [50.131912, 16.799718],
        [50.13066, 16.806875],
        [50.141842, 16.81343],
        [50.144146, 16.804697],
        [50.14321, 16.808216],
        [50.137001, 16.80342],
        [50.131933, 16.802057],
        [50.135165, 16.805137],
        [50.140797, 16.808076],
        [50.138507, 16.809643],
        [50.147817, 16.810018],
    ];

    const exclamation = new DivIcon({
        html: ReactDOMServer.renderToString(
            <IconNative size={32} x={35} y={13} />
        ),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        tooltipAnchor: [0, -16],
    });

    const question = new DivIcon({
        html: ReactDOMServer.renderToString(
            <IconNative size={32} x={37} y={13} />
        ),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        tooltipAnchor: [0, -16],
    });

    return (
        <MapContainer
            center={positions[0]}
            zoom={17}
            zoomControl={false}
            style={{
                padding: "-20px",
                flexGrow: 1,
                backgroundColor: "black",
                overflow: "hidden",
            }}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
            />
            {positions.map((position, i) => (
                <Marker
                    position={position}
                    key={i}
                    icon={i % 2 ? exclamation : question}
                ></Marker>
            ))}
        </MapContainer>
    );
}
