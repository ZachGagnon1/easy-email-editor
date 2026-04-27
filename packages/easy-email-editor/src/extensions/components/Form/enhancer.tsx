import { Field, UseFieldConfig } from "react-final-form";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRefState } from "easy-email-editor";
import { debounce } from "lodash";

export interface EnhancerProps {
  name: string;
  onChangeAdapter?: (value: any) => any;
  validate?: (value: any) => string | undefined | Promise<string | undefined>;
  config?: UseFieldConfig<any, any>;
  changeOnBlur?: boolean;
  label?: React.ReactNode;
  inline?: boolean;
  equalSpacing?: boolean;
  required?: boolean;
  autoComplete?: "on" | "off";
  style?: React.CSSProperties;
  helpText?: React.ReactNode;
  debounceTime?: number;
  labelHidden?: boolean;
}

const parse = (v: any) => v;

export default function enhancer<
  P extends { onChange?: (...rest: any) => any }
>(
  Component: React.FC<any>,
  changeAdapter: (args: Parameters<NonNullable<P["onChange"]>>) => any,
  option?: { debounceTime: number }
) {
  return (
    props: EnhancerProps & Omit<P, "value" | "onChange" | "mutators">
  ) => {
    const {
      name,
      validate,
      onChangeAdapter,
      changeOnBlur,
      inline,
      equalSpacing,
      label,
      required,
      style,
      helpText,
      autoComplete,
      labelHidden,
      config: configProp,
      ...rest
    } = props;

    const debounceTime = props.debounceTime || option?.debounceTime || 300;

    const config = useMemo(() => {
      return {
        ...configProp,
        validate: validate,
        parse: configProp?.parse || parse,
      };
    }, [configProp, validate]);

    const [currentValue, setCurrentValue] = useState("");
    const currentValueRef = useRefState(currentValue);

    return useMemo(() => {
      return (
        <Field name={name} {...config}>
          {({ input: { onBlur, onChange, value }, meta }) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps

            const debounceCallbackChange = useCallback(
              debounce((val) => {
                onChange(val);
                onBlur();
              }, debounceTime),
              [onChange, onBlur]
            );

            const onFieldChange: P["onChange"] = useCallback(
              (e: any) => {
                const newVal = onChangeAdapter
                  ? onChangeAdapter(changeAdapter(e))
                  : changeAdapter(e);

                setCurrentValue(newVal);
                if (!changeOnBlur) {
                  debounceCallbackChange(newVal);
                }
              },
              [debounceCallbackChange]
            );

            const onFieldBlur = useCallback(() => {
              if (changeOnBlur) {
                onChange(currentValueRef.current);
                onBlur();
              }
            }, [onBlur, onChange]);

            useEffect(() => {
              setCurrentValue(value);
            }, [value]);

            const isError = Boolean(meta.touched && meta.error);
            const currentHelperText = isError ? meta.error : helpText;

            return (
              <Component
                autoComplete={autoComplete}
                {...rest}
                name={name}
                checked={currentValue}
                value={currentValue}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
                // --- Forwarded MUI Props ---
                label={labelHidden ? undefined : label}
                error={isError}
                helperText={currentHelperText}
                required={required}
                style={style}
                // Forward these so your custom MUI field components can handle grid layouts themselves
                inline={inline}
                equalSpacing={equalSpacing}
              />
            );
          }}
        </Field>
      );
    }, [
      autoComplete,
      changeOnBlur,
      config,
      currentValue,
      currentValueRef,
      debounceTime,
      helpText,
      label,
      labelHidden,
      name,
      onChangeAdapter,
      required,
      rest,
      style,
      inline,
      equalSpacing,
    ]);
  };
}
