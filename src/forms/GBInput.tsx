"use client";

import { Form, Input } from "antd";
import type { CSSProperties } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: "large" | "middle" | "small";
  className?: string;
  style?: CSSProperties;
  readOnly?: boolean;
};

const GbInput = ({
  name,
  label,
  type = "text",
  disabled = false,
  placeholder,
  size = "large",
  className,
  style,
  readOnly = false,
}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
          className={!label ? "!mb-0" : ""}
        >
          {type === "password" ? (
            <Input.Password
              {...field}
              id={name}
              disabled={disabled}
              size={size}
              className={className}
              style={style}
              placeholder={placeholder || (label ? `Enter ${label}` : "")}
            />
          ) : (
            <Input
              {...field}
              id={name}
              type={type}
              readOnly={readOnly}
              disabled={disabled}
              size={size}
              className={className}
              style={style}
              placeholder={placeholder || (label ? `Enter ${label}` : "")}
            />
          )}
        </Form.Item>
      )}
    />
  );
};

export default GbInput;
