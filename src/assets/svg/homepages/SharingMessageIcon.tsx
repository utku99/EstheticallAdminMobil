import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SharingMessageIcon(props: any) {
    return (
        <Svg
            width={23}
            height={23}
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M15.3 21.342c-.325 0-.64-.095-.918-.277l-4.073-2.716H8.502a.72.72 0 01-.564-.277.73.73 0 01-.125-.621c.058-.23.086-.46.086-.708a3.1 3.1 0 00-.803-2.074 3.059 3.059 0 00-2.304-1.033c-.85 0-1.645.335-2.228.937a.7.7 0 01-.707.191.736.736 0 01-.507-.535 6.21 6.21 0 01-.143-1.377V7.115c0-3.289 2.208-5.498 5.497-5.498h9.561c3.29 0 5.498 2.209 5.498 5.498v5.737c0 1.596-.526 2.973-1.53 3.977-.84.842-1.96 1.348-3.25 1.482v1.358c0 .622-.345 1.186-.89 1.482a1.827 1.827 0 01-.793.191zm-5.976-4.436h1.195c.144 0 .277.038.402.124l4.255 2.84a.217.217 0 00.239.01c.047-.03.133-.087.133-.22v-2.037c0-.392.325-.717.717-.717 1.215 0 2.238-.383 2.955-1.1.727-.726 1.11-1.75 1.11-2.964V7.105c0-2.466-1.598-4.063-4.064-4.063H6.704c-2.467 0-4.063 1.597-4.063 4.063v5.622a4.485 4.485 0 012.151-.535c1.3 0 2.534.555 3.375 1.51a4.55 4.55 0 011.167 3.032c-.01.057-.01.114-.01.172z"
                fill="#fff"
            />
            <Path
                d="M4.778 21.282c-1.128 0-2.199-.42-3.03-1.175a4.093 4.093 0 01-.861-1.033 4.489 4.489 0 01-.65-2.333c0-1.195.459-2.314 1.281-3.165a4.495 4.495 0 013.26-1.377c1.3 0 2.534.555 3.376 1.511a4.55 4.55 0 011.166 3.03c0 .364-.048.728-.143 1.072-.096.43-.278.88-.526 1.271-.794 1.358-2.285 2.2-3.873 2.2zm0-7.649c-.85 0-1.644.335-2.227.938a3.1 3.1 0 00-.43 3.767c.152.267.353.506.583.707a3.08 3.08 0 004.733-.688 2.65 2.65 0 00.353-.87 2.78 2.78 0 00.096-.736 3.1 3.1 0 00-.803-2.075 3.02 3.02 0 00-2.305-1.043z"
                fill="#fff"
            />
            <Path
                d="M6.205 17.437H3.346a.722.722 0 01-.717-.717c0-.392.325-.717.717-.717h2.86a.716.716 0 110 1.434z"
                fill="#fff"
            />
            <Path
                d="M4.779 18.9a.722.722 0 01-.717-.717v-2.859c0-.392.325-.717.717-.717.392 0 .717.325.717.717v2.859a.716.716 0 01-.717.717zM14.816 12.244H8.123a.722.722 0 01-.717-.717c0-.393.325-.718.717-.718h6.693c.391 0 .717.325.717.718a.722.722 0 01-.717.717zM14.816 8.842H8.123a.722.722 0 01-.717-.717c0-.392.325-.717.717-.717h6.693c.391 0 .717.325.717.717a.722.722 0 01-.717.717z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SharingMessageIcon