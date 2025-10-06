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
import { FormFieldType } from "@/enums";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
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

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    required,
    options = [],
  } = props;

  const [dropdown, setDropdown] =
    React.useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
      "dropdown"
    );
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  );

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 focus-within:ring-2 ring-primary-color1">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2 "
            />
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className=" border-0 placeholder: focus:outline-none focus-within:border-none focus-within:ring-0 bg-transparent"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 focus-within:ring-2 ring-primary-color1">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={20}
              height={20}
              className="ml-2 "
            />
          )}
          <FormControl>
            <Input
              {...field}
              type={"password"}
              placeholder={placeholder}
              className=" border-0 placeholder: focus:outline-none focus-within:border-none focus-within:ring-0 bg-transparent"
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
            buttonClass=" !h-10 !border-slate-300 dark:!border-slate-600 !bg-white/50 dark:!bg-slate-700/50  !rounded-l-[1px] rtl:!rounded-r-[1px] rtl:!rounded-l-none rtl:!pr-2 dark:hover:bg-gray-900"
            dropdownClass="!bg-white dark:!bg-slate-800 !border-slate-300 dark:!border-slate-600 !shadow-xl  !rounded-lg"
            inputClass="!h-10  !w-full  rtl:pr-16 !rounded-[4px] !border-slate-300 dark:!border-slate-600 !bg-white/50 dark:!bg-slate-700/50 !shadow-sm focus:!ring-2 focus:!ring-primary-color1 focus:!border-primary-color1 !transition-all !duration-200"
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
                className="w-full flex justify-between font-normal border border-dark-500 bg-dark-400 hover:bg-dark-400"
              >
                <span>
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                  )}
                </span>
                <CalendarIcon className="h-4 w-4 opacity-50 text-primary-color1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                defaultMonth={date}
                selected={field.value}
                onSelect={field.onChange}
                captionLayout={dropdown}
                className="rounded-lg border shadow-sm"
              />
            </PopoverContent>
          </Popover>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="w-full border border-dark-500 pl-3 rounded-lg h-10 bg-dark-400">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-2">
                  {option.code && (
                    <ReactCountryFlag
                      countryCode={option.code}
                      svg
                      style={{
                        width: "1.3em",
                        height: "1.3em",
                      }}
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
    case FormFieldType.COMBOBOX:
      return (
        <FormControl>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between border border-gray-300 bg-white hover:bg-gray-50",
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
              <Command className="bg-white border border-gray-300 rounded-md shadow-lg">
                <CommandInput
                  placeholder={props.searchPlaceholder || "Search..."}
                  className="h-12 text-base border-b border-gray-200 rounded-t-md"
                />
                <CommandList className="max-h-60 overflow-auto hide-scrollbar">
                  <CommandEmpty className="py-6 text-center text-gray-500">
                    No results found.
                  </CommandEmpty>
                  <CommandGroup className="!hide-scrollbar">
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => {
                          field.onChange(
                            option.value === field.value ? "" : option.value
                          );
                        }}
                        className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 aria-selected:!bg-primary-color1"
                      >
                        <CheckIcon
                          className={cn(
                            "mr-3 h-5 w-5 text-primary-color1 bg-white rounded-full",
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
                        <span className="text-gray-900">{option.label}</span>
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
            className="shad-textArea border border-dark-500 bg-dark-400"
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
            />
            <Label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </Label>
          </div>
        </FormControl>
      );
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, required } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 flex flex-col">
          {fieldType !== FormFieldType.CHECKBOX &&
            label &&
            (required ? (
              <p className="flex items-center gap-1">
                <FormLabel className="mb-2 ">{label}</FormLabel>
                <span className="text-red-400 text-xl -mt-1 ">*</span>
              </p>
            ) : (
              <FormLabel className="mb-2">{label}</FormLabel>
            ))}
          <FormControl>
            <RenderField field={field} props={props} />
          </FormControl>
          <FormMessage className="shad-error " />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
