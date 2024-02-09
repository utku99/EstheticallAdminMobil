import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AboutIcon(props: any) {
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
                d="M16.5 2.75C8.924 2.75 2.75 8.924 2.75 16.5S8.924 30.25 16.5 30.25s13.75-6.174 13.75-13.75S24.076 2.75 16.5 2.75zM15.469 11c0-.564.467-1.031 1.031-1.031.564 0 1.031.467 1.031 1.031v6.875c0 .564-.467 1.031-1.031 1.031a1.039 1.039 0 01-1.031-1.031V11zm2.296 11.523a1.42 1.42 0 01-.289.453c-.137.124-.288.22-.453.289a1.37 1.37 0 01-.523.11 1.37 1.37 0 01-.523-.11 1.586 1.586 0 01-.453-.289 1.42 1.42 0 01-.289-.453 1.37 1.37 0 01-.11-.523c0-.179.041-.358.11-.523.069-.165.165-.316.289-.453.137-.124.289-.22.454-.289.33-.137.714-.137 1.045 0 .165.069.316.165.453.289.124.137.22.288.289.453.069.165.11.344.11.523 0 .179-.041.358-.11.523z"
                fill="#FF8170"
            />
        </Svg>
    )
}

export default AboutIcon
