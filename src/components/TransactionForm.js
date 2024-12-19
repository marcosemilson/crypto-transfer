import React, { useState } from 'react';
import { ethers } from 'ethers';
import { TextField, Button, CircularProgress } from '@mui/material';

const TransactionForm = ({ setTransactionHistory, setMessage, loading, setLoading }) => {
  const [toAddress, setToAddress] = useState('');
  const [quantity, setQuantity] = useState('');

  const transfer = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) return setMessage('MetaMask não está instalado.');
      if (!ethers.isAddress(toAddress)) return setMessage('Endereço de destino inválido.');
      if (isNaN(quantity) || parseFloat(quantity) <= 0) return setMessage('Quantidade inválida.');

      setMessage('Processando transação...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(quantity),
      });

      await tx.wait();

      const timestamp = new Date().toLocaleString();

      setTransactionHistory((prevHistory) => [
        ...prevHistory,
        { to: toAddress, amount: quantity, hash: tx.hash, status: 'Sucesso', date: timestamp },
      ]);

      setMessage(`Transação concluída: ${tx.hash}`);
    } catch (error) {
      setMessage(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Endereço de Destino"
        onChange={(evt) => setToAddress(evt.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Quantidade (ETH)"
        type="number"
        onChange={(evt) => setQuantity(evt.target.value)}
      />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={transfer}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Transferir'}
      </Button>
    </>
  );
};

export default TransactionForm;