import React, { useMemo } from 'react';
import InputPicker, { InputPickerProps } from '../InputPicker/InputPicker';
import { TagProvider, TagOnlyProps } from '../InputPicker/InputPickerContext';
import { useCustom } from '../CustomProvider';
import type { ItemDataType } from '@/internals/types';
import type { PickerComponent } from '@/internals/Picker/types';
import type { CheckboxProps } from '../Checkbox';

export interface TagPickerProps<V = any>
  extends Omit<InputPickerProps<V>, 'renderValue'>,
    Partial<TagOnlyProps> {
  /**
   * Custom render checkbox on menu item
   * @version 5.47.0
   **/
  renderMenuItemCheckbox?: (checkboxProps: CheckboxProps) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    values: V[],
    items: ItemDataType<V>[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;
}

/**
 * `TagPicker` component enables multi-selection by tags and supports new options.
 *
 * @see https://rsuitejs.com/components/tag-picker/
 */
const TagPicker: PickerComponent<TagPickerProps> = React.forwardRef(
  (props: TagPickerProps, ref) => {
    const { propsWithDefaults } = useCustom('TagPicker', props);
    const {
      tagProps = {},
      trigger = 'Enter',
      onTagRemove,
      renderMenuItemCheckbox,
      renderValue,
      ...rest
    } = propsWithDefaults;

    const contextValue = useMemo(
      () => ({
        multi: true,
        trigger,
        tagProps,
        onTagRemove,
        renderCheckbox: renderMenuItemCheckbox
      }),
      [onTagRemove, renderMenuItemCheckbox, tagProps, trigger]
    );

    return (
      <TagProvider value={contextValue}>
        <InputPicker
          renderValue={renderValue as InputPickerProps['renderValue']}
          {...rest}
          ref={ref}
        />
      </TagProvider>
    );
  }
);

TagPicker.displayName = 'TagPicker';

export default TagPicker;
