import React, { PropsWithChildren, ReactNode } from "react";
import { ProfileSidebar } from "./_components";

type Props = {
  children: ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <div className="max-h-[90vh]">
      <div className="grid grid-cols-4 gap-4 mt-4 mx-16">
        <div className="col-span-1">
          <ProfileSidebar />
        </div>
        <div className="col-span-3 max-h-[90vh] overflow-auto pr-8 sidebar-scrollbar  px-2 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
