"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useTransition } from "react";

type Props = {};

const Switcher = (props: Props) => {
  const router = useRouter();
  const localActive = useLocale();
  const [isPending, startTransition] = useTransition();
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocal = e.target.value;
    router.replace(`/${nextLocal}`);
  };
  return (
    <div>
      <p className="sr-only">change language :</p>
      <select
        onChange={onSelectChange}
        defaultValue={localActive}
        disabled={isPending}
      >
        <option value="en">English</option>
        <option value="ar">Arabic</option>
      </select>
    </div>
  );
};

export default Switcher;
