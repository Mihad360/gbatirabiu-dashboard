"use client";

import { useEffect } from "react";
import { Form } from "antd";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
  type Resolver,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, unknown>;
  resolver?: Resolver<FieldValues>;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
} & TFormConfig;

const GbForm = ({
  onSubmit,
  children,
  resolver,
  defaultValues,
}: TFormProps) => {
  const methods = useForm({ resolver });

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default GbForm;
