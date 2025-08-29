import { AttributesPanelWrapper } from '@extensions/AttributePanel';
import { Button, Collapse, Tooltip } from '@arco-design/web-react';
import { IconFont, Stack } from 'easy-email-editor';
import React, { useState } from 'react';
import {
  Border,
  CollapseWrapper,
  Color,
  ContainerBackgroundColor,
  FontFamily,
  FontSize,
  FontStyle,
  Padding,
  TextAlign,
  Width,
} from '@extensions';
import { HtmlEditor } from '../../UI/HtmlEditor';

export function Table() {
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper
      extra={(
        <Tooltip content={t('Edit')}>
          <Button
            onClick={() => setVisible(true)}
            icon={<IconFont iconName='icon-html' />}
          />
        </Tooltip>
      )}
    >
      <CollapseWrapper defaultActiveKey={['-1', '0', '1', '2', '3']}>
        <Collapse.Item
          name='1'
          header={t('Dimension')}
        >
          <Stack>
            <Width />
            <Stack.Item />
          </Stack>
          <Stack vertical>
            <Padding />
          </Stack>
        </Collapse.Item>

        <Collapse.Item
          name='2'
          header={t('Decoration')}
        >
          <Color />
          <ContainerBackgroundColor />
          <Border />
        </Collapse.Item>

        <Collapse.Item
          name='2'
          header={t('Typography')}
        >
          <Stack>
            <FontFamily />
            <FontSize />
          </Stack>
          <FontStyle />
          <TextAlign />
        </Collapse.Item>
      </CollapseWrapper>
      <HtmlEditor
        visible={visible}
        setVisible={setVisible}
      />
    </AttributesPanelWrapper>
  );
}
