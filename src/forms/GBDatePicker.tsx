"use client";

import { DatePicker, Form } from "antd";
import type { CSSProperties } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
  style?: CSSProperties;
  className?: string;
  showTime?: boolean;
};

const GbDatePicker = ({
  name,
  label,
  style,
  className,
  showTime = false,
}: TDatePickerProps) => {
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
          className={!label ? "mb-0!" : ""}
        >
          <DatePicker
            {...field}
            size="large"
            showTime={showTime}
            style={{ width: "100%", ...style }}
            className={className}
            placeholder={`Select ${label || "date"}`}
          />
        </Form.Item>
      )}
    />
  );
};

export default GbDatePicker;
