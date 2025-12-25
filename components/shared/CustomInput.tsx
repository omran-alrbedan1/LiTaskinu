"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React from "react";
import { Badge } from "@/components/ui/badge";

export enum FormFieldType {
  INPUT = "input",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  COMBOBOX = "combobox",
  RADIO = "radio",
  MULTI_SELECT = "multiSelect",
}

interface Option {
  value: string;
  label: string;
  code?: string;
  icon?: string;
}

interface CustomProps {
  fieldType: FormFieldType;
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  required?: boolean;
  options?: Option[];
  inputClassName?: string;
  orientation?: "vertical" | "horizontal";
  showTimeSelect?: boolean;
  dateFormat?: string;
  renderSkeleton?: (field: any) => React.ReactNode;
  disabled?: boolean;
  searchPlaceholder?: string;
  className?: string;
  children?: React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    options = [],
    inputClassName,
    orientation = "vertical",
  } = props;

  const selectedValues = field.value || [];

  const handleMultiSelectChange = (value: string) => {
    const currentValues = field.value || [];
    if (currentValues.includes(value)) {
      field.onChange(currentValues.filter((v: string) => v !== value));
    } else {
      field.onChange([...currentValues, value]);
    }
  };

  const removeSelected = (value: string) => {
    const currentValues = field.value || [];
    field.onChange(currentValues.filter((v: string) => v !== value));
  };

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-input bg-background focus-within:ring-2 ring-ring">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="border-0 placeholder:text-muted-foreground focus:outline-none focus-within:border-none focus-within:ring-0 bg-transparent text-foreground"
            />
          </FormControl>
        </div>
      );
case FormFieldType.PASSWORD:
  const [showPassword, setShowPassword] = React.useState(false);
  
  return (
    <div className="flex rounded-md border border-input bg-background focus-within:ring-2 ring-ring">
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={iconAlt || "icon"}
          width={20}
          height={20}
          className="ml-2"
        />
      )}
      <FormControl>
        <Input
          {...field}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="border-0 placeholder:text-muted-foreground focus:outline-none focus-within:border-none focus-within:ring-0 bg-transparent text-foreground pr-10"
        />
      </FormControl>
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="px-3 text-muted-foreground hover:text-foreground"
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" x2="22" y1="2" y2="22" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
      case FormFieldType.PHONE_INPUT:
  return (
    <FormControl>
      <PhoneInput
        country={"us"}
        value={field.value}
        onChange={field.onChange}
        buttonStyle={{
          backgroundColor: 'rgb(17 24 39)', // bg-gray-900
          borderColor: 'rgb(75 85 99)', // border-gray-600
          color: 'rgb(249 250 251)', // text-gray-50
        }}
        dropdownStyle={{
          backgroundColor: 'rgb(17 24 39)', // bg-gray-900
          borderColor: 'rgb(75 85 99)', // border-gray-600
          color: 'rgb(249 250 251)', // text-gray-50
        }}
        inputStyle={{
          backgroundColor: 'rgb(17 24 39)', // bg-gray-900
          borderColor: 'rgb(75 85 99)', // border-gray-600
          color: 'rgb(249 250 251)', // text-gray-50
          width: '100%',
          height: '40px',
        }}
        buttonClass="!h-10 !rounded-l-md"
        dropdownClass="!shadow-lg"
        inputClass={cn(
          "!h-10 !w-full !rounded-md focus:!ring-2 focus:!ring-primary-color1",
          inputClassName
        )}
      />
    </FormControl>
  );
    
  case FormFieldType.DATE_PICKER:
      return (
        <FormControl>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex justify-between font-normal border border-input bg-background hover:bg-accent text-foreground"
              >
                <span>
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span className="text-muted-foreground">
                      {placeholder}
                    </span>
                  )}
                </span>
                <CalendarIcon className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                className="rounded-lg border shadow-sm bg-background"
                classNames={{
                  day_selected: "bg-primary text-primary-foreground",
                  day_today: "border border-primary",
                }}
              />
            </PopoverContent>
          </Popover>
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
     <Select
  onValueChange={field.onChange}
  value={field.value}
>
          <FormControl>
            <SelectTrigger className="w-full border border-input pl-3 rounded-lg h-10 bg-background focus:ring-2 focus:ring-ring focus:border-ring text-foreground">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="bg-background border-input text-foreground z-[9999] max-h-60">
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value.toString()}
                className="flex items-center gap-2 py-2 hover:bg-accent focus:bg-accent"
              >
                <div className="flex items-center gap-2">
                  {option.code && (
                    <ReactCountryFlag
                      countryCode={option.code}
                      svg
                      style={{ width: "1.3em", height: "1.3em" }}
                      title={option.code}
                    />
                  )}
                  {option.icon && (
                    <Image
                      src={option.icon}
                      alt={option.label}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  )}
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
            {props.children}
          </SelectContent>
        </Select>
      );
    case FormFieldType.MULTI_SELECT:
      return (
        <FormControl>
          <div className="space-y-3">
            {selectedValues.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedValues.map((value: string) => {
                  const option = options.find((opt) => opt.value === value);
                  return (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full"
                    >
                      {option?.icon && (
                        <Image
                          src={option.icon}
                          alt={option.label}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      )}
                      {option?.code && (
                        <ReactCountryFlag
                          countryCode={option.code}
                          svg
                          style={{ width: "1em", height: "1em" }}
                          title={option.code}
                        />
                      )}
                      <span>{option?.label || value}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSelected(value);
                        }}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between border border-input bg-background hover:bg-accent h-10 text-foreground",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <span>
                    {selectedValues.length === 0
                      ? placeholder || "Select options..."
                      : `${selectedValues.length} selected`}
                  </span>
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command className="bg-background border border-input rounded-md shadow-lg">
                  <CommandInput
                    placeholder={props.searchPlaceholder || "Search options..."}
                    className="h-12 text-base border-b border-border rounded-t-md bg-background text-foreground"
                  />
                  <CommandList className="max-h-60 overflow-auto">
                    <CommandEmpty className="py-6 text-center text-muted-foreground">
                      No options found.
                    </CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => {
                        const isSelected = selectedValues.includes(
                          option.value
                        );
                        return (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={() =>
                              handleMultiSelectChange(option.value)
                            }
                            className="flex items-center px-4 py-3 cursor-pointer hover:bg-accent aria-selected:bg-accent text-foreground"
                          >
                            <div
                              className={cn(
                                "w-5 h-5 border border-input rounded flex items-center justify-center mr-3",
                                isSelected
                                  ? "bg-primary border-primary"
                                  : "bg-background"
                              )}
                            >
                              {isSelected && (
                                <CheckIcon className="w-3 h-3 text-primary-foreground" />
                              )}
                            </div>
                            {option.icon && (
                              <Image
                                src={option.icon}
                                alt={option.label}
                                width={20}
                                height={20}
                                className="mr-3"
                              />
                            )}
                            {option.code && (
                              <ReactCountryFlag
                                countryCode={option.code}
                                svg
                                style={{
                                  width: "1.2em",
                                  height: "1.2em",
                                  marginRight: "0.75rem",
                                }}
                                title={option.code}
                              />
                            )}
                            <span>{option.label}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </FormControl>
      );
    case FormFieldType.COMBOBOX:
      return (
        <FormControl>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between border border-input bg-background hover:bg-accent text-foreground",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? options.find((option) => option.value === field.value)
                      ?.label
                  : placeholder || "Select an option..."}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command className="bg-background border border-input rounded-md shadow-lg">
                <CommandInput
                  placeholder={props.searchPlaceholder || "Search..."}
                  className="h-12 text-base border-b border-border rounded-t-md bg-background text-foreground"
                />
                <CommandList className="max-h-60 overflow-auto">
                  <CommandEmpty className="py-6 text-center text-muted-foreground">
                    No results found.
                  </CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => {
                          field.onChange(
                            option.value === field.value ? "" : option.value
                          );
                        }}
                        className="flex items-center px-4 py-3 cursor-pointer hover:bg-accent aria-selected:bg-primary aria-selected:text-primary-foreground text-foreground"
                      >
                        <CheckIcon
                          className={cn(
                            "mr-3 h-5 w-5",
                            field.value === option.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {option.icon && (
                          <Image
                            src={option.icon}
                            alt={option.label}
                            width={20}
                            height={20}
                            className="mr-3"
                          />
                        )}
                        {option.code && (
                          <ReactCountryFlag
                            countryCode={option.code}
                            svg
                            style={{
                              width: "1.2em",
                              height: "1.2em",
                              marginRight: "0.75rem",
                            }}
                            title={option.code}
                          />
                        )}
                        <span>{option.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            rows={5}
            className="border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="border-input data-[state=checked]:bg-primary"
            />
            <Label
              htmlFor={props.name}
              className="checkbox-label text-foreground"
            >
              {props.label}
            </Label>
          </div>
        </FormControl>
      );
    case FormFieldType.RADIO:
      return (
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
            className={`flex ${
              orientation === "horizontal" ? "flex-row gap-6" : "flex-col gap-3"
            }`}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${props.name}-${option.value}`}
                  className="border-input text-primary"
                />
                <Label
                  htmlFor={`${props.name}-${option.value}`}
                  className="cursor-pointer text-sm text-foreground"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FormControl>
      );
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, required, className } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex-1 flex flex-col", className)}>
          {fieldType !== FormFieldType.CHECKBOX &&
            fieldType !== FormFieldType.RADIO &&
            fieldType !== FormFieldType.MULTI_SELECT &&
            label &&
            (required ? (
              <p className="flex items-center gap-1">
                <FormLabel className="mb-2 text-foreground">
                  {label}
                </FormLabel>
                <span className="text-destructive text-xl -mt-1">*</span>
              </p>
            ) : (
              <FormLabel className="mb-2 text-foreground">
                {label}
              </FormLabel>
            ))}

          {fieldType === FormFieldType.MULTI_SELECT &&
            label &&
            (required ? (
              <p className="flex items-center gap-1 mb-3">
                <FormLabel className="text-foreground">
                  {label}
                </FormLabel>
                <span className="text-destructive text-xl -mt-1">*</span>
              </p>
            ) : (
              <FormLabel className="mb-3 text-foreground">
                {label}
              </FormLabel>
            ))}

          {fieldType === FormFieldType.RADIO &&
            label &&
            (required ? (
              <p className="flex items-center gap-1 mb-3">
                <FormLabel className="text-foreground">
                  {label}
                </FormLabel>
                <span className="text-destructive text-xl -mt-1">*</span>
              </p>
            ) : (
              <FormLabel className="mb-3 text-foreground">
                {label}
              </FormLabel>
            ))}

          {fieldType === FormFieldType.CHECKBOX && (
            <div className="mb-2">
              {required && label && (
                <p className="flex items-center gap-1 mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                  <span className="text-destructive text-xl -mt-1">*</span>
                </p>
              )}
            </div>
          )}

          <FormControl>
            <RenderField field={field} props={props} />
          </FormControl>
          <FormMessage className="text-destructive mt-1" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;