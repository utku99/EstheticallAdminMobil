import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HelpIcon(props: any) {
    return (
        <Svg
            width={33}
            height={33}
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M10.313 16.5c0-1.023.256-1.988.704-2.844.225-.43.186-.968-.157-1.312l-4.051-4.05c-.41-.41-1.085-.389-1.43.078A13.616 13.616 0 002.71 16.5c0 3.038.985 5.849 2.658 8.125.344.468 1.02.491 1.43.08l4.061-4.05c.345-.343.384-.88.158-1.312a6.113 6.113 0 01-.703-2.843zM16.5 10.313c1.023 0 1.988.255 2.845.703.43.226.967.187 1.31-.157l4.013-4.011c.409-.41.388-1.083-.077-1.428a13.58 13.58 0 00-8.132-2.67c-3.038 0-5.838.985-8.11 2.658-.469.344-.492 1.02-.082 1.43l4.031 4.042c.346.347.889.384 1.321.154a6.113 6.113 0 012.881-.722zM27.224 7.962a.485.485 0 00-.724-.034l-4.68 4.67a.528.528 0 00-.066.653c.587.945.933 2.054.933 3.249a6.135 6.135 0 01-.933 3.25.528.528 0 00.064.652l4.682 4.682a.485.485 0 00.725-.033 13.675 13.675 0 002.984-8.551c0-3.23-1.115-6.192-2.985-8.538zM16.5 22.688a6.135 6.135 0 01-3.25-.934.529.529 0 00-.652.065l-4.723 4.723a.485.485 0 00.033.724 13.675 13.675 0 008.551 2.984c3.245 0 6.22-1.115 8.556-2.997a.485.485 0 00.03-.722l-4.686-4.688a.528.528 0 00-.649-.066 6.141 6.141 0 01-3.21.91z"
                fill="#FF8170"
            />
        </Svg>
    )
}

export default HelpIcon
