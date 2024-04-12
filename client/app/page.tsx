"use client";
import { FC, useState } from "react";
import { IntlProvider } from "react-intl";
import messages_en from "./locales/en.json";
import messages_cz from "./locales/cz.json";
import TaskList from "./components/TaskList";
import { Container, SelectChangeEvent } from "@mui/material";
import Header from "./components/header";

interface Messages {
  [key: string]: any;
}

const messages: Messages = {
  "en-US": messages_en,
  "cs-CZ": messages_cz,
};

const Home: FC = () => {
  const [locale, setLocale] = useState("en-US");

  const handleLocaleChange = (e: SelectChangeEvent<string>) => {
    setLocale(e.target.value);
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Container maxWidth="lg">
        <Header locale={locale} handleLocaleChange={handleLocaleChange} />
        <TaskList />
      </Container>
    </IntlProvider>
  );
};

export default Home;
