import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {ApplicationLayout} from '../../Layouts'

// Individual page component example

const Test = () => (
    <div>
        <h1>Test Component</h1>
        <p>This is a test component.</p>
        <Button variant='contained'>Test Button</Button>
        <p>Here is a text field:</p>
        <TextField id='filled-basic' label='Filled' variant='filled' />
    </div>
)

Test.displayName = 'Test'
Test.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Test
