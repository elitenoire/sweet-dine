/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React, { useRef } from 'react'
import GliderTrack from './GliderTrack'
import { useAnimation, useAutoplay, useDragGesture, useGliderProps } from './hooks'
import { clamp } from '~/lib/utils'

const Glider = ({ draggable, visibleGlides, gap, children, ...rest }) => {
    const gliderRef = useRef(null)
    const dragging = useRef(false)

    const { ref, autoplay, autoplayInterval, onChange, onPlayChange } = useGliderProps()

    const totalGlides = React.Children.count(children)
    const { index, animate } = useAnimation({ totalGlides, onChange })

    const _autoplay = useAutoplay({ interval: autoplayInterval, autoplay, index, animate, onPlayChange })

    useDragGesture({
        index,
        visibleGlides,
        gap,
        enabled: !!draggable,
        ref: gliderRef,
        animate,
        onStart: () => {
            dragging.current = true
            _autoplay.stop()
        },
        onEnd: event => {
            if (!dragging.current) return

            dragging.current = false
            _autoplay.start()

            if (!(event instanceof MouseEvent)) return

            event.target.addEventListener(
                'click',
                e => {
                    e.preventDefault()
                },
                { once: true }
            )
        },
    })

    React.useImperativeHandle(
        ref,
        () => ({
            glideLeft: () => {
                _autoplay.start()
                animate({ index: Math.floor(index.getValue() - 1) })
            },
            glideRight: () => {
                _autoplay.start()
                animate({ index: Math.ceil(index.getValue() + 1) })
            },
            glideTo: newIndex => {
                const _newIndex = clamp(newIndex, 0, totalGlides - 1)
                const _index = index.getValue()

                _autoplay.start()
                animate({ index: _index + _newIndex - (_index % totalGlides) })
            },
            isPlaying: _autoplay.isPlaying,
            togglePlay: () => {
                if (_autoplay.isPlaying()) {
                    _autoplay.enable(false)
                    _autoplay.stop()
                } else {
                    _autoplay.enable(true)
                    _autoplay.start()
                }
            },
        }),
        [_autoplay, index, animate, totalGlides]
    )

    return (
        <GliderTrack
            ref={gliderRef}
            index={index}
            gap={gap}
            visibleGlides={visibleGlides}
            onMouseEnter={_autoplay.stop}
            onMouseLeave={_autoplay.start}
        >
            {children}
        </GliderTrack>
    )
}

Glider.defaultProps = {
    visibleGlides: 1,
    draggable: true,
    gap: 40, // 40px
}

export default Glider
