import React, { useMemo } from 'react';
import InputPicker, { InputPickerProps } from '../InputPicker/InputPicker';
import { TagProvider, TagOnlyProps } from '../InputPicker/InputPickerContext';
import { useCustom } from '../CustomProvider';
import type { PickerComponent } from '@/internals/Picker/types';

export type TagInputProps = Omit<InputPickerProps<readonly string[]>, 'data'> &
  Partial<TagOnlyProps>;

/**
 * The `TagInput` component is an enhancement of Input and supports input tags and management tags.
 *
 * @see https://rsuitejs.com/components/tag-input
 */
const TagInput: PickerComponent<TagInputProps> = React.forwardRef((props: TagInputProps, ref) => {
  const { propsWithDefaults } = useCustom('TagInput', props);
  const {
    tagProps = {},
    trigger = 'Enter',
    value,
    defaultValue,
    onTagRemove,
    ...rest
  } = propsWithDefaults;

  const contextValue = useMemo(
    () => ({ multi: true, disabledOptions: true, trigger, tagProps, onTagRemove }),
    [onTagRemove, tagProps, trigger]
  );

  const data = useMemo(
    () => (value || defaultValue || []).map(v => ({ value: v, label: v })),
    [defaultValue, value]
  );

  return (
    <TagProvider value={contextValue}>
      <InputPicker
        {...rest}
        aria-haspopup={false}
        aria-expanded={undefined}
        aria-controls={undefined}
        aria-keyshortcuts={trigger}
        value={value}
        defaultValue={defaultValue}
        data={data}
        placement={undefined}
        creatable
        ref={ref}
      />
    </TagProvider>
  );
});

TagInput.displayName = 'TagInput';

export default TagInput;
