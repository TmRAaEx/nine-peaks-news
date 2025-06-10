"use client";

import { useSpring, animated } from "react-spring"

interface NumberProps {
    num: number;
}

function Number({num}: NumberProps) {
    const { number } = useSpring({
        from: { number: 0 },
        number: num,
        delay: 200,
        config: { 
            mass: 1, 
            tension: 20, 
            friction: 10 
        },
    });
    return <animated.div>{number.to((num) => num.toFixed(0))}</animated.div>
}

export default function Numberchart(props: NumberProps) {
    
    return ( 
        <>
            <Number num={props.num}/>
        </>
    )
}