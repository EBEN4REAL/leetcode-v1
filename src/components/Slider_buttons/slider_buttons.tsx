import React from "react"
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";

const SliderBtns = ({direction}: {direction: 'left' | 'right'}) => {
    const template = direction == 'left' ? 
        <RxCaretLeft className="text-4xl font-bold prev tags-btn" />
    : 
    <RxCaretRight className="text-4xl font-bold prev tags-btn" />

    return (
        <>
            {template}
        </>
    )
}

export default SliderBtns