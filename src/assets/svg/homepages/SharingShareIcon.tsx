import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SharingShareIcon(props: any) {
    return (
        <Svg
            width={21}
            height={21}
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#clip0_7242_1202)">
                <Path
                    d="M16.607 13.441a3.737 3.737 0 00-2.96 1.428L7.869 12.05a3.355 3.355 0 00-.12-2.308l6.056-3.473a3.747 3.747 0 002.802 1.238c2.029 0 3.68-1.576 3.68-3.513 0-1.937-1.651-3.513-3.68-3.513-2.03 0-3.681 1.576-3.681 3.513 0 .447.088.876.249 1.27l-6.07 3.481a3.75 3.75 0 00-2.767-1.199c-2.03 0-3.68 1.576-3.68 3.513 0 1.937 1.65 3.513 3.68 3.513 1.232 0 2.324-.58 2.993-1.47l5.76 2.81c-.107.33-.165.679-.165 1.041 0 1.938 1.651 3.514 3.68 3.514 2.03 0 3.68-1.576 3.68-3.514 0-1.937-1.65-3.513-3.68-3.513zm0-11.788c1.352 0 2.453 1.05 2.453 2.342 0 1.291-1.1 2.342-2.453 2.342-1.353 0-2.454-1.05-2.454-2.342s1.1-2.342 2.454-2.342zM4.338 13.403c-1.353 0-2.453-1.051-2.453-2.343 0-1.291 1.1-2.342 2.453-2.342 1.353 0 2.454 1.05 2.454 2.342s-1.1 2.342-2.454 2.342zm12.268 5.894c-1.353 0-2.453-1.051-2.453-2.343 0-1.29 1.1-2.342 2.454-2.342 1.352 0 2.453 1.051 2.453 2.342 0 1.292-1.1 2.343-2.453 2.343z"
                    fill="#fff"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_7242_1202">
                    <Path
                        fill="#fff"
                        transform="translate(.011 .48)"
                        d="M0 0H20.9378V19.9861H0z"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default SharingShareIcon