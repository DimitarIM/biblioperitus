import { motion } from 'motion/react'
import React from 'react'

function LogoIntro({ bg }: { bg: string }) {


    return (
        <div className={`fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-${bg}`}>
            <motion.h1>
                Biblio<span>Peritus</span>
            </motion.h1>
        </div>

    )
}

export default LogoIntro