import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function EstheticLogo(props: any) {
    return (
        <Svg
            width={props.width ?? 255}
            height={props.height ?? 73}
            viewBox="0 0 255 73"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
        >
            <Path fill="url(#pattern0)" d="M0 0H255V73H0z" />
            <Defs>
                <Pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use
                        xlinkHref="#image0_7128_14387"
                        transform="matrix(.00167 0 0 .00582 0 .177)"
                    />
                </Pattern>
                <Image
                    id="image0_7128_14387"
                    width={600}
                    height={111}
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAABvCAYAAAAwhr7gAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjgzRDAwMzhEODBFMTFFQkEyMDRFMDgwMjcxRDE3NTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjgzRDAwMzlEODBFMTFFQkEyMDRFMDgwMjcxRDE3NTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ODNEMDAzNkQ4MEUxMUVCQTIwNEUwODAyNzFEMTc1NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2ODNEMDAzN0Q4MEUxMUVCQTIwNEUwODAyNzFEMTc1NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqHoOzMAACzKSURBVHja7F0HnFXF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"
                />
            </Defs>
        </Svg>
    )
}

export default EstheticLogo