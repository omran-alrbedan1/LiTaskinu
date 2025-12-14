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
        <div className="flex rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:ring-2 ring-primary-color1">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2 dark:invert"
            />
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="border-0 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus-within:border-none focus-within:ring-0 bg-transparent text-gray-900 dark:text-white"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div className="flex rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:ring-2 ring-primary-color1">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={20}
              height={20}
              className="ml-2 dark:invert"
            />
          )}
          <FormControl>
            <Input
              {...field}
              type={"password"}
              placeholder={placeholder}
              className="border-0 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus-within:border-none focus-within:ring-0 bg-transparent text-gray-900 dark:text-white"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            country={"us"}
            value={field.value}
            onChange={field.onChange}
            buttonClass="!h-10 !border-gray-300 dark:!border-gray-600 !bg-white dark:!bg-gray-800 !rounded-l-md !text-gray-900 dark:!text-white"
            dropdownClass="!bg-white dark:!bg-gray-800 !border-gray-300 dark:!border-gray-600 !text-gray-900 dark:!text-white !shadow-lg"
            inputClass={cn(
              "!h-10 !w-full !rounded-md !border-gray-300 dark:!border-gray-600 !bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-white focus:!ring-2 focus:!ring-primary-color1 focus:!border-primary-color1",
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
                className="w-full flex justify-between font-normal border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              >
                <span>
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">
                      {placeholder}
                    </span>
                  )}
                </span>
                <CalendarIcon className="h-4 w-4 opacity-50 text-primary-color1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                className="rounded-lg border shadow-sm bg-white dark:bg-gray-800"
                classNames={{
                  day_selected: "bg-primary-color1 text-white",
                  day_today: "border border-primary-color1",
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
          value={field.value?.toString()}
          defaultValue={field.value?.toString()}
        >
          <FormControl>
            <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 pl-3 rounded-lg h-10 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-color1 focus:border-primary-color1 text-gray-900 dark:text-white">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="  bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white z-[9999] max-h-60">
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value.toString()}
                className="flex items-center gap-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
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
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-light3 text-primary-color1 border-primary-color1"
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
                        className="ml-1 hover:text-red-600"
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
                    "w-full justify-between border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 h-10 text-gray-900 dark:text-white",
                    !field.value && "text-gray-500 dark:text-gray-400"
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
                <Command className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                  <CommandInput
                    placeholder={props.searchPlaceholder || "Search options..."}
                    className="h-12 text-base border-b border-gray-200 dark:border-gray-700 rounded-t-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <CommandList className="max-h-60 overflow-auto">
                    <CommandEmpty className="py-6 text-center text-gray-500 dark:text-gray-400">
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
                            className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <div
                              className={cn(
                                "w-5 h-5 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center mr-3",
                                isSelected
                                  ? "bg-primary-color1 border-primary-color1"
                                  : "bg-white dark:bg-gray-800"
                              )}
                            >
                              {isSelected && (
                                <CheckIcon className="w-3 h-3 text-white" />
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
                  "w-full justify-between border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white",
                  !field.value && "text-gray-500 dark:text-gray-400"
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
              <Command className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                <CommandInput
                  placeholder={props.searchPlaceholder || "Search..."}
                  className="h-12 text-base border-b border-gray-200 dark:border-gray-700 rounded-t-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <CommandList className="max-h-60 overflow-auto">
                  <CommandEmpty className="py-6 text-center text-gray-500 dark:text-gray-400">
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
                        className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-primary-color1 aria-selected:text-white text-gray-900 dark:text-white"
                      >
                        <CheckIcon
                          className={cn(
                            "mr-3 h-5 w-5 text-primary-color1",
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
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary-color1"
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
              className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-primary-color1"
            />
            <Label
              htmlFor={props.name}
              className="checkbox-label text-gray-900 dark:text-white"
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
                  className="border-gray-300 dark:border-gray-600 text-primary-color1"
                />
                <Label
                  htmlFor={`${props.name}-${option.value}`}
                  className="cursor-pointer text-sm text-gray-900 dark:text-white"
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
                <FormLabel className="mb-2 text-gray-900 dark:text-white">
                  {label}
                </FormLabel>
                <span className="text-red-500 text-xl -mt-1">*</span>
              </p>
            ) : (
              <FormLabel className="mb-2 text-gray-900 dark:text-white">
                {label}
              </FormLabel>
            ))}

          {fieldType === FormFieldType.MULTI_SELECT &&
            label &&
            (required ? (
              <p className="flex items-center gap-1 mb-3">
                <FormLabel className="text-gray-900 dark:text-white">
                  {label}
                </FormLabel>
                <span className="text-red-500 text-xl -mt-1">*</span>
              </p>
            ) : (
              <FormLabel className="mb-3 text-gray-900 dark:text-white">
                {label}
              </FormLabel>
            ))}

          {fieldType === FormFieldType.RADIO &&
            label &&
            (required ? (
              <p className="flex items-center gap-1 mb-3">
                <FormLabel className="text-gray-900 dark:text-white">
                  {label}
                </FormLabel>
                <span className="text-red-500 text-xl -mt-1">*</span>
              </p>
            ) : (
              <FormLabel className="mb-3 text-gray-900 dark:text-white">
                {label}
              </FormLabel>
            ))}

          {fieldType === FormFieldType.CHECKBOX && (
            <div className="mb-2">
              {required && label && (
                <p className="flex items-center gap-1 mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                  </span>
                  <span className="text-red-500 text-xl -mt-1">*</span>
                </p>
              )}
            </div>
          )}

          <FormControl>
            <RenderField field={field} props={props} />
          </FormControl>
          <FormMessage className="text-red-500 dark:text-red-400 mt-1" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
