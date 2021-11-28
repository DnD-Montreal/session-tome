import {Link as inertiaLink} from '@inertiajs/inertia-react'
import React from 'react'
import styled from 'styled-components'

const StyledLink = styled(inertiaLink)`
    color: white;
    text-decoration-line: ${(props) =>
        props.className === 'active' ? 'underline' : 'none'};
`

type LinkPropType = {
    href: any
    child: any
    [key: string]: any
}

const Link = ({href, child, ...props}: LinkPropType) => (
    <StyledLink href={href} {...props}>
        {child}
    </StyledLink>
)

Link.displayName = 'Link'
export default Link
