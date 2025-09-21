"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
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
import { ICONS } from "@/constants/icons";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";

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
                <CalendarIcon className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
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

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
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
