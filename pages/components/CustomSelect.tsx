import React, { ReactElement } from "react";
import Select, {
  components,
  ContainerProps,
  ControlProps,
  CSSObjectWithLabel,
  GroupBase,
  OptionProps,
  PropsValue,
  SingleValueProps,
  StylesConfig,
} from "react-select";
import CreatableSelect from "react-select/creatable";

export type SelectOption = {
  readonly value: any | object | null;
  readonly label: string | object | null;
  readonly icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  readonly link?: string;
};

interface SelectProps {
  options?: SelectOption[];
  onChange?: (option: any) => void;
  defaultValue?: SelectOption | SelectOption[];
  isSearchable?: boolean;
  style?: CSSObjectWithLabel;
  placeholder?: string;
  value?: PropsValue<SelectOption> | undefined;
  isDisabled?: boolean;
  handleClearValue?: () => void;
  variant?: "autocomplete" | "select" | "creatable";
  borderRadius?: string;
  menuPortalTarget?: HTMLElement;
}

export const truncatedTextActive = (
  ref: React.RefObject<HTMLParagraphElement>
) => {
  // @ts-ignore
  return ref?.current?.offsetWidth < ref?.current?.scrollWidth;
};

function CustomSelect({
  options,
  onChange,
  value,
  style = {},
  placeholder,
}: SelectProps) {
  const handleStyle: StylesConfig<SelectOption> = React.useMemo(
    () => ({
      container: (base) => ({
        ...base,
        width: "100%",
        pointerEvents: "auto",
      }),
      valueContainer: (base) => ({
        ...base,
      }),
      control: (base, state) => ({
        ...base,
        borderColor: "black",
        outline: "5px solid black",
        fontSize: "28px",
      }),
      placeholder: (base) => ({
        ...base,
        color: "#A6B0C1",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
      }),
      clearIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        cursor: "pointer",
        paddingBottom: 0,
      }),
      option: (base, state) => ({
        ...base,
        borderRadius: "4px",
      }),
      menu: (base) => ({
        ...base,
        zIndex: "10000",
        maxHeight: "220px",
      }),
      menuList: (base) => ({
        ...base,
        maxHeight: "220px",
        padding: "5px",
        fontSize: "20px",
        zIndex: 999,
        outline: "5px solid black",
        borderRadius: "4px",
        letterSpacing: "2px",
      }),
      input: (base) => ({
        ...base,
        cursor: "pointer",
        color: "#001E4D",
        letterSpacing: "0.3px",
        fontSize: "20px",
      }),
      singleValue: (base) => ({
        ...base,
        color: "#001E4D",
      }),
    }),
    []
  );
  return (
    <Select
      styles={handleStyle}
      components={{
        IndicatorSeparator: () => null,
      }}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
      menuShouldBlockScroll
    />
  );
}

export default CustomSelect;
