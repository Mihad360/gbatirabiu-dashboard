"use client";

import { Form, Select } from "antd";
import type { CSSProperties, ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TSelectOption = {
  label: string;
  value: string;
};

type TGbSelect = {
  options: TSelectOption[];
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  allowClear?: boolean;
  mode?: "multiple" | "tags";
};

const GbSelect = ({
  options,
  name,
  label,
  disabled,
  placeholder,
  icon,
  className,
  style,
  allowClear = true,
  mode,
}: TGbSelect) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            label ? (
              <span className="flex gap-2 items-center font-medium text-sm">
                {icon}
                {label}
              </span>
            ) : undefined
          }
          validateStatus={error ? "error" : ""}
          help={error?.message}
          className={!label ? "mb-0!" : ""}
        >
          <Select
            {...field}
            disabled={disabled}
            placeholder={placeholder || "Select"}
            options={options}
            allowClear={allowClear}
            mode={mode}
            className={className}
            style={style}
            size="large"
          />
        </Form.Item>
      )}
    />
  );
};

export default GbSelect;
