import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Box, Typography, CircularProgress } from '@mui/material';
import NetworkSelector from './components/NetworkSelector';
import WalletInfo from './components/WalletInfo';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';

function App() {
  const [myAddress, setMyAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [availableNetworks, setAvailableNetworks] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    fetchNetworks();
  }, []);

  async function fetchNetworks() {
    try {
      if (!window.ethereum) {
        setMessage('MetaMask não está instalado');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const chainId = await provider.getNetwork();
      setCurrentNetwork(`${chainId.name} (${chainId.chainId})`);

      const networks = [
        { chainId: '0x1', name: 'Ethereum Mainnet' },
        { chainId: '0x5', name: 'Goerli Testnet' },
        { chainId: '0x3', name: 'Ropsten Testnet' },
        { chainId: '0x4', name: 'Rinkeby Testnet' },
        { chainId: '0x2a', name: 'Kovan Testnet' },
      ];

      setAvailableNetworks(networks);
    } catch (error) {
      console.error('Erro ao carregar redes:', error);
    }
  }

  async function connect() {
    try {
      if (!window.ethereum) {
        setMessage('MetaMask não está instalado');
        return;
      }
  
      setMessage('Conectando...');
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
  
      if (!accounts || accounts.length === 0) {
        setMessage('Nenhuma conta disponível na MetaMask.');
        return;
      }
  
      const balance = await provider.getBalance(accounts[0]);
      const network = await provider.getNetwork();
  
      const connectedChainId = `0x${network.chainId.toString(16)}`;
  
      setMyAddress(accounts[0]);
      setBalance(ethers.formatEther(balance.toString()));
      setCurrentNetwork(`${network.name} (${connectedChainId})`);
      setSelectedNetwork(connectedChainId);
  
      // Adicionar a rede conectada à lista de redes disponíveis, se não estiver na lista
      const networkExists = availableNetworks.some((net) => net.chainId === connectedChainId);
      if (!networkExists) {
        const newNetwork = { chainId: connectedChainId, name: network.name };
        setAvailableNetworks((prev) => [...prev, newNetwork]);
  
        // Garantir que o combobox seja atualizado
        setSelectedNetwork(connectedChainId);
      }
  
      setMessage('Conectado com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar:', error);
      setMessage(`Erro ao conectar: ${error.message}`);
    }
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Crypto Transfer MetaMask
      </Typography>

      <Typography variant="body2" color="error" sx={{ mt: 2 }}>
        Este sistema é para fins de estudo e não deve ser usado em ambientes de produção. Use apenas em redes de teste.
        O autor não se responsabiliza por qualquer uso inadequado ou perdas financeiras decorrentes.
      </Typography>

      <NetworkSelector
        availableNetworks={availableNetworks}
        selectedNetwork={selectedNetwork}
        setSelectedNetwork={setSelectedNetwork}
      />

      <WalletInfo
        connect={connect}
        myAddress={myAddress}
        currentNetwork={currentNetwork}
        balance={balance}
        loading={loading}
      />

      <TransactionForm
        setTransactionHistory={setTransactionHistory}
        setMessage={setMessage}
        loading={loading}
        setLoading={setLoading}
      />

      <TransactionHistory transactionHistory={transactionHistory} />

      {message && (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default App;