import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

export default function LocationAutoComplete({
    value,
    options,
    handleChange,
    handleInputChange,
    viewOnly,
}) {
    const classes = useStyles();

    function getAutocomplete() {
        if(viewOnly) {
            return(
                <TextField
                    fullWidth={true}
                    value={value}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            );
        } else {
            return(
                <Autocomplete
                id="google-map"
                style={{ width: '100%' }}
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.description
                }
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                onChange={(event, newValue) => handleChange(event, newValue)}
                onInputChange={(event, newInputValue) =>
                    handleInputChange(event, newInputValue)
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Add a location"
                        variant="outlined"
                        fullWidth
                    />
                )}
                renderOption={(option) => {
                    const matches =
                        option.structured_formatting.main_text_matched_substrings;
                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match) => [
                            match.offset,
                            match.offset + match.length,
                        ])
                    );

                    return (
                        <Grid container alignItems="center">
                            <Grid item>
                                <LocationOnIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs>
                                {parts.map((part, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            fontWeight: part.highlight ? 700 : 400,
                                        }}
                                    >
                                        {part.text}
                                    </span>
                                ))}

                                <Typography variant="body2" color="textSecondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                }}/>
            );
        }
    }

    return (
        <div style={{ width: '100%' }}>
            {getAutocomplete()}
        </div>
    );
}
