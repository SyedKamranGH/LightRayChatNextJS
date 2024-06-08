import { Inter, Montserrat, Manrope, Encode_Sans } from 'next/font/google'

/**
 * Do we still need this?
 * @deprecated
 */
export const inter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: '--font-oswald',
})

// export const montserrat = Montserrat({
//     weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//     subsets: ['latin'],
//     variable: '--font-montserrat',
// })

export const montserrat = Encode_Sans({
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
    variable: '--font-montserrat',
})
