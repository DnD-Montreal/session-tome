import {Link as InertialLink} from '@inertiajs/inertia-react'
import styled from 'styled-components'

const StyledLink = styled(InertialLink)`
    color: white;
    text-decoration-line: ${(props) => (props.className === 'active' ? 'underline' : 'none')};
`

type LinkPropType = {
    href: string
    [key: string]: any
}

const Link = ({href, children, ...props}: LinkPropType) => (
    <StyledLink href={href} {...props}>
        {children}
    </StyledLink>
)

Link.displayName = 'Link'
export default Link
