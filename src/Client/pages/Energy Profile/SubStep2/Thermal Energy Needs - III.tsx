import React, { useState } from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch, Tooltip } from '@mui/material';

const SubStep2: React.FC = () => {
  // Local state for the switch
  const [showSteam, setShowSteam] = useState(false);
  // Local state for all numeric inputs (stored unformatted)
  const [inputs, setInputs] = useState({
    chilledCapacity: "",
    coolingTonHours: "",
    temperatureLeaving: "",
    additionalDemand: "",
    temperatureReturning: "",
    pumpHp: "",
    pumpCount: "",
  });

  // onChange handler: removes commas and any non-digit characters (thus no decimals allowed)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Remove commas and disallow any non-digit characters
    const cleanedValue = value.replace(/,/g, "").replace(/\D/g, "");
    setInputs((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));
  };

  // Format a number string with commas as thousands separators.
  const formatNumber = (value: string) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Consolidated TextField styling for consistency.
  const textFieldSx = {
    flex: 0.5,
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.7rem',
    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
    '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
    '& .MuiInputBase-input::placeholder': {
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.7rem',
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.75rem',
        p: 1,
        pr: 4,
        pl: 1,
        pt: 1,
      }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');`}
      </style>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <h2>Thermal Energy Needs - III</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pt: '10px',
            pb: '10px',
            pl: '160px',
            pr: '160px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Click to expand or move on to the next step." placement="right" arrow>
              <FormControlLabel
                control={
                  <Switch
                    checked={showSteam}
                    onChange={() => setShowSteam(!showSteam)}
                    size="small"
                  />
                }
                label="Does your facility require chilled water?"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.9rem',
                  },
                }}
              />
            </Tooltip>
          </Box>

          {showSteam && (
            <Box sx={{ mb: 0, pl: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    pt: '10px',
                  }}
                >
                  {/* Chilled Water Capacity */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        fontSize: '0.75rem',
                        minWidth: '150px',
                        flex: 0.5,
                      }}
                    >
                      <b>How many tons of chilled water capacity do you have at the facility?</b>
                    </Typography>
                    <Tooltip title="Enter capacity in Tons" placement="right" arrow>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        name="chilledCapacity"
                        placeholder="Chilled water capacity at facility (in Tons)"
                        value={formatNumber(inputs.chilledCapacity)}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />
                    </Tooltip>
                  </Box>

                  {/* Cooling Ton Hours */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        fontSize: '0.75rem',
                        minWidth: '150px',
                        flex: 0.5,
                      }}
                    >
                      <b>How many cooling ton hours used annually?</b>
                    </Typography>
                    <Tooltip title="Enter annual usage in hours" placement="right" arrow>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        name="coolingTonHours"
                        placeholder="Chilled water ton hours annually"
                        value={formatNumber(inputs.coolingTonHours)}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />
                    </Tooltip>
                  </Box>

                  {/* Temperature Leaving the Plant */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        fontSize: '0.75rem',
                        minWidth: '150px',
                        flex: 0.5,
                      }}
                    >
                      <b>Chilled Water Temperature leaving the plant:</b>
                    </Typography>
                    <Tooltip title="Enter temperature in K" placement="right" arrow>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        name="temperatureLeaving"
                        placeholder="Enter Temperature in K"
                        value={formatNumber(inputs.temperatureLeaving)}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />
                    </Tooltip>
                  </Box>

                  {/* Additional Chilled Water Demand */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        fontSize: '0.75rem',
                        minWidth: '150px',
                        flex: 0.5,
                      }}
                    >
                      <b>Additional Chilled Water Demand:</b>
                    </Typography>
                    <Tooltip title="Enter CW Demand in Tons" placement="right" arrow>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        name="additionalDemand"
                        placeholder="Optional (Tons)"
                        value={formatNumber(inputs.additionalDemand)}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />
                    </Tooltip>
                  </Box>

                  {/* Temperature Returning to the Plant */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        fontSize: '0.75rem',
                        minWidth: '150px',
                        flex: 0.5,
                      }}
                    >
                      <b>Chilled water temperature returning to the plant:</b>
                    </Typography>
                    <Tooltip title="Enter temperature in K" placement="right" arrow>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        name="temperatureReturning"
                        placeholder="Enter chilled water temperature returning to the plant"
                        value={formatNumber(inputs.temperatureReturning)}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />
                    </Tooltip>
                  </Box>

                  {/* Separate Fields for CW Pumps */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: 'Nunito Sans, sans-serif',
                          fontSize: '0.75rem',
                          minWidth: '150px',
                          flex: 0.5,
                        }}
                      >
                        <b>CW Pump HP Size:</b>
                      </Typography>
                      <Tooltip title="Enter pump size in HP" placement="right" arrow>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="text"
                          name="pumpHp"
                          placeholder="Enter pump HP size"
                          value={formatNumber(inputs.pumpHp)}
                          onChange={handleChange}
                          sx={textFieldSx}
                        />
                      </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: 'Nunito Sans, sans-serif',
                          fontSize: '0.75rem',
                          minWidth: '150px',
                          flex: 0.5,
                        }}
                      >
                        <b>Number of CW Pumps:</b>
                      </Typography>
                      <Tooltip title="Enter number of pumps" placement="right" arrow>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="text"
                          name="pumpCount"
                          placeholder="Enter number of pumps"
                          value={formatNumber(inputs.pumpCount)}
                          onChange={handleChange}
                          sx={textFieldSx}
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                mt: 1,
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.75rem',
                minWidth: '200px',
                flex: 1,
              }}
            >
              <i>
                <b>Hint: </b>All values need to be near estimates, not exact.
                Please be as accurate as possible as the answers may alter my recommendation.
              </i>
              <br />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;
