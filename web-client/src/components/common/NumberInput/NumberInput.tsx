import { ChangeEvent, useCallback, useState } from "react";
import {TextField, TextFieldProps} from "@mui/material";

import Styles from './NumberInput.module.scss'

type NumberInputProps = TextFieldProps & {
    max?: number;
    min?: number;
    value: string;
    validationError?: string|false;
}

export const NumberInput = (props: NumberInputProps) => {
    const {
        max = Number.MAX_SAFE_INTEGER,
        min,
        value,
        validationError,
        onChange
    } = props;

    const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(e.target.value))) {
            e.target.value = value;
            return;
        }

        if (e.target.value === '') {
            onChange?.(e);
            return;
        }
        
        let nextValue = Number(e.target.value);
        
        if (max !== undefined && nextValue > max) {
            nextValue = max;
        }

        if (min !== undefined && nextValue < min) {
            nextValue = min;
        }

        e.target.value = String(nextValue);
        onChange?.(e);
    }, [value, max, min]);

    return (
        <div>
            <TextField
                {...props}
                value={value}
                error={Boolean(validationError)}
                onInput={onInput}
                onChange={onChange}
                className={Styles.formControl}
                InputLabelProps={{
                    classes: {
                        root: Styles.label,
                    }
                }}
                InputProps={{
                    classes: {
                        root: Styles.input,
                        focused: Styles.inputFocused
                    },
                    ...props.InputProps
                }}
                type="text"
            />
            
            {Boolean(validationError) &&  (
                <div className={Styles.error}>
                    {validationError}
                </div>
            )}
        </div>
    )
}
