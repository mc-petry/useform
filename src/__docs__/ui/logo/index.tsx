import { motion, SVGMotionProps } from 'framer-motion'

interface Props {
  className?: string
}

export function CLogo({ className }: Props) {
  return (
    <div className={className}>
      {/* {!import.meta.env.SSR && ( */}
      <svg viewBox="0 0 16.93 16.93">
        <defs>
          <linearGradient id="a">
            <stop offset="0" stopColor="#8983d9" />
            <stop offset="1" stopColor="#a19aff" />
          </linearGradient>
          <linearGradient id="b">
            <stop offset="0" stopColor="#a19aff" />
            <stop offset=".5" stopColor="#a19aff" />
            <stop offset="1" stopColor="#918beb" />
          </linearGradient>
          <linearGradient
            id="d"
            x1="15.44"
            x2="20.64"
            y1="3.95"
            y2="3.95"
            gradientTransform="matrix(1.06875 0 0 1.425 2.28 -1.12)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#a"
          />
          <linearGradient
            id="c"
            x1="0"
            x2="17.54"
            y1="20.35"
            y2="20.35"
            gradientTransform="translate(7.94 2.65) scale(.37703)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#b"
          />
          <linearGradient
            id="e"
            x1="15.33"
            x2="19.98"
            y1="4.06"
            y2="4.06"
            gradientTransform="matrix(.855 0 0 1.425 5.68 4.53)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#a"
          />
          <path id="p1" d="M7.94 2.65v14.81h6.61v-4.23h-2.9V2.65z" />
          <path id="p2" d="M6.88 0v3.7h3.7V0zm3.7 5.82h-3.7v9h3.7z" />
          <path id="p3" d="M18.79 2.65h5.55v3.7H18.8z" />
          <path id="p4" d="M18.79 8.47h3.96v3.7H18.8z" />
          <clipPath id="cp1">
            <use xlinkHref="#p1" style={{ overflow: 'visible' }} />
          </clipPath>
          <clipPath id="cp2">
            <use xlinkHref="#p2" style={{ overflow: 'visible' }} />
          </clipPath>
          <clipPath id="cp3">
            <use xlinkHref="#p3" style={{ overflow: 'visible' }} />
          </clipPath>
          <clipPath id="cp4">
            <use xlinkHref="#p4" style={{ overflow: 'visible' }} />
          </clipPath>
        </defs>
        <g>
          <motion.path
            {...animation(0)}
            clipPath="url(#cp1)"
            fill="url(#c)"
            d="M7.94 2.65v14.81h6.61v-4.23h-2.9V2.65z"
            transform="translate(-7.94 -2.65)"
          />
          <motion.path
            {...animation(1)}
            clipPath="url(#cp2)"
            fill="#a19aff"
            d="M6.88 0v3.7h3.7V0zm3.7 5.82h-3.7v9h3.7z"
          />
          <motion.path
            {...animation(2)}
            clipPath="url(#cp3)"
            fill="url(#d)"
            d="M18.79 2.65h5.55v3.7H18.8z"
            transform="translate(-7.94 -2.65)"
          />
          <motion.path
            {...animation(3)}
            clipPath="url(#cp4)"
            fill="url(#e)"
            d="M18.79 8.47h3.96v3.7H18.8z"
            transform="translate(-7.94 -2.65)"
          />
        </g>
      </svg>
      {/* )} */}
    </div>
  )
}

const animation: (index: number) => SVGMotionProps<SVGPathElement> = d => ({
  strokeOpacity: 0,
  fillOpacity: 0,
  animate: {
    pathLength: [0, 1, 1],
    fillOpacity: [0, 0.4, 1],
    strokeOpacity: [1, 1, 0],
    transition: { duration: 6, delay: d * 0.35 },
  },
  strokeWidth: '.3',
  stroke: '#cac6ff',
})
