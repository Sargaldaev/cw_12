import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  image: File | null;
  helperText: string | ReactNode;
  error: Boolean ;
}

const InputFile: React.FC<Props> = ({onChange, name, image, helperText, error}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filename, setFilename] = useState<string>('');

  useEffect(() => {
    if (image === null) {
      setFilename('');
    }
  }, [image]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{display: 'none'}}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid item>
        <TextField
          disabled
          label="Browse image"
          value={filename}
          onClick={activateInput}
          fullWidth
          error={Boolean(error)}
          helperText={helperText}
        />
        <Button variant="contained" sx={{marginTop: 1}} onClick={activateInput}>
          Browse
        </Button>
      </Grid>
    </>
  );
};

export default InputFile;
