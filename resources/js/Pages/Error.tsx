import {usePage} from '@inertiajs/inertia-react'
import {Box} from '@mui/material'
import styled, {keyframes} from 'styled-components'
import {UsePageType} from 'Types/global'

const Sketch = styled.div`
    height: 400px;
    min-width: 400px;
    overflow: visible;
    order: 2;
`

const RedAnimation = keyframes`
    0% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/red-1.png)
    }
    9.09% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/red-2.png)
    }
    27.27% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/red-3.png)
    }
    36.36% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/red-4.png)
    }
    45.45% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/red-5.png)
    }
    54.54% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/red-6.png)
    }
    63.63% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/red-7.png)
    }
    72.72% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/red-8.png)
    }
    81.81% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/red-9.png)
    }
    100% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/red-1.png)
    }
`

const BlueAnimation = keyframes`
    0% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/blue-1.png)
    }
    9.09% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/blue-2.png)
    }
    27.27% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/blue-3.png)
    }
    36.36% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/blue-4.png)
    }
    45.45% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/blue-5.png)
    }
    54.54% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/blue-6.png)
    }
    63.63% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/blue-7.png)
    }
    72.72% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/blue-8.png)
    }
    81.81% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/blue-9.png)
    }
    100% {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/blue-1.png)
    }
`

const RedOpacity = keyframes`
    from {
        opacity: 1
    }
    25% {
        opacity: 1
    }
    75% {
        opacity: .3
    }
    to {
        opacity: .3
    }
`

const BlueOpacity = keyframes`
    from {
        opacity: 0
    }
    25% {
        opacity: 0
    }
    75% {
        opacity: 1
    }
    to {
        opacity: 1
    }
`

const BeholderRed = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/red-1.png)
        no-repeat center center;
    opacity: 1;
    animation: ${RedAnimation} 3s linear infinite,
        ${RedOpacity} 5s linear alternate infinite;
`
const BeholderBlue = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/198554/blue-1.png)
        no-repeat center center;
    opacity: 0;
    animation: ${BlueAnimation} 3s linear infinite,
        ${BlueOpacity} 5s linear alternate infinite;
`

const Title = styled.h1`
    font-size: 3em;
    opacity: 0.8;
`

const Description = styled.small`
    display: block;
`

const Error = () => {
    const {title, description} = usePage<UsePageType>().props
    return (
        <Box sx={{p: 30}}>
            <Title>
                {title}
                <Description>{description}</Description>
            </Title>

            <Sketch>
                <BeholderRed />
                <BeholderBlue />
            </Sketch>
        </Box>
    )
}

Error.displayName = 'Error'
document.body.style.display = 'flex'
document.body.style.minHeight = '100%'
document.documentElement.style.height = '100%'

export default Error
