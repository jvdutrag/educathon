import { TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import InputMask from 'react-input-mask'

type TextFieldMaskProps = {
    mask: string
    control: Control
    [key: string]: any
}

export default function TextFieldMask({ mask, control, ...rest }: TextFieldMaskProps) {
    return (
        <Controller
            name={rest.name}
            control={control}
            render={({ field }) => (
                <InputMask
                    mask={mask}
                    value={field.value}
                    onChange={field.onChange}
                    name={field.name}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    alwaysShowMask={false}
                    maskPlaceholder="_"
                >
                    <TextField {...rest} />
                </InputMask>
            )}
        />
    )
}
