import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BlueTick(props: any) {
    return (
        <Svg
            width={14}
            height={14}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M14 .668C6.652.668.665 6.655.665 14.001c0 7.347 5.987 13.334 13.333 13.334 7.347 0 13.334-5.987 13.334-13.334 0-7.346-5.987-13.333-13.334-13.333zm6.373 10.267l-7.56 7.56a.999.999 0 01-1.414 0L7.626 14.72a1.006 1.006 0 010-1.413 1.006 1.006 0 011.413 0l3.067 3.067 6.853-6.854a1.006 1.006 0 011.414 0 1.006 1.006 0 010 1.414z"
                fill="#43A5FF"
            />
        </Svg>
    )
}

export default BlueTick
