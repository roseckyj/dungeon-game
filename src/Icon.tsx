import { Box, BoxProps } from "@chakra-ui/react";

export interface IIconProps extends BoxProps {
    size: number; // Size of the icon
    x: number; // To select item from the tileset
    y: number; // To select item from the tileset
}

export function Icon({ size, x, y, ...rest }: IIconProps) {
    const path = "/icons.png";
    const w = 49;
    const h = 22;

    const iconProps: BoxProps = {
        bgImage: path,
        bgSize: size * w + "px " + size * h + "px",
        bgPosition: -x * size + "px " + -y * size + "px",
        w: size + "px",
        h: size + "px",
    };

    return (
        <Box {...iconProps} style={{ imageRendering: "pixelated" }} {...rest} />
    );
}
