"use client";

import { useState } from "react";
import FilteredNotificationsContainer from "./FilteredNotificationsContainer";
import { NOTIFICATION_FILTER } from "@/lib/consts/notification";

export default function NotificationsContainer() {
  const [currentTab, setCurrentTab] = useState<"all" | NotificationReason>(
    "all",
  );

  const handleTabChange = (tab: "all" | NotificationReason) => {
    setCurrentTab(tab);
  };

  return (
    <section>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="no-scrollbar mt-5 flex flex-nowrap gap-3 overflow-auto px-3 md:px-0"
      >
        {NOTIFICATION_FILTER.map((type) => (
          <button
            key={type.label}
            role="tab"
            onClick={() => handleTabChange(type.value)}
            className={`border-b-3 hover:text-primary shrink-0 cursor-pointer px-3 pb-2 font-semibold ${
              currentTab === type.value
                ? "border-primary-600 text-primary border-primary"
                : "border-transparent text-neutral-500"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
      <FilteredNotificationsContainer filter={currentTab} />
    </section>
  );
}
