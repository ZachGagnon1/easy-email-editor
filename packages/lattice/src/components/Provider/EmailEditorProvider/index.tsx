import { IEmailTemplate } from "@/typings";
import { Form, useField, useForm, useFormState } from "react-final-form";
import arrayMutators from "final-form-arrays";
import React, { useEffect, useRef, useState } from "react";
import { BlocksProvider } from "..//BlocksProvider";
import { HoverIdxProvider } from "../HoverIdxProvider";
import { PropsProvider, PropsProviderProps } from "../PropsProvider";
import { RecordProvider } from "../RecordProvider";
import { ScrollProvider } from "../ScrollProvider";
import { Config, FormApi, FormState } from "final-form";
import setFieldTouched from "final-form-set-field-touched";
import { FocusBlockLayoutProvider } from "../FocusBlockLayoutProvider";
import { PreviewEmailProvider } from "../PreviewEmailProvider";
import { LanguageProvider } from "../LanguageProvider";
import { overrideErrorLog, restoreErrorLog } from "@/utils/logger";
import { isEqual } from "lodash"; // 1. Import isEqual for deep comparison

export interface EmailEditorProviderProps<T extends IEmailTemplate = any>
  extends Omit<PropsProviderProps, "children"> {
  data: T;
  children: (
    props: FormState<T>,
    helper: FormApi<IEmailTemplate, Partial<IEmailTemplate>>
  ) => React.ReactNode;
  onSubmit?: Config<IEmailTemplate, Partial<IEmailTemplate>>["onSubmit"];
  validationSchema?: Config<
    IEmailTemplate,
    Partial<IEmailTemplate>
  >["validate"];
}

export const EmailEditorProvider = <T extends any>(
  props: EmailEditorProviderProps & T
) => {
  const { data, children, onSubmit = () => {}, validationSchema } = props;

  // 2. Use state to hold the initial values so they don't regenerate arbitrarily
  const [initialValues, setInitialValues] = useState(() => ({
    subject: data.subject,
    subTitle: data.subTitle,
    content: data.content,
  }));

  // 3. Deeply compare incoming data to prevent react-final-form from resetting state on resize
  const prevDataRef = useRef(data);
  useEffect(() => {
    if (!isEqual(prevDataRef.current, data)) {
      setInitialValues({
        subject: data.subject,
        subTitle: data.subTitle,
        content: data.content,
      });
      prevDataRef.current = data;
    }
  }, [data]);

  useEffect(() => {
    overrideErrorLog();
    return () => {
      restoreErrorLog();
    };
  }, []);

  if (!initialValues.content) return null;

  return (
    <Form<IEmailTemplate>
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize // This is now safely protected by our deep equality check above!
      validate={validationSchema}
      mutators={{ ...arrayMutators, setFieldTouched: setFieldTouched as any }}
      subscription={{ submitting: true, pristine: true }}
    >
      {() => (
        <>
          <PropsProvider {...props}>
            <LanguageProvider locale={props.locale}>
              <PreviewEmailProvider>
                <RecordProvider>
                  <BlocksProvider>
                    <HoverIdxProvider>
                      <ScrollProvider>
                        <FocusBlockLayoutProvider>
                          <FormWrapper children={children} />
                        </FocusBlockLayoutProvider>
                      </ScrollProvider>
                    </HoverIdxProvider>
                  </BlocksProvider>
                </RecordProvider>
              </PreviewEmailProvider>
            </LanguageProvider>
          </PropsProvider>
          <RegisterFields />
        </>
      )}
    </Form>
  );
};

function FormWrapper({
  children,
}: {
  children: EmailEditorProviderProps["children"];
}) {
  const data = useFormState<IEmailTemplate>();
  const helper = useForm<IEmailTemplate>();
  return <>{children(data, helper)}</>;
}

// final-form bug https://github.com/final-form/final-form/issues/169
const RegisterFields = React.memo(() => {
  const { touched } = useFormState<IEmailTemplate>();
  const [touchedMap, setTouchedMap] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (touched) {
      Object.keys(touched)
        .filter((key) => touched[key])
        .forEach((key) => {
          setTouchedMap((obj) => {
            obj[key] = true;
            return { ...obj };
          });
        });
    }
  }, [touched]);

  return (
    <>
      {Object.keys(touchedMap).map((key) => {
        return <RegisterField key={key} name={key} />;
      })}
    </>
  );
});

function RegisterField({ name }: { name: string }) {
  useField(name);
  return <></>;
}
