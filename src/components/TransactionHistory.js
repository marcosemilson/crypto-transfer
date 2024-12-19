import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const TransactionHistory = ({ transactionHistory }) => (
  <>
    <Typography variant="h6" sx={{ mt: 4 }}>
      Histórico de Transações
    </Typography>
    <List>
      {transactionHistory.length > 0 ? (
        transactionHistory.map((tx, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Para: ${tx.to}, Quantidade: ${tx.amount} ETH`}
              secondary={`Hash: ${tx.hash}, Data: ${tx.date}, Status: ${tx.status}`}
            />
          </ListItem>
        ))
      ) : (
        <Typography variant="body2">Nenhuma transação ainda.</Typography>
      )}
    </List>
  </>
);

export default TransactionHistory;