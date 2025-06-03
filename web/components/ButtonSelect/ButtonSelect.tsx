import { Combobox, ComboboxProps, UnstyledButton, useCombobox } from '@mantine/core';
import { ReactNode } from 'react';

export interface ButtonSelectProps<T,> extends ComboboxProps {
  onSelect: (item: T) => void;
  title: ReactNode;
  getItemId: (item: T) => string;
  items: T[];
  autoClose?: boolean;
  children: ReactNode[]; // Should return ReactNodes that have `Combobox.Option` in it, with value being equal to `getItemId(...)`
}
export function ButtonSelect<T,>({
  items,
  title,
  autoClose,
  getItemId,
  onSelect,
  children: options,
  ...props
}: ButtonSelectProps<T>) {
  /*
  Combobox opened by a button
  */

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  return (
    <Combobox
      {...props}
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(id) => {
        const item = items.find((i) => getItemId(i) === id)!;
        onSelect(item);
        if (autoClose === undefined || autoClose) {
          combobox.closeDropdown();
        }
      }}
    >
      <Combobox.Target>
        <UnstyledButton onClick={() => combobox.toggleDropdown()}>{title}</UnstyledButton>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
