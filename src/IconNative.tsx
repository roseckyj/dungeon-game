export interface IIconNativeProps {
    size: number; // Size of the icon
    x: number; // To select item from the tileset
    y: number; // To select item from the tileset
}

export function IconNative({ size, x, y }: IIconNativeProps) {
    const path = "/icons.png";
    const w = 49;
    const h = 22;

    const style: React.CSSProperties = {
        backgroundImage: `url("${path}")`,
        backgroundSize: size * w + "px " + size * h + "px",
        backgroundPosition: -x * size + "px " + -y * size + "px",
        width: size + "px",
        height: size + "px",
        imageRendering: "pixelated",
    };

    return <div style={style} />;
}
