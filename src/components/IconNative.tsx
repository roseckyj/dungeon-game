export interface IIconNativeProps {
    size: number; // Size of the icon
    x: number; // To select item from the tileset
    y: number; // To select item from the tileset
    highlight?: number; // Highlight the icon
    filter?: string; // Filter the icon
}

export function IconNative({
    size,
    x,
    y,
    highlight,
    filter,
}: IIconNativeProps) {
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
        filter: `drop-shadow(0px 0px 5px black) drop-shadow(0px 0px 10px black) ${
            highlight !== undefined
                ? `sepia(100%) brightness(60%) hue-rotate(-70deg) saturate(200) hue-rotate(${highlight}deg)`
                : ""
        } ${filter || ""}`,
    };

    return <div style={style}>{/* <div style={styleShadow}></div> */}</div>;
}
