import {
  BasicType,
  BlockManager,
  getPageIdx,
  getParentByIdx,
  IBlockData,
  JsonToMjml,
} from "easy-email-core";
import {
  useBlock,
  useEditorContext,
  useEditorProps,
  useFocusIdx,
} from "easy-email-editor";
import { cloneDeep } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { MjmlToJson } from "@extensions/utils/MjmlToJson";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";
import { TextAreaInput } from "@extensions/components/Form/TextAreaInput";

export function SourceCodePanel({
  jsonReadOnly,
  mjmlReadOnly,
}: {
  jsonReadOnly: boolean;
  mjmlReadOnly: boolean;
}) {
  const { setValueByIdx, focusBlock, values } = useBlock();
  const { focusIdx } = useFocusIdx();

  const [codeError, setCodeError] = useState<string>();
  const [mjmlError, setMjmlError] = useState<string>();

  const [mjmlText, setMjmlText] = useState("");
  const [codeText, setCodeText] = useState("");
  const { pageData } = useEditorContext();
  const { mergeTags } = useEditorProps();

  const onChangeCode = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      if (!jsonReadOnly) {
        try {
          const parseValue = JSON.parse(
            JSON.stringify(eval("(" + event.target.value + ")"))
          ) as IBlockData;

          const block = BlockManager.getBlockByType(parseValue.type);
          if (!block) {
            throw new Error(t("Invalid content"));
          }
          if (
            !parseValue.data ||
            !parseValue.data.value ||
            !parseValue.attributes ||
            !Array.isArray(parseValue.children)
          ) {
            throw new Error(t("Invalid content"));
          }
          setValueByIdx(focusIdx, parseValue);
        } catch (error: any) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          setCodeError((error?.message || error) as string);
        }
      }
    },
    [focusIdx, setValueByIdx]
  );

  const onChangeCodeText = useCallback((value: string) => {
    setCodeText(value);
  }, []);

  const onMjmlChange = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      if (!mjmlReadOnly) {
        try {
          const parseValue = MjmlToJson(event.target.value);
          if (parseValue.type !== BasicType.PAGE) {
            const parentBlock = getParentByIdx(values, focusIdx)!;
            const parseBlock = BlockManager.getBlockByType(parseValue.type);

            if (!parseBlock?.validParentType.includes(parentBlock?.type)) {
              throw new Error(t("Invalid content"));
            }
          } else if (focusIdx !== getPageIdx()) {
            throw new Error(t("Invalid content"));
          }

          setValueByIdx(focusIdx, parseValue);
        } catch (error) {
          setMjmlError(t("Invalid content"));
        }
      }
    },
    [focusIdx, setValueByIdx, values]
  );

  const onChangeMjmlText = useCallback((value: string) => {
    setMjmlText(value);
  }, []);

  useEffect(() => {
    if (focusBlock) {
      setMjmlText(
        JsonToMjml({
          idx: focusIdx,
          data: focusBlock,
          context: pageData,
          mode: "production",
          dataSource: cloneDeep(mergeTags),
        })
      );
    }
  }, [focusBlock, focusIdx, pageData, mergeTags]);

  useEffect(() => {
    if (!focusBlock) {
      setCodeText("");
    }

    setCodeText(JSON.stringify(focusBlock, null, 2) || "");
  }, [focusBlock]);

  if (!focusBlock) {
    return null;
  }

  console.log(codeError, mjmlError);

  return (
    <>
      <CollapsableItem title={t("Json source")}>
        <TextAreaInput
          key={codeText}
          value={codeText}
          maxRows={25}
          onChange={onChangeCodeText}
          onBlur={onChangeCode}
          disabled={jsonReadOnly}
          error={Boolean(codeError)}
          helperText={codeError}
        />
      </CollapsableItem>
      <CollapsableItem title={t("MJML source")}>
        <TextAreaInput
          key={mjmlText}
          value={mjmlText}
          maxRows={25}
          onChange={onChangeMjmlText}
          onBlur={onMjmlChange}
          disabled={mjmlReadOnly}
          error={Boolean(mjmlError)}
          helperText={mjmlError}
        />
      </CollapsableItem>
    </>
  );
}
