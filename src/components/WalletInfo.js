import React, { useState } from 'react';
import { Button, TextField, Typography, CircularProgress } from '@mui/material';

const WalletInfo = ({ connect, myAddress, currentNetwork, balance, loading }) => {
  const [showBalance, setShowBalance] = useState(false); // Estado para alternar a visibilidade do saldo.

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Meu Endereço"
        value={myAddress || 'N/A'}
        InputProps={{ readOnly: true }}
      />
      <Typography variant="body1" sx={{ mt: 1 }}>
        Rede Atual: {currentNetwork || 'N/A'}
      </Typography>
      
      {/* Botão para alternar a visibilidade */}
      <Button
        variant="text"
        color="primary"
        onClick={() => setShowBalance((prev) => !prev)}
        sx={{ mb: 1 }}
      >
        {showBalance ? 'Ocultar Saldo' : 'Mostrar Saldo'}
      </Button>
      
      {/* Exibição condicional do saldo */}
      <Typography variant="h6" sx={{ mt: 1 }}>
        {showBalance ? `Saldo: ${balance || 'N/A'} ETH` : '***********'}
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={connect}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Conectar Carteira'}
      </Button>
    </>
  );
};

export default WalletInfo;