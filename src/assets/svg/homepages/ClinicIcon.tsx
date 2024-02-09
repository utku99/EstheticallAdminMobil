import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ClinicIcon(props: any) {
    return (
        <Svg
            width={45}
            height={45}
            viewBox="0 0 236 317"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M118 293.918c-14.446 13.222-14.448 13.22-14.451 13.217l-.007-.008-.088-.097-.24-.264a482.98 482.98 0 01-4.125-4.628 707.947 707.947 0 01-11.41-13.318c-9.397-11.235-21.967-26.909-34.58-44.59-12.565-17.615-25.45-37.606-35.267-57.441C8.242 167.414.5 146.085.5 126.372.5 56.382 51.764.168 118 .168c66.236 0 117.5 56.215 117.5 126.204 0 19.713-7.742 41.042-17.332 60.417-9.817 19.835-22.702 39.826-35.267 57.441-12.613 17.681-25.183 33.355-34.58 44.59a708.953 708.953 0 01-11.41 13.318 482.98 482.98 0 01-4.125 4.628l-.24.264-.088.097-.007.008c-.003.003-.005.005-14.451-13.217zm0 0l14.446 13.222c-3.71 4.053-8.952 9.361-14.446 9.361s-10.736-5.308-14.446-9.361L118 293.918z"
                fill="#FF8170"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34 117.5C34 70.832 71.608 33 118 33s84 37.832 84 84.5-37.608 84.5-84 84.5-84-37.832-84-84.5z"
                fill="#fff"
            />
            <Path
                d="M157.667 66H78.333c-6.261 0-11.276 5.072-11.276 11.333L67 156.667C67 162.928 72.072 168 78.333 168h79.334c6.261 0 11.333-5.072 11.333-11.333V77.333C169 71.072 163.928 66 157.667 66zM152 128.333h-22.667V151h-22.666v-22.667H84v-22.666h22.667V83h22.666v22.667H152v22.666z"
                fill="#FF8170"
            />
        </Svg>
    )
}

export default ClinicIcon
