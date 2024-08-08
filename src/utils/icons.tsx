import { DivIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { IconNative } from "../components/IconNative";

export const exclamation = (highlighted: boolean) =>
    new DivIcon({
        html: ReactDOMServer.renderToString(
            <IconNative
                size={32}
                x={35}
                y={13}
                highlight={highlighted ? 0 : undefined}
                filter={highlighted ? "saturate(30%) brightness(2)" : undefined}
            />
        ),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        tooltipAnchor: [0, -16],
    });

export const question = (highlighted: boolean) =>
    new DivIcon({
        html: ReactDOMServer.renderToString(
            <IconNative
                size={32}
                x={37}
                y={13}
                highlight={highlighted ? 0 : undefined}
                filter={highlighted ? "saturate(30%) brightness(2)" : undefined}
            />
        ),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        tooltipAnchor: [0, -16],
    });

export const location = new DivIcon({
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
