import {
  Grid,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

interface HeaderProps {
  locale: string;
  handleLocaleChange: (e: SelectChangeEvent<string>) => void;
}

const Header: FC<HeaderProps> = ({ locale, handleLocaleChange }) => {
  return (
    <Grid container justifyContent="center">
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2" align="center" gutterBottom>
          <FormattedMessage id="app.title" defaultMessage="Task Manager" />
        </Typography>
        <FormControl variant="standard" size="small">
          <InputLabel id="language-select-label">
            <FormattedMessage id="app.language" defaultMessage="Language" />
          </InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={locale}
            onChange={handleLocaleChange}
            label="Language"
            inputProps={{ MenuProps: { disableScrollLock: true } }} //disable adding padding to body on click
          >
            <MenuItem value="en-US">English</MenuItem>
            <MenuItem value="cs-CZ">Czech</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Grid>
  );
};

export default Header;
