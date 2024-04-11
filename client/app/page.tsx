"use client";
import { ChangeEvent, useState } from "react";
import { IntlProvider } from "react-intl";
import messages_en from "./locales/en.json";
import messages_cz from "./locales/cz.json";
import TaskList from "./components/TaskList";

interface Messages {
  [key: string]: any;
}

const messages: Messages = {
  en: messages_en,
  cz: messages_cz,
};

export default function Home() {
  const [locale, setLocale] = useState("en");

  const handleLocaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value);
  };

  return (
    <main>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div>
          <label>
            Select Language:
            <select value={locale} onChange={handleLocaleChange}>
              <option value="en">English</option>
              <option value="cz">Czech</option>
            </select>
          </label>
          <TaskList />
        </div>
      </IntlProvider>
    </main>
  );
}
