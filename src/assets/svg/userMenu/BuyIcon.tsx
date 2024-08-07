import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BuyIcon(props: any) {
    return (
        <Svg
            width={29}
            height={28}
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M24.878 9.997c-.874-.975-2.19-1.542-4.016-1.74v-1A6.448 6.448 0 0018.776 2.5 6.278 6.278 0 0013.874.854c-3.116.303-5.736 3.346-5.736 6.64v.764c-1.825.197-3.142.764-4.015 1.739-1.265 1.423-1.226 3.32-1.083 4.637l.913 7.338c.274 2.57 1.304 5.204 6.91 5.204h7.274c5.607 0 6.636-2.634 6.91-5.19l.913-7.365c.143-1.304.182-3.201-1.082-4.624zM14.057 2.685a4.51 4.51 0 013.507 1.172 4.602 4.602 0 011.486 3.4v.922h-9.1v-.685c0-2.345 1.917-4.598 4.107-4.81zM14.5 22.67c-2.725 0-4.941-2.24-4.941-4.993 0-2.754 2.216-4.994 4.941-4.994 2.725 0 4.941 2.24 4.941 4.994 0 2.753-2.216 4.993-4.94 4.993z"
                fill="#FF8170"
            />
            <Path
                d="M13.333 19.344a.88.88 0 01-.747-.42.876.876 0 01.304-1.202l1.038-.618v-1.26c0-.479.397-.875.875-.875s.863.385.863.875v1.75a.876.876 0 01-.42.746l-1.458.875a.926.926 0 01-.455.129z"
                fill="#FF8170"
            />
        </Svg>
    )
}

export default BuyIcon
