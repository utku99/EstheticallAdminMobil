import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TrashIcon(props: any) {
    return (
        <Svg
            width={14}
            height={17}
            viewBox="0 0 18 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M12.225 8.644a.501.501 0 00-.501.501v9.469a.501.501 0 001.002 0V9.145a.501.501 0 00-.501-.5zM6.313 8.644a.5.5 0 00-.5.501v9.469a.501.501 0 001.001 0V9.145a.5.5 0 00-.5-.5z"
                fill={props.fill}
            />
            <Path
                d="M2.005 7.263v12.342c0 .73.267 1.415.735 1.907a2.467 2.467 0 001.79.774h9.478a2.466 2.466 0 001.79-.774c.468-.492.735-1.177.735-1.907V7.263a1.914 1.914 0 00-.49-3.764h-2.566v-.626A1.968 1.968 0 0011.493.894H7.045A1.968 1.968 0 005.06 2.873v.626H2.496a1.914 1.914 0 00-.491 3.764zm12.003 14.02H4.53c-.857 0-1.523-.735-1.523-1.678V7.307H15.53v12.298c0 .943-.666 1.679-1.523 1.679zM6.063 2.874a.964.964 0 01.982-.977h4.448a.965.965 0 01.982.977v.626H6.063v-.626zM2.496 4.5h13.546a.902.902 0 110 1.804H2.496a.902.902 0 110-1.804z"
                fill={props.fill}
            />
            <Path
                d="M2.005 7.263v12.342c0 .73.267 1.415.735 1.907a2.467 2.467 0 001.79.774h9.478a2.466 2.466 0 001.79-.774c.468-.492.735-1.177.735-1.907V7.263a1.914 1.914 0 00-.49-3.764h-2.566v-.626A1.968 1.968 0 0011.493.894H7.045A1.968 1.968 0 005.06 2.873v.626H2.496a1.914 1.914 0 00-.491 3.764zm12.003 14.02H4.53c-.857 0-1.523-.735-1.523-1.678V7.307H15.53v12.298c0 .943-.666 1.679-1.523 1.679zM6.063 2.874a.964.964 0 01.982-.977h4.448a.965.965 0 01.982.977v.626H6.063v-.626zM2.496 4.5h13.546a.902.902 0 110 1.804H2.496a.902.902 0 110-1.804z"
                fill={props.fill}
            />
            <Path
                d="M9.27 8.644a.5.5 0 00-.501.501v9.469a.501.501 0 001.002 0V9.145a.5.5 0 00-.501-.5z"
                fill={props.fill}
            />
        </Svg>
    )
}

export default TrashIcon