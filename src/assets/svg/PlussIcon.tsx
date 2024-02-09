import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlussIcon(props: any) {
    return (
        <Svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M12 8.4H8.501V12H3.499V8.4H0V3.624h3.499V0h5.002v3.624H12V8.4z"
                fill="#fff"
            />
        </Svg>
    )
}

export default PlussIcon
