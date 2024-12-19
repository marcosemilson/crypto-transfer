import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const NetworkSelector = ({ availableNetworks, selectedNetwork, setSelectedNetwork }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel>Selecionar Rede</InputLabel>
    <Select
      value={selectedNetwork}
      onChange={(evt) => setSelectedNetwork(evt.target.value)}
    >
      {availableNetworks.map((network) => (
        <MenuItem key={network.chainId} value={network.chainId}>
          {network.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default NetworkSelector;