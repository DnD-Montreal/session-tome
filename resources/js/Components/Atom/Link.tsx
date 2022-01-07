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
    [key: string]: any
}

// props.children is the content passed between the component tags, don't need to be passed down explicitly

const Link = ({href, children, ...props}: LinkPropType) => (
    <StyledLink href={href} {...props}>
        {children}
    </StyledLink>
)

Link.displayName = 'Link'
export default Link
